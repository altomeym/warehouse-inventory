import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import {useNavigate} from 'react-router-dom';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import {fetchAllSuppliers} from '../../store/action/supplierAction';
import {fetchShippingTypes} from '../../store/action/shippingAction';
import PurchaseForm from './PurchaseForm';
import {addPurchase} from '../../store/action/purchaseAction';
import {fetchStatusTypes} from '../../store/action/tranStatusTypesAction';
import {getFormattedMessage} from "../../shared/sharedMethod";

const CreatePurchase = (props) => {
    const {addPurchase, warehouses, fetchAllWarehouses, fetchAllSuppliers, suppliers, shipingTypes, fetchShippingTypes, allStatusTypes, fetchStatusTypes} = props;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllWarehouses();
        fetchAllSuppliers();

    }, []);

    useEffect(() => {
        fetchStatusTypes();
        fetchShippingTypes();
    }, []);


    const addPurchaseData = (formValue) => {
        addPurchase(formValue, navigate);
    };

    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage("purchase.create.title")} to='/app/purchases'/>
            <PurchaseForm addPurchaseData={addPurchaseData} warehouses={warehouses} allShipingTypes={shipingTypes}
                          suppliers={suppliers} allStatusTypes={allStatusTypes} />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {warehouses, suppliers, totalRecord, shipingTypes, allStatusTypes} = state;
    return {warehouses, suppliers, totalRecord, shipingTypes, allStatusTypes}
};

export default connect(mapStateToProps, {addPurchase, fetchAllWarehouses, fetchAllSuppliers, fetchShippingTypes, fetchStatusTypes})(CreatePurchase);
