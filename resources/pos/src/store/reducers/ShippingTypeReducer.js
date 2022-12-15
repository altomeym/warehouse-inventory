import {shippingTypeActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case shippingTypeActionType.FETCH_SHIPPINGTYPES:
            return action.payload;
        case shippingTypeActionType.FETCH_SHIPPINGTYPE:
            return [action.payload];
        case shippingTypeActionType.ADD_SHIPPINGTYPE:
            return [...state, action.payload];
        case shippingTypeActionType.EDIT_SHIPPINGTYPE:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case shippingTypeActionType.DELETE_SHIPPINGTYPE:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
