import React from 'react';
import ShippingForm from './ShippingForm';
import {getFormattedMessage} from '../../shared/sharedMethod';

const EditShipping = (props) => {
    const {handleClose, show, shippingType} = props;

    return (
        <>
            {shippingType &&
            <ShippingForm handleClose={handleClose} show={show} singleShippingType={shippingType}
                          title={getFormattedMessage('currency.edit.title')}/>}
        </>
    )
};

export default EditShipping;

