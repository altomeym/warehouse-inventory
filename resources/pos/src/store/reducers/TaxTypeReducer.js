import {supplierActionType} from '../../constants';

export default (state = false, action) => {
    switch (action.type) {
        case supplierActionType.FETCH_TAXTYPES:
            return action.payload;
        default:
            return state;
    }
}
