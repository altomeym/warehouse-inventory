import React,  {useEffect, useState} from 'react';
import { useSearchParams } from "react-router-dom";
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import {fetchShippingTypes, fetchTaxTypes} from '../../store/action/shippingAction';
import ReactDataTable from '../../shared/table/ReactDataTable';
import DeletShipping from './DeleteShipping';
import CreateShipping from './CreateShipping';
import EditShipping from './EditShipping';
import TabTitle from '../../shared/tab-title/TabTitle';
import {getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const Shipping = (props) => {
    const {fetchShippingTypes, shipingTypes, fetchTaxTypes, allTaxTypes,  totalRecord, isLoading, config} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [shippingType, setShippingType] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
     
    const handleClose = (item = null) => {
        setToggle(!toggle);
        setShippingType(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchTaxTypes(filter, true,);
    };
   
    const itemsValue = allTaxTypes?.length >= 0 && allTaxTypes.map(item => ({
        name: item?.attributes?.name,
        id: item?.id,
        slug:  item?.attributes?.slug
    }));
    let user_permissions = new Set(config);
    const is_addedAble = user_permissions.has('manage_shipping_type-create') ? true : false
    const is_editAdable = user_permissions.has('manage_shipping_type-edit') ? true : false
    const is_deleteAdable = user_permissions.has('manage_shipping_type-delete') ? true: false
     
    const columns = [
        {
            name: getFormattedMessage('globally.input.name.label'),
            selector: row => row.name,
            sortable: true,
            sortField: 'name',
        },
        {
            name: getFormattedMessage('tax.type.label'),
            sortable: true,
            sortField: 'slug',
            cell: row => {
                return row?.slug == 'Shipping' ? 
                      <span className='badge bg-light-primary'>
                            <span>{row?.slug}</span>
                        </span>
                        :
                        <span className='badge bg-light-info'>
                            <span>{row?.slug}</span>
                        </span>

            }
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
            <EditShipping handleClose={handleClose} show={toggle} shippingType={shippingType}  /> {is_addedAble}
              <DeletShipping onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}  />
        </MasterLayout>
    )
};

const mapStateToProps = (state) => { 
    const {allTaxTypes, shipingTypes, totalRecord, isLoading, config } = state;
    return {allTaxTypes, shipingTypes, totalRecord, isLoading, config }
};

export default connect(mapStateToProps, {fetchShippingTypes, fetchTaxTypes})(Shipping);

