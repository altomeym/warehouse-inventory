<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateTranStatusTypesRequest;
use App\Http\Requests\UpdateTranStatusTypesRequest;
use App\Http\Resources\TranStatusTypesCollection;
use App\Http\Resources\TranStatusTypesResource;
use App\Repositories\TranStatusTypesRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

class TranStatusTypesAPIController extends AppBaseController
{
  /**
     * @var TranStatusTypesRepository
     */
    private $tranStatusTypesRepository;

    public function __construct(TranStatusTypesRepository $tranStatusTypesRepository)
    {
        $this->tranStatusTypesRepository = $tranStatusTypesRepository;
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
        $tranStatusType = $this->tranStatusTypesRepository->paginate($perPage);
       
        TranStatusTypesResource::usingWithCollection();

        return new TranStatusTypesCollection($tranStatusType);
    }

    public function tran_status_types_show(Request $request)
    {
        $tranStatusType = $this->tranStatusTypesRepository->get();
       
        TranStatusTypesResource::usingWithCollection();

        return new TranStatusTypesCollection($tranStatusType);
    }


    


    /**
     * @param CreateShippingTypeRequest $request
     *
     * @throws ValidatorException
     *
     * @return TranStatusTypesResource
     */
    public function store(CreateTranStatusTypesRequest $request)
    {
        $input = $request->all();
        $tranStatusType = $this->tranStatusTypesRepository->create($input);

        return new TranStatusTypesResource($tranStatusType);
    }
   
    /**
     * @param $id
     *
     * @return TranStatusTypesResource
     */
    public function show($id)
    {
        $tranStatusType = $this->tranStatusTypesRepository->find($id);

        return new TranStatusTypesResource($tranStatusType);
    }

    /**
     * @param UpdateCurrencyRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return TranStatusTypesResource
     */
    public function update(UpdateTranStatusTypesRequest $request, $id)
    {
        $input = $request->all();
        $tranStatusType = $this->tranStatusTypesRepository->update($input, $id);

        return new TranStatusTypesResource($tranStatusType);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        
        if ($id != 1 && $id != 2)
        {
            $this->tranStatusTypesRepository->delete($id);
            return $this->sendSuccess('Transfer Status Type deleted successfully');
        }else{
           
            return $this->sendSuccess('Transfer Status Type Not deleted');
        }
    }
}
