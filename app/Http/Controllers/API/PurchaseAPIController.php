<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreatePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Http\Resources\{PurchaseCollection, PurchaseResource};
use App\Models\ManageStock;
use App\Models\Purchase;
use App\Models\Setting;
use App\Models\Supplier;
use App\Models\Warehouse;
use App\Repositories\PurchaseRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class PurchaseAPIController
 */
class PurchaseAPIController extends AppBaseController
{
    /** @var  PurchaseRepository */
    private $purchaseRepository;

    public function __construct(PurchaseRepository $purchaseRepository)
    {
        $this->purchaseRepository = $purchaseRepository;
    }

    /**
     * @param Request $request
     *
     * @return PurchaseCollection
     */
    public function index(Request $request)
    {
        $perPage = getPageSize($request);
        $search = $request->filter['search'] ?? '';
        $supplier = (Supplier::where('name', 'LIKE', "%$search%")->get()->count() != 0);
        $warehouse = (Warehouse::where('name', 'LIKE', "%$search%")->get()->count() != 0);
        $purchases = $this->purchaseRepository;
        if ($supplier || $warehouse) {
            $purchases->whereHas('supplier', function (Builder $q) use ($search, $supplier) {
                if ($supplier) {
                    $q->where('name', 'LIKE', "%$search%");
                }
            })->whereHas('warehouse', function (Builder $q) use ($search, $warehouse) {
                if ($warehouse) {
                    $q->where('name', 'LIKE', "%$search%");
                }
            });
        }

        if ($request->get('start_date') && $request->get('end_date')) {
            $purchases->whereBetween('date', [$request->get('start_date'), $request->get('end_date')]);
        }

        if ($request->get('warehouse_id')) {
            $purchases->where('warehouse_id', $request->get('warehouse_id'));
        }

        if ($request->get('status')) {
            $purchases->where('status', $request->get('status'));
        }

        $purchases = $purchases->paginate($perPage);

        PurchaseResource::usingWithCollection();

        return new PurchaseCollection($purchases);
    }

    /**
     * @param CreatePurchaseRequest $request
     *
     * @return PurchaseResource
     */
    public function store(CreatePurchaseRequest $request)
    {
        $input = $request->all();
        $input['date'] = date('Y-m-d',strtotime(json_decode($input['date'])));
        $purchase = $this->purchaseRepository->storePurchase($input);

        return new PurchaseResource($purchase);
    }

    /**
     * @param $id
     *
     * @return PurchaseResource
     */
    public function show($id)
    {
        $purchase = $this->purchaseRepository->find($id);

        return new PurchaseResource($purchase);
    }

    /**
     * @param Purchase $purchase
     *
     * @return PurchaseResource
     */
    public function edit(Purchase $purchase)
    {
        $purchase = $purchase->load('purchaseItems.product.stocks', 'warehouse');

        return new PurchaseResource($purchase);
    }

    /**
     * @param UpdatePurchaseRequest $request
     * @param $id
     *
     *
     * @return PurchaseResource
     */
    public function update(UpdatePurchaseRequest $request, $id): PurchaseResource
    {
        $input = $request->all();
        // $input['date'] = trim(preg_replace('/\s*\([^)]*\)/', '', $input['date']));
        $input['date'] = date('Y-m-d',strtotime(json_decode($input['date'])));
        $purchase = $this->purchaseRepository->updatePurchase($input, $id);

        return new PurchaseResource($purchase); 
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            //manage stock
            $purchase = $this->purchaseRepository->with('purchaseItems')->where('id', $id)->first();
           
            foreach ($purchase->purchaseItems as $purchaseItem) {
                $product = ManageStock::whereWarehouseId($purchase->warehouse_id)
                    ->whereProductId($purchaseItem['product_id'])
                    ->first();
                if ($product) {
                    if ($product->quantity >= $purchaseItem['quantity']) {
                        $totalQuantity = $product->quantity - $purchaseItem['quantity'];
                        $product->update([
                            'quantity' => $totalQuantity,
                        ]);
                    } else {
                        throw new UnprocessableEntityHttpException("Quantity must be less than Available quantity.");
                    }
                }
            }
            $this->purchaseRepository->delete($id);
            DB::commit();
            $shipping_has_values = \App\Models\Shipping_has_values::where('slug','purchases')->where('sale_purchases_id',$id)->delete();

            return $this->sendSuccess('Purchase Deleted successfully');
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param Purchase $purchase
     *
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     *
     * @return JsonResponse
     */
    public function pdfDownload(Purchase $purchase): JsonResponse
    {
        $purchase = $purchase->load('purchaseItems.product', 'supplier');

        $data = [];
        if (Storage::exists('pdf.purchase-pdf-'.$purchase->reference_code.'.pdf')) {
            Storage::delete('pdf.purchase-pdf-'.$purchase->reference_code.'.pdf');
        }

        $pdf = PDF::loadView('pdf.purchase-pdf', compact('purchase'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);
        Storage::disk(config('app.media_disc'))->put('pdf/Purchase-'.$purchase->reference_code.'.pdf', $pdf->output());
        $data['purchase_pdf_url'] = Storage::url('pdf/Purchase-'.$purchase->reference_code.'.pdf');
        
        return $this->sendResponse($data, "pdf retrieved Successfully");
    }

    /**
     * @param Purchase $purchase
     *
     *
     * @return JsonResponse
     */
    public function purchaseInfo(Purchase $purchase)
    {
        $purchase = $purchase->load(['purchaseItems.product', 'warehouse', 'supplier', 'toStatus']);
        $keyName = [
            'email', 'company_name', 'phone', 'address',
        ];
        $purchase['company_info'] = Setting::whereIn('key', $keyName)->pluck('value', 'key')->toArray();

        return $this->sendResponse($purchase, "Purchase information retrieved successfully");
    }

    /**
     * @param Request $request
     *
     * @return PurchaseCollection
     */
    public function getPurchaseProductReport(Request $request): PurchaseCollection
    {
        $perPage = getPageSize($request);
        $productId = $request->get('product_id');
        $purchases = $this->purchaseRepository->whereHas('purchaseItems', function ($q) use ($productId) {
            $q->where('product_id', '=', $productId);
        })->with(['purchaseItems.product', 'supplier']);

        $purchases = $purchases->paginate($perPage);

        PurchaseResource::usingWithCollection();

        return new PurchaseCollection($purchases);
    }
}
