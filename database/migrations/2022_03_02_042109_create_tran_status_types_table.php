<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;

class CreateTranStatusTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tran_status_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });
        $permissions = array(
            array('name' =>'manage_status_types', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Status Type View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_status_types-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Status Type Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_status_types-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Status Type Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_status_types-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Status Type Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
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
        Schema::dropIfExists('tran_status_types');
    }

}

