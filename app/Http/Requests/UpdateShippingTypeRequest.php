<?php

namespace App\Http\Requests;

use App\Models\ShippingType;
use Illuminate\Foundation\Http\FormRequest;

class UpdateShippingTypeRequest extends FormRequest
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
        $rules = ShippingType::$rules;
        $rules['name'] = 'required|unique:shipping_type,name,'.$this->route('shipping_type');

        return $rules;
    }
}
