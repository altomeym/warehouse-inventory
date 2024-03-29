<?php

namespace App\Repositories;

use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Warehouse;

/**
 * Class WarehouseRepository
 */
class WarehouseRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'phone',
        'country',
        'state',
        'city',
        'email',
        'address',
        'zip_code',
        'latitude',
        'longitude',
        'created_at',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Warehouse::class;
    }

    public function warehouseCanDelete($id): bool
    {
        $saleModel = [
            Sale::class,
        ];
        $purchaseModel = [
            Purchase::class,
        ];
        $saleWarehouseResult = canDelete($saleModel, 'warehouse_id', $id);
        $purchaseWarehouseResult = canDelete($purchaseModel, 'warehouse_id', $id);

        return $saleWarehouseResult || $purchaseWarehouseResult;
    }
}
