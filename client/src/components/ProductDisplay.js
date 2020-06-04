import React from "react";
import "../styles/ProductDisplay.css";

function ProductDisplay(props) {
  let product = props.products.find((obj) => {
    return obj.node.id === props.productID;
  });

  console.log(props.products);

  return (
    <div className="product-display">
      <section className="product-view">
        <img
          id="product-image"
          src={
            product
              ? product.node.images.edges[0].node.originalSrc
              : "https://cdn.shopify.com/s/files/1/0397/5567/7862/products/putting-on-your-shoes_925x_f71c19ac-c091-4c7f-bbfe-a43d6a0456b7.jpg?v=1590783853"
          }
          alt=""
        />
        <p id="product-title">
          {product
            ? product.node.title
            : "Nasty Gal Limited Edition T-Shirt 2020"}
        </p>
        <p>
          Here goes a bunch of description text and then there was the other
          shirt and I loved it but let's go
        </p>
        <p id="product-price">{product ? `$${product.node.variants.edges[0].node.price}` : "$19.99"}</p>
      </section>
      <section className="order-form">
        <h3 id="order-form-text">Order Form</h3>
        <hr />
        <div className="info-input">
          <form action="">
            <label htmlFor="credit-debit-card" id="creadit-debit-card-text">
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
              <input
                type="text"
                name="adress"
                id="adress"
                placeholder="Adress"
              />
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
        </div>
      </section>
      <section className="billing">
        <input type="checkbox" name="billing" id="billing" />
        <label htmlFor="billing">Same as shipping</label>
      </section>
      <section className="summary">
        <h4 id="summary-text">Summary</h4>
        <div className="summary-product">
          <p>Nasty Gal Limited Edition T-Shirt 2020</p>
          <p>$19.99</p>
        </div>
        <div className="summary-shipping">
          <p>Shipping</p>
          <p>$5.29</p>
        </div>
        <div className="summary-total">
          <p>Total</p>
          <p id="total">$25.28</p>
        </div>
        <button>Buy</button>
      </section>
    </div>
  );
}

export default ProductDisplay;
