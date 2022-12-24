import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { rootReducer } from './services/reducers';
import reportWebVitals from './reportWebVitals';
import App from './components/app/app';

import './index.css';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE
} from './services/actions/feed';

import {
  WS_CREATED_ORDERS_CONNECTION_CLOSED,
  WS_CREATED_ORDERS_CONNECTION_ERROR,
  WS_CREATED_ORDERS_CONNECTION_START,
  WS_CREATED_ORDERS_CONNECTION_SUCCESS,
  WS_CREATED_ORDERS_GET_MESSAGE,
  WS_CREATED_ORDERS_SEND_MESSAGE
} from './services/actions/createdOrders';

import { socketMiddleware } from './services/middleware/socketMiddleware';


const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE
};

const wsCreatedOrdersActions = {
  wsInit: WS_CREATED_ORDERS_CONNECTION_START,
  wsSendMessage: WS_CREATED_ORDERS_SEND_MESSAGE,
  onOpen: WS_CREATED_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_CREATED_ORDERS_CONNECTION_CLOSED,
  onError: WS_CREATED_ORDERS_CONNECTION_ERROR,
  onMessage: WS_CREATED_ORDERS_GET_MESSAGE
};

const feedUrl = 'wss://norma.nomoreparties.space/orders/all';
const createdOrdersUrl = 'wss://norma.nomoreparties.space/orders';


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,
  socketMiddleware(feedUrl, wsFeedActions),
  socketMiddleware(createdOrdersUrl, wsCreatedOrdersActions, true)
));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
