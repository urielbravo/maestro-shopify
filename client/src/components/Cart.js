import React, { useContext } from "react";
import OrderForm from "./OrderForm";
import "../styles/Cart.css";
import { CartProductsContext } from './CartProductsContext'

function Cart(props) {
  const { cartProducts } = useContext(CartProductsContext)

  let displayProducts = cartProducts.map((product) => {
    return (
      <>
        <div className="product-layout">
          <img className="cart-image" src={product.productViewImage} alt={product.productViewTitle} />
          <div className="product-text">
            <p>{product.productViewTitle}</p>
            <div className="cart-right-items">
              <p>${product.productViewPrice}</p>
              <p>remove</p>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="cart-product">{displayProducts}</div>
      <div className="cart-subtotal">
        <p>Subtotal({cartProducts.length})</p>
        <p>${cartProducts.reduce((a, b) => +a + +b.productViewPrice, 0)}</p>
      </div>
      <OrderForm />
      <div className="billing-option">
        <h4>Billing</h4>
        <div className="billing-checkbox">
          <input type="checkbox" name="billing" id="billing" />
          <label htmlFor="billing">Same as shipping</label>
        </div>
      </div>
    </>
  );
}

export default Cart;
