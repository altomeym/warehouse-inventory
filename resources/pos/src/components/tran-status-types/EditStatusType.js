import React from 'react';
import ShippingForm from './StatusTypeForm';
import {getFormattedMessage} from '../../shared/sharedMethod';

const EditShipping = (props) => {
    const {handleClose, show, statusType} = props;

    return (
        <>
            {statusType &&
            <ShippingForm handleClose={handleClose} show={show} singleSatusType={statusType}
                          title={getFormattedMessage('currency.edit.title')}/>}
        </>
    )
};

export default EditShipping;

