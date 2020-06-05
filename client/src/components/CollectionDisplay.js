import React from "react";
import CollectionProduct from "./CollectionProduct";

function CollectionDisplay() {
  return (
    <div>
      <div className="collection-display">
        <section className="collection-name-section">
          <h3>FEATURED COLLECTION</h3>
          <p>Summer Rogs of Von Dam</p>
        </section>
        <section className="collection-products-section">
          <CollectionProduct />
          <CollectionProduct />
          <CollectionProduct />
          <CollectionProduct />
        </section>
      </div>
    </div>
  );
}

export default CollectionDisplay;
