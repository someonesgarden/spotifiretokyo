import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import {ConnectedRouter} from 'connected-react-router';
import App from './App';
import {store} from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
