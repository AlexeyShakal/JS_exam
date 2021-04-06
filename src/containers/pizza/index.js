import * as R from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { getPizzaById } from "../../selectors";
import BasketCart from "../../components/basketCart";
import {
  FETCH_PIZZA_BY_ID_START,
  ADD_PIZZA_TO_BASKET
} from "../../actionTypes";

class Pizza extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.dispatch({ type: FETCH_PIZZA_BY_ID_START, payload: id });
  }

  renderContent() {
    const { pizza } = this.props;

    return (
      <div className="thumbnail">
        <div className="row">
          <div className="col-md-6">
            <img className="img-thumbnail" src={pizza.image} alt={pizza.name} />
          </div>
          <div className="col-md-6">{this.renderFields()}</div>
        </div>
        <div className="caption-full">
          <h4 className="pull-right">${pizza.price}</h4>
          <h4>{pizza.name}</h4>
          <p>{pizza.description}</p>
        </div>
      </div>
    );
  }

  renderSidebar() {
    const { pizza, dispatch } = this.props;
    return (
      <div>
        <p className="lead">Quick shop</p>
        <BasketCart />
        <div className="form-group">
          <h1>{pizza.name}</h1>
          <h2>${pizza.price}</h2>
        </div>
        <Link to="/" className="btn btn-info btn-block">
          Back to store
        </Link>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() =>
            dispatch({ type: ADD_PIZZA_TO_BASKET, payload: pizza.id })
          }
        >
          Add to cart
        </button>
      </div>
    );
  }

  renderFields() {
    const { pizza } = this.props;
    const columnFields = R.compose(
      R.toPairs,
      R.pick([
        "size",
        "weight"        
      ])
    )(pizza);

    return columnFields.map(([key, value]) => (
      <div className="column" key={key}>
        <div className="ab-details-title">
          <p>{key}</p>
        </div>
        <div className="ab-details-info">{value}</div>
      </div>
    ));
  }

  render() {
    const { pizza } = this.props;
    return (
      <div className="view-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9">{pizza && this.renderContent()}</div>
            <div className="col-md-3">{pizza && this.renderSidebar()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  pizza: getPizzaById(state, state.pizzaPage.id)
});

export default connect(mapStatetoProps)(Pizza);
