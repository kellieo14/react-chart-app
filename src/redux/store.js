import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import countriesList from './reducers/reducers';
import rootSaga from './sagas/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(countriesList, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;