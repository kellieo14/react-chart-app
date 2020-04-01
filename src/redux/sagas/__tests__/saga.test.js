import { takeEvery, all } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import mockData from '../../../testData/testData';
import rootSaga, { watchCountries, getCountriesAsync } from '../saga';
import { GET_COUNTRIES, SET_COUNTRIES } from '../../actions/actions';


describe('Saga', () => {

    it('should call watchCountries', () => {
        const root = rootSaga();
        const rootValue = root.next().value;
        expect(rootValue).toEqual(all([
            watchCountries(),
        ]));
    });

    it('should call getCountriesAsync', () => {
        const watch = watchCountries();
        const watchValue = watch.next().value;
        expect(watchValue).toEqual(takeEvery(GET_COUNTRIES, getCountriesAsync));
    });

    it('should get api data', () => {
        const mockJson = jest.fn().mockReturnValue('test');
        const mockFetch = jest.spyOn(window, 'fetch').mockImplementation(() => {
            return {
                json: mockJson
            }
        })
        const dispatched = [];
        runSaga (
            { 
                dispatch: (action) => dispatched.push(action) 
            },
            getCountriesAsync,
            mockData
        );
        expect(dispatched.length).toEqual(1);
        expect(mockFetch).toBeCalledTimes(1);
        expect(mockJson).toBeCalledTimes(1);
        expect(dispatched[0]).toEqual({
            type: SET_COUNTRIES,
            countries: 'test' 
        });
    });

});