import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import {useNavigate} from 'react-router-dom';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import {fetchAllSuppliers} from '../../store/action/supplierAction';
import {addTransfer} from '../../store/action/transfersAction';
import {fetchShippingTypes} from '../../store/action/shippingAction'
import {getFormattedMessage} from "../../shared/sharedMethod";
import TransferForm from "./TransferForm";

const CreateTransfer = (props) => {
    const {addTransfer, warehouses, fetchAllWarehouses, fetchAllSuppliers, suppliers, shipingTypes, fetchShippingTypes} = props;
    const navigate = useNavigate();
    useEffect(() => {
        fetchAllWarehouses();
        fetchAllSuppliers();
    }, []);

    useEffect(() => {
        fetchShippingTypes();
    }, []);

    const addTtansferData = (formValue) => {
        addTransfer(formValue, navigate);
    };

    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage("transfer.create.title")} to='/app/transfers'/>
            <TransferForm addTtansferData={addTtansferData} warehouses={warehouses}  allShipingTypes={shipingTypes} />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {warehouses, suppliers, totalRecord, shipingTypes} = state;
    return {warehouses, suppliers, totalRecord, shipingTypes}
};

export default connect(mapStateToProps, {addTransfer, fetchAllWarehouses, fetchAllSuppliers, fetchShippingTypes})(CreateTransfer);
