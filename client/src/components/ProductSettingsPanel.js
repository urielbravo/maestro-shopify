import React from "react";
import "../styles/ProductSettingsPanel.css";

function ProductSettingsPanel() {
  return (
    <div className="product-settings">
      <section className="save">
        <span>&lt;</span>
        <p>save</p>
      </section>

      <section className="select-icon">
        <div className="icon-select-container">
          <label htmlFor="icon">Icon</label>
          <select name="icon" id="icon">
            <option value="icon-1">Icon 1</option>
            <option value="icon-2">Icon 2</option>
            <option value="icon-3">Icon 3</option>
            <option value="icon-4">Icon 4</option>
            <option value="icon-5">Icon 5</option>
          </select>
        </div>
        <div className="icon-name-container">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
      </section>

      <section className="product-section">
        <div className="connected-store">
          <label htmlFor="store">CONNECTED STORE</label>
          <input
            type="text"
            name="store"
            id="store"
            value="https//mestro-store.myshopify.com"
          />
        </div>
        <div className="featured-item">
          <label htmlFor="feature-item">
            FEATURED ITEM
            <input type="radio" name="featured-product" id="featured-product" />
            <input
              type="radio"
              name="featured-collection"
              id="featured-collection"
            />
          </label>
        </div>
        <div className="select-product">
          <label htmlFor="select-product">SELECT PRODUCT</label>
          <select name="select-product" id="select-product">
            <option value="product-1">Product 1</option>
            <option value="product-2">Product 2</option>
            <option value="product-3">Product 3</option>
            <option value="product-4">Product 4</option>
            <option value="product-5">Product 5</option>
          </select>
        </div>
        <div className="product-preview">
          <div className="product-image">
            <img src="https://via.placeholder.com/120" alt="" />
          </div>
          <div className="product-description">
            <p>Nasty Gal Limited Edition T-Shirt 2020</p>
            <p>$19.99</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSettingsPanel;
