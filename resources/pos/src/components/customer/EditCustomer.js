import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom'
import {fetchCustomer} from '../../store/action/customerAction';
import HeaderTitle from '../header/HeaderTitle';
import MasterLayout from '../MasterLayout';
import CustomerForm from './CustomerForm';
import {getFormattedMessage} from '../../shared/sharedMethod';
import TopBarProgress from "react-topbar-progress-indicator";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const EditCustomer = (props) => {
    const {fetchCustomer, customers} = props;
    const {id} = useParams();

    useEffect(() => {
        fetchCustomer(id);
    }, []);

    const itemsValue = customers && customers.length === 1 && customers.map(customer => ({
        name: customer.attributes.name,
        email: customer.attributes.email,
        phone: customer.attributes.phone,
        country: customer.attributes.country,
        city: customer.attributes.city,
        address: customer.attributes.address,
        id: customer.id,
        city: {
            label: customer.attributes?.city_name?.name && customer.attributes?.city_name?.name,
            value: customer.attributes?.city_name?.id && customer.attributes?.city_name?.id
        },
        country: {
            label: customer.attributes?.country_name?.name && customer.attributes?.country_name?.name,
            value: customer.attributes?.country_name?.id && customer.attributes?.country_name?.id
        },
        state: {
            label: customer.attributes?.state_name?.name && customer.attributes?.state_name?.name,
            value: customer.attributes?.state_name?.id && customer.attributes?.state_name?.id
        }
    }));

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle title={getFormattedMessage('customer.edit.title')} to='/app/customers'/>
            {customers.length === 1 && <CustomerForm singleCustomer={itemsValue} id={id}/>}
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {customers} = state;
    return {customers}
};

export default connect(mapStateToProps, {fetchCustomer})(EditCustomer);

