<?php

namespace App\Repositories;

use App\Models\TranStatusType;

/**
 * Class ShippingTypeRepository
 */
class TranStatusTypesRepository extends BaseRepository
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
        return TranStatusType::class;
    }


}
