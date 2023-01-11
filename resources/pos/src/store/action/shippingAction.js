import apiConfig from '../../config/apiConfig';
import {apiBaseURL, shippingTypeActionType, toastType} from '../../constants';
import requestParam from '../../shared/requestParam';
import {addToast} from './toastAction';
import {addInToTotalRecord, removeFromTotalRecord, setTotalRecord} from './totalRecordAction';
import {setLoading} from './loadingAction';
import {getFormattedMessage} from '../../shared/sharedMethod';

export const fetchShippingTypes = (filter = {}, isLoading = true, type='') => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    let url = apiBaseURL.SHIPPING_SHOW;
    if(type)
       url = apiBaseURL.SHIPPING_SHOW+'?slug='+type;
    if (!_.isEmpty(filter) && (filter.page || filter.pageSize || filter.search || filter.order_By || filter.created_at)) {
        url += requestParam(filter);
    }
    apiConfig.get(url)
        .then((response) => {
            dispatch({type: shippingTypeActionType.FETCH_SHIPPINGTYPES, payload: response.data.data});
            dispatch(setTotalRecord(response.data.meta.total));
            if (isLoading) {
                dispatch(setLoading(false))
            }
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};

export const fetchTaxTypes = (filter = {}, isLoading = true, type='') => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    let url = apiBaseURL.SHIPPING;
    if(type)
       url = apiBaseURL.SHIPPING+'?slug='+type;
    if (!_.isEmpty(filter) && (filter.page || filter.pageSize || filter.search || filter.order_By || filter.created_at)) {
        url += requestParam(filter);
    }
    apiConfig.get(url)
        .then((response) => {
            dispatch({type: shippingTypeActionType.FETCH_TAXTYPES, payload: response.data.data});
            dispatch(setTotalRecord(response.data.meta.total));
            if (isLoading) {
                dispatch(setLoading(false))
            }
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
}


export const fetchShippingType = (id) => async (dispatch) => {
    apiConfig.get(apiBaseURL.SHIPPING + '/' + id)
        .then((response) => {
            dispatch({type: shippingTypeActionType.FETCH_SHIPPINGTYPE, payload: response.data.data})
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};

export const addShippingType = (formData) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.SHIPPING, formData)
        .then((response) => {
            dispatch({type: shippingTypeActionType.ADD_SHIPPINGTYPE, payload: response.data.data});
            dispatch(addToast({text: getFormattedMessage('shipping.success.create.message')}));
            dispatch(addInToTotalRecord(1))
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};

export const editShippingType = (id, formData, handleClose) => async (dispatch) => {
    apiConfig.put(apiBaseURL.SHIPPING + '/' + id, formData)
        .then((response) => {
            dispatch({type: shippingTypeActionType.EDIT_SHIPPINGTYPE, payload: response.data.data});
            handleClose(false);
            dispatch(addToast({text: getFormattedMessage('shipping.success.edit.message')}));
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};

export const deleteShippingType = (id) => async (dispatch) => {
    apiConfig.delete(apiBaseURL.SHIPPING + '/' + id)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({type: shippingTypeActionType.DELETE_SHIPPINGTYPE, payload: id});
            dispatch(addToast({text: getFormattedMessage('shipping.success.delete.message')}));
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};
