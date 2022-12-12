<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ShippingTypeRepositoryRepository;
use App\Entities\ShippingTypeRepository;
use App\Validators\ShippingTypeRepositoryValidator;

/**
 * Class ShippingTypeRepositoryRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ShippingTypeRepositoryRepositoryEloquent extends BaseRepository implements ShippingTypeRepositoryRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ShippingTypeRepository::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}
