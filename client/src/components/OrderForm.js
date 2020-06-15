import React from "react";
import '../styles/OrderForm.css'

function OrderForm() {
  let product = "";
  let startCheckout = "";

  return (
    <div className="info-input">
      <form action="">
        <label htmlFor="credit-debit-card" id="credit-debit-card-text">
          Credit/Debit Card
          <input
            type="text"
            name="card-number"
            id="card-number"
            placeholder="Card Number"
          />
          <input
            type="text"
            name="expiration"
            id="expiration"
            placeholder="Expiration MM/YY"
          />
          <input type="text" name="cvc" id="cvc" placeholder="CVC" />
        </label>
        <label htmlFor="shipping">
          <span>Shipping</span>
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="First Name"
          />
          <input
            type="text"
            name="last-name"
            id="last-name"
            placeholder="Last Name"
          />
          <input type="text" name="adress" id="adress" placeholder="Adress" />
          <input type="text" name="city" id="city" placeholder="City" />
          <input type="text" name="State" id="State" placeholder="State" />
          <input
            type="text"
            name="zip-code"
            id="zip-code"
            placeholder="Zip Code"
          />
          <input type="text" name="phone" id="phone" placeholder="Phone" />
          <input type="text" name="email" id="email" placeholder="Email" />
        </label>
      </form>
      <section className="billing">
        <div className="billing-option">
          <h4>Billing</h4>
          <div className="billing-checkbox">
            <input type="checkbox" name="billing" id="billing" />
            <label htmlFor="billing">Same as shipping</label>
          </div>
        </div>
      </section>
      <section className="summary">
        <h4 id="summary-text">Summary</h4>
        <div className="summary-product">
          <p>
            {product
              ? product.node.title
              : "Nasty Gal Limited Edition T-Shirt 2020"}
          </p>
          <p>
            {product
              ? `$${product.node.variants.edges[0].node.price}`
              : "$19.99"}
          </p>
        </div>
        <div className="summary-shipping">
          <p>Shipping</p>
          <p>$5.29</p>
        </div>
        <div className="summary-total">
          <p>Total</p>
          <p id="total">
            {product
              ? `$${Number(product.node.variants.edges[0].node.price) + 5.29}`
              : "$25.28"}
          </p>
        </div>
        <button className="buy-with-shopify" onClick={startCheckout}>Buy</button>
      </section>
    </div>
  );
}

export default OrderForm;
