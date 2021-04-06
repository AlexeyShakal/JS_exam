import * as R from "ramda";
import pizzas from "./mockPizzas";
import categories from "./mockCategories";

export const fetchPizzas = async () => Promise.resolve(pizzas);
export const loadMorePizzas = async ({ offset }) => Promise.resolve(pizzas);
export const fetchPizzaById = async id => {
  const pizza = R.find(R.propEq("id", id), pizzas);
  return Promise.resolve(pizza);
};
export const fetchCategories = async () => Promise.resolve(categories);
