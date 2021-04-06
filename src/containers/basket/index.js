import React from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { Link } from "react-router";
import { getBasketPizzasWithCount, getTotalBasketPrice } from "../../selectors";
import {
  REMOVE_PIZZA_FROM_BASKET,
  CLEAN_BASKET,
  BASKET_CHECKOUT
} from "../../actionTypes";
const Basket = ({ pizzas, totalPrice, dispatch }) => {
  const isBasketEmpty = R.isEmpty(pizzas);

  const renderContent = () => {
    return (
      <div>
        {isBasketEmpty && <div>Your shopping cart is empty</div>}

        <div className="table-responsive">
          <table className="table-bordered table-striped table-condensed cf">
            <tbody>
              {pizzas.map((pizza, index) => (
                <tr key={index} className="item-checout">
                  <td className="first-column-checkout">
                    <img
                      className="img-thumbnail"
                      src={pizza.image}
                      alt={pizza.name}
                    />
                  </td>
                  <td>{pizza.name}</td>
                  <td>${pizza.price}</td>
                  <td>{pizza.count}</td>
                  <td>
                    <span
                      onClick={() =>
                        dispatch({
                          type: REMOVE_PIZZA_FROM_BASKET,
                          payload: pizza.id
                        })
                      }
                      className="delete-cart"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {R.not(isBasketEmpty) && (
          <div className="row">
            <div className="pull-right total-user-checkout">
              <b>Total:</b>
              ${totalPrice}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSidebar = () => (
    <div>
      <Link className="btn btn-info" to="/">
        <span className="glyphicon glyphicon-info-sign" />
        <span> Continue shopping!</span>
      </Link>
      {R.not(isBasketEmpty) && (
        <div>
          <button
            onClick={() => dispatch({ type: CLEAN_BASKET })}
            className="btn btn-danger"
          >
            <span className="glyphicon glyphicon-trash" /> Clear Cart
          </button>
          <button
            className="btn btn-success"
            onClick={() => dispatch({ type: BASKET_CHECKOUT, payload: pizzas })}
          >
            <span className="glyphicon glyphicon-envelope" /> Checkout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="view-container">
      <div className="container">
        <div className="row">
          <div className="col-md-9">{renderContent()}</div>
          <div className="col-md-3 btn-user-checkout">{renderSidebar()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  pizzas: getBasketPizzasWithCount(state),
  totalPrice: getTotalBasketPrice(state)
});


export default connect(mapStateToProps)(Basket);
