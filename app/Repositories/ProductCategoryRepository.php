<?php

namespace App\Repositories;

use App\Models\ProductCategory;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class ProductCategoryRepository
 */
class ProductCategoryRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'parent_id',
        'created_at',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'name',
        'parent_id',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model(): string
    {
        return ProductCategory::class;
    }

    /**
     * @param $input
     *
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function storeProductCategory($input)
    {
        try {
            DB::beginTransaction();
            if($input['category_type'] =='parent')
            {
                $input['parent_id'] = 0;
            }elseif($input['category_type'] == 'child'){

                $input['parent_id'] = $input['product_category_id'];
            }
                
            $productCategory = $this->create($input);
            if (isset($input['image']) && $input['image']) {
                $media = $productCategory->addMedia($input['image'])->toMediaCollection(productCategory::PATH,
                    config('app.media_disc'));
            }
            DB::commit();

            return $productCategory;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param $input
     * @param $id
     *
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function updateProductCategory($input, $id)
    {
        try {
            DB::beginTransaction();
            $productCategory = $this->withCount('products');
            if($input['category_type'] =='parent')
            {
                $input['parent_id'] = 0;
            }elseif($input['category_type'] == 'child'){

               $input['parent_id'] = $input['product_category_id'];
            }
            $productCategory = $productCategory->update($input, $id);
            if (isset($input['image']) && $input['image']) {
                $productCategory->clearMediaCollection(productCategory::PATH);
                $productCategory['image_url'] = $productCategory->addMedia($input['image'])->toMediaCollection(productCategory::PATH,
                    config('app.media_disc'));
            }
            DB::commit();

            return $productCategory;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}
