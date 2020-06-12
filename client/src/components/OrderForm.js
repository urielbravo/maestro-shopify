import React from 'react'

function OrderForm() {
    return (
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
        
    )
}

export default OrderForm
