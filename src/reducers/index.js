import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import pizzas from "./pizzas";
import pizzasPage from "./pizzasPage";
import pizzaPage from "./pizzaPage";
import basket from "./basket";
import categories from "./categories";

export default combineReducers({
  routing: routerReducer,
  pizzas,
  pizzasPage,
  pizzaPage,
  basket,
  categories
});
