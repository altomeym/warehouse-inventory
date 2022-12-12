<?php

namespace App\Repositories;

use App\Models\ShippingType;

/**
 * Class ShippingTypeRepository
 */
class ShippingTypeRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
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
        return ShippingType::class;
    }


}
