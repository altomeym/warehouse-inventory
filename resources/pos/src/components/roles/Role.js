import React, {useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import ReactDataTable from '../../shared/table/ReactDataTable';
import ModalAction from '../../shared/action-buttons/ActionButton';
import {fetchRoles} from '../../store/action/roleAction';
import DeleteRole from './DeleteRole';
import TabTitle from '../../shared/tab-title/TabTitle';
import {getFormattedDate, getFormattedMessage, placeholderText} from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";


const Role = (props) => {
    const {roles, fetchRoles, totalRecord, isLoading, allConfigData, config} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [isAddedAble, setIsAddedAble] = useState(true);
    const [isEditAble, setIsEditAble] = useState(true);
    const [isDeleteAble, setIsDeleteAble] = useState(true);
    

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const itemsValue = roles.length >= 0 && roles.map(role => ({
        date: getFormattedDate(role.attributes.created_at, allConfigData && allConfigData),
        name: role.attributes.name,
        id: role.id
    }));

    const onChange = (filter) => {
        fetchRoles(filter, true);
    };

    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = '#/app/roles/edit/' + id;
    };

       let user_permissions = new Set(config);
       const is_addedAble = user_permissions.has('manage_roles-create') ? true : false;
       const is_editAdable = user_permissions.has('manage_roles-edit') ? true : false;
       const is_deleteAdable = user_permissions.has('manage_roles-delete') ? true : false;

    const columns = [
        {
            name: getFormattedMessage("globally.input.name.label"),
            selector: row => row.name,
            sortable: true,
            sortField: 'name',
        },
        {
            name: getFormattedMessage("react-data-table.date.column.label"),
            selector: row => row.date,
            sortField: 'date',
            sortable: false,
        },
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ModalAction item={row} goToEditProduct={goToEdit} isDeleteMode={is_deleteAdable} isEditMode={is_editAdable}
                                      onClickDeleteModel={onClickDeleteModel}/>
        }
    ];
    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("roles.title")}/>
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange}
                                ButtonValue={is_addedAble ? getFormattedMessage("role.create.title") : null}
                                to='#/app/roles/create' totalRows={totalRecord} isLoading={isLoading}/>
                <DeleteRole onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
        </MasterLayout>
    )
}

const mapStateToProps = (state) => {
    const {roles, totalRecord, isLoading, allConfigData, config} = state;
    return {roles, totalRecord, isLoading, allConfigData, config}
};
export default connect(mapStateToProps, {fetchRoles})(Role);
