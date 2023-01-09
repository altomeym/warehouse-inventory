<?php

namespace App\Http\Requests;

use App\Models\TranStatusType;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTranStatusTypesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = TranStatusType::$rules;
        $rules['name'] = 'required|unique:tran_status_types,name,'.$this->route('tran_status_types');

        return $rules;
    }
}
