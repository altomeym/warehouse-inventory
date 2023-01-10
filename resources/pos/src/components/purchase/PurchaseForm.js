import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import {InputGroup, Table} from 'react-bootstrap-v5';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import {searchPurchaseProduct} from '../../store/action/purchaseProductAction';
import {editPurchase} from '../../store/action/purchaseAction';
import status from '../../shared/option-lists/status.json'
import {fetchAllProducts} from '../../store/action/productAction';
// import {fetchShippingTypes} from '../../store/action/shippingAction';
import MultipleImage from '../product/MultipleImage';
import PurchaseTable from '../../shared/components/purchase/PurchaseTable';
import TaxChargerTypes from './TaxChargerTypes';
import {preparePurchaseProductArray} from '../../shared/prepareArray/preparePurchaseArray';
import {decimalValidate, getFormattedMessage, placeholderText, onFocusInput, getFormattedOptions} from '../../shared/sharedMethod';
import {calculateCartTotalAmount, calculateCartTotalTaxAmount} from '../../shared/calculation/calculation';
import ModelFooter from '../../shared/components/modelFooter';
import ProductSearch from '../../shared/components/product-cart/search/ProductSearch';
import {addToast} from '../../store/action/toastAction';
import {saleStatusOptions, toastType} from '../../constants';
import ReactDatePicker from '../../shared/datepicker/ReactDatePicker';
import ProductMainCalculation from '../sales/ProductMainCalculation';
import ReactSelect from '../../shared/select/reactSelect';

const PurchaseForm = (props) => {
    const {
        addPurchaseData,
        id,
        editPurchase,
        customProducts,
        singlePurchase,
        warehouses,
        suppliers,
        fetchAllProducts,
        products, frontSetting ,allConfigData, allShipingTypes, allStatusTypes
    } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newCost, setNewCost] = useState('');
    const [newDiscount, setNewDiscount] = useState('');
    const [newTax, setNewTax] = useState('');
    const [newPurchaseUnit, setNewPurchaseUnit] = useState('');
    const [subTotal, setSubTotal] = useState('');
    const [updateProducts, setUpdateProducts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [removedImage, setRemovedImage] = useState([])
    const [multipleFiles, setMultipleFiles] = useState([]);

    const [purchaseValue, setPurchaseValue] = useState({
        date: singlePurchase ? moment(singlePurchase.date).toDate() : new Date(),
        warehouse_id: singlePurchase ? singlePurchase.warehouse_id : '',
        supplier_id: singlePurchase ? singlePurchase.supplier_id : '',
        tax_rate: singlePurchase ? singlePurchase.tax_rate.toFixed(2) : '0.00',
        tax_amount: singlePurchase ? singlePurchase.tax_amount.toFixed(2) : '0.00',
        discount: singlePurchase ? singlePurchase.discount.toFixed(2) : '0.00',
        shipping: singlePurchase ? singlePurchase.shipping.toFixed(2) : '0.00',
        grand_total: singlePurchase ? singlePurchase.grand_total : '0.00',
        notes: singlePurchase ? singlePurchase.notes : '',
        shipping_data: singlePurchase ? singlePurchase.shipping_data : '',
        status_id: singlePurchase ? singlePurchase.status_id : '',
        images: singlePurchase ? singlePurchase.images : '',
    });

    const [errors, setErrors] = useState({
        date: '',
        warehouse_id: '',
        supplier_id: '',
        details: '',
        tax_rate: '',
        discount: '',
        shipping: '',
        status_id: ''
    });

    const [customDynamicFields, setCustomDynamicFields] = useState([{shipping_type_id: "", shipping_value:"", shipping_type_name:"",}]);
    const [customTaxDynamicFields, setCustomTaxDynamicFields] = useState([{tax_type_id: "", tax_value:"", tax_type_name:"",}]);
    useEffect(() => {
        setUpdateProducts(updateProducts);
    }, [updateProducts, quantity, newCost, newDiscount, newTax, subTotal, newPurchaseUnit]);

    useEffect(() => {
        updateProducts.length >= 1 ? dispatch({type: 'DISABLE_OPTION', payload: true}) : dispatch({type: 'DISABLE_OPTION', payload: false})
    }, [updateProducts])

    useEffect(() => {
        if (singlePurchase) {
            setUpdateProducts(singlePurchase.purchase_items);
        }
    }, []);

    useEffect(()=>{
        purchaseValue.warehouse_id.value ? fetchAllProducts() : null
    },[purchaseValue.warehouse_id])

    

    useEffect(()=>{
        if(singlePurchase){
          setCustomDynamicFields(singlePurchase?.shipping_data);
          setCustomTaxDynamicFields(singlePurchase?.tax_data);
        }
  },[])

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        const qtyCart = updateProducts.filter((a) => a.quantity === 0);
        if (!purchaseValue.date) {
            error['date'] = getFormattedMessage('globally.date.validate.label');
        } else if (!purchaseValue.warehouse_id) {
            errorss['warehouse_id'] = getFormattedMessage('purchase.select.warehouse.validate.label')
        } else if (!purchaseValue.supplier_id) {
            errorss['supplier_id'] = getFormattedMessage('purchase.select.supplier.validate.label')
        } else if (qtyCart.length > 0) {
            dispatch(addToast({
                text: getFormattedMessage('globally.product-quantity.validate.message'),
                type: toastType.ERROR
            }))
        } else if (updateProducts.length < 1) {
            dispatch(addToast({
                text: getFormattedMessage('purchase.product-list.validate.message'),
                type: toastType.ERROR
            }))
        } else if (!purchaseValue.status_id) {
            errorss['status_id'] = getFormattedMessage('globally.status.validate.label')
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onWarehouseChange = (obj) => {
        setPurchaseValue(inputs => ({...inputs, warehouse_id: obj}))
        setErrors('')
    };

    const onSupplierChange = (obj) => {
        setPurchaseValue(inputs => ({...inputs, supplier_id: obj}))
        setErrors('');
    };

    const onStatusChange = (obj) => {
        setPurchaseValue(inputs => ({...inputs, status_id: obj}))
        
    };

    const updateCost = (item) => {
        setNewCost(item);
    };

    const updateDiscount = (item) => {
        setNewDiscount(item);
    };

    const updateTax = (item) => {
        setNewTax(item);
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
        setPurchaseValue(inputs => ({...inputs, [e.target.name]: value && value}))
    };

    const onNotesChangeInput = (e) => {
        e.preventDefault();
        setPurchaseValue(inputs => ({...inputs, notes: e.target.value}))
    }

    const handleCallback = (date) => {
        setPurchaseValue(previousState => {
            return {...previousState, date: date}
        });
        setErrors('')
    };

    const updatedQty = (qty) => {
        setQuantity(qty);
    };

    const updateSubTotal = (item) => {
        setSubTotal(item);
    };

    const updatePurchaseUnit = (item) => {
        setNewPurchaseUnit(item);
    };


    const statusFilterOptions = getFormattedOptions(saleStatusOptions)
    const statusDefaultValue = statusFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })
   
    const statusTypeValues = [];
    const statusValue = allStatusTypes && allStatusTypes?.length > 0 ? allStatusTypes.map((option) => {
        statusTypeValues.push({
            id: option.id,
            name: option.attributes.name
        })
    }) : []
    
    const prepareFormData = (data) => {
        const formValue = {
            date: moment(data.date).toDate(),
            warehouse_id: data.warehouse_id.value ? data.warehouse_id.value : data.warehouse_id,
            supplier_id: data.supplier_id.value ? data.supplier_id.value : data.supplier_id,
            discount: data.discount,
            tax_rate: data.tax_rate,
            tax_amount: calculateCartTotalTaxAmount(updateProducts, purchaseValue),
            purchase_items: updateProducts,
            shipping: data.shipping,
            grand_total: calculateCartTotalAmount(updateProducts, purchaseValue),
            received_amount: '',
            paid_amount: '',
            payment_type: 0, 
            notes: data.notes,
            reference_code: '',
            status: data.status_id.value ? data.status_id.value : data.status_id,
            shipping_data:customDynamicFields ? customDynamicFields : [],
            tax_data:customTaxDynamicFields ? customTaxDynamicFields : [],
        }
            // return formValue
            const formData = new FormData();
        formData.append('date',  JSON.stringify(moment(data.date).toDate()));
        formData.append('warehouse_id', data.warehouse_id.value ? data.warehouse_id.value : data.warehouse_id);
        formData.append('supplier_id', data.supplier_id.value ? data.supplier_id.value : data.supplier_id);
        formData.append('discount',  data.discount);
        formData.append('tax_rate',  data.tax_rate);
        formData.append('tax_amount',  calculateCartTotalTaxAmount(updateProducts, purchaseValue));
        formData.append('purchase_items',  JSON.stringify(updateProducts));
        formData.append('shipping',   data.shipping);
        formData.append('grand_total',   calculateCartTotalAmount(updateProducts, purchaseValue));
        formData.append('received_amount',   '');
        formData.append('paid_amount',   '');
        formData.append('payment_type',   0);
        formData.append('notes',   data.notes);
        formData.append('reference_code',   '');
        formData.append('status',   data.status_id.value ? data.status_id.value : data.status_id);
        formData.append('shipping_data',   customDynamicFields ? JSON.stringify(customDynamicFields) : []);
        formData.append('tax_data',   customTaxDynamicFields ? JSON.stringify(customTaxDynamicFields) : []);
        formData.append('notes', data.notes);
        // formData.append('images',JSON.stringify(multipleFiles));
        if (multipleFiles) {
            multipleFiles.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            })
        }
        
        return formData
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        purchaseValue.image = multipleFiles;
        if (valid) {
            if (singlePurchase) {
                editPurchase(id, prepareFormData(purchaseValue), navigate);
            } else {
                addPurchaseData(prepareFormData(purchaseValue));
                setPurchaseValue(purchaseValue);
            }
        }
    };

    const onBlurInput = (i, el) => {
        if (el.target.value === '') {
            if (el.target.name === 'shipping') {
                // setPurchaseValue({...purchaseValue, shipping: '0.00'})
            }
            if (el.target.name === 'discount') {
                setPurchaseValue({...purchaseValue, discount: '0.00'})
            }
            if (el.target.name === 'tax_rate') {
                // setPurchaseValue({...purchaseValue, tax_rate: '0.00'})
            }
        }
    }
// ...New changes
   const handleCustomDynamicFields = (val)=> {
       setCustomDynamicFields(val)
    }

    const handleCustomTaxDynamicFields = (val)=> {
        setCustomTaxDynamicFields(val)
     }
     const handleItemValue = (type, shipping_rate, tax_rate )=>{
                setPurchaseValue(inputs => ({...inputs, ['shipping']: shipping_rate && shipping_rate}))
                setPurchaseValue(inputs => ({...inputs, ['tax_rate']: tax_rate && tax_rate}))
     }

     const onChangeFiles = (file) => {
        setMultipleFiles(file);
    };
    const transferImage = (item) => {
        setRemovedImage(item);
    };
    return (
        <div className='card'>
            <div className='card-body'>
                <Form>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className='form-label'>
                                {getFormattedMessage('react-data-table.date.column.label')}:
                            </label>
                            <span className='required'/>
                            <div className='position-relative'>
                                <ReactDatePicker onChangeDate={handleCallback} newStartDate={purchaseValue.date}/>
                            </div>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['date'] ? errors['date'] : null}</span>
                        </div>
                        <div className='col-md-4 mb-3'>
                            <ReactSelect data={warehouses} onChange={onWarehouseChange}
                                         defaultValue={purchaseValue.warehouse_id} addSearchItems={singlePurchase}
                                         isWarehouseDisable={true}
                                         title={getFormattedMessage('warehouse.title')} errors={errors['warehouse_id']}
                                         placeholder={placeholderText('purchase.select.warehouse.placeholder.label')}/>
                        </div>
                        <div className='col-md-4 mb-3'>
                            <ReactSelect data={suppliers} onChange={onSupplierChange}
                                         defaultValue={purchaseValue.supplier_id}
                                         title={getFormattedMessage('supplier.title')} errors={errors['supplier_id']}
                                         placeholder={placeholderText('purchase.select.supplier.placeholder.label')}/>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>
                                {getFormattedMessage('dashboard.stockAlert.product.label')}:
                            </label>
                            <ProductSearch values={purchaseValue} products={products} isAllProducts={true}
                                           handleValidation={handleValidation} updateProducts={updateProducts}
                                           setUpdateProducts={setUpdateProducts} customProducts={customProducts}/>
                        </div>
                        <div className='col-12 md-12'>
                            <label
                                className='form-label'>
                                {getFormattedMessage('purchase.order-item.table.label')}:
                            </label>
                            <span className='required '/>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>{getFormattedMessage('dashboard.stockAlert.product.label')}</th>
                                    <th>{getFormattedMessage('purchase.order-item.table.net-unit-cost.column.label')}</th>
                                    <th>{getFormattedMessage('purchase.order-item.table.stock.column.label')}</th>
                                    <th>{getFormattedMessage('purchase.order-item.table.qty.column.label')}</th>
                                    <th>{getFormattedMessage('purchase.order-item.table.discount.column.label')}</th>
                                    <th>{getFormattedMessage('purchase.order-item.table.tax.column.label')}</th>
                                    <th>{getFormattedMessage('purchase.order-item.table.sub-total.column.label')}</th>
                                    <th>{getFormattedMessage('react-data-table.action.column.label')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {updateProducts && updateProducts.map((singleProduct, index) => {
                                    return <PurchaseTable singleProduct={singleProduct} index={index}
                                                          updateQty={updatedQty}
                                                          updateCost={updateCost} updateDiscount={updateDiscount}
                                                          updateProducts={updateProducts}
                                                          updateSubTotal={updateSubTotal} frontSetting={frontSetting}
                                                          setUpdateProducts={setUpdateProducts} updateTax={updateTax}
                                                          updatePurchaseUnit={updatePurchaseUnit}
                                                          purchaseItem={singlePurchase && singlePurchase.purchase_items}
                                    />
                                })}
                                {!updateProducts.length && <tr>
                                    <td colSpan={8} className='fs-5 px-3 py-6 custom-text-center'>
                                        {getFormattedMessage('sale.product.table.no-data.label')}
                                    </td>
                                </tr>
                                }
                                </tbody>
                            </Table>
                        </div>
                        <div className='col-12'>
                            <ProductMainCalculation inputValues={purchaseValue} shippingInputValues={customDynamicFields} taxInputValues={customTaxDynamicFields} updateProducts={updateProducts}
                                                    frontSetting={frontSetting}  allConfigData={allConfigData}/>
                        </div>
                        {/* <div className='col-md-4 mb-5'>
                            <label className='form-label'>
                                {getFormattedMessage('purchase.input.order-tax.label')}:
                            </label>
                            <InputGroup>
                                <input aria-label='Dollar amount (with dot and two decimal places)'
                                              className='form-control'
                                              onBlur={(event) => onBlurInput(event)}
                                              onFocus={(event) => onFocusInput(event)}
                                              value={purchaseValue.tax_rate} type='text' name='tax_rate'
                                              onKeyPress={(event) => decimalValidate(event)}
                                              onChange={(e) => {
                                                  onChangeInput(e)
                                              }}/>
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['orderTax'] ? errors['orderTax'] : null}</span>
                        </div> */}
                        <div className='col-md-4 mb-5'>
                            <label className='form-label'>
                                {getFormattedMessage('purchase.order-item.table.discount.column.label')}:
                            </label>
                            <InputGroup>
                                <input aria-label='Dollar amount (with dot and two decimal places)'
                                              className='form-control'
                                              onBlur={(event) => onBlurInput(event)}
                                              onFocus={(event) => onFocusInput(event)}
                                              value={purchaseValue.discount} type='text' name='discount'
                                              onKeyPress={(event) => decimalValidate(event)}
                                              onChange={(e) => onChangeInput(e)}
                                />
                                <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                            </InputGroup>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['discount'] ? errors['discount'] : null}</span>
                        </div>
                        <div className='col-md-4'>
                             <ReactSelect multiLanguageOption={statusTypeValues} onChange={onStatusChange} name='status'
                         title={getFormattedMessage('purchase.select.status.label')}
                         value={purchaseValue.status_id} errors={errors['status_id']}
                        //  defaultValue={statusDefaultValue[0]}
                         placeholder={getFormattedMessage('purchase.select.status.label')}/>
                        </div>
                       {/* ... */}
                       <div className='col-xl-12 mb-5'>
                            <div className='card'>
                                <label className='form-label'>
                                    {getFormattedMessage('product.input.multiple-image.label')}: </label>
                                <MultipleImage product={singlePurchase} fetchFiles={onChangeFiles}
                                               transferImage={transferImage}/>
                            </div>
                        </div>
                      < TaxChargerTypes frontSetting={frontSetting} allShipingTypes={allShipingTypes}   setItemVal={handleItemValue} itemValue={purchaseValue} customPropsTaxDynamicFields={handleCustomTaxDynamicFields} customPropsDynamicFields={handleCustomDynamicFields} singleDataEntity={singlePurchase}  />
                       {/* ... */}
                        <div className='col-md-12 mb-5'>
                            <label className='form-label'>
                                {getFormattedMessage('globally.input.notes.label')}:
                            </label>
                            <textarea name='notes' className='form-control'
                                          placeholder={placeholderText('purchase.placeholder.notes.input')}
                                          onChange={(e) => onNotesChangeInput(e)}
                                          value={purchaseValue.notes}
                            />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['notes'] ? errors['notes'] : null}</span>
                        </div>
                        <ModelFooter onEditRecord={singlePurchase} onSubmit={onSubmit} link='/app/purchases'/>
                    </div>
                </Form>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const {purchaseProducts, products, frontSetting, allConfigData} = state;
    return {customProducts: preparePurchaseProductArray(products), purchaseProducts, products, frontSetting, allConfigData}
};

export default connect(mapStateToProps, {editPurchase, fetchAllProducts, searchPurchaseProduct})(PurchaseForm);
