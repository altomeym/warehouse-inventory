import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap-v5';
import {Filters} from '../../constants';
import {addShippingType} from '../../store/action/shippingAction';
import ShippingForm from './ShippingForm';
import {getFormattedMessage} from '../../shared/sharedMethod';

const CreateShipping = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);
    const {addShippingType} = props;

    const addFormData = (formValue) => {
        addShippingType(formValue, Filters.OBJ);
    };

    return (
        <div className='text-end w-sm-auto w-100'>
            <Button variant='primary mb-lg-0 mb-4' onClick={handleClose}>
                {getFormattedMessage('shipping.create.title')}
            </Button>
            <ShippingForm addItemFormData={addFormData} handleClose={handleClose} show={show}
                          title={getFormattedMessage('shipping.create.title')}/>
        </div>
    )
};

export default connect(null, {addShippingType})(CreateShipping);
