<?php

namespace App\Exports;

use App\Models\Sale;
use App\Models\Purchase;
use App\Models\SaleReturn;
use App\Models\PurchaseReturn;
use App\Models\Expense;
use App\Models\SalesPayment;

use Maatwebsite\Excel\Concerns\FromView;

class ProfitLossReportExport implements FromView
{
    public function view(): \Illuminate\Contracts\View\View
    {
        $startDate = request()->get('start_date');
        $endDate = request()->get('end_date');
      
        $data = [];
        $data['sales'] = Sale::whereBetween('date',
            [$startDate, $endDate])->sum('grand_total');
        $data['purchases'] = Purchase::whereBetween('date',
            [$startDate, $endDate])->sum('grand_total');
        $data['sale_returns'] = SaleReturn::whereBetween('date',
            [$startDate, $endDate])->sum('grand_total');
        $data['purchase_returns'] = PurchaseReturn::whereBetween('date',
            [$startDate, $endDate])->sum('grand_total');
        $data['expenses'] = Expense::whereBetween('date',
            [$startDate, $endDate])->sum('amount');
        $data['sales_payment_amount'] = SalesPayment::whereBetween('payment_date',
            [$startDate, $endDate])->sum('amount');
        $data['Revenue'] = $data['sales'] - $data['sale_returns'];
        $data['payments_received'] = $data['sales_payment_amount'] + $data['purchase_returns'];

        $productCost = 0;

        $sales = Sale::whereBetween('date',
            [$startDate, $endDate])->with('saleItems')->get();

        foreach ($sales as $sale) {
            foreach ($sale->saleItems as $saleItem) {
                $productCost = $productCost + ($saleItem->product->product_cost * $saleItem->quantity);
            }
        }

        $data['product_cost'] = $productCost;

        $data['gross_profit'] = $data['sales'] - $productCost;

        return view('excel.all-profit-loss-report-excel', ['profit_loss' => $data]);
    }

}
