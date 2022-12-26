<?php

namespace App\Models;

use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * App\Models\Supplier
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $country
 * @property string $city
 * @property string $address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereUpdatedAt($value)
 */
class Supplier extends BaseModel
{
    use HasFactory, HasJsonResourcefulData;

    protected $table = 'suppliers';

    const JSON_API_TYPE = 'suppliers';

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
        'email'   => 'required|email|unique:suppliers',
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
            "self" => route('suppliers.show', $this->id),
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
            'state'    => $this->country,
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
     *
     *
     * @return HasMany
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class, 'supplier_id', 'id');
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
