import {shippingTypeActionType} from '../../constants';

export default (state = false, action) => {
    switch (action.type) {
        case shippingTypeActionType.FETCH_TAXTYPES:
            return action.payload;
        default:
            return state;
    }
}
