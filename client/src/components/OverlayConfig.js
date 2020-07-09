import React, { useState } from "react";
import "../styles/OverlayConfig.css";
import * as R from "ramda";

function OverlayConfig(props) {
  const [produtId, setProdutId] = useState("");
  const [variantId, setVariantId] = useState("");

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

  let getSelectedVariantId = (e) => {
    setVariantId(e.target.value);
  };

  let selectedVariant = () => {
    if (hasProductSelected) {
      return selectedProduct[0].node.variants.edges.find((obj) => {
        return obj.node.id === variantId;
      });
    }
  };

  // validates that a variant has been selected
  let hasVariantSelected = R.hasPath(["node"], selectedVariant());

  return (
    <div className="overlay-config-panel-container">
      {/* {hasProductSelected ? console.log(`object id: ${JSON.stringify(selectedProduct[0].node.variants.edges)} state variantId:${variantId}`) : null} */}
      {/* {console.log(selectedVariant(), hasVariantSelected)} */}
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
          <option value="" selected disabled hidden>
            Choose a product
          </option>
          {products}
        </select>
      </div>
      <div className="overlay-variant">
        <label htmlFor="overlay-variant">VARIANT</label>
        <select
          onChange={getSelectedVariantId}
          name="overlay-variant"
          id="overlay-variant"
        >
          <option value="" selected disabled hidden>
            Choose a variant
          </option>
          {renderVariants()}
        </select>
      </div>
      <div className="overlay-preview-container">
        <img
          id="overlay-preview-image"
          src={
            hasProductSelected
              ? selectedProduct[0].node.images.edges[0].node.originalSrc
              : null
          }
          alt={
            hasProductSelected
              ? selectedProduct[0].node.images.edges[0].node.altText
              : null
          }
        />
        <div className="overlay-preview-text">
          <p>
            {hasProductSelected
              ? selectedProduct[0].node.title
              : "select a product to see preview"}
          </p>
          <p style={{ marginTop: "0.5em" }}>
            {hasVariantSelected ? `$${selectedVariant().node.price}` : ""}
          </p>
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
