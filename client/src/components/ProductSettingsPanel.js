import React, { useState } from "react";
import "../styles/ProductSettingsPanel.css";
import Autosuggest from "react-autosuggest";
import { Typeahead } from "react-bootstrap-typeahead";

function ProductSettingsPanel(props) {
  const [productID, setProductID] = useState("");
  const [selectedOption, setSelectedOption] = useState("products");
  const [collectionID, setCollectionID] = useState("");
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);
  const [selected, setSelected] = useState("");

  let handleProductChange = (e) => {
    setProductID(e.target.value);
  };

  let trasferId = () => {
    props.onOptionSelect(productID);
    props.onCollectionSelect(collectionID);
  };

  let handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
    props.onFeatureSelection(changeEvent.target.value);
  };

  let handleCollectionChange = (e) => {
    setCollectionID(e.target.value);
    props.onFeatureSelection(selectedOption);
  };

  let assignSingleSelections = (e) => {
    setSingleSelections(e.target.value);
  };

  let collections = props.collections.map((collection) => {
    return (
      <option key={collection.node.id} value={collection.node.id}>
        {collection.node.title}
      </option>
    );
  });

  let products = props.products.map((product) => {
    return (
      <option key={product.node.id} value={product.node.id}>
        {product.node.title}
      </option>
    );
  });

  let product = props.products.find((obj) => {
    return obj.node.id === productID;
  });

  // this renders the collection view or the products view
  let renderOption = () => {
    if (selectedOption === "products") {
      return (
        <div>
          <div className="select-product">
            <label htmlFor="select-product">SELECT PRODUCT</label>
            {/* <Typeahead
              labelKey="title"
              id="select-product"
              onChange={(selected) => setSelected(selected)}
              options={products}
              placeholder="Choose a product..."
            /> */}
            {/* <Autosuggest
                inputProps={{
                  placeholder: "Select a product",
                  value: this.state.value,
                  onChange: (event, { newValue }) => {
                    this.setState({ value: newValue });
                  },
                }}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={
                  async ({value}) => {
                    if (!value) {
                      this.setState({ suggestions: [] })
                    }
                  }
                }
                onSuggestionsClearRequested={() => {
                  this.setState({ suggestions: [] })
                }}
                getSuggestionValue={(suggestion) => {
                  return suggestion.name
                }}
              renderSuggestion={suggestion => <div>{suggestion.name}</div>}
              /> */}
            <select
                onChange={handleProductChange}
                name="select-product"
                id="select-product"
              >
                {products}
              </select>
          </div>
          <div className="product-preview">
            
              <img
                id="panel-image"
                src={
                  product
                    ? product.node.images.edges[0].node.originalSrc
                    : "https://cdn.shopify.com/s/files/1/0397/5567/7862/products/putting-on-your-shoes_925x_f71c19ac-c091-4c7f-bbfe-a43d6a0456b7.jpg?v=1590783853"
                }
                alt={
                  product
                    ? product.node.images.edges[0].node.altText
                    : "Man doing up his LED high top running shoes"
                }
              />
            
            <div className="product-description">
              <p>
                {product
                  ? product.node.title
                  : "Nasty Gal Limited Edition T-Shirt 2020"}
              </p>
              <p style={{ marginTop: "0.5em" }}>
                {product ? product.node.variants.edges[0].node.price : "$19.99"}
              </p>
            </div>
          </div>
        </div>
      );
    } else if (selectedOption === "collections") {
      return (
        <div className="select-product">
          <label htmlFor="select-collection">SELECT COLLECTION</label>
          <select
            onChange={handleCollectionChange}
            name="select-collection"
            id="select-product"
          >
            {collections}
          </select>
        </div>
      );
    }
  };

  return (
    <div className="product-settings">
      {console.log(products)}
      <section className="save">
        <span>&lt;</span>
        <button id="save-button" onClick={trasferId}>
          save
        </button>
      </section>
      {/* {console.log(product)} */}
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
            defaultValue={props.shopName}
          />
        </div>
        <p className="featured-item-text">FEATURE ITEM</p>
        <div className="featured-item">
          <input
            type="radio"
            name="shop-items"
            id="radio-product"
            value="products"
            checked={selectedOption === "products"}
            onChange={handleOptionChange}
          />
          <label htmlFor="radio-product">FEATURED PRODUCT</label>
          <input
            type="radio"
            name="shop-items"
            id="radio-collection"
            value="collections"
            checked={selectedOption === "collections"}
            onChange={handleOptionChange}
          />
          <label htmlFor="radio-collection">FEATURED COLLECTION</label>
        </div>
        {renderOption()}
      </section>
    </div>
  );
}

export default ProductSettingsPanel;
