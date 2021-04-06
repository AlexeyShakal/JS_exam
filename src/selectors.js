import * as R from "ramda";



export const getPizzaById = ({ pizzas }, id) => R.prop(id, pizzas);



export const getPizzas = (state, ownProps) => {
  const activeCategoryId = R.path(["params", "id"], ownProps);
  const applySearch = pizza =>
    R.pipe(
      R.prop("name"),
      R.toLower,
      R.contains(R.toLower(state.pizzasPage.search))
    )(pizza);

  const applyCategory = item =>
    R.equals(activeCategoryId, R.prop("categoryId", item));

  const pizzas = R.pipe(
    R.map(id => getPizzaById(state, id)),
    R.when(R.always(activeCategoryId), R.filter(applyCategory)),
    R.filter(applySearch)
  )(state.pizzasPage.ids);

  return pizzas;
};



export const getRenderedPizzasLength = state => R.length(state.pizzasPage.ids);



export const getTotalBasketCount = state => R.length(state.basket);



export const getTotalBasketPrice = state =>
  state.basket.reduce((sum, id) => sum + state.pizzas[id].price, 0);


export const getCategories = state => R.values(state.categories);


export const getActiveCategoryId = ownProps =>
  R.path(["params", "id"], ownProps);



export const getBasketPizzasWithCount = state => {
  const uniqueIds = R.uniq(state.basket);

  const pizzaCount = id =>
    R.pipe(R.filter(basketId => R.equals(id, basketId)), R.length)(
      state.basket
    );

  const pizzaWithCount = pizza => R.assoc("count", pizzaCount(pizza.id), pizza);

  const pizzas = R.pipe(
    R.map(id => getPizzaById(state, id)),
    R.map(pizzaWithCount)
  )(uniqueIds);

  return pizzas;
};
