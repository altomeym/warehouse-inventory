<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('permissions')->delete();            
        $permissions = array(
        array('name' =>'manage_adjustments-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Adjustments','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_adjustments-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Adjustments','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_adjustments-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Adjustments','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_adjustments-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Adjustments','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_transfers-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Transfers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_transfers-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Transfers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_transfers-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Transfers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_transfers-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Transfers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_roles-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Roles','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_roles-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Roles','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_roles-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Roles','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_roles-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Roles','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_brands-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Brands','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_brands-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Brands','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_brands-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Brands','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_brands-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Brands','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_currency-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Currency','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_currency-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Currency','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_currency-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Currency','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_currency-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Currency','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        
        array('name' =>'manage_warehouses-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Warehouses','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_warehouses-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Warehouses','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_warehouses-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Warehouses','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_warehouses-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Warehouses','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_units-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Units','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_units-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Units','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_units-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Units','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_units-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Units','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_product_categories-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Product Categories','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_product_categories-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Product Categories','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_product_categories-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Product Categories','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_product_categories-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Product Categories','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_products-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Products','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_products-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Products','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_products-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Products','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_products-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Products','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        
        array('name' =>'manage_suppliers-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Suppliers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_suppliers-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Suppliers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_suppliers-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Suppliers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_suppliers-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Suppliers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_customers-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Customers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_customers-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Customers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_customers-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Customers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_customers-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Customers','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_users-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Users','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_users-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Users','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_users-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Users','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_users-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Users','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_expense_categories-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Expense Categories','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expense_categories-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Expense Categories','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expense_categories-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Expense Categories','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expense_categories-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Expense Categories','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_expenses-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Expenses','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expenses-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Expenses','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expenses-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Expenses','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expenses-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Expenses','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_setting-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Setting','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_setting-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Setting','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_setting-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Setting','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_setting-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Setting','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        
        array('name' =>'manage_dashboard-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Dashboard','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_dashboard-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Dashboard','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_dashboard-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Dashboard','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_dashboard-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Dashboard','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_pos_screen-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Pos Screen','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_pos_screen-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Pos Screen','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_pos_screen-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Pos Screen','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_pos_screen-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Pos Screen','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_purchase-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Purchase','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Purchase','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Purchase','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Purchase','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_sale-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Sale','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Sale','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Sale','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Sale','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_purchase_return-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Purchase Return','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase_return-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Purchase Return','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase_return-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Purchase Return','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase_return-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Purchase Return','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),


        array('name' =>'manage_sale_return-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Sale Return','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale_return-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Sale Return','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale_return-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Sale Return','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale_return-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Sale Return','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_email_templates-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Email Templates','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_email_templates-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Email Templates','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_email_templates-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Email Templates','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_email_templates-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Email Templates','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_reports-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Reports','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_reports-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Reports','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_reports-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Reports','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_reports-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Reports','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_quotations-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Quotations','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_quotations-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Quotations','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_quotations-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Quotations','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_quotations-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Quotations','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_sms_templates-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Sms Templates','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_templates-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Sms Templates','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_templates-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Sms Templates','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_templates-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Sms Templates','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

         array('name' =>'manage_sms_apis-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Manage Sms Apis','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_apis-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Manage Sms Apis','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_apis-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Manage Sms Apis','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_apis-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Manage Sms Apis','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        );

        Permission::insert($permissions);
    }
}
