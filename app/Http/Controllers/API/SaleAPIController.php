<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Resources\SaleCollection;
use App\Http\Resources\SaleResource;
use App\Models\Customer;
use App\Models\Hold;
use App\Models\Sale;
use App\Models\Setting;
use App\Models\Warehouse;
use App\Repositories\SaleRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class SaleAPIController
 */
    class SaleAPIController extends AppBaseController
    {
        /** @var  saleRepository */
        private $saleRepository;

        public function __construct(SaleRepository $saleRepository)
        {
            $this->saleRepository = $saleRepository;
        }

        /**
     * @param Request $request
     *
     * @return SaleCollection
     */
    public function index(Request $request)
    {
        $perPage = getPageSize($request);
        $search = $request->filter['search'] ?? '';
        $customer = (Customer::where('name', 'LIKE', "%$search%")->get()->count() != 0);
        $warehouse = (Warehouse::where('name', 'LIKE', "%$search%")->get()->count() != 0);

        $sales = $this->saleRepository;
        if ($customer || $warehouse) {
            $sales->whereHas('customer', function (Builder $q) use ($search, $customer) {
                if ($customer) {
                    $q->where('name', 'LIKE', "%$search%");
                }
            })->whereHas('warehouse', function (Builder $q) use ($search, $warehouse) {
                if ($warehouse) {
                    $q->where('name', 'LIKE', "%$search%");
                }
            });
        }

        if ($request->get('start_date') && $request->get('end_date')) {
            $sales->whereBetween('date', [$request->get('start_date'), $request->get('end_date')]);
        }

        if ($request->get('warehouse_id')) {
            $sales->where('warehouse_id', $request->get('warehouse_id'));
        }

        if ($request->get('customer_id')) {
            $sales->where('customer_id', $request->get('customer_id'));
        }

        if ($request->get('status') && $request->get('status') != "null") {
            $sales->Where('status', $request->get('status'));
        }

        if ($request->get('payment_status') && $request->get('payment_status') != "null") {
            $sales->where('payment_status', $request->get('payment_status'));
        }

        if ($request->get('payment_type') && $request->get('payment_type') != "null") {
            $sales->where('payment_type', $request->get('payment_type'));
        }

        $sales = $sales->paginate($perPage);

        SaleResource::usingWithCollection();

        return new SaleCollection($sales);
    }

    /**
     * @param CreateSaleRequest $request
     *
     * @return SaleResource
     */
    public function store(CreateSaleRequest $request)
    {
       
        if(isset($request->hold_ref_no)){
            $holdExist = Hold::whereReferenceCode($request->hold_ref_no)->first();
            if(!empty($holdExist)){
                $holdExist->delete();
            }
        }
        $input = $request->all();
        $sale = $this->saleRepository->storeSale($input);

        return new SaleResource($sale);
    }

    /**
     * @param $id
     *
     * @return SaleResource
     */
    public function show($id)
    {
        $sale = $this->saleRepository->find($id);

        return new SaleResource($sale);
    }

    /**
     * @param Sale $sale
     *
     * @return SaleResource
     */
    public function edit(Sale $sale)
    {
        $sale = $sale->load('saleItems.product.stocks', 'warehouse');

        return new SaleResource($sale);
    }

    /**
     * @param UpdateSaleRequest $request
     * @param $id
     *
     * @return SaleResource
     */
    public function update(UpdateSaleRequest $request, $id)
    {
        $input = $request->all();
        $sale = $this->saleRepository->updateSale($input, $id);

        return new SaleResource($sale);
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
            $sale = $this->saleRepository->with('saleItems')->where('id', $id)->first();
            foreach ($sale->saleItems as $saleItem) {
                manageStock($sale->warehouse_id, $saleItem['product_id'], $saleItem['quantity']);
            }
            if (File::exists(Storage::path('sales/barcode-'.$sale->reference_code.'.png'))) {
                File::delete(Storage::path('sales/barcode-'.$sale->reference_code.'.png'));
            }
            $this->saleRepository->delete($id);
            DB::commit();
             $shipping_has_values = \App\Models\Shipping_has_values::where('slug','sale')->where('sale_purchases_id',$id)->delete();

            return $this->sendSuccess('Sale Deleted successfully');
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param Sale $sale
     *
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     *
     * @return JsonResponse
     */
    public function pdfDownload(Sale $sale): JsonResponse
    {
        $sale = $sale->load('customer', 'saleItems.product', 'payments');
        $data = [];
        if (Storage::exists('pdf/Sale-'.$sale->reference_code.'.pdf')) {
            Storage::delete('pdf/Sale-'.$sale->reference_code.'.pdf');
        }
        $companyLogo = getLogoUrl();
        $pdf = PDF::loadView('pdf.sale-pdf', compact('sale', 'companyLogo'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);
        Storage::disk(config('app.media_disc'))->put('pdf/Sale-'.$sale->reference_code.'.pdf', $pdf->output());
        $data['sale_pdf_url'] = Storage::url('pdf/Sale-'.$sale->reference_code.'.pdf');

        return $this->sendResponse($data, "pdf retrieved Successfully");
    }

    /**
     * @param Sale $sale
     *
     *
     * @return JsonResponse
     */
    public function saleInfo(Sale $sale)
    {
        $sale = $sale->load('saleItems.product', 'warehouse', 'customer' ,'toStatus');
        $keyName = [
            'email', 'company_name', 'phone', 'address',
        ];
        $sale['company_info'] = Setting::whereIn('key', $keyName)->pluck('value', 'key')->toArray();

        return $this->sendResponse($sale, "Sale information retrieved successfully");
    }

    /**
     * @param Request $request
     *
     * @return SaleCollection
     */
    public function getSaleProductReport(Request $request): SaleCollection
    {
        $perPage = getPageSize($request);
        $productId = $request->get('product_id');
        $sales = $this->saleRepository->whereHas('saleItems', function ($q) use ($productId) {
            $q->where('product_id', '=', $productId);
        })->with(['saleItems.product', 'customer']);

        $sales = $sales->paginate($perPage);

        SaleResource::usingWithCollection();

        return new SaleCollection($sales);
    }
}
