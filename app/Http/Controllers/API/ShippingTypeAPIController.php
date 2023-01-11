<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateShippingTypeRequest;
use App\Http\Requests\UpdateShippingTypeRequest;
use App\Http\Resources\ShippingTypeCollection;
use App\Http\Resources\ShippingTypeResource;
use App\Repositories\ShippingTypeRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

class ShippingTypeAPIController extends AppBaseController
{
  /**
     * @var ShippingTypeRepository
     */
    private $shippingTypeRepository;

    public function __construct(ShippingTypeRepository $shippingTypeRepository)
    {
        $this->shippingTypeRepository = $shippingTypeRepository;
    }

    /**
     * @param Request $request
     *
     *
     * @return CurrencyCollection
     */
    public function index(Request $request)
    {
        $slug = request()->get('slug'); 
        $perPage = getPageSize($request);
        if(empty($slug))
        {
            $shippingType = $this->shippingTypeRepository->paginate($perPage);

        }else{
            $slug_data = explode('?',$slug);
            $shippingType = $this->shippingTypeRepository->where('slug',$slug_data[0])->paginate($perPage);

        }
       
        ShippingTypeResource::usingWithCollection();

        return new ShippingTypeCollection($shippingType);
    }

     public function shipping_type_show(Request $request)
    {
        $slug = request()->get('slug'); 
        
        if(empty($slug))
        {
            $shippingType = $this->shippingTypeRepository->get();

        }else{
            $slug_data = explode('?',$slug);
            $shippingType = $this->shippingTypeRepository->where('slug',$slug_data[0])->get();

        }
       
        ShippingTypeResource::usingWithCollection();

        return new ShippingTypeCollection($shippingType);
    }
    


    /**
     * @param CreateShippingTypeRequest $request
     *
     * @throws ValidatorException
     *
     * @return ShippingTypeResource
     */
    public function store(CreateShippingTypeRequest $request)
    {
        $input = $request->all();
        $shippingType = $this->shippingTypeRepository->create($input);

        return new ShippingTypeResource($shippingType);
    }
   
    /**
     * @param $id
     *
     * @return ShippingTypeResource
     */
    public function show($id)
    {
        $shippingType = $this->shippingTypeRepository->find($id);

        return new ShippingTypeResource($shippingType);
    }

    /**
     * @param UpdateCurrencyRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return ShippingTypeResource
     */
    public function update(UpdateShippingTypeRequest $request, $id)
    {
        $input = $request->all();
        $shippingType = $this->shippingTypeRepository->update($input, $id);

        return new ShippingTypeResource($shippingType);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $this->shippingTypeRepository->delete($id);
        return $this->sendSuccess('Shipping Type deleted successfully');
    }
}
