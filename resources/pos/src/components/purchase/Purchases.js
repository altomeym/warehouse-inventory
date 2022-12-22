import React, {useEffect, useState} from 'react';
import MasterLayout from '../MasterLayout';
import {connect} from 'react-redux';
import moment from 'moment';
import ReactDataTable from '../../shared/table/ReactDataTable';
import ActionDropDownButton from '../../shared/action-buttons/ActionDropDownButton';
import TabTitle from '../../shared/tab-title/TabTitle';
import {fetchPurchases} from '../../store/action/purchaseAction';
import DeletePurchase from './DeletePurchase';
import {fetchAllSuppliers} from '../../store/action/supplierAction';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import status from '../../shared/option-lists/status.json'
import {currencySymbolHendling, getFormattedDate, placeholderText} from '../../shared/sharedMethod';
import {getFormattedMessage} from '../../shared/sharedMethod';
import {purchasePdfAction} from '../../store/action/purchasePdfAction';
import {fetchFrontSetting} from '../../store/action/frontSettingAction';
import ShowPayment from '../../shared/showPayment/ShowPayment';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {getDateFormat} from "../../frontend/shared/SharedMethod";

const Product = (props) => {
    const {
        fetchPurchases,
        fetchAllWarehouses,
        fetchAllSuppliers,
        purchases,
        totalRecord,
        isLoading,
        suppliers,
        purchasePdfAction,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        config
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [isShowPaymentModel, setIsShowPaymentModel] = useState(false);
    const currencySymbol = frontSetting && frontSetting.value && frontSetting.value.currency_symbol
    const [tableArray, setTableArray] = useState([])

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
        fetchPurchases(filter, true);
    };

    const goToEditProduct = (item) => {
        const id = item.id;
        window.location.href = '#/app/purchases/edit/' + id;
    };

    const goToDetailScreen = (ProductId) => {
        window.location.href = '#/app/purchases/detail/' + ProductId;
    };

    const onShowPaymentClick = () => {
        setIsShowPaymentModel(!isShowPaymentModel);
    };

    //onClick pdf function
    const onPdfClick = (id) => {
        purchasePdfAction(id);
    };

    const itemsValue = currencySymbol && purchases.length >= 0 && purchases.map((purchase) => {
        const supplier = suppliers.filter((supplier) => supplier.id === purchase.attributes.supplier_id);
        const supplierName = supplier[0] && supplier[0].attributes && supplier[0].attributes.name
        return ({
            reference_code: purchase.attributes.reference_code,
            supplier: supplierName,
            warehouse: purchase.attributes.warehouse_name,
            status: purchase?.attributes?.toStatus?.name,
            paid: 0,
            due: 0,
            payment: purchase.attributes.payment_type,
            date: getFormattedDate(purchase.attributes.date, allConfigData && allConfigData),
            time: moment(purchase.attributes.created_at).format('LT'),
            grand_total: purchase.attributes.grand_total,
            currency: currencySymbol,
            id: purchase.id
        })
    });

    useEffect(() => {
        const grandTotalSum = () => {
            let x = 0;
            itemsValue.length && itemsValue.map((item) => {
                x = x + Number(item.grand_total);
                return x;
            });
            return x;
        }
        const paidTotalSum = (itemsValue) => {
            let x = 0;
            itemsValue.length && itemsValue.map((item) => {
                x = x + Number(item.paid_amount);
                return x;
            });
            return x;
        }
        if (purchases.length) {
            const newObject = itemsValue.length && {
                date: "",
                time: "",
                reference_code: "Total",
                customer_name: "",
                warehouse_name: "",
                status: "",
                payment_status: "",
                payment_type: "",
                grand_total: grandTotalSum(itemsValue),
                paid_amount: paidTotalSum(itemsValue),
                paid: 0,
                due: 0,
                id: "",
                payment: '',
                currency: currencySymbol
            }
            const newItemValue = itemsValue.length && newObject && itemsValue.concat(newObject)
            const latestArray = newItemValue.map((item) => item)
            newItemValue.length && purchases.length && setTableArray(latestArray)
        }
    }, [purchases.length])

    useEffect(()=>{
        if(purchases.length === 0){
            setTableArray([])
        }
    }, [purchases])

    let user_permissions = new Set(config);
    const is_addedAble = user_permissions.has('manage_purchase-create') ? true : false
    const is_editAdable = user_permissions.has('manage_purchase-edit') ? true : false
    const is_deleteAdable = user_permissions.has('manage_purchase-delete') ? true: false

    const columns = [
        {
            name: getFormattedMessage('dashboard.recentSales.reference.label'),
            sortField: 'reference_code',
            sortable: true,
            cell: row => {
                return row.reference_code === "Total" ?
                    <span className="fw-bold fs-4">{getFormattedMessage("pos-total.title")}</span> :
                    <span>
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
            // selector: row => row.currency + ' ' + parseFloat(row.grand_total).toFixed(2),
            sortField: 'grand_total',
            cell: row => {
                return row.reference_code === "Total" ? <span
                        className="fw-bold fs-4">{currencySymbolHendling(allConfigData, row.currency, row.grand_total)}</span> :
                    <span>{currencySymbolHendling(allConfigData, row.currency, row.grand_total)}</span>
            },
            sortable: true,
        },
        {
            name: getFormattedMessage('dashboard.recentSales.paid.label'),
            // selector: row => row.currency + ' ' + parseFloat(row.paid).toFixed(2),
            sortField: 'paid',
            cell: row => {
                return row.reference_code === "Total" ? <span
                        className="fw-bold fs-4">{currencySymbolHendling(allConfigData, row.currency, row.paid)}</span> :
                    <span>{currencySymbolHendling(allConfigData, row.currency, row.paid)}</span>
            },
            sortable: false,
        },
        {
            name: getFormattedMessage('dashboard.recentSales.due.label'),
            cell: row => {
                return row.reference_code === "Total" ? <span
                        className="fw-bold fs-4">{currencySymbolHendling(allConfigData, row.currency, row.due)}</span> :
                    <span>{currencySymbolHendling(allConfigData, row.currency, row.due)}</span>
            },
            sortField: 'due',
            sortable: false,
        },
        {
            name: getFormattedMessage('globally.react-table.column.payment-type.label'),
            selector: row => row.payment,
            sortField: 'payment',
            sortable: false,
            cell: row => {
                return (
                    row.reference_code === "Total" ? "" : <span className='badge bg-light-success'>
                        <span>{getFormattedMessage("cash.label")}</span>
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
                    row.date && <span>
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
            cell: row => row.reference_code === "Total" ? null : <ActionDropDownButton item={row} goToEditProduct={goToEditProduct} isEditMode={is_editAdable}
                                               isPdfIcon={true}
                                               onClickDeleteModel={onClickDeleteModel} isViewIcon={true}
                                               onPdfClick={onPdfClick}
                                               goToDetailScreen={goToDetailScreen}
                                               onShowPaymentClick={onShowPaymentClick}
                // isPaymentShow={true}
                                               title={getFormattedMessage('purchase.title')} isDeleteMode={is_deleteAdable} />
        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar/>
            <TabTitle title={placeholderText('purchases.title')}/>
            <ReactDataTable columns={columns} items={tableArray} onChange={onChange} isLoading={isLoading}
                            isShowDateRangeField
                            ButtonValue={is_addedAble ? getFormattedMessage('purchase.create.title') : null} totalRows={totalRecord}
                            to='#/app/purchases/create' isShowFilterField isStatus/>
            <DeletePurchase onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
            <ShowPayment onShowPaymentClick={onShowPaymentClick} isShowPaymentModel={isShowPaymentModel}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {
        purchases,
        totalRecord,
        isLoading,
        warehouses,
        suppliers,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        config
    } = state;
    return {purchases, totalRecord, isLoading, warehouses, suppliers, frontSetting, fetchFrontSetting, allConfigData, config}
};

export default connect(mapStateToProps, {
    fetchPurchases,
    fetchAllWarehouses,
    fetchAllSuppliers,
    purchasePdfAction,
    fetchFrontSetting,
})(Product);

