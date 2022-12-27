<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title> Profit Loss report pdf</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon.ico') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <!-- General CSS Files -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
</head>
<body>
<table width="100%" cellspacing="0" cellpadding="10" style="margin-top: 40px;">
    <thead>
    <tr style="background-color: dodgerblue;">
        <th style="width: 200%">Sales</th>
        <th style="width: 300%">Purchases</th>
        <th style="width: 200%">Sale returns</th>
        <th style="width: 200%">Purchase Returns</th>
        <th style="width: 200%">Expenses</th>
        <th style="width: 300%">Sales payment amount</th>
        <th style="width: 300%">Revenue</th>
        <th style="width: 300%">Payments Received</th>
        <th style="width: 300%">Product cost</th>
        <th style="width: 300%">Gross profit</th>
    </tr>
    </thead>
    <tbody>
    <?php //echo $profit_loss['sales']; exit; ?>
        <tr align="center">
            <td>{{$profit_loss['sales']}}</td>
            <td>{{$profit_loss['purchases']}}</td>
            <td>{{$profit_loss['sale_returns']}}</td>
            <td>{{$profit_loss['purchase_returns']}}</td>
            <td>{{$profit_loss['expenses']}}</td>
            <td>{{$profit_loss['sales_payment_amount']}}</td>
            <td>{{$profit_loss['Revenue']}}</td>
            <td>{{$profit_loss['payments_received']}}</td>
            <td>{{$profit_loss['product_cost']}}</td>
            <td>{{$profit_loss['gross_profit']}}</td>
            
        </tr>
    
    </tbody>
</table>
</body>
</html>
