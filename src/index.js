import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"; //provide store to smart component
import { createStore, applyMiddleware, combineReducers } from "redux";//combineReducers combine all reducers into root.reducer
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import './index.css';
import App from "./containers/App";
import * as serviceWorker from './serviceWorker';
import "tachyons";
import { searchRobots, requestRobots } from "./reducers";


const logger = createLogger(); //logger is a Middleware, every action dispatch to reducer will log in to console
const rootReducer = combineReducers({ searchRobots, requestRobots });

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)//in order, thunkMiddleware first
);

ReactDOM.render(

    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
