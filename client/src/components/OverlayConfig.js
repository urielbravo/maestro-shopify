import React from "react";
import "../styles/OverlayConfig.css";

function OverlayConfig(props) {
  let products;

  return (
    <div className="overlay-config-panel-container">
      {console.log(`products: ${JSON.stringify(props.overlayProducts)}`)}
      <div className="connected-store">
        <label htmlFor="store">CONNECTED STORE</label>
        <input
          type="text"
          name="store"
          id="store"
          defaultValue={props.connectedShop}
        />
      </div>
      <div className="overlay-name">
        <label htmlFor="overlay-name">OVERLAY NAME</label>
        <input type="text" name="overlay-name" id="overlay-name" />
      </div>
      <div className="overlay-product">
        <label htmlFor="overlay-product">PRODUCT</label>
        <input type="text" name="overlay-product" id="overlay-product" />
      </div>
      <div className="overlay-variant">
        <label htmlFor="overlay-variant">VARIANT</label>
        <input type="text" name="overlay-variant" id="overlay-variant" />
      </div>
      <div className="overlay-preview-container">
        <img
          id="overlay-preview-image"
          src="https://picsum.photos/id/237/200"
          alt="dog image"
        />
        <div className="overlay-preview-text">
          <p>Nasti Gal limited edition t-shit 2020</p>
          <p style={{ marginTop:"0.5em" }}>$19.99</p>
        </div>
      </div>
      <div className="overlay-duration">
        <label htmlFor="overlay-duration">DURATION(SECONDS)</label>
        <input type="text" name="overlay-duration" id="overlay-duration" />
      </div>
      <p>CUSTOM IMAGE (OPTIONAL)</p>
      <p>
        By default, this overlay uses the template shown in the preview to the
        right. Optionally specify a custom image to use instead
      </p>
    </div>
  );
}

export default OverlayConfig;
