<?php

namespace App\Models;

use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Warehouse
 *
 * @property int $id
 * @property string $name
 * @property string $phone
 * @property string $country
 * @property string $city
 * @property string|null $email
 * @property string|null $zip_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse query()
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Warehouse whereZipCode($value)
 * @mixin \Eloquent
 */
class Warehouse extends BaseModel
{
    use HasFactory, HasJsonResourcefulData;

    protected $table = 'warehouses';

    const JSON_API_TYPE = 'warehouses';

    protected $fillable = [
        'name',
        'phone',
        'country',
        'state',
        'city',
        'email',
        'zip_code',
    ];

    public static $rules = [
        'name'     => 'required|unique:warehouses',
        'phone'    => 'required|numeric',
        'country'  => 'required',
        'state'    => 'required',
        'city'     => 'required',
        'email'    => 'nullable|email|unique:warehouses',
        'zip_code' => 'nullable|numeric',
    ];

    /**
     * @return array
     */
    function prepareLinks(): array
    {
        return [
            "self" => route('warehouses.show', $this->id),
        ];
    }

    /**
     * @return array
     */
    function prepareAttributes(): array
    {
        $fields = [
            'name'       => $this->name,
            'phone'      => $this->phone,
            'country'    => $this->country,
            'state'      => $this->state,
            'city'       => $this->city,
            'email'      => $this->email,
            'zip_code'   => $this->zip_code,
            'created_at' => $this->created_at,
            'country_name' => $this->country_name,
            'state_name' => $this->state_name,
            'city_name' => $this->city_name,
            
        ];

        return $fields;
    }

    /**
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'warehouse_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class, 'warehouse_id', 'id');
    }

    /**
     *
     * @return HasMany
     */
    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class, 'warehouse_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class, 'warehouse_id', 'id');
    }

    public function country_name(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country', 'id');
    }

    public function state_name(): BelongsTo
    {
        return $this->belongsTo(State::class, 'state', 'id');
    }

    public function city_name(): BelongsTo
    {
        return $this->belongsTo(City::class, 'city', 'id');
    }

}
