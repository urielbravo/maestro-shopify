import React from "react";
import "../styles/ProductDisplay.css";
import ProductView from './ProductView'
import Client from 'shopify-buy';
import { StorefrontContext } from './StorefrontContext'


function ProductDisplay(props) {
  const context = React.useContext(StorefrontContext);

  let product = props.products.find((obj) => {
    return obj.node.id === props.productID;
  });

  function startCheckout() {
    const client = Client.buildClient({
      domain: context.shop,
      storefrontAccessToken: context.access_token
    });

    // Create checkout
    return client.checkout.create().then((checkout) => {
      // Do something with the checkout
      const lineItemsToAdd = [
        {
          variantId: product.node.variants.edges[0].node.id,
          quantity: 1
        }
      ];

      // Add an item to the checkout
      return client.checkout.addLineItems(checkout.id, lineItemsToAdd).then((checkout) => {
        // complete checkout
        window.open(checkout.webUrl);
      });
    });
  }

  return (
    <div className="product-display">
      <section className="product-view">
        <ProductView
          productViewImage={product
            ? product.node.images.edges[0].node.originalSrc
            : "https://cdn.shopify.com/s/files/1/0397/5567/7862/products/putting-on-your-shoes_925x_f71c19ac-c091-4c7f-bbfe-a43d6a0456b7.jpg?v=1590783853"}
          productViewTitle={product
            ? product.node.title
            : "Nasty Gal Limited Edition T-Shirt 2020"}
          productViewDescription={product
            ? product.node.description
            : "Here goes a bunch of description text and then there was the other shirt and I loved it but let's go"}
          productViewPrice={product ? product.node.variants.edges[0].node.price : "$19.99"}
        />
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
          <p>{product
            ? product.node.title
            : "Nasty Gal Limited Edition T-Shirt 2020"}</p>
          <p>{product ? `$${product.node.variants.edges[0].node.price}` : "$19.99"}</p>
        </div>
        <div className="summary-shipping">
          <p>Shipping</p>
          <p>$5.29</p>
        </div>
        <div className="summary-total">
          <p>Total</p>
          <p id="total">{product ? `$${Number(product.node.variants.edges[0].node.price) + 5.29}` : "$25.28"}</p>
        </div>
        <button onClick={startCheckout}>Buy</button>
      </section>
    </div>
  );
}

export default ProductDisplay;
