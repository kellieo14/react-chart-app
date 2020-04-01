import { takeEvery, put, all } from 'redux-saga/effects';
import {SET_COUNTRIES, GET_COUNTRIES} from '../actions/actions';

export function* getCountriesAsync() {
    const apiData = yield fetch('https://restcountries.eu/rest/v2/all');   
    let data = yield apiData.json();
    yield put ({type: SET_COUNTRIES, countries: data });
}

export function* watchCountries() {
    yield takeEvery(GET_COUNTRIES, getCountriesAsync);
}

export default function* rootSaga() {
    yield all([
        watchCountries(),
    ]);
}