// import * as R from "ramda";
import { put, takeEvery, call, select } from "redux-saga/effects";
import {
  FETCH_PIZZAS_START,
  FETCH_PIZZAS_SUCCESS,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  LOAD_MORE_PIZZAS_START,
  LOAD_MORE_PIZZAS_SUCCESS,
  FETCH_PIZZA_BY_ID_START,
  FETCH_PIZZA_BY_ID_SUCCESS
} from "../actionTypes";
import * as api from "../api/";
import { getRenderedPizzasLength } from "../selectors";


export function* fetchPizzas(action) {
  let pizzas = yield call(api.fetchPizzas);
  yield put({ type: FETCH_PIZZAS_SUCCESS, payload: pizzas });
}

export function* loadMorePizzas(action) {
  const state = yield select();
  const offset = getRenderedPizzasLength(state);
  let pizzas = yield call(api.loadMorePizzas, { offset });
  yield put({ type: LOAD_MORE_PIZZAS_SUCCESS, payload: pizzas });
}

export function* fetchPizzaById(action) {
  const pizza = yield call(api.fetchPizzaById, action.payload);
  yield put({ type: FETCH_PIZZA_BY_ID_SUCCESS, payload: pizza });
}

export function* fetchCategories(action) {
  const pizzas = yield call(api.fetchCategories);
  yield put({ type: FETCH_CATEGORIES_SUCCESS, payload: pizzas });
}

export function* watchPizzasFetching() {
  yield takeEvery(FETCH_PIZZAS_START, fetchPizzas);
  yield takeEvery(FETCH_PIZZA_BY_ID_START, fetchPizzaById);
  yield takeEvery(FETCH_CATEGORIES_START, fetchCategories);
  yield takeEvery(LOAD_MORE_PIZZAS_START, loadMorePizzas);
}

export default function* rootSaga() {
  yield watchPizzasFetching();
}
