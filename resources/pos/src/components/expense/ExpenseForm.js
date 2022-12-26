import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import {InputGroup} from 'react-bootstrap-v5';
import {getFormattedMessage, numValidate, placeholderText, getFormattedOptions} from '../../shared/sharedMethod';
import {editExpense} from '../../store/action/expenseAction';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from '../../shared/select/reactSelect';
import ReactDatePicker from '../../shared/datepicker/ReactDatePicker';
import {paymentMethodOptions, salePaymentStatusOptions, saleStatusOptions, statusOptions, toastType} from '../../constants';


const ExpenseForm = (props) => {
    const {addExpenseData, id, editExpense, singleExpense, warehouses, expenseCategories, frontSetting} = props;
    const [isPaymentType,setIsPaymentType] = useState(false)

    const navigate = useNavigate();
    const [expenseValue, setExpenseValue] = useState({
        date: singleExpense ? moment(singleExpense[0].date).toDate() : new Date(),
        warehouse_id: singleExpense ? singleExpense[0].warehouse_id : '',
        expense_category_id: singleExpense ? singleExpense[0].expense_category_id : '',
        amount: singleExpense ? singleExpense[0].amount : '',
        details: singleExpense ? singleExpense[0].details : '',
        title: singleExpense ? singleExpense[0].title : '',
        payment_status: singleExpense?.payment_status ? singleExpense?.payment_status : '',
        payment_type: {label: getFormattedMessage("payment-type.filter.cash.label"), value: 1}
    });

    const [errors, setErrors] = useState({
        date: '', title: '', warehouse_id: '', expense_category_id: '', amount: '', details: ''
    });
    const [selectedWarehouse] = useState(singleExpense ? ([{
        label: singleExpense[0].warehouse_id.label, value: singleExpense[0].warehouse_id.value
    }]) : null);
    const [selectExpenseCategory] = useState(singleExpense ? ([{
        label: singleExpense[0].expense_category_id.label, value: singleExpense[0].expense_category_id.value
    }]) : null);

    const disabled = singleExpense && singleExpense[0].title === expenseValue.title && singleExpense[0].expense_category_id.value === expenseValue.expense_category_id.value && singleExpense[0].warehouse_id.value === expenseValue.warehouse_id.value && singleExpense[0].amount === expenseValue.amount && singleExpense[0].details === expenseValue.details && moment(singleExpense[0].date).toDate().toString() === expenseValue.date.toString()

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!expenseValue['warehouse_id']) {
            errorss['warehouse_id'] = getFormattedMessage('expense.input.warehouse.validate.label');
        } else if (!expenseValue['title']) {
            errorss['title'] = getFormattedMessage('expense.input.title.validate.label');
        } else if (!expenseValue['expense_category_id']) {
            errorss['expense_category_id'] = getFormattedMessage('expense.input.expense-category.validate.label');
        } else if (!expenseValue['amount']) {
            errorss['amount'] = getFormattedMessage('expense.input.amount.validate.label');
        } else if (!expenseValue?.payment_status) {
            error['payment_status'] = getFormattedMessage("globally.payment.status.validate.label")
        } else if (!expenseValue?.payment_type) {
            error['payment_type'] = getFormattedMessage("globally.payment.type.validate.label")
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onWarehouseChange = (obj) => {
        setExpenseValue(inputs => ({...inputs, warehouse_id: obj}))
        setErrors('');
    };

    const onExpenseChange = (obj) => {
        setExpenseValue(inputs => ({...inputs, expense_category_id: obj}))
        setErrors('');
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setExpenseValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
        setErrors('');
    };

    
    const onPaymentStatusChange = (obj) => {
        setExpenseValue(inputs => ({...inputs, payment_status: obj}));
        obj.value !== 2 ? setIsPaymentType(true) : setIsPaymentType(false)
        setExpenseValue(input => ({...input, payment_type: {label: getFormattedMessage("payment-type.filter.cash.label"), value: 1}}))
    };

    const onPaymentTypeChange = (obj) => {
        setExpenseValue(inputs => ({...inputs, payment_type: obj}));
    };

    const paymentStatusFilterOptions = getFormattedOptions(salePaymentStatusOptions)
    const paymentStatusDefaultValue = paymentStatusFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })

    const paymentMethodOption = getFormattedOptions(paymentMethodOptions)
    const paymentTypeDefaultValue = paymentMethodOption.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })

    const handleCallback = (date) => {
        setExpenseValue(previousState => {
            return {...previousState, date: date}
        });
    };

    const prepareData = (prepareData) => {
        const formValue = {
            date: moment(prepareData.date).toDate(),
            title: prepareData.title,
            warehouse_id: prepareData.warehouse_id.value,
            expense_category_id: prepareData.expense_category_id.value,
            amount: prepareData.amount,
            details: prepareData.details,
            payment_status: prepareData.payment_status.value ? prepareData.payment_status.value : prepareData.payment_status,
            payment_type: prepareData.payment_status.value === 2 ? 0 : prepareData.payment_type.value ? prepareData.payment_type.value : prepareData.payment_type,
        }
        return formValue
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleExpense && valid) {
            if (!disabled) {
                editExpense(id, prepareData(expenseValue), navigate);
            }
        } else {
            if (valid) {
                setExpenseValue(expenseValue);
                addExpenseData(prepareData(expenseValue));
            }
        }
    };

    return (
        <div className='card'>
            <div className='card-body'>
                <Form>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'>
                                {getFormattedMessage('react-data-table.date.column.label')}:
                            </label>
                            <span className='required'/>
                            <div className='position-relative'>
                                <ReactDatePicker onChangeDate={handleCallback} newStartDate={expenseValue.date}/>
                            </div>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['date'] ? errors['date'] : null}</span>
                        </div>

                        <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                                {getFormattedMessage('expense.input.title.label')}:
                            </label>
                            <span className='required'/>
                            <input type='type' name='title' className='form-control'
                                   placeholder={placeholderText('expense.input.title.placeholder.label')}
                                   onChange={(e) => onChangeInput(e)}
                                   value={expenseValue.title || ''}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['title'] ? errors['title'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <ReactSelect title={getFormattedMessage('warehouse.title')}
                                         placeholder={placeholderText('expense.input.warehouse.placeholder.label')}
                                         defaultValue={selectedWarehouse} errors={errors['warehouse_id']}
                                         data={warehouses} onChange={onWarehouseChange}/>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <ReactSelect title={getFormattedMessage('expense-category.title')}
                                         placeholder={placeholderText('expense.input.expense-category.placeholder.label')}
                                         defaultValue={selectExpenseCategory} errors={errors['expense_category_id']}
                                         data={expenseCategories} onChange={onExpenseChange}/>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                                {getFormattedMessage('expense.input.amount.label')}:
                            </label>
                            <span className='required'/>
                            <InputGroup>
                                <input type='text' name='amount' value={expenseValue.amount || ''}
                                       placeholder={placeholderText('expense.input.amount.placeholder.label')}
                                       pattern='[0-9]*' min={0} className='form-control'
                                       onKeyPress={(event) => numValidate(event)}
                                       onChange={(e) => onChangeInput(e)}/>
                                <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                            </InputGroup>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['amount'] ? errors['amount'] : null}</span>
                        </div>
                         {/* ................... */}
                         { !singleExpense && <div className='col-md-4'>
                    <ReactSelect multiLanguageOption={paymentStatusFilterOptions} onChange={onPaymentStatusChange} name='payment_status'
                         title={getFormattedMessage('dashboard.recentSales.paymentStatus.label')}
                         value={expenseValue.payment_status} errors={errors['payment_status']}
                         defaultValue={paymentStatusDefaultValue[0]}
                         placeholder={placeholderText('sale.select.payment-status.placeholder')}/>
                        </div>}
                        { !singleExpense && expenseValue.payment_status.value !== 2 && <div className='col-md-4'>
                            <ReactSelect title={getFormattedMessage('select.payment-type.label')}
                            name='payment_type'
                            value={expenseValue.payment_type} errors={errors['payment_type']}
                            placeholder={placeholderText('sale.select.payment-type.placeholder')}
                            defaultValue={paymentTypeDefaultValue[0]}
                            multiLanguageOption={paymentMethodOption}
                            onChange={onPaymentTypeChange}
                        />
                        </div>}
                        
                        {/* ... */}
                        <div className='col-md-12 mb-3'>
                            <label
                                className='form-label'>{getFormattedMessage('expense.input.details.label')}: </label>
                            <textarea name='details' className='form-control' rows='3'
                                      placeholder={placeholderText('expense.input.details.placeholder.label')}
                                      onChange={(e) => onChangeInput(e)}
                                      value={expenseValue.details || ''}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['detail'] ? errors['detail'] : null}</span>
                        </div>
                        <ModelFooter onEditRecord={singleExpense} onSubmit={onSubmit} editDisabled={disabled}
                                     link='/app/expenses'
                                     addDisabled={!expenseValue.warehouse_id || !expenseValue.expense_category_id || !expenseValue.amount}/>
                    </div>
                </Form>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const {frontSetting} = state;
    return {frontSetting};
};

export default connect(mapStateToProps, {editExpense})(ExpenseForm);
