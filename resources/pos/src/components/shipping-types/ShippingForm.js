import React, {useState, createRef} from 'react';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap-v5';
import {getFormattedMessage, placeholderText, getFormattedOptions} from "../../shared/sharedMethod";
import {editShippingType} from '../../store/action/shippingAction';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from '../../shared/select/reactSelect';
import { taxTypesOptions } from '../../constants';

const ShippingForm = (props) => {
    const {addItemFormData, editShippingType, singleShippingType, handleClose, show, title, slugType} = props;
    const [slug, setSlug] = useState();

    const innerRef = createRef();
    const [formValue, setFormValue] = useState({
        name: singleShippingType ? singleShippingType.name : '',
        slug: singleShippingType ? singleShippingType?.slug : '',
    });

    const [errors, setErrors] = useState({
        name: '',
        slug: ''
    });

    const disabled = singleShippingType && singleShippingType.name === formValue.name && singleShippingType && singleShippingType?.slug === formValue?.slug;

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!formValue['name']?.trim()) {
            errorss['name'] = getFormattedMessage("shipping.modal.input.name.validate.label");
        } else if ((formValue['name'] && formValue['name'].length > 50)) {
            errorss['name'] = getFormattedMessage("globally.input.name.validate.label");
        } else if ((formValue['slug'] && formValue['name'].length > 50)) {
            errorss['slug'] = getFormattedMessage("globally.input.name.validate.label");
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setFormValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
        setErrors('');
    };

    const onSTypesChange = (obj) => {
        setFormValue(inputs => ({...inputs, slug: obj}));
    };

    const prepareFormData = (prepareData) => {
        const formValue = {
            name: prepareData ? prepareData.name : '',
            slug: prepareData ? prepareData?.slug?.label : ''
        }
        return formValue
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleShippingType && valid) {
            if (!disabled) {
                editShippingType(singleShippingType.id, prepareFormData(formValue), handleClose);
                clearField(false);
            }
        } else {
            if (valid) {
                setFormValue(formValue);
                addItemFormData(prepareFormData(formValue));
                clearField(false);
            }
        }

    };

    const slugFilterOptions = getFormattedOptions(taxTypesOptions)
    const slugDefaultValue = slugFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })

    const clearField = () => {
        setFormValue({
            name: ''
        });
        setErrors('');
        handleClose(false);
    };

    return (
        <Modal show={show}
               onHide={clearField}
               keyboard={true}
               onShow={() => setTimeout(() => {
                   innerRef.current.focus();
               }, 1)}
        >
            <Form onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    onSubmit(e)
                }
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage("globally.input.name.label")}: </label>
                            <span className='required'/>
                            <input type='text' name='name' value={formValue.name}
                                   placeholder={placeholderText("shipping.modal.input.name.placeholder.label")}
                                   className='form-control' ref={innerRef} autoComplete='off'
                                   onChange={(e) => onChangeInput(e)}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['name'] ? errors['name'] : null}</span>
                        </div>
                        <div className='col-md-12'>
                             <ReactSelect multiLanguageOption={slugFilterOptions} onChange={e => onSTypesChange( e)} name='slug'
                                title={'Type'}
                                value={formValue.slug || ""}  errors={errors['slug']}
                                placeholder={'Tax type '}/>
                        </div>
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singleShippingType} onSubmit={onSubmit} editDisabled={disabled}
                         clearField={clearField} addDisabled={!formValue?.name}/>
        </Modal>
    )
};

export default connect(null, {editShippingType})(ShippingForm);
