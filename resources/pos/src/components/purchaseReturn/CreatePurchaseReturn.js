import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import {fetchAllSuppliers} from '../../store/action/supplierAction';
import {fetchShippingTypes} from '../../store/action/shippingAction';
import {fetchStatusTypes} from '../../store/action/tranStatusTypesAction';
import PurchaseReturnForm from './PurchaseReturnForm';
import {addPurchaseReturn} from '../../store/action/purchaseReturnAction';
import {getFormattedMessage} from '../../shared/sharedMethod';

const CreatePurchaseReturn = (props) => {
    const {addPurchaseReturn, warehouses, fetchAllWarehouses, fetchAllSuppliers, suppliers, shipingTypes, fetchShippingTypes, allStatusTypes, fetchStatusTypes} = props;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllWarehouses();
        fetchAllSuppliers();

    }, []);

    useEffect(() => {
        fetchShippingTypes();
        fetchStatusTypes();
    }, []);

    const addPurchaseReturnData = (formValue) => {
        addPurchaseReturn(formValue, navigate);
    };
 
    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage('purchase.return.create.title')} to='/app/purchase-return'/>
            <PurchaseReturnForm addPurchaseReturnData={addPurchaseReturnData} warehouses={warehouses} allShipingTypes={shipingTypes} allStatusTypes={allStatusTypes} 
                                suppliers={suppliers}/>
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const {warehouses, suppliers, totalRecord, shipingTypes, statusTypeValues} = state;
    return {warehouses, suppliers, totalRecord, shipingTypes, statusTypeValues}
};

export default connect(mapStateToProps, {
    addPurchaseReturn,
    fetchAllWarehouses,
    fetchAllSuppliers,
    fetchShippingTypes,
    fetchStatusTypes
})(CreatePurchaseReturn);
