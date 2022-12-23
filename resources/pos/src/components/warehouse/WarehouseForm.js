import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import Form from 'react-bootstrap/Form';
import * as EmailValidator from 'email-validator';
import {getFormattedMessage, numValidate, placeholderText} from '../../shared/sharedMethod';
import {editWarehouse, fetchWarehouse} from '../../store/action/warehouseAction';
import {fetchCountries, fetchStates, fetchCities} from '../../store/action/allCountryStatesAction';
import ModelFooter from '../../shared/components/modelFooter';

const WarehouseForm = (props) => {
    const {addWarehouseData, id, editWarehouse, singleWarehouse, allCountryStates, fetchCountries, fetchStates, fetchCities} = props;
    const navigate = useNavigate();

    const [warehouseValue, setWarehouseValue] = useState({
        name: singleWarehouse ? singleWarehouse[0].name : '',
        email: singleWarehouse ? singleWarehouse[0].email : '',
        phone: singleWarehouse ? singleWarehouse[0].phone : '',
        country: singleWarehouse ? singleWarehouse[0].country : '',
        city: singleWarehouse ? singleWarehouse[0].city : '',
        zip_code: singleWarehouse ? singleWarehouse[0].zip_code : '',
        latitude: singleWarehouse ? singleWarehouse[0]?.latitude : '',
        longitude: singleWarehouse ? singleWarehouse[0]?.longitude : '',
        address: singleWarehouse ? singleWarehouse[0]?.address : '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        zip_code: '',
        latitude: '',
        longitude: '',
        address: ''
    });

    useEffect(() => {
        fetchCountries();
    }, []);

    const disabled = singleWarehouse && singleWarehouse[0].name === warehouseValue.name && singleWarehouse[0].phone === warehouseValue.phone && singleWarehouse[0].country === warehouseValue.country && singleWarehouse[0].city === warehouseValue.city && singleWarehouse[0].email === warehouseValue.email && singleWarehouse[0].zip_code === warehouseValue.zip_code

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!warehouseValue['name']) {
            errorss['name'] = getFormattedMessage('globally.input.name.validate.label');
        } else if (!EmailValidator.validate(warehouseValue['email'])) {
            if (!warehouseValue['email']) {
                errorss['email'] = getFormattedMessage('globally.input.email.validate.label');
            } else {
                errorss['email'] = getFormattedMessage('globally.input.email.valid.validate.label');
            }
        } else if (!warehouseValue['phone']) {
            errorss['phone'] = getFormattedMessage('globally.input.phone-number.validate.label');
        } else if (!warehouseValue['country']) {
            errorss['country'] = getFormattedMessage('globally.input.country.validate.label');
        } else if (!warehouseValue['city']) {
            errorss['city'] = getFormattedMessage('globally.input.city.validate.label');
        } else if (!warehouseValue['zip_code']) {
            errorss['zip_code'] = getFormattedMessage('warehouse.input.zip-code.validate.label');
        } else if ((warehouseValue['zip_code'] && warehouseValue['zip_code'].length !== 6)) {
            errorss['zip_code'] = getFormattedMessage('warehouse.input.zip-code.valid.validate.label');
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setWarehouseValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
        setErrors('');
    };

    const onAddressChangeInput = (e) => {
        e.preventDefault();
        setWarehouseValue(inputs => ({...inputs, address : e.target.value}));
    };

    const onCountryChange = (obj) => {
        setWarehouseValue(inputs => ({...inputs, role_id: obj}))
        setErrors('');
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleWarehouse && valid) {
            if (!disabled) {
                editWarehouse(id, warehouseValue, navigate);
            }
        } else {
            if (valid) {
                setWarehouseValue(warehouseValue);
                addWarehouseData(warehouseValue);
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
                                {getFormattedMessage('globally.input.name.label')}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='name'
                                   placeholder={placeholderText('globally.input.name.placeholder.label')}
                                   className='form-control' autoFocus={true}
                                   onChange={(e) => onChangeInput(e)}
                                   value={warehouseValue.name}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['name'] ? errors['name'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'>
                                {getFormattedMessage('globally.input.email.label')}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='email' className='form-control' value={warehouseValue.email}
                                   placeholder={placeholderText('globally.input.email.placeholder.label')}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['email'] ? errors['email'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'>
                                {getFormattedMessage('globally.input.phone-number.label')}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='phone' className='form-control' pattern='[0-9]*'
                                   placeholder={placeholderText('globally.input.phone-number.placeholder.label')}
                                   onKeyPress={(event) => numValidate(event)}
                                   onChange={(e) => onChangeInput(e)}
                                   value={warehouseValue.phone}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['phone'] ? errors['phone'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'>
                                {getFormattedMessage('globally.input.country.label')}:
                            </label>
                            <span className='required'/>
                                     <ReactSelect title= {getFormattedMessage('globally.input.country.label')} placeholder={placeholderText('globally.input.country.placeholder.label')} 
                                         data={allCountryStates} onChange={onCountryChange} 
                                         value={warehouseValue.country}
                                         errors={errors['country']}/>
                            <span className='text-danger'>{errors['country'] ? errors['country'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label className='form-label'>
                                {getFormattedMessage('globally.input.city.label')}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='city' className='form-control'
                                   placeholder={placeholderText('globally.input.city.placeholder.label')}
                                   onChange={(e) => onChangeInput(e)}
                                   value={warehouseValue.city}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['city'] ? errors['city'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                                {getFormattedMessage('warehouse.input.zip-code.label')}:
                            </label>
                            <span className='required'/>
                            <input type='text' name='zip_code' className='form-control'
                                   pattern='[0-9]*' value={warehouseValue.zip_code}
                                   placeholder={placeholderText('warehouse.input.zip-code.placeholder.label')}
                                   onChange={(e) => onChangeInput(e)}
                                   onKeyPress={(event) => numValidate(event)}
                            />
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['zip_code'] ? errors['zip_code'] : null}</span>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                               Latitude :
                            </label>
                            {/* <span className='required'/> */}
                            <input type='text' name='latitude' className='form-control'
                                   pattern='[0-9]*' value={warehouseValue.latitude}
                                   placeholder={'latitude '}
                                   onChange={(e) => onChangeInput(e)}
                                   onKeyPress={(event) => numValidate(event)}
                            />
                            {/* <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['latitude'] ? errors['zip_code'] : null}</span> */}
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                                Longitude:
                            </label>
                            {/* <span className='required'/> */}
                            <input type='text' name='longitude' className='form-control'
                                   pattern='[0-9]*' value={warehouseValue.longitude}
                                   placeholder={'longitude'}
                                   onChange={(e) => onChangeInput(e)}
                                   onKeyPress={(event) => numValidate(event)}
                            />
                            {/* <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['longitude'] ? errors['longitude'] : null}</span> */}
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>
                                Address: </label>
                            <textarea name='notes' className='form-control' value={warehouseValue.address}
                                          placeholder={'address'}
                                          onChange={(e) => onAddressChangeInput(e)}
                            />
                        </div>
                        <ModelFooter onEditRecord={singleWarehouse} onSubmit={onSubmit} editDisabled={disabled}
                                     link='/app/warehouse' addDisabled={!warehouseValue.name}/>
                    </div>
                </Form>
            </div>
        </div>
    )
};
const mapStateToProps = (state) => {
    const {allCountryStates} = state;
    return {allCountryStates}
};
export default connect(mapStateToProps, {fetchWarehouse, editWarehouse, fetchCountries, fetchStates, fetchCities})(WarehouseForm);
