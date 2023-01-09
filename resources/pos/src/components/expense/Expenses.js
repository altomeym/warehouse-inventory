import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import MasterLayout from '../MasterLayout';
import {useNavigate} from 'react-router-dom';
import ReactDataTable from '../../shared/table/ReactDataTable';
import {fetchExpenses} from '../../store/action/expenseAction';
import DeleteExpense from './DeleteExpense';
import TabTitle from '../../shared/tab-title/TabTitle';
import {currencySymbolHendling, getFormattedDate, getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import {fetchFrontSetting} from '../../store/action/frontSettingAction';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const Expenses = (props) => {
    const {fetchExpenses, expenses, totalRecord, isLoading, frontSetting, fetchFrontSetting, allConfigData, config} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchExpenses(filter, true);
    };

    const goToEditProduct = (item) => {
        const id = item.id;
        navigate(`/app/expenses/edit/${id}`);
    };

    const currencySymbol = frontSetting && frontSetting.value && frontSetting.value.currency_symbol

    const itemsValue = currencySymbol && expenses.length >= 0 && expenses.map(expense => ({
        date: getFormattedDate(expense.attributes.date, allConfigData && allConfigData),
        time: moment(expense.attributes.created_at).format('LT'),
        reference_code: expense.attributes.reference_code,
        title: expense.attributes.title,
        warehouse_name: expense.attributes.warehouse_name,
        expense_category_name: expense.attributes.expense_category_name,
        amount: expense.attributes.amount,
        details: expense.attributes.details,
        payment_status: expense.attributes?.payment_status,
        payment_type: expense.attributes?.payment_type,
        id: expense.id,
        currency: currencySymbol

    }));

    let user_permissions = new Set(config);
    let is_addedAble = user_permissions.has('manage_expenses-create') ? true : false;
    let is_editAdable = user_permissions.has('manage_expenses-edit') ? true : false;
    let is_deleteAdable = user_permissions.has('manage_expenses-delete') ? true : false;

    const columns = [
        {
            name: getFormattedMessage('dashboard.recentSales.reference.label'),
            sortField: 'reference_code',
            sortable: true,
            cell: row => {
                return <span className='badge bg-light-danger'>
                            <span>{row.reference_code}</span>
                        </span>
            }
        },
        {
            name: getFormattedMessage('expense.input.title.label'),
            selector: row => row.title,
            sortField: 'title',
            sortable: false,
        },
        {
            name: getFormattedMessage('warehouse.title'),
            selector: row => row.warehouse_name,
            sortField: 'warehouse_name',
            sortable: false,
        },
        {
            name: getFormattedMessage('expense-category.title'),
            selector: row => row.expense_category_name,
            sortField: 'expense_category_name',
            sortable: false,
        },
        {
            name: getFormattedMessage('expense.input.amount.label'),
            selector: row => currencySymbolHendling(allConfigData, row.currency, row.amount),
            sortField: 'amount',
            sortable: true,
        },
        {
            name: getFormattedMessage('dashboard.recentSales.paymentStatus.label'),
            sortField: 'payment_status',
            sortable: false,
            cell: row => {
                return (
                    row.payment_status === 1 &&
                    <span className='badge bg-light-success'>
                        <span>{getFormattedMessage("payment-status.filter.paid.label")}</span>
                    </span> ||
                    row.payment_status === 2 &&
                    <span className='badge bg-light-danger'>
                        <span>{getFormattedMessage("payment-status.filter.unpaid.label")}</span>
                    </span> ||
                    row.payment_status === 3 &&
                    <span className='badge bg-light-warning'>
                        {/*<span>{getFormattedMessage("payment-status.filter.unpaid.label")}</span>*/}
                        <span>{getFormattedMessage("payment-status.filter.partial.label")}</span>
                    </span>
                )
            }
        },
        {
            name: getFormattedMessage('select.payment-type.label'),
            sortField: 'payment_type',
            sortable: false,
            cell: row => {
                return (
                    row.payment_type === 1 &&
                    <span className='badge bg-light-primary'>
                        <span>{getFormattedMessage('cash.label')}</span>
                    </span> ||
                    row.payment_type === 2 &&
                    <span className='badge bg-light-primary'>
                        <span>{getFormattedMessage('payment-type.filter.cheque.label')}</span>
                    </span> ||
                    row.payment_type === 3 &&
                    <span className='badge bg-light-primary'>
                        <span>{getFormattedMessage('payment-type.filter.bank-transfer.label')}</span>
                    </span> ||
                    row.payment_type === 4 &&
                    <span className='badge bg-light-primary'>
                        <span>{getFormattedMessage('payment-type.filter.other.label')}</span>
                    </span>
                )
            }
        },
        {
            name: getFormattedMessage('globally.react-table.column.created-date.label'),
            selector: row => row.date,
            sortField: 'created_at',
            sortable: true,
            cell: row => {
                return (
                    <span className='badge bg-light-info'>
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
            <TopProgressBar/>
            <TabTitle title={placeholderText('expenses.title')}/>
            <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                            ButtonValue={is_addedAble ? getFormattedMessage('expense.create.title') : null} totalRows={totalRecord}
                            to='#/app/expenses/create'/>
            <DeleteExpense onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {expenses, totalRecord, isLoading, frontSetting, allConfigData, config} = state;
    return {expenses, totalRecord, isLoading, frontSetting, allConfigData, config}
};

export default connect(mapStateToProps, {fetchExpenses, fetchFrontSetting})(Expenses);

