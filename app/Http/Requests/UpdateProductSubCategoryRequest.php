<?php

namespace App\Http\Requests;

use App\Models\ProductSubCategory;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductSubCategoryRequest extends FormRequest
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
        $rules = ProductSubCategory::$rules;
        $rules['name'] = 'required|unique:product_sub_category,name,'.$this->route('product_sub_category');

        return $rules;
    }
}
