import React, { useState } from "react";
import '../styles/Authentication.css'

const REDIRECT_URI = "https://c9fcf2066875.ngrok.io/callback";
const CLIENT_ID = "3d13efcddd4814181030c1736beb50b7";


function Authentication() {
  const [shopURL, setShopURL] = useState("");

  const handleChange = (e) => {
    setShopURL(e.target.value);
  };

  const openWindow = () => {
    const client_id = CLIENT_ID;;
    const scope =
      "unauthenticated_read_product_listings,unauthenticated_write_checkouts,unauthenticated_write_customers,unauthenticated_read_customer_tags,unauthenticated_read_content,unauthenticated_read_product_tags";
    const redirect_uri = REDIRECT_URI;;
    const state = "ok";
    const url = `https://${shopURL}/admin/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;
    window.open(url, "_blank");
  };

  return (
    <div className="authenticate-form">
      <h4 id="shopify-settings-text">SHOPIFY SETTINGS</h4>
      <p id="help-text">
        Enter the name of your Shopify store and click connect to authenticate
        your store to Maestro
      </p>
      <input type="text" placeholder="my-store.myshopify.com" onChange={handleChange} />
      <br />
      <button type="submit" onClick={openWindow}>
        Connect!
      </button>
    </div>
  );
}

export default Authentication;
