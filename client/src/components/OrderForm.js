import React, { useState } from "react";
import "../styles/OrderForm.css";
import CardInfo from "./CardInfo";
import { useInput } from '../hooks/input-hook';

function OrderForm(props) {
  const [buyState, setBuyState] = useState(false)

  // input forms values
  const { value:first_name, bind:bindfirst_name} = useInput('');
  const { value:last_name, bind:bindlast_name} = useInput('');
  const { value:address1, bind:bindaddress1} = useInput('');
  const { value:city, bind:bindcity} = useInput('');
  const { value:province_code, bind:bindprovince_code} = useInput('');
  const { value:zip, bind:bindzip} = useInput('');
  const { value:phone, bind:bindphone} = useInput('');
  const { value:email, bind:bindemail} = useInput('');

  let changeBuyState = (buyStateChange) => {
    setBuyState(buyStateChange)
  }

let inputInfo = {
  first_name,
  last_name,
  address1,
  city,
  province_code,
  zip,
  phone,
  email
}



  return (
    <>
      {buyState ? (
        <CardInfo 
        productVariantId={props.productVariantId}
        productTitle={props.productTitle}
        productPrice={props.productPrice}
        changeBuyState={changeBuyState}
        inputInfo={inputInfo}
        />
      ) : (
        <>
          <section className="order-form">
            <h3 id="order-form-text">Order Form</h3>
            <hr />
            <div className="info-input">
              <form>
                <label htmlFor="shipping">
                  <span>Shipping</span>
                  <input
                    type="text"
                    name="first_name"
                    id="first-name"
                    placeholder="First Name"
                    {...bindfirst_name}
                  />
                  <input
                    type="text"
                    name="last_name"
                    id="last-name"
                    placeholder="Last Name"
                    {...bindlast_name}
                  />
                  <input
                    type="text"
                    name="address1"
                    id="adress"
                    placeholder="Adress"
                    {...bindaddress1}
                  />
                  <input type="text" name="city" id="city" placeholder="City" {...bindcity} />
                  <input
                    type="text"
                    name="province_code"
                    id="State"
                    placeholder="State"
                    {...bindprovince_code}
                  />
                  <input
                    type="text"
                    name="zip"
                    id="zip-code"
                    placeholder="Zip Code"
                    {...bindzip}
                  />
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    {...bindphone}
                  />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    {...bindemail}
                  />
                </label>
              </form>
            </div>
          </section>
          {/* <section className="billing">
            <input type="checkbox" name="billing" id="billing" />
            <label htmlFor="billing">Same as shipping</label>
          </section> */}
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
            <button onClick={() => setBuyState(!buyState)}>Continue</button>
          </section>
        </>
      )}
    </>
  );
}

export default OrderForm;
