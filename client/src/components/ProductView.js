import React, { useState, useContext, useEffect } from "react";
import "../styles/ProductView.css";
import * as R from "ramda";
import { SingleProductVariantContext } from "./SingleProductVariantContext"

function ProductView(props) {
  const [variantId, setVariantId] = useState("");
  const {productVariant, setProductVariant} = useContext(SingleProductVariantContext)

  let getSelectedVariantId = (e) => {
    setVariantId(e.target.value)
    setProductVariant(e.target.value)
  };

  let selectedVariant = () => {
    if (props.productVariants) {
      return props.productVariants.find((obj) => {
        return obj.node.id === variantId;
      });
    }

  };



  // validates that a variant has been selected
  let hasVariantSelected = R.hasPath(["node"], selectedVariant());

  return (
    <>
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
