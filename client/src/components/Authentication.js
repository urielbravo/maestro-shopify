import React, { useState } from "react";

function Authentication() {
  const [shopURL, setShopURL] = useState("");

  const handleChange = (e) => {
    setShopURL(e.target.value);
  };

  const openWindow = () => {
    const client_id = "3d13efcddd4814181030c1736beb50b7";
    const scope =
      "unauthenticated_read_product_listings,unauthenticated_write_checkouts,unauthenticated_write_customers,unauthenticated_read_customer_tags,unauthenticated_read_content,unauthenticated_read_product_tags";
    const redirect_uri = "https://3d8fb43bef08.ngrok.io/auth/callback";
    const state = "ok";
    const url = `https://${shopURL}.myshopify.com/admin/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <h1>SHOPIFY SETTINGS</h1>
      <h3>
        Enter th name of your Shopify store and click connect to authenticate
        your store to Maestro
      </h3>
      <p>Value is...{shopURL}</p>
      <span>https://</span>
      <input type="text" placeholder="my-store" onChange={handleChange} />
      <span>.myshopify.com</span>
      <br />
      <button type="submit" onClick={openWindow}>
        Connect!
      </button>
    </div>
  );
}

export default Authentication;
