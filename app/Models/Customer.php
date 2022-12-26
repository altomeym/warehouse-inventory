<?php

namespace App\Models;

use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * App\Models\Customer
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $country
 * @property string $city
 * @property string $address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Customer extends BaseModel
{
    use HasFactory, HasJsonResourcefulData;

    protected $table = 'customers';

    const JSON_API_TYPE = 'customers';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'country',
        'state',
        'city',
        'address',
    ];

    public static $rules = [
        'name'    => 'required',
        'email'   => 'required|email|unique:customers',
        'phone'   => 'required|numeric',
        'country' => 'required',
        'state' => 'required',
        'city'    => 'required',
        'address' => 'required',
    ];

    /**
     * @return array
     */
    function prepareLinks(): array
    {
        return [
            "self" => route('customers.show', $this->id),
        ];
    }

    /**
     * @return array
     */
    function prepareAttributes(): array
    {
        $fields = [
            'name'       => $this->name,
            'email'      => $this->email,
            'phone'      => $this->phone,
            'country'    => $this->country,
            'state'    => $this->state,
            'city'       => $this->city,
            'address'    => $this->address,
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
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class, 'customer_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class, 'customer_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function salesReturns(): HasMany
    {
        return $this->hasMany(SaleReturn::class, 'customer_id', 'id');
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
