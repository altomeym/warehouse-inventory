import apiConfig from '../../config/apiConfig';
import {apiBaseURL, tranStatusTypeActionType, toastType} from '../../constants';
import requestParam from '../../shared/requestParam';
import {addToast} from './toastAction';
import {addInToTotalRecord, removeFromTotalRecord, setTotalRecord} from './totalRecordAction';
import {setLoading} from './loadingAction';
import {getFormattedMessage} from '../../shared/sharedMethod';

export const fetchStatusTypes = (filter = {}, isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    let url = apiBaseURL.TRAN_STATUS_TYPE;
    if (!_.isEmpty(filter) && (filter.page || filter.pageSize || filter.search || filter.order_By || filter.created_at)) {
        url += requestParam(filter);
    }
    apiConfig.get(url)
        .then((response) => {
            dispatch({type: tranStatusTypeActionType.FETCH_TRAN_STATUSTYPES, payload: response.data.data});
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

export const fetchStatusType = (id) => async (dispatch) => {
    apiConfig.get(apiBaseURL.TRAN_STATUS_TYPE + '/' + id)
        .then((response) => {
            dispatch({type: tranStatusTypeActionType.FETCH_TRAN_STATUSTYPE, payload: response.data.data})
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};

export const addStatusType = (formData) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.TRAN_STATUS_TYPE, formData)
        .then((response) => {
            dispatch({type: tranStatusTypeActionType.ADD_TRAN_STATUSTYPE, payload: response.data.data});
            dispatch(addToast({text: getFormattedMessage('status-types.success.create.message')}));
            dispatch(addInToTotalRecord(1))
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};

export const editStatusType = (id, formData, handleClose) => async (dispatch) => {
    apiConfig.put(apiBaseURL.TRAN_STATUS_TYPE + '/' + id, formData)
        .then((response) => {
            dispatch({type: tranStatusTypeActionType.EDIT_TRAN_STATUSTYPE, payload: response.data.data});
            handleClose(false);
            dispatch(addToast({text: getFormattedMessage('status-types.success.edit.message')}));
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};

export const deleteStatusType = (id) => async (dispatch) => {
    apiConfig.delete(apiBaseURL.TRAN_STATUS_TYPE + '/' + id)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({type: tranStatusTypeActionType.DELETE_TRAN_STATUSTYPE, payload: id});
            dispatch(addToast({text: getFormattedMessage('status-types.success.delete.message')}));
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};
