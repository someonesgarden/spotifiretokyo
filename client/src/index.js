import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {history,store} from './store';

const app = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
      <AppRouter />
      </ConnectedRouter>
  </Provider>, app);
