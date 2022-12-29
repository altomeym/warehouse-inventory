<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;

class CreateProductSubCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_sub_category', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->unsignedBigInteger('product_category_id');
            $table->foreign('product_category_id')->references('id')
                ->on('product_categories')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->timestamps();
        });
        $permissions = array(
            array('name' =>'manage_product_sub_category', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Product Category View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_product_sub_category-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Product Category Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_product_sub_category-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Product Category Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_product_sub_category-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Product Category Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
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
        Schema::dropIfExists('product_sub_category');
    }

}

