<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;

class CreateShippingTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipping_type', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });
        $permissions = array(
            array('name' =>'manage_shipping_type-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Shipping Type View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_shipping_type-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Shipping Type Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_shipping_type-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Shipping Type Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_shipping_type-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Shipping Type Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        );
        Permission::insert($permissions);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipping_type');
    }

}

