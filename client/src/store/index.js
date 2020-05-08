import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import {tasksReducer} from '../redux';
import createSagaMiddleware from "redux-saga";
import createRootReducer from './reducer';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import rootSaga from '../sagas';

export const history = createBrowserHistory();

export const sagaMiddleware = createSagaMiddleware();
const savedState = JSON.parse(sessionStorage.getItem('app-state'));

const configureStore = (preloadedState) => {
    return createStore(
        createRootReducer(history),
        savedState ? savedState : preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                logger,
                sagaMiddleware,
                //storageMiddleware
            ),
        )
    )
}

export const store = configureStore();

// export const store = createStore(
//     tasksReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(
//         sagaMiddleware,
//         //thunk
//     )
// );

sagaMiddleware.run(rootSaga);
