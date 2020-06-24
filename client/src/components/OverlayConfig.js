import React, { useState, useEffect } from "react";
import "../styles/OverlayConfig.css";
import * as R from "ramda";

function OverlayConfig(props) {
  const [produtId, setProdutId] = useState("");
  // const [variants, setVariants] = useState([])

  // get every product to show in an option
  let products = props.overlayProducts.map((product) => {
    return (
      <option key={product.node.id} value={product.node.id}>
        {product.node.title}
      </option>
    );
  });

  // get the selected product from options
  let getSelectedProductId = (e) => {
    setProdutId(e.target.value);
  };

  // find selected product from options
  let selectedProduct = props.overlayProducts.filter((obj) => {
    return obj.node.id === produtId;
  });


  // validates a product has been selected
  let hasProductSelected = R.hasPath(
    [0, "node", "variants", "edges"],
    selectedProduct
  );

  let renderVariants = () => {
    if (hasProductSelected) {
      return selectedProduct[0].node.variants.edges.map((variant) => (
        <option key={variant.node.id} value={variant.node.id}>
          {variant.node.title}
        </option>
      ));
    }
  };

  return (
    <div className="overlay-config-panel-container">
      {console.log(selectedProduct)}
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
        <select
          onChange={getSelectedProductId}
          name="overlay-product"
          id="overlay-product"
        >
          {products}
        </select>
      </div>
      <div className="overlay-variant">
        <label htmlFor="overlay-variant">VARIANT</label>
        <select name="overlay-variant" id="overlay-variant">
          {renderVariants()}
        </select>
      </div>
      <div className="overlay-preview-container">
        <img
          id="overlay-preview-image"
          src={hasProductSelected ? selectedProduct[0].node.images.edges[0].node.originalSrc : null}
          alt={hasProductSelected ? selectedProduct[0].node.images.edges[0].node.altText : null}
        />
        <div className="overlay-preview-text">
          <p>{hasProductSelected ? selectedProduct[0].node.title : "select a product to see preview"}</p>
          <p style={{ marginTop: "0.5em" }}>$19.99</p>
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
