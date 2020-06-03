import React from "react";
import "./App.css";
import Authentication from "./components/Authentication";
// import Connected from "./components/Connected";
import ProductSettingsPanel from "./components/ProductSettingsPanel";
import ProductDisplay from "./components/ProductDisplay";
import SettingsPanel from "./components/SettingsPanel";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';





class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios.post("https://maestro-store-1.myshopify.com/api/graphql", {
    query: `{
      products(first: 100) {
        edges {
          node {
            id
            title
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
    }`,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': 'c58041071dcfc77a86ad631cf6e91633'
      }
    })
    .then(res => {
      this.setState({
        products: res.data.data.products.edges
      });
    })
  }


  render() {
    {for (const product of this.state.products) {
      console.log(product.node)
    }}
    return (
      <div className="App">
        <SettingsPanel />
        <div className="right-side">
          <ProductSettingsPanel />
          <ProductDisplay />
        </div>
      </div>
    );
  }
}

export default App;
