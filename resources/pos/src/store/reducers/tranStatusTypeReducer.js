import {tranStatusTypeActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) { 
        case tranStatusTypeActionType.FETCH_TRAN_STATUSTYPES:
            return action.payload;
      
        case tranStatusTypeActionType.FETCH_TRAN_STATUSTYPE:
            return [action.payload];
        case tranStatusTypeActionType.ADD_TRAN_STATUSTYPE:
            return [...state, action.payload];
        case tranStatusTypeActionType.EDIT_TRAN_STATUSTYPE:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case tranStatusTypeActionType.DELETE_TRAN_STATUSTYPE:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
