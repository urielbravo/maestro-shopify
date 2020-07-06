import React, { useState, useEffect } from "react";
import Congrats from "./Congrats";
import axios from "axios";

function Confirmation(props) {
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    const dataTemp = {
      payment: {
        amount: props.Amount,
        session_id: props.SessionId,
        unique_token: "7ada5660-ede3-48a5-9eef-de6566bc0116", //client-side-idempotency-token
      },
    };

    console.log("dataTemp", dataTemp, props.Token);

    axios
      .post(
        `http://localhost:5000/admin/checkouts/${props.Token}/payments`,
        dataTemp
      )
      .then(async (res) => console.log(res))
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <>
      {confirmation ? (
        <Congrats />
      ) : (
          <>
            {/* {console.log(props.shippinginfo)}
          <section className="order-form">
            <h3 id="order-form-text">confirmation</h3>
            <hr />
            <div className="info-input">
              <p style={{ marginBottom: "1em", fontWeight: "bold" }}>
                Check info is correct
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>name:</span>{" "}
                {`${props.shippinginfo.first_name}  ${props.shippinginfo.last_name}`}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>email:</span>{" "}
                {props.shippinginfo.email}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>adress:</span>{" "}
                {props.shippinginfo.address1}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>phone:</span>{" "}
                {props.shippinginfo.phone}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>city:</span>{" "}
                {props.shippinginfo.city}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>state:</span>{" "}
                {props.shippinginfo.province_code}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>zip:</span>{" "}
                {props.shippinginfo.zip}
              </p>
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
            <button onClick={() => setConfirmation(!confirmation)}>
              Continue
            </button>
            <button onClick={() => props.changecardInfo(false)}>Go Back</button>
          </section> */}
          </>
        )}
    </>
  );
}

export default Confirmation;
