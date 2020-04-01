
export const SET_COUNTRIES = 'SET_COUNTRIES';
export const GET_COUNTRIES = 'GET_COUNTRIES';

export function setCountries(countries) {
    return { type: SET_COUNTRIES, countries }
}

export function getCountries() {
    return { type: GET_COUNTRIES }
}