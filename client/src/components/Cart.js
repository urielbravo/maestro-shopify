import React from "react";
import OrderForm from "./OrderForm";
import "../styles/Cart.css";

function Cart() {

  
  let cartProducts = [
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      title: "product 1",
      price: 19.99,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      title: "product 2",
      price: 14.99,
    },
  ];

  let displayProducts = cartProducts.map((product) => {
    return (
      <>
        <div className="product-layout">
          <img id={product.id} src={product.image} alt={product.title} />
          <div className="product-text">
            <p>{product.title}</p>
            <div className="cart-right-items">
              <p>{product.price}</p>
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
        <p>${cartProducts.reduce((a, b) => +a + +b.price, 0)}</p>
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
