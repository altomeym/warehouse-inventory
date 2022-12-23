import {countryStateActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case countryStateActionType.FETCH_COUNTRIES:
            return action.payload;
        case countryStateActionType.FETCH_STATES:
            return action.payload;
        case countryStateActionType.FETCH_CITIES:
            return action.payload;
        default:
            return state;
    }
};
