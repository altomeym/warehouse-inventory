import React, {useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import * as EmailValidator from 'email-validator';
import {useNavigate} from 'react-router-dom';
import {getFormattedMessage, placeholderText, numValidate} from '../../shared/sharedMethod';
import {editCustomer} from '../../store/action/customerAction';
import {fetchCountries, fetchStates, fetchCities} from '../../store/action/allCountryStatesAction';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from "../../shared/select/reactSelect";

const CustomerForm = (props) => {
    const {addCustomerData, id, editCustomer, singleCustomer, allCountryList, allStatesList, allCitiesList, fetchCountries, fetchStates, fetchCities} = props;
    const navigate = useNavigate();

    const [customerValue, setCustomerValue] = useState({
        name: singleCustomer ? singleCustomer[0].name : '',
        email: singleCustomer ? singleCustomer[0].email : '',
        phone: singleCustomer ? singleCustomer[0].phone : '',
        country: singleCustomer ? singleCustomer[0]?.country : '',
        state: singleCustomer ? singleCustomer[0]?.state : '',
        city: singleCustomer ? singleCustomer[0]?.city : '',
        address: singleCustomer ? singleCustomer[0]?.address : ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        address: ''
    });

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if(singleCustomer && singleCustomer[0]?.country?.value)
          fetchStates(singleCustomer[0]?.country?.value);

        if(singleCustomer && singleCustomer[0]?.state?.value)
          fetchCities(singleCustomer[0]?.state?.value);
    }, []);


    const disabled = singleCustomer && singleCustomer[0].phone === customerValue.phone && singleCustomer[0].name === customerValue.name && singleCustomer[0].country === customerValue.country && singleCustomer[0].state === customerValue.state && singleCustomer[0].city === customerValue.city && singleCustomer[0].email === customerValue.email && singleCustomer[0].address === customerValue.address

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!customerValue['name']) {
            errorss['name'] = getFormattedMessage("globally.input.name.validate.label");
        } else if (!EmailValidator.validate(customerValue['email'])) {
            if (!customerValue['email']) {
                errorss['email'] = getFormattedMessage("globally.input.email.validate.label");
            } else {
                errorss['email'] = getFormattedMessage("globally.input.email.valid.validate.label");
            }
        } else if (!customerValue['country']) {
            errorss['country'] = getFormattedMessage("globally.input.country.validate.label");
        } else if (!customerValue['state']) {
            errorss['state'] = getFormattedMessage("settings.system-settings.select.state.validate.label");
        } else if (!customerValue['city']) {
            errorss['city'] = getFormattedMessage("globally.input.city.validate.label");
        } else if (!customerValue['address']) {
            errorss['address'] = getFormattedMessage("globally.input.address.validate.label");
        } else if (!customerValue['phone']) {
            errorss['phone'] = getFormattedMessage("globally.input.phone-number.validate.label");
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setCustomerValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
        setErrors('');
    };

    const onCountryChange = (obj) => {
        setCustomerValue(inputs => ({...inputs, country: obj}))
        setCustomerValue(inputs => ({...inputs, state: ''}))
        setCustomerValue(inputs => ({...inputs, city: ''}))
        fetchStates(obj?.value);
        setErrors('');
    };

    const onStateChange = (obj) => {
        setCustomerValue(inputs => ({...inputs, state: obj}))
        setCustomerValue(inputs => ({...inputs, city: ''}))
        fetchCities(obj?.value);
        setErrors('');
    };

    const onCityChange = (obj) => {
        setCustomerValue(inputs => ({...inputs, city: obj}))
        setErrors('');
    };

    const prepareFormData = (prepareData) => {
        const formValue = {
            name: prepareData ? prepareData.name : '',
            email: prepareData ? prepareData.email : '',
            phone: prepareData ? prepareData.phone : '',
            country: prepareData ? prepareData.country?.value : '',
            state: prepareData ? prepareData.state?.value : '',
            city: prepareData ? prepareData.city?.value : '',
            address: prepareData ? prepareData?.address : '',
        }
        return formValue
    };


    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleCustomer && valid) {
            if (!disabled) {
                editCustomer(id, prepareFormData(customerValue), navigate);
            }
        } else {
            if (valid) {
                setCustomerValue(customerValue);
                addCustomerData(prepareFormData(customerValue));
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
                                {getFormattedMessage("globally.input.name.label")}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='name' value={customerValue.name}
                                   placeholder={placeholderText("globally.input.name.placeholder.label")}
                                   className='form-control' autoFocus={true}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['name'] ? errors['name'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                                {getFormattedMessage("globally.input.email.label")}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='email' className='form-control'
                                   placeholder={placeholderText("globally.input.email.placeholder.label")}
                                   onChange={(e) => onChangeInput(e)}
                                   value={customerValue.email}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['email'] ? errors['email'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                                {getFormattedMessage("globally.input.phone-number.label")}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='phone' className='form-control' pattern='[0-9]*'
                                   placeholder={placeholderText("globally.input.phone-number.placeholder.label")}
                                   onKeyPress={(event) => numValidate(event)}
                                   onChange={(e) => onChangeInput(e)}
                                   value={customerValue.phone}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['phone'] ? errors['phone'] : null}</span>
                        </div>
                        {/* <div className='col-md-6 mb-3'>
                            <label className='form-label'>
                                {getFormattedMessage("globally.input.country.label")}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='country' className='form-control'
                                   placeholder={placeholderText("globally.input.country.placeholder.label")}
                                   onChange={(e) => onChangeInput(e)}
                                   value={customerValue.country}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['country'] ? errors['country'] : null}</span>
                        </div> */}
                        {/* <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                                {getFormattedMessage("globally.input.city.label")}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='city' className='form-control'
                                   placeholder={placeholderText("globally.input.city.placeholder.label")}
                                   onChange={(e) => onChangeInput(e)}
                                   value={customerValue.city}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['city'] ? errors['city'] : null}</span>
                        </div> */}
                         {allCountryList && allCountryList.length>0 ? 
                        <div className='col-md-6 mb-3'>
                           
                            <span className=''/>
                                     <ReactSelect title= {getFormattedMessage('globally.input.country.label')} placeholder={placeholderText('globally.input.country.placeholder.label')} 
                                         multiLanguageOption={allCountryList} onChange={onCountryChange} 
                                         value={customerValue.country}
                                         errors={errors['country']}/>
                            {/* <span className='text-danger'>{errors['country'] ? errors['country'] : null}</span> */}
                        </div>
                         : null}
                        {allStatesList && allStatesList.length>0 ? 
                        <div className='col-md-6 mb-3'>
                            <span className=''/>
                                   <ReactSelect title= {getFormattedMessage('setting.state.lable')} placeholder={placeholderText('settings.system-settings.select.state.validate.label')} 
                                         multiLanguageOption={allStatesList} onChange={onStateChange} 
                                         value={customerValue.state}
                                         errors={errors['state']}/>
                            {/* <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['state'] ? errors['state'] : null}</span> */}
                        </div>
                        : null}
                         {allCitiesList && allCitiesList.length>0 ?
                        <div className='col-md-6 mb-3'>
                            <span className=''/>
                                   <ReactSelect title= {getFormattedMessage('globally.input.city.label')} placeholder={placeholderText('globally.input.city.placeholder.label')} 
                                         multiLanguageOption={allCitiesList} onChange={onCityChange} 
                                         value={customerValue.city}
                                         errors={errors['city']}/>
                            {/* <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['city'] ? errors['city'] : null}</span> */}
                        </div>
                         : null}
                        <div className='col-md-6 mb-3'>
                                <label
                                    className='form-label'>
                                    {getFormattedMessage("globally.input.address.label")}:
                                </label>
                                <span className='required'/>
                                <input type='text' name='address' className='form-control'
                                              placeholder={placeholderText("globally.input.address.placeholder.label")}
                                              onChange={(e) => onChangeInput(e)}
                                              value={customerValue.address}/>
                                {/* <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['address'] ? errors['address'] : null}</span> */}
                        </div>
                        <ModelFooter onEditRecord={singleCustomer} onSubmit={onSubmit} editDisabled={disabled}
                                     addDisabled={!customerValue.name} link='/app/customers'/>
                    </div>
                </Form>
            </div>
        </div>
    )
};
const mapStateToProps = (state) => {
    const {allCountryList, allStatesList, allCitiesList} = state;
    return {allCountryList, allStatesList, allCitiesList}
};

export default connect(mapStateToProps, {editCustomer, fetchCountries, fetchStates, fetchCities})(CustomerForm);
