import React, { useState } from "react";
import ProductView from "./ProductView";
import ProductDisplay from "./ProductDisplay";

function CollectionProductDetail(props) {
  const [buyProduct, setbuyProduct] = useState("");

  let renderProductBuy = () => {
    return <ProductDisplay />;
  };

  let addToCart = () => {

  }

  return (
    <div>
      <ProductView
            productViewImage={props.productImage}
            productViewTitle={props.productTitle}
            productViewDescription={props.productDescription}
            productViewPrice={props.productPrice}
          />
      {buyProduct === "" ? (
        <>
          
          <button
            onClick={addToCart}
          >ADD TO CART</button>
          <button
            onClick={() =>
              setbuyProduct({
                productViewImage: props.productImage,
                productViewTitle: props.productTitle,
                productViewDescription: props.productDescription,
                productViewPrice: props.productPrice
              })
            }
          >
            BUY NOW
          </button>
        </>
      ) : (
        <>
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
          <p>{props.productTitle}</p>
          <p>{`$${props.productPrice}`}</p>
        </div>
        <div className="summary-shipping">
          <p>Shipping</p>
          <p>$5.29</p>
        </div>
        <div className="summary-total">
          <p>Total</p>
          <p id="total">{`$${Number(props.productPrice) + 5.29}`}</p>
        </div>
        <button>Buy</button>
      </section>
        </>
      )}
    </div>
  );
}

export default CollectionProductDetail;
