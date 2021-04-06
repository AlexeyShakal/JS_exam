import * as R from "ramda";
import {
  FETCH_PIZZAS_SUCCESS,
  LOAD_MORE_PIZZAS_SUCCESS,
  SEARCH_PIZZA
} from "../actionTypes";

const initialState = {
  ids: [],
  search: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PIZZAS_SUCCESS:
      return R.merge(state, {
        ids: R.pluck("id", payload)
      });
    case LOAD_MORE_PIZZAS_SUCCESS:
      const ids = R.pluck("id", payload);
      return R.merge(state, {
        ids: R.concat(state.ids, ids)
      });
    case SEARCH_PIZZA:
      return R.merge(state, { search: payload });
    default:
      return state;
  }
};
