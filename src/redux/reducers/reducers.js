import { SET_COUNTRIES } from '../actions/actions';

const countriesList = (state = { countries: [] }, action) => {
    switch (action.type) {
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.countries
            }
        default:
            return state;
    }
}

export default countriesList;
