<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateProductCategoryRequest;
use App\Http\Requests\UpdateProductCategoryRequest;
use App\Http\Resources\ProductCategoryCollection;
use App\Http\Resources\ProductCategoryResource;
use App\Models\Product;
use App\Repositories\ProductCategoryRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductCategoryAPIController extends AppBaseController
{
    /** @var  productCategoryRepository */
    private $productCategoryRepository;

    public function __construct(ProductCategoryRepository $productCategoryRepository)
    {
        $this->productCategoryRepository = $productCategoryRepository;
    }

    /**
     * @param Request $request
     *
     * @return ProductCategoryCollection
     */
    public function index(Request $request)
    {
        $perPage = getPageSize($request);
        $sort = null;
        if ($request->sort == 'products_count') {
            $sort = 'asc';
            $request->request->remove('sort');
        } elseif ($request->sort == '-products_count') {
            $sort = 'desc';
            $request->request->remove('sort');
        }
        $productCategory = $this->productCategoryRepository->withCount('products')->when($sort,
            function ($q) use ($sort) {
                $q->orderBy('products_count', $sort);
            })->paginate($perPage);

        ProductCategoryResource::usingWithCollection();

        return new ProductCategoryCollection($productCategory);
    }

    /**
     * @param CreateProductCategoryRequest $request
     *
     * @return ProductCategoryResource
     */
    public function store(CreateProductCategoryRequest $request)
    {
        $input = $request->all();
        $productCategory = $this->productCategoryRepository->storeProductCategory($input);

        return new ProductCategoryResource($productCategory);
    }

    /**
     * @param $id
     *
     * @return ProductCategoryResource
     */
    public function show($id)
    {
        $productCategory = $this->productCategoryRepository->withCount('products')->find($id);

        return new ProductCategoryResource($productCategory);
    }

    /**
     * @param UpdateProductCategoryRequest $request
     * @param $id
     *
     * @return ProductCategoryResource
     */
    public function update(UpdateProductCategoryRequest $request, $id)
    {
        $input = $request->all();
        $productCategory = $this->productCategoryRepository->updateProductCategory($input, $id);

        return new ProductCategoryResource($productCategory);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $productModels = [
            Product::class,
        ];
        $result = canDelete($productModels, 'product_category_id', $id);
        if ($result) {
            return $this->sendError('Product category can\'t be deleted.');
        }
        $this->productCategoryRepository->delete($id);

        return $this->sendSuccess('Product category deleted successfully');
    }

    public function product_sub_categories(Request $request)
    {
        
        $productCategory = \App\Models\ProductCategory::get();
        /*echo "<pre>";
        print_r($productCategory); exit;*/
        $count =0;
        foreach ($productCategory as $value) {
            $subcat = \App\Models\ProductCategory::where('parent_id',$value->id)->get();

            $productCategory[$count] = $value;
            $productCategory[$count]['subcat'] =  $subcat;
        }
       
        if(!empty($productCategory))
        {
             return response(['status'=>'true','Message'=>'Product sub category retrieved successfully','data'=>$productCategory]);   
        }
        else
        {
            return response(['status'=>'false','Failed'=>"Failed" ,'Message'=>"Somthing went wrong"]);

        }
    }
}
