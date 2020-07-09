import React, { useState, useEffect } from "react";
import { useInput } from "../hooks/input-hook";
import Confirmation from "./Confirmation";
import axios from "axios";
import * as R from "ramda";

function CardInfo(props) {
  const [cardInfo, setCardInfo] = useState(false);
  const [checkout, setCheckout] = useState("");
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState("");
  const [sessionId, setSessionId] = useState("");

  // input forms values
  const { value: number, bind: bindnumber } = useInput("1");
  const { value: month, bind: bindmonth } = useInput("12");
  const { value: year, bind: bindyear } = useInput("2024");
  const { value: verification_value, bind: bindverification_value } = useInput(
    "111"
  );

  let changecardInfo = (cardInfoChange) => {
    setCardInfo(cardInfoChange);
  };

  const handleCardData = async () => {
    const cardTemp = {
      payment: {
        amount: amount,
        unique_token: "30bcc15a-57b1-4e9d-b422-32b1d236fb9b", //client-side-idempotency-token
        credit_card: {
          number: number,
          month: month,
          year: year,
          verification_value: verification_value,
          first_name: firstName,
          last_name: lastName,
        },
      },
    };

    try {
      const response = await axios.post(
        "https://elb.deposit.shopifycs.com/sessions",
        cardTemp,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("changecardInfo response", response.data.id);
      setSessionId(
        R.hasPath(["data", "id"], response) && R.path(["data", "id"], response)
      );
    } catch (err) {
      console.log("err: ", err);
    } finally {
      changecardInfo(!cardInfo);
    }
  };

  let shippinginfo = props.inputInfo;

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/admin/checkouts",
        props.checkoutRequestData
      )
      .then(async (res) => {
        setCheckout(res.data);
        console.log(res);
        setAmount(
          R.hasPath(["data", "checkout", "total_price"], res) &&
          R.path(["data", "checkout", "total_price"], res)
        );
        setFirstName(
          R.hasPath(
            ["data", "checkout", "shipping_address", "first_name"],
            res
          ) &&
          R.path(["data", "checkout", "shipping_address", "first_name"], res)
        );
        setLastName(
          (R.hasPath(
            ["data", "checkout", "shipping_address", "last_name"],
            res
          ) &&
            R.path(
              ["data", "checkout", "shipping_address", "last_name"],
              res
            )) ||
          ""
        );

        setToken(
          (R.hasPath(["data", "checkout", "token"], res) &&
            R.path(["data", "checkout", "token"], res)) ||
          ""
        );

        if (R.hasPath(["data", "checkout", "token"], res)) {
          const token = R.path(["data", "checkout", "token"], res);
          const response = await axios.get(`http://localhost:5000/admin/checkouts/${token}/shipping_rates`);
        } else {
          alert("Algo Salio Mal");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          Token={token}
          Amount={amount}
          SessionId={sessionId}
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
                      name="number"
                      id="number"
                      placeholder="Card Number"
                      {...bindnumber}
                    />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <input
                        type="text"
                        name="expiration"
                        id="expiration"
                        placeholder="Expiration MM"
                        {...bindmonth}
                      />
                      <input
                        type="text"
                        name="expiration"
                        id="expiration"
                        placeholder="Expiration YYYY"
                        {...bindyear}
                      />
                    </div>
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      placeholder="CVC"
                      {...bindverification_value}
                    />
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
              <button onClick={() => handleCardData()}>Continue</button>
              <button onClick={() => props.changeBuyState(false)}>Go Back</button>
            </section>
          </>
        )}
    </>
  );
}

export default CardInfo;
