import React from "react";
import "./App.css";
// import Authentication from "./components/Authentication";
// import Connected from "./components/Connected";
import ProductSettingsPanel from "./components/ProductSettingsPanel";
import CollectionDisplay from "./components/CollectionDisplay";
import ProductDisplay from "./components/ProductDisplay";
import SettingsPanel from "./components/SettingsPanel";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      productID: "",
      shop: [],
      collections: [],
      collectionID: "",
    };

    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.onCollectionSelect = this.onCollectionSelect.bind(this);
  }

  componentDidMount() {
    axios
      .post(
        "https://maestro-store-1.myshopify.com/api/graphql",
        {
          query: `{
            shop {
              name
            }
      products(first: 100) {
        edges {
          node {
            id
            title
            description
            variants(first: 3){
              edges {
                node{
                  price
                }
              }
            }
            images(first: 1) {
              edges{
                node{
                  id
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
      collections(first: 100) {
        edges {
          node {
                  id
                  title
                  description
                  products (first: 100){
                    edges{
                      node{
                        id
                        title
                        description
                        variants(first: 3){
                          edges {
                            node{
                              price
                            }
                          }
                        }
                        images(first: 1) {
                          edges{
                            node{
                              id
                              originalSrc
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
    }`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              "c58041071dcfc77a86ad631cf6e91633",
          },
        }
      )
      .then((res) => {
        this.setState({
          products: res.data.data.products.edges,
          shop: res.data.data.shop.name,
          collections: res.data.data.collections.edges,
        });
      });
  }

  onOptionSelect(selectedOption) {
    this.setState({ productID: selectedOption });
  }

  onCollectionSelect(collection) {
    this.setState({ collectionID: collection });
  }


  render() {
    return (
      <div className="App">
        <SettingsPanel />
        <div className="right-side">
          <ProductSettingsPanel
            products={this.state.products}
            onOptionSelect={this.onOptionSelect}
            shopName={this.state.shop}
            collections={this.state.collections}
            onCollectionSelect={this.onCollectionSelect}
          />
          <CollectionDisplay
            collections={this.state.collections}
            collectionID={this.state.collectionID}
          />
          {/* <ProductDisplay
            products={this.state.products}
            productID={this.state.productID}
          /> */}
        </div>
      </div>
    );
  }
}

export default App;
