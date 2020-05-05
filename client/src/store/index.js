import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";

import {totalReducer} from '../redux';
import rootSaga from '../sagas';

export const sagaMiddleware = createSagaMiddleware();

//create the redux store
export const store = createStore(
    totalReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        sagaMiddleware,
        //thunk
    )

);

sagaMiddleware.run(rootSaga);
