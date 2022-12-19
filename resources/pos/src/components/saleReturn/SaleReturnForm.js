import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {InputGroup} from 'react-bootstrap-v5';
import moment from 'moment';
import {connect, useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import {fetchProductsByWarehouse} from '../../store/action/productAction';
import {fetchShippingTypes} from '../../store/action/shippingAction'
import ProductRowTable from '../../shared/components/sales/ProductRowTable';
import {decimalValidate, getFormattedMessage, placeholderText, onFocusInput, getFormattedOptions} from '../../shared/sharedMethod';
import ReactDatePicker from '../../shared/datepicker/ReactDatePicker';
import ProductMainCalculation from '../../components/sales/ProductMainCalculation';
import {calculateCartTotalAmount, calculateCartTotalTaxAmount} from '../../shared/calculation/calculation';
import {prepareSaleProductArray} from '../../shared/prepareArray/prepareSaleArray';
import ModelFooter from '../../shared/components/modelFooter';
import {editSaleReturn} from '../../store/action/salesReturnAction';
import {fetchFrontSetting} from '../../store/action/frontSettingAction';
import {addToast} from '../../store/action/toastAction';
import {toastType} from '../../constants';
import { saleReturnStatusOptions } from '../../constants';
import ReactSelect from '../../shared/select/reactSelect';

const SaleReturnForm = (props) => {
    const {
        addSaleData,
        editSaleReturn,
        id,
        singleSale,
        fetchProductsByWarehouse,
        fetchFrontSetting,
        frontSetting, allConfigData, isEdit,  allShipingTypes
    } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateProducts, setUpdateProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [newCost, setNewCost] = useState('');
    const [newDiscount, setNewDiscount] = useState('');
    const [newTax, setNewTax] = useState('');
    const [subTotal, setSubTotal] = useState('');
    const [newSaleUnit, setNewSaleUnit] = useState('');
    const [selectedStatus, setSelectedStatus] = useState({label: 'Received', value: 1});

    const [saleReturnValue, setSaleReturnValue] = useState({
        date: new Date(),
        customer_id: '',
        warehouse_id: '',
        tax_rate: "0.00",
        tax_amount: "0.00",
        discount: "0.00",
        shipping: "0.00",
        grand_total: 0.00,
        notes: '',
        received_amount: 0,
        payment_type: 1,
        paid_amount: 0,
        status: '',
        sale_reference: ""
    });
    const [errors, setErrors] = useState({
        date: '',
        customer_id: '',
        warehouse_id: '',
        status: '',
    });

    const [customDynamicFields, setCustomDynamicFields] = useState([{
        shipping_type_id:"", 
        shipping_value:"",
        shipping_type_name:"",
    }]);

    useEffect(() => {
        setUpdateProducts(updateProducts);
    }, [updateProducts, quantity, newCost, newDiscount, newTax, subTotal, newSaleUnit]);

    useEffect(() => {
        updateProducts.length >= 1 ? dispatch({type: 'DISABLE_OPTION', payload: true}) : dispatch({type: 'DISABLE_OPTION', payload: false})
    }, [updateProducts])

    useEffect(() => {
        if (singleSale) {
            setSaleReturnValue({
                date: singleSale ? moment(singleSale.date).toDate() : '',
                customer_id: singleSale ? singleSale.customer_id : '',
                warehouse_id: singleSale ? singleSale.warehouse_id : '',
                tax_rate: singleSale ? singleSale.tax_rate.toFixed(2) : '0.00',
                tax_amount: singleSale ? singleSale.tax_amount.toFixed(2) : '0.00',
                discount: singleSale ? singleSale.discount.toFixed(2) : '0.00',
                shipping: singleSale ? singleSale.shipping.toFixed(2) : '0.00',
                grand_total: Number(singleSale ? singleSale.grand_total : '0.00'),
                status: singleSale ? singleSale.status_id === 1 ?
                {label: getFormattedMessage("status.filter.received.label"), value: 1} :
                {label: getFormattedMessage("status.filter.pending.label"), value: 2} : '',
                notes: singleSale ? singleSale.note : '',
                sale_id: singleSale ? singleSale.sale_id : '',
                sale_reference: singleSale ? singleSale.sale_reference : '',
                shipping_data: singleSale?.shipping_data ? singleSale?.shipping_data : '',

            })
            setSelectedStatus(singleSale && singleSale.status_id)
        }
    }, [singleSale]);

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    useEffect(() => {
        if (singleSale) {
            setUpdateProducts(singleSale.sale_items)
        }
    }, []);

    useEffect(()=>{
        saleReturnValue.warehouse_id.value && fetchProductsByWarehouse(saleReturnValue?.warehouse_id?.value)
    },[saleReturnValue.warehouse_id.value])


      useEffect(()=>{
        if(singleSale)
          singleSale?.shipping_data ? setCustomDynamicFields(singleSale?.shipping_data) : '';
  },[])
    const handleValidation = () => {
        let error = {};
        let isValid = false;
        let isQtyZero = false
        const qtyCart = updateProducts.map((a) => {
            a.quantity > 0 ? isQtyZero = true : ""
        });

        if (!saleReturnValue.date) {
            error['date'] = getFormattedMessage('globally.date.validate.label');
        } else if (!saleReturnValue.warehouse_id) {
            error['warehouse_id'] = getFormattedMessage('product.input.warehouse.validate.label');
        } else if (!saleReturnValue.customer_id) {
            error['customer_id'] = getFormattedMessage('sale.select.customer.validate.label');
        } else if (!isQtyZero) {
            dispatch(addToast({
                text: getFormattedMessage('globally.product-quantity.validate.message'),
                type: toastType.ERROR
            }))
        } else if (updateProducts.length < 1) {
            dispatch(addToast({
                text: getFormattedMessage('purchase.product-list.validate.message'),
                type: toastType.ERROR
            }))
        } else if (!saleReturnValue.status) {
            error['status'] = getFormattedMessage("globally.status.validate.label")
        } else {
            isValid = true;
        }
        setErrors(error);
        return isValid;
    };

    const updatedQty = (qty) => {
        setQuantity(qty);
    };

    const updateCost = (cost) => {
        setNewCost(cost);
    };

    const updateDiscount = (discount) => {
        setNewDiscount(discount);
    };

    const updateTax = (tax) => {
        setNewTax(tax);
    };

    const updateSubTotal = (subTotal) => {
        setSubTotal(subTotal);
    };

    const updateSaleUnit = (saleUnit) => {
        setNewSaleUnit(saleUnit);
    };

    const handleCallback = (date) => {
        setSaleReturnValue(previousState => {
            return {...previousState, date: date}
        });
        setErrors('');
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        const {value} = e.target;
        // check if value includes a decimal point
        if (value.match(/\./g)) {
            const [, decimal] = value.split('.');
            // restrict value to only 2 decimal places
            if (decimal?.length > 2) {
                // do nothing
                return;
            }
        }
        setSaleReturnValue(inputs => ({...inputs, [e.target.name]: value && value}));
    };

    const onStatusChange = (obj) => {
        setSaleReturnValue(inputs => ({...inputs, status: obj}));
        setSelectedStatus(obj);
    };

    let  onShippingTypeChange = (i, e) => {
        let newFormValues = [...customDynamicFields];  
        newFormValues[i]['shipping_type_id'] = e;
        newFormValues[i]['shipping_type_name'] = e.label;
        setCustomDynamicFields(newFormValues);
    };

    let  addDynamicField = ()=>{
        setCustomDynamicFields([...customDynamicFields, { shipping_type_id: "", shipping_value: "" }])

    }

    let handleChange = (i, e) => {
        let newFormValues = [...customDynamicFields];
        newFormValues[i][e.target.name] = e.target.value;
        setCustomDynamicFields(newFormValues);
        calShippingTotal();
      }

       let removeFormFields = (i) => {
        let newFormValues = [...customDynamicFields];
        newFormValues.splice(i, 1);
        setCustomDynamicFields(newFormValues)
       calShippingTotal(customDynamicFields[i]['shipping_value'])
       
    }

    let calShippingTotal = (singleVal=0)=>{
        let totalShipTax = 0;
        if(singleVal)
          totalShipTax =  parseFloat(saleReturnValue.shipping) -   parseFloat(singleVal);
        else
        customDynamicFields.map((element)=>{
            if(element.shipping_value && element.shipping_value != '' && element.shipping_value != NaN && element.shipping_value !=null ){
               totalShipTax = parseFloat(totalShipTax) + parseFloat(element.shipping_value)
            }
       });

       setSaleReturnValue(inputs => ({...inputs, ['shipping']: totalShipTax && totalShipTax}))
    }

    const shippingTypeValues = [];
    const shippingTypeDefaultValue = allShipingTypes && allShipingTypes?.length > 0 ? allShipingTypes.map((option) => {
        shippingTypeValues.push({
            id: option.id,
            name: option.attributes.name
        })
    }) : []

    const prepareFormData = (prepareData) => {
        const formValue = {
            date: moment(prepareData.date).toDate(),
            customer_id: prepareData.customer_id.value ? prepareData.customer_id.value : prepareData.customer_id,
            warehouse_id: prepareData.warehouse_id.value ? prepareData.warehouse_id.value : prepareData.warehouse_id,
            discount: prepareData.discount,
            tax_rate: prepareData.tax_rate,
            tax_amount: calculateCartTotalTaxAmount(updateProducts, saleReturnValue),
            sale_return_items: updateProducts,
            shipping: prepareData.shipping,
            grand_total: Number(calculateCartTotalAmount(updateProducts, saleReturnValue)),
            received_amount: 0,
            payment_type: 0,
            paid_amount: 0,
            status: prepareData.status.value,
            note: prepareData.notes,
            sale_id: prepareData.sale_id,
            sale_reference:  prepareData.sale_reference,
            shipping_data:customDynamicFields ? customDynamicFields : [],

        }
        return formValue
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            if (singleSale.isCreateSaleReturn) {
                addSaleData(prepareFormData(saleReturnValue), navigate);
            } else {
                editSaleReturn(id, prepareFormData(saleReturnValue), navigate);
                setSaleReturnValue(saleReturnValue);
            }
        }
    };

    const onNotesChangeInput = (e) => {
        e.preventDefault();
        setSaleReturnValue(inputs => ({...inputs, notes: e.target.value}));
    };

    const onBlurInput = (el) => {
        if (el.target.value === '') {
            if (el.target.name === "shipping") {
                // setSaleReturnValue({...saleReturnValue, shipping: "0.00"});
            }
            if (el.target.name === "discount") {
                setSaleReturnValue({...saleReturnValue, discount: "0.00"});
            }
            if (el.target.name === "tax_rate") {
                setSaleReturnValue({...saleReturnValue, tax_rate: "0.00"});
            }
        }
    };

    const saleReturnStatusFilterOptions = getFormattedOptions(saleReturnStatusOptions)
    const saleReturnStatusDefaultValue = saleReturnStatusFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })

    return (
        <div className='card'>
            <div className='card-body'>
                {/*<Form>*/}
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className='form-label'>
                                {getFormattedMessage('react-data-table.date.column.label')}:
                            </label>
                            <span className='required'/>
                            <div className='position-relative'>
                                <ReactDatePicker onChangeDate={handleCallback} newStartDate={saleReturnValue.date}/>
                            </div>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['date'] ? errors['date'] : null}</span>
                        </div>
                        <div className='col-md-4 mb-5'>
                                <label
                                    className='form-label'>
                                    {/*{getFormattedMessage('expense.input.title.label')}:*/}
                                    Sale Reference
                                </label>
                                <span className='required'/>
                                <input type='type' name='title' className='form-control'
                                       // onChange={(e) => onChangeInput(e)}
                                    readOnly={true}
                                       value={saleReturnValue.sale_reference}
                                />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors['title'] ? errors['title'] : null}</span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('purchase.select.status.label')}: </label>
                            <span className='required'/>
                            <ReactSelect
                            multiLanguageOption={saleReturnStatusFilterOptions}
                            name='status'
                            value={saleReturnValue.status} isRequired
                            placeholder={placeholderText('purchase.select.status.placeholder.label')}
                            defaultValue={saleReturnStatusDefaultValue[0]}
                            onChange={onStatusChange}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['status'] ? errors['status'] : null}</span>
                        </div>
                        <div className='mb-5'>
                            <label className='form-label'>
                                {/*{getFormattedMessage('product.title')}:*/}
                                {getFormattedMessage('product-list.lable')}
                            </label>
                            {/* <span className='required'/> */}
                            {/*<ProductSearch values={saleReturnValue} products={products}*/}
                            {/*               handleValidation={handleValidation}*/}
                            {/*               updateProducts={updateProducts}*/}
                            {/*               setUpdateProducts={setUpdateProducts} customProducts={customProducts}/>*/}
                        </div>
                        <div>
                            <label className='form-label'>
                                {getFormattedMessage('purchase.order-item.table.label')}:
                            </label>
                            <span className='required'/>
                            <ProductRowTable updateProducts={updateProducts} setUpdateProducts={setUpdateProducts}
                                             updatedQty={updatedQty} frontSetting={frontSetting} isSaleReturn={true}
                                             updateCost={updateCost} updateDiscount={updateDiscount}
                                             updateTax={updateTax} updateSubTotal={updateSubTotal}
                                             updateSaleUnit={updateSaleUnit}
                            />
                        </div>
                        <div className='col-12'>
                            <ProductMainCalculation inputValues={saleReturnValue} shippingInputValues={customDynamicFields} updateProducts={updateProducts}
                                                    frontSetting={frontSetting} allConfigData={allConfigData}/>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('purchase.input.order-tax.label')}: </label>
                            <InputGroup>
                                <input aria-label='Dollar amount (with dot and two decimal places)'
                                       className='form-control' type='text' name='tax_rate'
                                       value={saleReturnValue.tax_rate}
                                       onBlur={(event) => onBlurInput(event)} onFocus={(event) => onFocusInput(event)}
                                       onKeyPress={(event) => {
                                           decimalValidate(event)
                                       }}
                                       onChange={(e) => {
                                           onChangeInput(e)
                                       }}
                                />
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('purchase.order-item.table.discount.column.label')}: </label>
                            <InputGroup>
                                <input aria-label='Dollar amount (with dot and two decimal places)'
                                       className='form-control' type='text' name='discount'
                                       value={saleReturnValue.discount}
                                       onBlur={(event) => onBlurInput(event)} onFocus={(event) => onFocusInput(event)}
                                       onKeyPress={(event) => decimalValidate(event)}
                                       onChange={(e) => onChangeInput(e)}
                                />
                                <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                            </InputGroup>
                        </div>
                        {/* <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('purchase.input.shipping.label')}: </label>
                            <InputGroup>
                                <input aria-label='Dollar amount (with dot and two decimal places)'
                                       className='form-control' type='text' name='shipping'
                                       value={saleReturnValue.shipping}
                                       onBlur={(event) => onBlurInput(event)} onFocus={(event) => onFocusInput(event)}
                                       onKeyPress={(event) => decimalValidate(event)}
                                       onChange={(e) => onChangeInput(e)}
                                />
                                <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                            </InputGroup>
                        </div> */}
                        {/* .......... */}
                        {customDynamicFields.map((element, index) => (
                        <React.Fragment key={index}>
                        <div className='col-md-5'>
                             <ReactSelect multiLanguageOption={shippingTypeValues} onChange={e => onShippingTypeChange(index, e)} name='shipping_type_id'
                          title={'Shipping Type'}
                          value={element.shipping_type_id || ""}  errors={errors['status_id']}
                        //  defaultValue={shippingTypeValues}
                         placeholder={'shipping type '}/>
                        </div>
                        {/* ... */}
                        <div className='col-md-5 mb-5'>
                            <div className='align_o'>
                                <label
                                    className='form-label'>
                                Shipping value
                                </label>
                                <InputGroup>
                                    <input aria-label='Dollar amount (with dot and two decimal places)'
                                                className='form-control'  value={element.shipping_value || ""}
                                                type='text' name='shipping_value'
                                                onBlur={(event) => onBlurInput(index, event)}
                                                onFocus={(event) => onFocusInput(event)}
                                                onKeyPress={(event) => decimalValidate(event)}
                                                onChange={e => handleChange(index, e)}
                                    />
                                    <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                                </InputGroup>
                                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['shipping'] ? errors['shipping'] : null}</span>
                                {
                                index ? 
                    <button type="button"  className="btn btn-danger remove" onClick={() => removeFormFields(index)}><FontAwesomeIcon icon={faTrash}/></button> 
                                : null
                            }
                            </div>
                        </div>
                        </React.Fragment>
                        )) }
                          <div  className='col-md-2 '>
                             <button className='btn btn-primary me-2 float-lg-right float_plus' onClick={addDynamicField} type='submit' > + </button> 
                           </div>
                        {/* ................... */}
                        <div className='mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('globally.input.notes.label')}: </label>
                            <textarea name='notes' className='form-control'
                                      onChange={(e) => onNotesChangeInput(e)}
                                      value={saleReturnValue.notes}
                                      placeholder={placeholderText('globally.input.notes.placeholder.label')}
                            />
                        </div>
                        <ModelFooter onEditRecord={singleSale} onSubmit={onSubmit}
                                     link={singleSale?.isCreateSaleReturn === true || isEdit === true ? '/app/sales' : '/app/sale-return'}/>
                    </div>
                {/*</Form>*/}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {purchaseProducts, products, frontSetting,  allConfigData } = state;
    return {customProducts: prepareSaleProductArray(products), purchaseProducts, products, frontSetting,  allConfigData }
}

export default connect(mapStateToProps, {editSaleReturn, fetchProductsByWarehouse, fetchFrontSetting})(SaleReturnForm)
