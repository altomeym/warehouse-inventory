import apiConfig from '../../config/apiConfig';
import {apiBaseURL, toastType, countryStateActionType} from '../../constants';
import requestParam from '../../shared/requestParam';
import {addToast} from './toastAction'
import {addInToTotalRecord, removeFromTotalRecord, setTotalRecord} from './totalRecordAction';
import {setLoading} from './loadingAction';


export const fetchCountries = ( isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    let url = apiBaseURL.COUNTRY;
    
    apiConfig.get(url)
        .then((response) => {
            dispatch({type: countryStateActionType.FETCH_COUNTRIES, payload: response.data?.Country});
            if (isLoading) {
                dispatch(setLoading(false))
            }
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};


export const fetchStates= ( id, isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    let url = apiBaseURL.STATE +'/'+id;
   
    apiConfig.get(url)
        .then((response) => {
            dispatch({type: countryStateActionType.FETCH_STATES, payload: response.data?.State});
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};
export const fetchCities= (id, isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    let url = apiBaseURL.CITY+'/'+id;
    
    apiConfig.get(url)
        .then((response) => {
            dispatch({type: countryStateActionType.FETCH_CITIES, payload: response.data?.City});
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};
