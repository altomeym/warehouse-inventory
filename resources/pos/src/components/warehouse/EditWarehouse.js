import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom'
import {fetchWarehouse} from '../../store/action/warehouseAction';
import WarehouseForm from './WarehouseForm';
import HeaderTitle from '../header/HeaderTitle';
import MasterLayout from '../MasterLayout';
import {getFormattedMessage} from '../../shared/sharedMethod';
import TopBarProgress from "react-topbar-progress-indicator";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const EditWarehouse = (props) => {
    const {fetchWarehouse, warehouses} = props;
    const {id} = useParams();

    useEffect(() => {
        fetchWarehouse(id);
    }, []);

    const itemsValue = warehouses && warehouses.length === 1 && warehouses.map(warehouse => ({
        name: warehouse.attributes.name,
        phone: warehouse.attributes.phone,
        country: warehouse.attributes.country,
        city: warehouse.attributes.city,
        email: warehouse.attributes.email,
        zip_code: warehouse.attributes.zip_code,
        address: warehouse.attributes.address,
        id: warehouse.id,
        city: {
            label: warehouse.attributes?.city_name?.name && warehouse.attributes?.city_name?.name,
            value: warehouse.attributes?.city_name?.id && warehouse.attributes?.city_name?.id
        },
        country: {
            label: warehouse.attributes?.country_name?.name && warehouse.attributes?.country_name?.name,
            value: warehouse.attributes?.country_name?.id && warehouse.attributes?.country_name?.id
        },
        state: {
            label: warehouse.attributes?.state_name?.name && warehouse.attributes?.state_name?.name,
            value: warehouse.attributes?.state_name?.id && warehouse.attributes?.state_name?.id
        }
    }));

    return (
        <MasterLayout>
            <TopProgressBar/>
            <HeaderTitle title={getFormattedMessage('warehouse.edit.title')} to='/app/warehouse'/>
            {warehouses.length === 1 && <WarehouseForm singleWarehouse={itemsValue} id={id}/>}
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {warehouses} = state;
    return {warehouses}
};

export default connect(mapStateToProps, {fetchWarehouse})(EditWarehouse);

