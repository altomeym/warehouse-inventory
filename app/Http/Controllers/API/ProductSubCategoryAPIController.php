<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateProductSubCategoryRequest;
use App\Http\Requests\UpdateProductSubCategoryRequest;
use App\Http\Resources\ProductSubCategoryCollection;
use App\Http\Resources\ProductSubCategoryResource;
use App\Repositories\ProductSubCategoryRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

class ProductSubCategoryAPIController extends AppBaseController
{
  /**
     * @var productSubCategoryRepository
     */
    private $productSubCategoryRepository;

    public function __construct(ProductSubCategoryRepository $productSubCategoryRepository)
    {
        $this->productSubCategoryRepository = $productSubCategoryRepository;
    }

    /**
     * @param Request $request
     *
     *
     * @return CurrencyCollection
     */
    public function index(Request $request)
    {
        $perPage = getPageSize($request);
        $productSubCategory = $this->productSubCategoryRepository->paginate($perPage);
               
        ProductSubCategoryResource::usingWithCollection();

        return new ProductSubCategoryCollection($productSubCategory);
    }


    /**
     * @param CreateShippingTypeRequest $request
     *
     * @throws ValidatorException
     *
     * @return ProductSubCategoryResource
     */
    public function store(CreateProductSubCategoryRequest $request)
    {
        $input = $request->all();
        $productSubCategory = $this->productSubCategoryRepository->create($input);

        return new ProductSubCategoryResource($productSubCategory);
    }
   
    /**
     * @param $id
     *
     * @return ProductSubCategoryResource
     */
    public function show($id)
    {
        $productSubCategory = $this->productSubCategoryRepository->find($id);

        return new ProductSubCategoryResource($productSubCategory);
    }

    /**
     * @param UpdateCurrencyRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return ProductSubCategoryResource
     */
    public function update(UpdateProductSubCategoryRequest $request, $id)
    {
        $input = $request->all();
        $productSubCategory = $this->productSubCategoryRepository->update($input, $id);

        return new ProductSubCategoryResource($productSubCategory);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $this->productSubCategoryRepository->delete($id);
        return $this->sendSuccess('Product Sub Category deleted successfully');
    }
}
