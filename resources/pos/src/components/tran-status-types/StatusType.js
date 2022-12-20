import React,  {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import {fetchStatusTypes} from '../../store/action/tranStatusTypesAction';
import ReactDataTable from '../../shared/table/ReactDataTable';
import DeletShipping from './DeleteStatusType';
import CreateShipping from './CreateStatusType';
import EditShipping from './EditStatusType';
import TabTitle from '../../shared/tab-title/TabTitle';
import {getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const StatusType = (props) => {
    const {fetchStatusTypes, allStatusTypes, totalRecord, isLoading, config} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [statusType, setStatusType] = useState();

    const handleClose = (item = null) => {
        setToggle(!toggle);
        setStatusType(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchStatusTypes(filter, true);
    };
   
    const itemsValue = allStatusTypes?.length >= 0 && allStatusTypes.map(item => ({
        name: item?.attributes?.name,
        id: item?.id
    }));
    let user_permissions = new Set(config);
    const is_addedAble = user_permissions.has('manage_status_types-create') ? true : false
    const is_editAdable = user_permissions.has('manage_status_types-edit') ? true : false
    const is_deleteAdable = user_permissions.has('manage_status_types-delete') ? true: false
     
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
            <TabTitle title={placeholderText('status-types.title')}/>
            <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                            totalRows={totalRecord}  AddButton={is_addedAble ==true ? <CreateShipping />  : null} />
            <EditShipping handleClose={handleClose} show={toggle} statusType={statusType}/> {is_addedAble}
              <DeletShipping onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => { 
    const {allStatusTypes, totalRecord, isLoading, config } = state;
    return {allStatusTypes, totalRecord, isLoading, config }
};

export default connect(mapStateToProps, {fetchStatusTypes})(StatusType);

