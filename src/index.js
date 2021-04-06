import "./main.css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";
import { syncHistoryWithStore } from "react-router-redux";
import { Router, Route, hashHistory } from "react-router";
import { Provider } from "react-redux";

import reducers from "./reducers";
import Layout from "./containers/layout";
import Pizzas from "./containers/pizzas";
import Pizza from "./containers/pizza";
import Basket from "./containers/basket";

import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Layout}>
        <Route path="/" component={Pizzas} />
        <Route path="/categories/:id" component={Pizzas} />
      </Route>
      <Route path="/pizzas/:id" component={Pizza} />
      <Route path="/basket" component={Basket} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
