<?php

namespace App\Models;

use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
class Shipping_has_values extends BaseModel
{
    use HasFactory, HasJsonResourcefulData;

    protected $table = 'shipping_has_values';

    const JSON_API_TYPE = 'shipping_has_values';

    protected $fillable = [
        'shipping_type_id',
        'code',
        'slug',
        'tax_rate',
        'tax_amount',
        'discount',
        'total',
    ];

    public static $rules = [
        'shipping_type_id'   => 'required',
        'code'   => 'required',
        'slug' => 'required',
        'tax_rate' => 'required',
        'tax_amount' => 'required',
        'discount' => 'required',
        'total' => 'required',
    ];

    /**
     * @return array
     */
    function prepareLinks(): array
    {
        return [
            "self" => route('currencies.show', $this->id),
        ];
    }

    /**
     * @return array
     */
    function prepareAttributes(): array
    {
        $fields = [
            'name'   => $this->name,
            'code'   => $this->code,
            'symbol' => $this->symbol,
        ];

        return $fields;
    }
}
