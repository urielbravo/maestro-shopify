import React, { useState } from "react";
import "../styles/ProductView.css";
import * as R from "ramda";

function ProductView(props) {
  const [variantId, setVariantId] = useState("");

  let getSelectedVariantId = (e) => {
    setVariantId(e.target.value);
  };


  let selectedVariant = () => {
      return props.productVariants.find((obj) => {
        return obj.node.id === variantId;
      });
  };

  // validates that a variant has been selected
  let hasVariantSelected = R.hasPath(["node"], selectedVariant());

  return (
    <>
      {console.log(selectedVariant())}
      <img id="product-image" src={props.productViewImage} alt="" />
      <p id="product-title">{props.productViewTitle}</p>
      <p id="product-description">{props.productViewDescription}</p>
      <div className="overlay-variant">
        <label htmlFor="overlay-variant" style={{ marginTop: "0.4em" }}>SELECT VARIANT</label>
        <select
          onChange={getSelectedVariantId}
          name="overlay-variant"
          id="overlay-variant"
        >
          <option value="" selected disabled hidden>
            Choose a variant
          </option>
          {props.productVariants.map((variant) => (
            <option key={variant.node.id} value={variant.node.id}>
              {variant.node.title}
            </option>
          ))}
        </select>
      </div>
      <p id="product-price">
        {hasVariantSelected ? `$${selectedVariant().node.price}` : ""}
      </p>
    </>
  );
}

export default ProductView;
