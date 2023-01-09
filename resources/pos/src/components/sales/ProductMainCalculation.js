import React from 'react';
import {
    calculateCartTotalAmount,
    calculateSubTotal
} from '../../shared/calculation/calculation';
import {currencySymbolHendling, getFormattedMessage} from '../../shared/sharedMethod';

const ProductMainCalculation = (props) => {
    const {inputValues, updateProducts, frontSetting, allConfigData, shippingInputValues, taxInputValues} = props;
    let calDiscount =  (calculateSubTotal(updateProducts)  * inputValues.discount / 100).toFixed(2)
    // let totalAmountAfterDiscount = calculateSubTotal(updateProducts) - inputValues.discount
    let totalAmountAfterDiscount = calculateSubTotal(updateProducts) - calDiscount
   
    let taxTr =   
          taxInputValues && taxInputValues.length > 0 ? taxInputValues.map((element, index) => {
            let taxCal = (totalAmountAfterDiscount * element?.tax_value / 100).toFixed(2);
            return (
        <tr key={index}>
            <td className='py-3'>{element?.tax_type_name ? element?.tax_type_name : 'Tax'}</td>
            <td className='py-3'>
                {currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, taxCal)} ({parseFloat(element?.tax_value ? element?.tax_value : 0).toFixed(2)})
                %
            </td>
        </tr>)
}) : null 
    return (
        <div className='col-xxl-5 col-lg-6 col-md-6 col-12 float-end'>
            <div className='card'>
                <div className='card-body pt-7 pb-2'>
                    <div className='table-responsive'>
                        <table className='table border'>
                            <tbody> 
                            {taxTr}
                            <tr>
                                <td className='py-3'>{getFormattedMessage('purchase.order-item.table.discount.column.label')}</td>
                                <td className='py-3'>
                                    {/* {currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, inputValues.discount ? inputValues.discount : 0)} */}
                                  {currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, calDiscount)} ({parseFloat(inputValues?.discount ? inputValues?.discount : 0).toFixed(2)})
                                     %
                                </td>
                            </tr>
                            {shippingInputValues && shippingInputValues.length > 0 ? shippingInputValues.map((element, index) => (
                            <tr key={index} >
                                <td className='py-3'>{element?.shipping_type_name ? element?.shipping_type_name : 'Shipping'} </td>
                                <td className='py-3'>
                                    {currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, element?.shipping_value ? element?.shipping_value : 0)}</td>
                            </tr>
                            )) : null}
                            <tr>
                                <td className='py-3 text-primary'>{getFormattedMessage('purchase.grant-total.label')}</td>
                                <td className='py-3 text-primary'>
                                    {currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, calculateCartTotalAmount(updateProducts, inputValues))}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default ProductMainCalculation;
