import React, { useState, useContext, useEffect } from "react";
import "../styles/OrderForm.css";
import CardInfo from "./CardInfo";
import { useInput } from '../hooks/input-hook';
import { SingleProductVariantContext } from "./SingleProductVariantContext"



function OrderForm(props) {
  const [buyState, setBuyState] = useState(false)
  const [decodedVariant, setDecodedVariant] = useState("")

  const { productVariant } = useContext(SingleProductVariantContext)

  // input forms values
  const { value:first_name, bind:bindfirst_name} = useInput('asdasd');
  const { value:last_name, bind:bindlast_name} = useInput('asdasd');
  const { value:address1, bind:bindaddress1} = useInput('asdasd');
  const { value:city, bind:bindcity} = useInput('asdasd');
  const { value:province_code, bind:bindprovince_code} = useInput('az');
  const { value:zip, bind:bindzip} = useInput('85820');
  const { value:phone, bind:bindphone} = useInput('6421612165');
  const { value:email, bind:bindemail} = useInput('azazueta@alioit.com');


  let changeBuyState = (buyStateChange) => {
    setBuyState(buyStateChange)
  }

  useEffect(() => {
    if (productVariant) {
      let variantId = atob(productVariant)
      setDecodedVariant(variantId.match("(?<=ProductVariant\/).*"))
      // setDecodedVariant(atob(productVariant).search("(?<=ProductVariant\/).*)"))
    }
  }, [productVariant])
  

let checkoutRequestData = {
  "checkout": {
    email,
    "line_items": [
      {
        "variant_id": decodedVariant,
        "quantity": 1
      }
    ],
    "shipping_address": {
      first_name,
      last_name,
      address1,
      city,
      province_code,
      "country_code": "US",
      phone,
      zip
    }
  }
}


  return (
    <>
    {console.log(`decoded variant: ${decodedVariant}`)}
      {buyState ? (
        <CardInfo 
        productVariantId={props.productVariantId}
        productTitle={props.productTitle}
        productPrice={props.productPrice}
        changeBuyState={changeBuyState}
        // inputInfo={inputInfo}
        checkoutRequestData={checkoutRequestData}
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
            {/* <h4 id="summary-text">Summary</h4>
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
            </div> */}
            <button onClick={() => setBuyState(!buyState)}>Continue</button>
          </section>
        </>
      )}
    </>
  );
}

export default OrderForm;
