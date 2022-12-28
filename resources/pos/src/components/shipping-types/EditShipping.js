import React from 'react';
import { useSearchParams } from "react-router-dom";
import ShippingForm from './ShippingForm';
import {getFormattedMessage, getFormattedOptions } from '../../shared/sharedMethod';
import { taxTypesOptions } from '../../constants';

const EditShipping = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {handleClose, show, shippingType} = props;
    const slugFilterOptions = getFormattedOptions(taxTypesOptions)
    const slugDefaultValue =  shippingType && shippingType.slug && slugFilterOptions.filter((option) => option.name === shippingType.slug)

    const itemsValue = shippingType &&  {
        name: shippingType.name,
        id: shippingType.id,
        slug: {
            value: slugDefaultValue && slugDefaultValue[0] && slugDefaultValue[0]?.id,
            label: slugDefaultValue && slugDefaultValue[0] && slugDefaultValue[0]?.name,
        },
    };

    return (
        <>
            {shippingType &&
            <ShippingForm handleClose={handleClose} show={show} singleShippingType={itemsValue}
                          title={getFormattedMessage('currency.edit.title')} slugType={searchParams.get("slug")} />}
        </>
    )
};

export default EditShipping;

