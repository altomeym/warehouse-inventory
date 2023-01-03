<?php

namespace App\Models;

use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Currency
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $symbol
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Currency newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency query()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereSymbol($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProductSubCategory extends BaseModel
{
    use HasFactory, HasJsonResourcefulData;

    protected $table = 'product_sub_category';

    const JSON_API_TYPE = 'product_sub_category';

    protected $fillable = [
        'name','product_category_id','parent_id'
    ];

    public static $rules = [
        'product_category_id'   => 'required',
        'name'   => 'required|unique:product_sub_category',
    ];

    /**
     * @return array
     */
    function prepareLinks(): array
    {
        return [
            "self" => route('shipping_type.show', $this->id),
        ];
    }

    /**
     * @return array
     */
    function prepareAttributes(): array
    {
        $fields = [
            'name'   => $this->name,
            'product_category_id'   => $this->product_category_id,
            'parent_id'   => $this->parent_id,
        ];

        return $fields;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id', 'id');
    }
}
