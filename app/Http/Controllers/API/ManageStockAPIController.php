<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\ManageStockCollection;
use App\Http\Resources\ManageStockResource;
use App\Repositories\ManageStockRepository;
use Illuminate\Http\Request;

/**
 * Class UserAPIController
 */
class ManageStockAPIController extends AppBaseController
{
    /** @var $manageStockRepository */
    private $manageStockRepository;

    /**
     * @param ManageStockRepository $manageStockRepository
     */
    public function __construct(ManageStockRepository $manageStockRepository)
    {
        $this->manageStockRepository = $manageStockRepository;
    }

    /**
     * @param Request $request
     *
     * @return ManageStockCollection
     */
    public function stockReport(Request $request): ManageStockCollection
    {
        $request->request->remove('filter');
        $perPage = getPageSize($request);
        $search = $request->get('search');
        $warehouseId = $request->get('warehouse_id');
        if ($search && $search != "null") {
            $stocks = $this->manageStockRepository->whereHas('product.productCategory',
                function ($query) use ($search) {
                    $query->where('products.code', 'like', '%'.$search.'%')
                        ->orWhere('products.name', 'like', '%'.$search.'%')
                        ->orWhere('products.product_cost', 'like', '%'.$search.'%')
                        ->orWhere('products.product_price', 'like', '%'.$search.'%')
                        ->orWhere('products.product_price', 'like', '%'.$search.'%')
                        ->orWhere('product_categories.name', 'like', '%'.$search.'%');
                })->where('warehouse_id', $warehouseId)->paginate($perPage);
        } else {
            $stocks = $this->manageStockRepository->where('warehouse_id', $warehouseId)->paginate($perPage);
        }
        ManageStockResource::usingWithCollection();

        return new ManageStockCollection($stocks);
    }
    public function stockGet(Request $request)
    {
        $stock = \App\Models\ManageStock::leftjoin('warehouses','manage_stocks.warehouse_id','warehouses.id');
        $stock->leftjoin('products','manage_stocks.product_id','products.id');
        $stock->select('manage_stocks.*','warehouses.name as warehousesName','products.name as productName','products.code as productCode');
        $stocks = $stock->get();

         if($stocks != ''){
            return response(['status'=>'200','Message'=>'stocks retrieved successfully','stocks' => $stocks]);
        }else{
            return response(['status'=>'401','Failed'=>"Failed"]);
        }
    }
}
