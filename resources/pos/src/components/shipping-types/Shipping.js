import React,  {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import {fetchShippingTypes} from '../../store/action/shippingAction';
import ReactDataTable from '../../shared/table/ReactDataTable';
import DeletShipping from './DeleteShipping';
import CreateShipping from './CreateShipping';
import EditShipping from './EditShipping';
import TabTitle from '../../shared/tab-title/TabTitle';
import {getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const Shipping = (props) => {
    const {fetchShippingTypes, shipingTypes, totalRecord, isLoading, config} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [shippingType, setShippingType] = useState();

    const handleClose = (item = null) => {
        setToggle(!toggle);
        setShippingType(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchShippingTypes(filter, true);
    };
   
    const itemsValue = shipingTypes?.length >= 0 && shipingTypes.map(item => ({
        name: item?.attributes?.name,
        id: item?.id
    }));
    let user_permissions = new Set(config);
    const is_addedAble = user_permissions.has('manage_sale-create') ? true : false
    const is_editAdable = user_permissions.has('manage_shipping-edit') ? true : false
    const is_deleteAdable = user_permissions.has('manage_shipping-delete') ? true: false
     
    const columns = [
        {
            name: getFormattedMessage('globally.input.name.label'),
            selector: row => row.name,
            sortable: true,
            sortField: 'name',
        },
        
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => {
                return <ActionButton item={row} goToEditProduct={handleClose} isEditMode={is_editAdable}
                                     onClickDeleteModel={onClickDeleteModel}  isDeleteMode={is_deleteAdable} />
            }
        }
    ];

    return (
        <MasterLayout >
            <TopProgressBar />
            <TabTitle title={placeholderText('shipping.title')}/>
            <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                            totalRows={totalRecord}  AddButton={is_addedAble ==true ? <CreateShipping />  : null} />
            <EditShipping handleClose={handleClose} show={toggle} shippingType={shippingType}/> {is_addedAble}
              <DeletShipping onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => { 
    const {shipingTypes, totalRecord, isLoading, config } = state;
    return {shipingTypes, totalRecord, isLoading, config }
};

export default connect(mapStateToProps, {fetchShippingTypes})(Shipping);

