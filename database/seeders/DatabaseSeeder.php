<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        /*$this->call(DefaultPermissionsSeeder::class);
        $this->call(DefaultRoleSeeder::class);
        $this->call(DefaultUserSeeder::class);
        $this->call(SettingTableSeeder::class);
        $this->call(AddDashboardAndSettingPermissionsSeeder::class);
        $this->call(AddPurchaseAndSalePermissionsSeeder::class);
        $this->call(AddPurchaseReturnAndSaleReturnPermissionsSeeder::class);*/
        //$this->call(PermissionTableSeeder::class);
        //$this->call(PermissionDataTableSeeder::class);
        $this->call(CitiesSeeder::class);
    }
}
