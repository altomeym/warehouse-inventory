<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;

/**
 * Class ExpenseAPIController
 */
class CommonApiController extends AppBaseController
{
    /*Show All Country data*/
    public function country()
    {
        /** @var Country */
        $Country = \DB::table('countries')->get();
        if (empty($Country)) {
            return response(['status'=>'401','Message'=>'Country not found']);
        }
        if($Country != ''){
            return response(['status'=>'200','Message'=>'Country retrieved successfully','Country' => $Country]);
        }else{
            return response(['status'=>'401','Failed'=>"Failed"]);
        } 

    }

    /*Show All State data*/
    public function state($country_id)
    {
        /** @var State */
        $State = \DB::table('states')->where('country_id',$country_id)->get();
        if (empty($State)) {
            return response(['status'=>'401','Message'=>'State not found']);
        }
        if($State != ''){
            return response(['status'=>'200','Message'=>'State retrieved successfully','State' => $State]);
        }else{
            return response(['status'=>'401','Failed'=>"Failed"]);
        } 

    }

    /*Show All City data*/
    public function city($state_id)
    {
        /** @var City */
        $City = \DB::table('cities')->where('state_id',$state_id)->get();
        if (empty($City)) {
            return response(['status'=>'401','Message'=>'City not found']);
        }
        if($City != ''){
            return response(['status'=>'200','Message'=>'City retrieved successfully','City' => $City]);
        }else{
            return response(['status'=>'401','Failed'=>"Failed"]);
        } 

    }
}
