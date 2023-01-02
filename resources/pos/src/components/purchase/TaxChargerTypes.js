import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import {InputGroup} from 'react-bootstrap-v5';
import {decimalValidate, getFormattedMessage, placeholderText, onFocusInput, getFormattedOptions} from '../../shared/sharedMethod';
import ReactSelect from '../../shared/select/reactSelect';


const TaxChargerTypes = (props) => {

    const {
        frontSetting,
        customPropsDynamicFields,
        customPropsTaxDynamicFields,
        allShipingTypes,
        itemValue,
        setItemVal,
        singleDataEntity 
    } = props;


    const [errors, setErrors] = useState({
        tax_rate: '',
        discount: '',
        shipping: '',
    });

    const [customDynamicFields, setCustomDynamicFields] = useState([{shipping_type_id: "", shipping_value:"", shipping_type_name:"",}]);
    const [customTaxDynamicFields, setCustomTaxDynamicFields] = useState([{tax_type_id: "", tax_value:"", tax_type_name:"",}]);

    useEffect(()=>{
        if(singleDataEntity){
          setCustomDynamicFields(singleDataEntity?.shipping_data);
          setCustomTaxDynamicFields(singleDataEntity?.tax_data);
        }
  },[])


    let  onShippingTypeChange = (i, e) => {
        let newFormValues = [...customDynamicFields];  
        newFormValues[i]['shipping_type_id'] = e;
        newFormValues[i]['shipping_type_name'] = e.label;
        setCustomDynamicFields(newFormValues);
        handleCustomDynamicFields(newFormValues);
    };

    let  addDynamicField = ()=>{
        setCustomDynamicFields([...customDynamicFields, { shipping_type_id: "", shipping_value: "" }])
        handleCustomDynamicFields([...customDynamicFields, { shipping_type_id: "", shipping_value: "" }]);
    }
    
    let handleChange = (i, e) => {
        let newFormValues = [...customDynamicFields];
        newFormValues[i][e.target.name] = e.target.value;
        setCustomDynamicFields(newFormValues);
        calShippingTotal(0, newFormValues);
      }

       let removeFormFields = (i) => {
        let newFormValues = [...customDynamicFields];
        newFormValues.splice(i, 1);
        setCustomDynamicFields(newFormValues)
         calShippingTotal(customDynamicFields[i]['shipping_value'], newFormValues)
    }
    let calShippingTotal = (singleVal=0, newFormValues)=>{
        let totalShipTax = 0;
        if(singleVal){
           totalShipTax =  parseFloat(itemValue.shipping) -   parseFloat(singleVal);
         } else{
        customDynamicFields.map((element)=>{
            if(element.shipping_value && element.shipping_value != '' && element.shipping_value != NaN && element.shipping_value !=null ){
               totalShipTax = parseFloat(totalShipTax) + parseFloat(element.shipping_value)
            }
     });
  }
        setItemVal( 'shipping', totalShipTax,  itemValue.tax_rate)
        handleCustomDynamicFields(newFormValues);
    }


    let  addTaxDynamicField = ()=>{
        setCustomTaxDynamicFields([...customTaxDynamicFields, { tax_type_id: "", tax_value: "" }])
        handleCustomTaxDynamicFields([...customTaxDynamicFields, { tax_type_id: "", tax_value: "" }]);
    }
    let  onTaxTypeChange = (i, e) => {
        let newFormValues = [...customTaxDynamicFields];  
        newFormValues[i]['tax_type_id'] = e;
        newFormValues[i]['tax_type_name'] = e.label;
        setCustomTaxDynamicFields(newFormValues);
        handleCustomTaxDynamicFields(newFormValues);
    };
    let handleTaxChange = (i, e) => {
        let newFormValues = [...customTaxDynamicFields];
        newFormValues[i][e.target.name] = e.target.value;
        setCustomTaxDynamicFields(newFormValues);
        calTaxTotal(0, newFormValues);
      }

    let removeTaxFormFields = (i) => {
        let newFormValues = [...customTaxDynamicFields];
        newFormValues.splice(i, 1);
        setCustomTaxDynamicFields(newFormValues)
        // handleCustomTaxDynamicFields(newFormValues);
        calTaxTotal(customTaxDynamicFields[i]['tax_value'], newFormValues)
       
    }
    let calTaxTotal = (singleVal=0, newFormValues)=>{
        let totalTax = 0;
        if(singleVal){
          totalTax =  parseFloat(itemValue.tax_rate) -   parseFloat(singleVal);
        } else {
        customTaxDynamicFields.map((element)=>{
            if(element.tax_value && element.tax_value != '' && element.tax_value != NaN && element.tax_value !=null ){
               totalTax = parseFloat(totalTax) + parseFloat(element.tax_value)
            }
    });
 }
   
    setItemVal( 'tax', itemValue.shipping,  totalTax)
        handleCustomTaxDynamicFields(newFormValues);

    }

    const shippingTypeValues = [];
    const shippingTypeDefaultValue = allShipingTypes?.length >0 ? allShipingTypes.map((option) => {
        option && option.attributes.slug == 'Shipping' ? 
            shippingTypeValues.push({
                id: option.id,
                name: option.attributes.name
            })
        : []
    }) : [];

    const taxTypeValues = [];
    const TaxTypeDefaultValue = allShipingTypes?.length >0 ? allShipingTypes.map((option) => {
        option &&  option.attributes.slug == 'tax' ? 
        taxTypeValues.push({
                id: option.id,
                name: option.attributes.name
            })
        : []
    }) : [];

   const handleCustomDynamicFields = (val=[])=>{
     if(val)
         customPropsDynamicFields(val)
     else 
         customPropsDynamicFields(customDynamicFields)
         
    }

    const handleCustomTaxDynamicFields = (val=[])=>{
        if(val)
        customPropsTaxDynamicFields(val)
    else 
        customPropsTaxDynamicFields(customTaxDynamicFields)
    }
    return (
        <>
        {customDynamicFields.map((element, index) => (
            <React.Fragment key={index}>
            <div className='col-md-5'>
                 <ReactSelect multiLanguageOption={shippingTypeValues} onChange={e => onShippingTypeChange(index, e)} name='shipping_type_id'
              title={'Shipping Type'}
              value={element.shipping_type_id || ""}  errors={errors['shipping_type_id']}
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
            {/* ..................Tax. */}
             {customTaxDynamicFields.map((element, index) => (
            <React.Fragment key={index}>
            <div className='col-md-5'>
                 <ReactSelect multiLanguageOption={taxTypeValues} onChange={e => onTaxTypeChange(index, e)} name='tax_type_id'
              title={'Tax Type'}
              value={element.tax_type_id || ""}  errors={errors['tax_type_id']}
             placeholder={'Tax type '}/>
            </div>
            {/* ... */}
            <div className='col-md-5 mb-5'>
                <div className='align_o'>
                    <label
                        className='form-label'>
                    Tax value
                    </label>
                    <InputGroup>
                        <input aria-label='Dollar amount (with dot and two decimal places)'
                                    className='form-control'  value={element.tax_value || ""}
                                    type='text' name='tax_value'
                                    onFocus={(event) => onFocusInput(event)}
                                    onChange={e => handleTaxChange(index, e)}
                        />
                        <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                    </InputGroup>
                    <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['tax'] ? errors['tax'] : null}</span>
                    {
                        index ? 
            <button type="button"  className="btn btn-danger remove" onClick={() => removeTaxFormFields(index)}><FontAwesomeIcon icon={faTrash}/></button> 
                        : null
                    }
                </div>
            </div>
            </React.Fragment>
            )) }
            <div  className='col-md-2 '>
                <button className='btn btn-primary me-2 float-lg-right float_plus' onClick={addTaxDynamicField} type='submit' > + </button> 
            </div>
            </>
    )
};

export default TaxChargerTypes;
