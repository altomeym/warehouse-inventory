<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ShippingTypesRepository;
use App\Entities\ShippingTypes;
use App\Validators\ShippingTypesValidator;

/**
 * Class ShippingTypesRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ShippingTypesRepositoryEloquent extends BaseRepository implements ShippingTypesRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ShippingTypes::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}
