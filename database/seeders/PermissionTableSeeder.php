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
        array('name' =>'manage_adjustments', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Adjustments View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_adjustments-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Adjustments Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_adjustments-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Adjustments Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_adjustments-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Adjustments Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_transfers', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Transfers View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_transfers-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Transfers Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_transfers-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Transfers Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_transfers-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Transfers Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_roles', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Roles View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_roles-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Roles Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_roles-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Roles Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_roles-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Roles Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_brands', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Brands View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_brands-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Brands Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_brands-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Brands Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_brands-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Brands Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_currency', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Currency View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_currency-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Currency Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_currency-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Currency Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_currency-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Currency Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        
        array('name' =>'manage_warehouses', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Warehouses View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_warehouses-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Warehouses Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_warehouses-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Warehouses Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_warehouses-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Warehouses Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_units', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Units View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_units-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Units Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_units-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Units Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_units-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Units Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_product_categories', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Product Categories View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_product_categories-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Product Categories Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_product_categories-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Product Categories Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_product_categories-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Product Categories Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_products', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Products View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_products-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Products Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_products-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Products Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_products-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Products Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        
        array('name' =>'manage_suppliers', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Suppliers View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_suppliers-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Suppliers Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_suppliers-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Suppliers Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_suppliers-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Suppliers Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_customers', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Customers View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_customers-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Customers Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_customers-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Customers Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_customers-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Customers Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_users', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Users View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_users-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Users Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_users-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Users Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_users-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Users Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_expense_categories', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Expense Categories View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expense_categories-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Expense Categories Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expense_categories-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Expense Categories Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expense_categories-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Expense Categories Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_expenses', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Expenses View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expenses-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Expenses Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expenses-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Expenses Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_expenses-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Expenses Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_setting', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Setting View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_setting-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Setting Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_setting-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Setting Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_setting-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Setting Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        
        array('name' =>'manage_dashboard', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Dashboard View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_dashboard-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Dashboard Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_dashboard-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Dashboard Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_dashboard-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Dashboard Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_pos_screen', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Pos Screen View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_pos_screen-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Pos Screen Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_pos_screen-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Pos Screen Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_pos_screen-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Pos Screen Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_purchase', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Purchase View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Purchase Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Purchase Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Purchase Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_sale', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Sale View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Sale Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Sale Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Sale Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_purchase_return', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Purchase Return View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase_return-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Purchase Return Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase_return-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Purchase Return Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_purchase_return-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Purchase Return Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),


        array('name' =>'manage_sale_return', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Sale Return View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale_return-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Sale Return Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale_return-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Sale Return Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sale_return-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Sale Return Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_email_templates', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Email Templates View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_email_templates-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Email Templates Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_email_templates-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Email Templates Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_email_templates-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Email Templates Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_reports', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Reports View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_reports-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Reports Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
       array('name' =>'manage_reports-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Reports Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_reports-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Reports Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_quotations', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Quotations View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_quotations-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Quotations Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_quotations-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Quotations Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_quotations-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Quotations Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

        array('name' =>'manage_sms_templates', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Sms Templates View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_templates-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Sms Templates Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_templates-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Sms Templates Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_templates-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Sms Templates Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

         array('name' =>'manage_sms_apis', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Sms Apis View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_apis-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Sms Apis Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_apis-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Sms Apis Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        array('name' =>'manage_sms_apis-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Sms Apis Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),

         array('name' =>'manage_shipping_type-index', 's_name' =>'R', 'guard_name' =>'web', 'display_name' => 'Shipping Type View','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_shipping_type-create', 's_name' =>'C', 'guard_name' =>'web', 'display_name' =>'Shipping Type Create','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_shipping_type-edit', 's_name' =>'W', 'guard_name' =>'web', 'display_name' => 'Shipping Type Edit','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
            array('name' =>'manage_shipping_type-delete', 's_name' =>'D', 'guard_name' =>'web', 'display_name' =>'Shipping Type Delete','created_at' => '2022-11-22 05:14:09','updated_at' =>'2022-11-22 05:14:09'),
        );

        Permission::insert($permissions);
    }
}