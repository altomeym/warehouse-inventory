import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {connect, useSelector} from 'react-redux';
import MasterLayout from '../MasterLayout';
import TabTitle from '../../shared/tab-title/TabTitle';
import ReactDataTable from '../../shared/table/ReactDataTable';
import DeleteSaleAdjustMents from './DeleteSaleAdjustMents';
import {getFormattedDate, getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import {fetchFrontSetting} from '../../store/action/frontSettingAction';
import {fetchSalePayments} from "../../store/action/salePaymentAction";
import { fetchAdjustments } from '../../store/action/adjustMentAction';
import ActionButton from '../../shared/action-buttons/ActionButton';
import AdjustMentDetail from './AdjustMentDetail';
import { fetchAllWarehouses } from '../../store/action/warehouseAction';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const Adjustments = (props) => {
    const {adjustments, fetchAdjustments, totalRecord, isLoading, fetchFrontSetting, frontSetting, warehouses, fetchAllWarehouses, isCallSaleApi, allConfigData, config} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [detailsModel, setDetailsModel] = useState(false);
    const [isShowPaymentModel, setIsShowPaymentModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [isDetails, setIsDetails] = useState(null);
    const [lgShow, setLgShow] = useState(false);

    useEffect(() => {
        fetchFrontSetting();
        fetchAllWarehouses()
    }, []);

    const currencySymbol = frontSetting && frontSetting.value && frontSetting.value.currency_symbol

    const onChange = (filter) => {
        fetchAdjustments(filter, true);
    };

    //adjustments edit function
    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = '#/app/adjustments/' + id;
    };

    // delete adjustments function
    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    //adjustments details function
    const onClickDetailsModel = (isDetails = null) => {
        setLgShow(true)
        setIsDetails(isDetails)
    };

    const itemsValue = currencySymbol && adjustments.length >= 0 && adjustments.map(item => ({
        reference_code: item.attributes.reference_code,
        total_products: item.attributes.total_products,
        date: getFormattedDate(item.attributes.created_at, allConfigData && allConfigData),
        time: moment(item.attributes.created_at).format('LT'),
        warehouse_name: item.attributes.warehouse_name,
        method_type: item.attributes?.adjustment_items[0]?.method_type,
        quantity: item.attributes?.adjustment_items[0]?.quantity,
        id: item.id,
        currency: currencySymbol
    }));

    let user_permissions = new Set(config);
    const is_addedAble = user_permissions.has('manage_adjustments-create') ? true : false
    const is_editAdable = user_permissions.has('manage_adjustments-edit') ? true : false
    const is_deleteAdable = user_permissions.has('manage_adjustments-delete') ? true: false

    const columns = [
        {
            name: getFormattedMessage('dashboard.recentSales.reference.label'),
            sortField: 'reference_code',
            sortable: false,
            cell: row => {
                return (
                    row.method_type === 1 ?
                    <span className='badge bg-light-success'>
                        <span>{row.reference_code}</span>
                    </span>
                   :
                    <span className='badge bg-light-primary'>
                        <span>{row.reference_code}</span>
                    </span>
                )
            }
        },
        {
            name: getFormattedMessage('warehouse.title'),
            selector: row => row.warehouse_name,
            sortField: 'warehouse_name',
            sortable: false,
        },
        {
            name: getFormattedMessage('dashboard.recentSales.total-product.label'),
            sortField: 'total_products',
            sortable: false,
            cell: row => {
                return <span>
                            <span>{row.total_products}</span>
                        </span>
            }
        },
        // {
        //     name: getFormattedMessage('dashboard.stockAlert.quantity.label'),
        //     sortField: 'quantities',
        //     sortable: false,
        //     cell: row => {
        //         return <span>
        //                     <span>{row.quantity}</span>
        //                 </span>
        //     }
        // },
        // {
        //     name: getFormattedMessage('globally.type.label'),
        //     sortField: 'type',
        //     sortable: false,
        //     cell: row => {
        //         return <span>
        //                     <span>{row.method_type === 1 ? 'Addition' : "Subtraction"}</span>
        //                 </span>
        //     }
        // },
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
            cell: row => <ActionButton isViewIcon={true} goToDetailScreen={onClickDetailsModel} item={row}
                                       goToEditProduct={goToEdit} isEditMode={is_editAdable}
                                       onClickDeleteModel={onClickDeleteModel} isDeleteMode={is_deleteAdable} />
        }
    ];

    const array = warehouses
    const newFirstElement = {attributes: {name: getFormattedMessage('unit.filter.all.label')}, id: "0"}
    const newArray = [newFirstElement].concat(array)
    const newMethodTypeArray = adjustments && adjustments.length >0 ? adjustments : [] ;

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('adjustments.title')}/>
            { newArray.length > 1 &&
            <ReactDataTable columns={columns} items={itemsValue} to='#/app/adjustments/create'
                            ButtonValue={is_addedAble ? getFormattedMessage('adjustments.create.title') : null } isShowPaymentModel={isShowPaymentModel} isCallSaleApi={isCallSaleApi}
                            onChange={onChange} totalRows={totalRecord} goToEdit={goToEdit} isShowFilterField
                            isLoading={isLoading} isWarehouseType={true} warehouseOptions={newArray} isAdjustmentType={false} adjustmentOptions={newMethodTypeArray}  warehouses={warehouses} />}
            <DeleteSaleAdjustMents onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
            <AdjustMentDetail onClickDetailsModel={onClickDetailsModel} detailsModel={detailsModel} onDetails={isDetails} setLgShow={setLgShow} lgShow={lgShow}/>
        </MasterLayout>
    )
};


const mapStateToProps = (state) => {
    const {adjustments, totalRecord, isLoading, frontSetting, warehouses, isCallSaleApi, allConfigData, config} = state;
    return {adjustments, totalRecord, isLoading, frontSetting, warehouses, isCallSaleApi, allConfigData, config};
};

export default connect(mapStateToProps, {fetchAdjustments, fetchAllWarehouses, fetchFrontSetting})(Adjustments);
