import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import MasterLayout from '../MasterLayout';
import ReactDataTable from '../../shared/table/ReactDataTable';
import TabTitle from '../../shared/tab-title/TabTitle';
import {fetchPurchasesReturn} from '../../store/action/purchaseReturnAction';
import DeletePurchaseReturn from './DeletePurchaseReturn';
import {fetchAllSuppliers} from '../../store/action/supplierAction';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import status from '../../shared/option-lists/status.json';
import {currencySymbolHendling, placeholderText} from '../../shared/sharedMethod';
import {getFormattedMessage} from '../../shared/sharedMethod';
import ActionDropDownButton from '../../shared/action-buttons/ActionDropDownButton';
import {purchaseReturnPdfAction} from '../../store/action/purchaseReturnPdfAction';
import {fetchFrontSetting} from '../../store/action/frontSettingAction';
import ShowPayment from '../../shared/showPayment/ShowPayment';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const PurchaseReturn = (props) => {
    const {
        fetchPurchasesReturn,
        fetchAllWarehouses,
        fetchAllSuppliers,
        purchaseReturn,
        totalRecord,
        isLoading,
        suppliers,
        purchaseReturnPdfAction,
        fetchFrontSetting,
        frontSetting,
        allConfigData,
        config
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [isShowPaymentModel, setIsShowPaymentModel] = useState(false);

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchAllSuppliers();
        fetchAllWarehouses();
        fetchPurchasesReturn(filter, true);
    };

    const goToEditProduct = (item) => {
        const id = item.id;
        window.location.href = '#/app/purchase-return/edit/' + id;
    };

    const goToPurchaseReturn = (ProductId) => {
        window.location.href = '#/app/purchase-return/detail/' + ProductId;
    };

    //onClick pdf function
    const onPurchaseReturnPdf = (id) => {
        purchaseReturnPdfAction(id);
    };

    const onShowPaymentClick = () => {
        setIsShowPaymentModel(!isShowPaymentModel);
    };

    const currencySymbol = frontSetting && frontSetting.value && frontSetting.value.currency_symbol

    const itemsValue = currencySymbol && purchaseReturn.length >= 0 && purchaseReturn.map((purchase) => {
        const supplier = suppliers.filter((supplier) => supplier.id === purchase.attributes.supplier_id);
        const supplierName = supplier[0] && supplier[0].attributes && supplier[0].attributes.name
        return ({
            reference_code: purchase.attributes.reference_code,
            supplier: supplierName,
            warehouse: purchase.attributes.warehouse_name,
            status: purchase?.attributes?.toStatus?.name,
            paid: 0,
            due: 0,
            payment_type: purchase.attributes.payment_type,
            date: moment(purchase.attributes.date).format('YYYY-MM-DD'),
            time: moment(purchase.attributes.created_at).format('LT'),
            grand_total: purchase.attributes.grand_total,
            id: purchase.id,
            currency: currencySymbol
        })
    });

    let user_permissions = new Set(config);
    const is_addedAble = user_permissions.has('manage_purchase_return-create') ? true : false
    const is_editAdable = user_permissions.has('manage_purchase_return-edit') ? true : false
    const is_deleteAdable = user_permissions.has('manage_purchase_return-delete') ? true: false

    const columns = [
        {
            name: getFormattedMessage('dashboard.recentSales.reference.label'),
            sortField: 'reference_code',
            sortable: true,
            cell: row => {
                return <span>
                            <span>{row.reference_code}</span>
                        </span>
            }
        },
        {
            name: getFormattedMessage('supplier.title'),
            selector: row => row.supplier,
            sortField: 'supplier',
            sortable: false,
        },
        {
            name: getFormattedMessage('warehouse.title'),
            selector: row => row.warehouse,
            sortField: 'warehouse',
            sortable: false,
        },
        {
            name: getFormattedMessage('purchase.select.status.label'),
            sortField: 'status',
            sortable: false,
            cell: row => {
                return <span className='badge bg-light-primary'>
                            <span>{row?.status}</span>
                        </span>
            }
        },
        {
            name: getFormattedMessage('purchase.grant-total.label'),
            selector: row => currencySymbolHendling(allConfigData, row.currency, row.grand_total),
            sortField: 'grand_total',
            sortable: true,
        },
        {
            name: getFormattedMessage('dashboard.recentSales.paid.label'),
            selector: row => currencySymbolHendling(allConfigData, row.currency, row.paid),
            sortField: 'paid',
            sortable: false,
        },
        {
            name: getFormattedMessage('dashboard.recentSales.due.label'),
            selector: row => currencySymbolHendling(allConfigData, row.currency, row.due),
            sortField: 'due',
            sortable: false,
        },
        {
            name: getFormattedMessage('globally.react-table.column.payment-type.label'),
            selector: row => row.payment_type,
            sortField: 'payment_type',
            sortable: false,
            cell: row => {
                return (
                    <span className='badge bg-light-success'>
                        <span>Cash</span>
                    </span>
                )
            }
        },
        {
            name: getFormattedMessage('globally.react-table.column.created-date.label'),
            selector: row => row.date,
            sortField: 'date',
            sortable: true,
            cell: row => {
                return (
                    <span>
                        <div className='mb-1'>{row.time}</div>
                        <div>{row.date}</div>
                    </span>
                )
            }
        },
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ActionDropDownButton isViewIcon={true} goToDetailScreen={goToPurchaseReturn} item={row}
                                               onClickDeleteModel={onClickDeleteModel} isPdfIcon={true}
                                               goToEditProduct={goToEditProduct} isEditMode={is_editAdable}
                                               title={getFormattedMessage('purchases.return.title')}
                                               onPdfClick={onPurchaseReturnPdf} onShowPaymentClick={onShowPaymentClick}
                                               isPaymentShow={true}
            />
        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('purchases.return.title')}/>
            <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                            ButtonValue={is_addedAble ? getFormattedMessage('purchase.return.create.title') : null}
                            totalRows={totalRecord} to='#/app/purchase-return/create' isShowDateRangeField
                            isShowFilterField isStatus/>
            <DeletePurchaseReturn onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                  onDelete={isDelete}/>
            <ShowPayment onShowPaymentClick={onShowPaymentClick} isShowPaymentModel={isShowPaymentModel}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {purchaseReturn, totalRecord, isLoading, warehouses, suppliers, frontSetting, allConfigData, config} = state;
    return {purchaseReturn, totalRecord, isLoading, warehouses, suppliers, frontSetting, allConfigData, config}
};

export default connect(mapStateToProps, {
    fetchPurchasesReturn,
    fetchAllWarehouses,
    purchaseReturnPdfAction,
    fetchAllSuppliers,
    fetchFrontSetting
})(PurchaseReturn);

