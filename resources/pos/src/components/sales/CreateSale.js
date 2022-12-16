import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import SalesForm from './SalesForm';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import {addSale} from '../../store/action/salesAction';
import {fetchAllCustomer} from '../../store/action/customerAction';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import {fetchShippingTypes} from '../../store/action/shippingAction'
import {getFormattedMessage} from '../../shared/sharedMethod';

const CreateSale = (props) => {
    const {addSale, customers, fetchAllCustomer, warehouses, fetchAllWarehouses, shipingTypes, fetchShippingTypes} = props;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllCustomer();
        fetchAllWarehouses();
    }, []);

     useEffect(() => {
        fetchShippingTypes();
    }, []);

    const addSaleData = (formValue) => {
        addSale(formValue, navigate);
    };

    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage('sale.create.title')} to='/app/sales'/>
            <SalesForm addSaleData={addSaleData} customers={customers} allShipingTypes={shipingTypes} warehouses={warehouses}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {customers, warehouses, totalRecord, shipingTypes} = state;
    return {customers, warehouses, totalRecord, shipingTypes}
};

export default connect(mapStateToProps, {addSale, fetchAllCustomer, fetchAllWarehouses, fetchShippingTypes})(CreateSale);
