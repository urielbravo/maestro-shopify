import React, { useState, useEffect } from "react";
import Confirmation from "./Confirmation";
import axios from "axios";

function CardInfo(props) {
  const [cardInfo, setCardInfo] = useState(false);
  const [checkout, setCheckout] = useState("")

  let changecardInfo = (cardInfoChange) => {
    setCardInfo(cardInfoChange)
  }

  let shippinginfo = props.inputInfo


  useEffect(() => {
    axios.post("https://cors-anywhere.herokuapp.com/https://maestro-store-1.myshopify.com/admin/checkouts.json", props.checkoutRequestData,
      {
        headers: {
          "X-Shopify-Access-Token":"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",
          "Content-Type": "application/json",
          "X-Host-Override": "maestro-store-1.myshopify.com"
        }
      }
    )
    .then((res) => {
      setCheckout(res.data)
    })
    .catch(err => {
      console.log(err)
    })
},[])

  return (
    <>
      {console.log(`this is the axios response: ${JSON.stringify(checkout)}`)}
      {cardInfo ? (
        <Confirmation 
        productVariantId={props.productVariantId}
        productTitle={props.productTitle}
        productPrice={props.productPrice}
        changecardInfo={changecardInfo}
        shippinginfo={shippinginfo}
        />
      ) : (
        <>
          <section className="order-form">
            <h3 id="order-form-text">Card info</h3>
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
              </form>
            </div>
          </section>
          <section className="summary">
            <h4 id="summary-text">Summary</h4>
            <div className="summary-product">
              <p>{props.productTitle}</p>
              <p>{props.productPrice}</p>
            </div>
            <div className="summary-shipping">
              <p>Shipping</p>
              <p>$5.29</p>
            </div>
            <div className="summary-total">
              <p>Total</p>
              <p id="total">{`$${Number(props.productPrice) + 5.29}`}</p>
            </div>
            <button onClick={() => setCardInfo(!cardInfo)}>Continue</button>
            <button onClick={() => props.changeBuyState(false)}>Go Back</button>
          </section>
        </>
      )}
    </>
  );
}

export default CardInfo;
