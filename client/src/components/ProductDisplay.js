import React, { useState, useContext } from "react";
import "../styles/ProductDisplay.css";
import ProductView from "./ProductView";
import Client from "shopify-buy";
import { StorefrontContext } from "./StorefrontContext";
import OrderForm from "./OrderForm";
import { SingleProductVariantContext } from "./SingleProductVariantContext"

function ProductDisplay(props) {
  const [shipping_address, setShippingAddress] = useState({});
  const [productVariant, setProductVariant] = useState("")

  const context = React.useContext(StorefrontContext);

  let product = props.products.find((obj) => {
    return obj.node.id === props.productID;
  });

  function startCheckout() {
    const client = Client.buildClient({
      domain: context.shop,
      storefrontAccessToken: context.access_token,
    });

    // Create checkout
    return client.checkout.create().then((checkout) => {
      // Do something with the checkout
      const lineItemsToAdd = [
        {
          variantId: product.node.variants.edges[0].node.id,
          quantity: 1,
        },
      ];

      // Add an item to the checkout
      return client.checkout
        .addLineItems(checkout.id, lineItemsToAdd)
        .then((checkout) => {
          // complete checkout
          window.open(checkout.webUrl);
        });
    });
  }

  return (
    <>
    <SingleProductVariantContext.Provider value={{productVariant, setProductVariant}}>
    <div className="product-display">
      {/* {product && console.log(product.node.variants.edges)} */}
      <section className="product-view">
        {product ? (
          <ProductView
            productViewImage={product.node.images.edges[0].node.originalSrc}
            productViewTitle={product.node.title}
            productViewDescription={product.node.description}
            productViewPrice={product.node.variants.edges[0].node.price}
            productVariants={product.node.variants.edges}
          />
        ) : (
          <span></span>
        )}
      </section>

      {product ? (
        <OrderForm
          productVariantId={product.node.variants.edges[0].node.id}
          productTitle={product.node.title}
          productPrice={product.node.variants.edges[0].node.price}
        />
      ) : (
        <span>Choose a product and click save to see it here</span>
      )}
    </div>
    </SingleProductVariantContext.Provider>
    </>
  );
}

export default ProductDisplay;
