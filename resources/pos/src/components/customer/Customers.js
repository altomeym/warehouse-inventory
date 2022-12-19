import React, {useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import {fetchCustomers} from '../../store/action/customerAction';
import ReactDataTable from '../../shared/table/ReactDataTable';
import DeleteCustomer from './DeleteCustomer';
import TabTitle from '../../shared/tab-title/TabTitle';
import {getFormattedDate, getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const Customers = (props) => {
    const {fetchCustomers, customers, totalRecord, isLoading, allConfigData, config} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchCustomers(filter, true);
    };

    const goToEditProduct = (item) => {
        const id = item.id
        navigate(`/app/customers/edit/${id}`)
    };

    const itemsValue = customers.length >= 0 && customers.map(customer => ({
        date: getFormattedDate(customer.attributes.created_at, allConfigData && allConfigData),
        time: moment(customer.attributes.created_at).format('LT'),
        name: customer.attributes.name,
        email: customer.attributes.email,
        phone: customer.attributes.phone,
        country: customer.attributes.country,
        city: customer.attributes.city,
        id: customer.id
    }));

    let user_permissions = new Set(config);
    let is_addedAble = user_permissions.has('manage_customers-create') ? true : false;
    let is_editAdable = user_permissions.has('manage_customers-edit') ? true : false;
    let is_deleteAdable = user_permissions.has('manage_customers-delete') ? true : false;

    const columns = [
        {
            name: getFormattedMessage('customer.title'),
            selector: row => row.name,
            sortField: 'name',
            sortable: true,
            cell: row => {
                return <div>
                    <div className='text-primary'>{row.name}</div>
                    <div>{row.email}</div>
                </div>
            }
        },
        {
            name: getFormattedMessage('globally.input.phone-number.label'),
            selector: row => row.phone,
            sortField: 'phone',
            sortable: true,
        },
        {
            name: getFormattedMessage('globally.react-table.column.created-date.label'),
            selector: row => row.date,
            sortField: 'created_at',
            sortable: true,
            cell: row => {
                return (
                    <span >
                        <div className='mb-1'>{row.time}</div>
                        {row.date}
                    </span>
                )
            }
        },
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ActionButton item={row} goToEditProduct={goToEditProduct} isEditMode={is_editAdable}
                                       onClickDeleteModel={onClickDeleteModel} isDeleteMode={is_deleteAdable} />
        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('customers.title')}/>
            <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                            ButtonValue={is_addedAble ? getFormattedMessage('customer.create.title') : null} totalRows={totalRecord}
                            to='#/app/customers/create'/>
            <DeleteCustomer onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {customers, totalRecord, isLoading, allConfigData, config} = state;
    return {customers, totalRecord, isLoading, allConfigData, config}
};

export default connect(mapStateToProps, {fetchCustomers})(Customers);

