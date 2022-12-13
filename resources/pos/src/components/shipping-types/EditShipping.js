import React from 'react';
import ShippingForm from './ShippingForm';
import {getFormattedMessage} from '../../shared/sharedMethod';

const EditShipping = (props) => {
    const {handleClose, show, currency} = props;

    return (
        <>
            {currency &&
            <ShippingForm handleClose={handleClose} show={show} singleCurrency={currency}
                          title={getFormattedMessage('currency.edit.title')}/>}
        </>
    )
};

export default EditShipping;

