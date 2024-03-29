import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Col, Row, Table} from 'react-bootstrap-v5';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import TabTitle from '../../shared/tab-title/TabTitle';
import {currencySymbolHendling, getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import {fetchPurchaseReturnDetails} from '../../store/action/purchaseReturnDeatilsAction';
import {fetchFrontSetting} from '../../store/action/frontSettingAction';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLocationDot, faMobileAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const PurchaseReturnDetails = (props) => {
    const {fetchPurchaseReturnDetails, purchaseReturnDetails, fetchFrontSetting, frontSetting, allConfigData} = props;
    const shippingData = purchaseReturnDetails?.shipping_data ? JSON.parse(purchaseReturnDetails?.shipping_data) : [];
    const TaxData = purchaseReturnDetails?.tax_data ? JSON.parse(purchaseReturnDetails?.tax_data) : [];

    const {id} = useParams();

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    useEffect(() => {
        fetchPurchaseReturnDetails(id);
    }, []);

    return (
        <MasterLayout>
            <TopProgressBar/>
            <HeaderTitle title={getFormattedMessage('purchases.return.details.title')} to='/app/purchase-return/'/>
            <TabTitle title={placeholderText('purchases.return.details.title')}/>
            <div className='card'>
                <div className='card-body'>
                    <Form>
                        <div className='row'>
                            <div className='col-12'>
                                <h4 className='font-weight-bold text-center mb-5'>
                                    {getFormattedMessage('purchases.return.details.title')} : {purchaseReturnDetails && purchaseReturnDetails.reference_code}
                                </h4>
                            </div>
                        </div>
                        <Row className='custom-line-height'>
                            <Col md={4}>
                                <h5 className='text-gray-600 bg-light p-4 mb-0 text-uppercase'>{getFormattedMessage('purchase.detail.supplier.info')}</h5>
                                <div className='p-4'>
                                    <div className='d-flex align-items-center pb-1'>
                                        <FontAwesomeIcon icon={faUser}
                                                         className='text-primary me-2 fs-5'/>{purchaseReturnDetails.supplier && purchaseReturnDetails.supplier.name}
                                    </div>
                                    <div className='d-flex align-items-center pb-1'>
                                        <FontAwesomeIcon icon={faEnvelope}
                                                         className='text-primary me-2 fs-5'/>{purchaseReturnDetails.supplier && purchaseReturnDetails.supplier.email}
                                    </div>
                                    <div className='d-flex align-items-center pb-1'>
                                        <FontAwesomeIcon icon={faMobileAlt}
                                                         className='text-primary me-2 fs-5'/>{purchaseReturnDetails.supplier && purchaseReturnDetails.supplier.phone}
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <FontAwesomeIcon icon={faLocationDot}
                                                         className='text-primary me-2 fs-5'/>{purchaseReturnDetails.supplier && purchaseReturnDetails.supplier.address}
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <h5 className='text-gray-600 bg-light p-4 mb-0 text-uppercase'>{getFormattedMessage('globally.detail.company.info')}</h5>
                                <div className='p-4'>
                                    <div className='d-flex align-items-center pb-1'>
                                        <FontAwesomeIcon icon={faUser}
                                                         className='text-primary me-2 fs-5'/>
                                        {purchaseReturnDetails.company_info && purchaseReturnDetails.company_info.company_name}
                                    </div>
                                    <div className='d-flex align-items-center pb-1'>
                                        <FontAwesomeIcon icon={faEnvelope}
                                                         className='text-primary me-2 fs-5'/>
                                        {purchaseReturnDetails.company_info && purchaseReturnDetails.company_info.email}
                                    </div>
                                    <div className='d-flex align-items-center pb-1'>
                                        <FontAwesomeIcon icon={faMobileAlt}
                                                         className='text-primary me-2 fs-5'/>
                                        {purchaseReturnDetails.company_info && purchaseReturnDetails.company_info.phone}
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <FontAwesomeIcon icon={faLocationDot} className='text-primary me-2 fs-5'/>
                                        {purchaseReturnDetails.company_info && purchaseReturnDetails.company_info.address}
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <h5 className='text-gray-600 bg-light p-4 mb-0 text-uppercase'>{getFormattedMessage('purchase.detail.purchase.info')}</h5>
                                <div className='p-4'>
                                    <div className='pb-1'>
                                        <span
                                            className='me-2'>{getFormattedMessage('globally.detail.reference')} :</span>
                                        <span>{purchaseReturnDetails && purchaseReturnDetails.reference_code}</span>
                                    </div>
                                    <div className='pb-1'>
                                        <span className='me-2'>{getFormattedMessage('globally.detail.status')} :</span>
                                        {purchaseReturnDetails && purchaseReturnDetails?.to_status?.name ? 
                                          <span className='badge bg-light-primary'>
                                             <span> {purchaseReturnDetails?.to_status?.name} </span>
                                           </span> 
                                         : '' }
                                    </div>
                                    <div className='pb-1'>
                                        <span
                                            className='me-2'>{getFormattedMessage('globally.detail.warehouse')} :</span>
                                        <span>{purchaseReturnDetails.warehouse && purchaseReturnDetails.warehouse.name}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className='mt-5'>
                            <h5 className='text-gray-600 bg-light p-4 mb-4 text-uppercase'>{getFormattedMessage('globally.detail.order.summary')}</h5>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th className='ps-3'>{getFormattedMessage('globally.detail.product')}</th>
                                    <th className='ps-3'>{getFormattedMessage('globally.detail.net-unit-cost')}</th>
                                    <th className='ps-3'>{getFormattedMessage('globally.detail.quantity')}</th>
                                    <th className='ps-3'>{getFormattedMessage('globally.detail.unit-cost')}</th>
                                    <th className='ps-3'>{getFormattedMessage('globally.detail.discount')}</th>
                                    <th className='ps-3'>{getFormattedMessage('globally.detail.tax')}</th>
                                    <th colSpan={2}>{getFormattedMessage('globally.detail.subtotal')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {purchaseReturnDetails.purchase_return_items && purchaseReturnDetails.purchase_return_items.map((details, index) => {
                                    return (
                                        <tr key={index} className='align-middle'>
                                            <td className="ps-3">{details.product && details.product.code} ({details.product && details.product.name} )</td>
                                            <td>{currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, details.net_unit_cost)}</td>
                                            <td>{details.quantity}</td>
                                            <td>{currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, details.product_cost)}</td>
                                            <td>{currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, details.discount_amount)}</td>
                                            <td>{currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, details.tax_amount)}</td>
                                            <td>{currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, details.sub_total)}</td>
                                        </tr>)
                                })}
                                </tbody>
                            </Table>
                        </div>
                        <div className='col-xxl-5 col-12 float-end'>
                            <div className='card'>
                                <div className='card-body pt-7 pb-2'>
                                    <div className='table-responsive'>
                                        <table className='table border'>
                                            <tbody>
                                            {TaxData && TaxData.map((taxItem)=>(
                                            <tr>
                                                <td className='py-3'>{taxItem?.tax_type_name ? taxItem?.tax_type_name : 'Tax'} </td>
                                                <td className='py-3'>{currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, taxItem?.tax_value ? taxItem?.tax_value : 0)}</td>
                                            </tr>
                                            )) }
                                            <tr>
                                                <td className='py-3'>{getFormattedMessage('globally.detail.discount')}</td>
                                                <td className='py-3'>
                                                {currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, purchaseReturnDetails && purchaseReturnDetails.discount )}</td>
                                            </tr>
                                            {shippingData && shippingData.map((shipItem)=>(
                                            <tr>
                                                <td className='py-3'>{shipItem?.shipping_type_name ? shipItem?.shipping_type_name : 'Shipping'} </td>
                                                <td className='py-3'>{currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, shipItem?.shipping_value ? shipItem?.shipping_value : 0)}</td>
                                            </tr>
                                            )) }
                                            <tr>
                                                <td className='py-3 text-primary'>{getFormattedMessage('globally.detail.grand.total')}</td>
                                                <td className='py-3 text-primary'>
                                                {currencySymbolHendling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, purchaseReturnDetails && purchaseReturnDetails.grand_total)}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {purchaseReturnDetails, frontSetting, allConfigData} = state;
    return {purchaseReturnDetails, frontSetting, allConfigData}
};

export default connect(mapStateToProps, {fetchPurchaseReturnDetails, fetchFrontSetting})(PurchaseReturnDetails);
