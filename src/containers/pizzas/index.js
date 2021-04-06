import * as R from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import {
  FETCH_PIZZAS_START,
  FETCH_CATEGORIES_START,
  LOAD_MORE_PIZZAS_START,
  ADD_PIZZA_TO_BASKET
} from "../../actionTypes";
import { getPizzas } from "../../selectors";

class Pizzas extends Component {
  componentDidMount() {
    this.props.dispatch({ type: FETCH_PIZZAS_START });
    this.props.dispatch({ type: FETCH_CATEGORIES_START });
  }

  renderPizza(pizza, index) {
    const { dispatch } = this.props;
    const shortDescription = `${R.take(60, pizza.description)}...`;

    return (
      <div className="col-sm-4 col-lg-4 col-md-4 book-list" key={index}>
        <div className="thumbnail">
          <img className="img-thumbnail" src={pizza.image} alt={pizza.name} />
          <div className="caption">
            <h4 className="pull-right">${pizza.price}</h4>
            <h4>
              <Link to={`/pizzas/${pizza.id}`}>{pizza.name}</Link>
            </h4>
            <p>{shortDescription}</p>
            <p className="itemButton">
              <button
                className="btn btn-primary"
                onClick={() =>
                  dispatch({ type: ADD_PIZZA_TO_BASKET, payload: pizza.id })
                }
              >
                Buy Now!
              </button>
              <Link to={`/pizzas/${pizza.id}`} className="btn btn-default">
                More info
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { pizzas, dispatch } = this.props;

    return (
      <div>
        <div className="books row">
          {pizzas.map((pizza, index) => this.renderPizza(pizza, index))}
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={() => dispatch({ type: LOAD_MORE_PIZZAS_START })}
              className="pull-right btn btn-primary"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pizzas: getPizzas(state, ownProps)
});

export default connect(mapStateToProps)(Pizzas);
