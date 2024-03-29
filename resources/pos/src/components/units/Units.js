import React, {useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import MasterLayout from '../MasterLayout';
import {fetchUnits} from '../../store/action/unitsAction';
import ReactDataTable from '../../shared/table/ReactDataTable';
import DeleteUnits from './DeleteUnits';
import CreateUnits from './CreateUnits';
import EditUnits from './EditUnits';
import TabTitle from '../../shared/tab-title/TabTitle';
import {getFormattedDate, getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const Units = (props) => {
    const {fetchUnits, units, totalRecord, isLoading, allConfigData, config} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [editModel, setEditModel] = useState(false);
    const [unit, setUnit] = useState();

    const handleClose = (item) => {
        setEditModel(!editModel);
        setUnit(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchUnits(filter, true);
    };

    const itemsValue = units.length >= 0 && units.map(unit => {
        return (
            {
                date: getFormattedDate(unit.attributes.created_at, allConfigData && allConfigData),
                time: moment(unit.attributes.created_at).format('LT'),
                name: unit.attributes.name,
                short_name: unit.attributes.short_name,
                base_unit: unit.attributes.base_unit,
                id: unit.id
            }
        )
    });

    let user_permissions = new Set(config);
    const is_addedAble = user_permissions.has('manage_units-create') ? true : false
    const is_editAdable = user_permissions.has('manage_units-edit') ? true : false
    const is_deleteAdable = user_permissions.has('manage_units-delete') ? true: false

    const columns = [
        {
            name: getFormattedMessage('globally.input.name.label'),
            selector: row => row.name,
            sortField: 'name',
            sortable: true,
        },
        {
            name: getFormattedMessage('unit.modal.input.short-name.label'),
            sortField: 'short_name',
            sortable: true,
            cell: row => {
                return <span>
                            <span>{row.short_name}</span>
                        </span>
            }
        },
        {
            name: getFormattedMessage('unit.modal.input.base-unit.label'),
            sortField: 'base_unit',
            sortable: true,
            cell: row => {
                return (
                    row.base_unit === '1' &&
                    <span className='badge bg-light-success'>
                        <span>{getFormattedMessage("unit.filter.piece.label")}</span>
                    </span> ||
                    row.base_unit === '2' &&
                    <span className='badge bg-light-primary'>
                        <span>{getFormattedMessage("unit.filter.meter.label")}</span>
                    </span> ||
                    row.base_unit === '3' &&
                    <span className='badge bg-light-warning'>
                        <span>{getFormattedMessage("unit.filter.kilogram.label")}</span>
                    </span>
                )
            }
        },
        {
            name: getFormattedMessage('globally.react-table.column.created-date.label'),
            selector: row => row.date,
            sortField: 'created_at',
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
            cell: row => <ActionButton item={row} goToEditProduct={handleClose} isEditMode={is_editAdable}
                                       onClickDeleteModel={onClickDeleteModel} isDeleteMode={is_deleteAdable} />
        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('units.title')}/>
            <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                            AddButton={is_addedAble ? <CreateUnits /> : null} title={getFormattedMessage('unit.modal.input.base-unit.label')}
                            totalRows={totalRecord} isShowFilterField isUnitFilter/>
            <EditUnits handleClose={handleClose} show={editModel} unit={unit}/>
            <DeleteUnits onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                         onDelete={isDelete}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {units, totalRecord, isLoading, allConfigData, config} = state;
    return {units, totalRecord, isLoading, allConfigData, config}
};

export default connect(mapStateToProps, {fetchUnits})(Units);

