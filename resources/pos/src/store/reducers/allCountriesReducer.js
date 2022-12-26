import {countryStateActionType} from '../../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case countryStateActionType.FETCH_COUNTRIES:
            return action.payload;
        default:
            return state;
    }
};
