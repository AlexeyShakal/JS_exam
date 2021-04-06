import * as R from "ramda";

import {
  FETCH_PIZZAS_SUCCESS,
  LOAD_MORE_PIZZAS_SUCCESS,
  FETCH_PIZZA_BY_ID_SUCCESS
} from "../actionTypes";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PIZZAS_SUCCESS:
      const newPizzas = R.indexBy(R.prop("id"), payload);
      return R.merge(state, newPizzas);
    case LOAD_MORE_PIZZAS_SUCCESS:
      const morePizzas = R.indexBy(R.prop("id"), payload);
      return R.merge(state, morePizzas);
    case FETCH_PIZZA_BY_ID_SUCCESS:
      return R.assoc(payload.id, payload, state);
    default:
      return state;
  }
};
