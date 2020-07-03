const axios = require('axios');

module.exports = {

    createHttpClient: function (shop) {
        return axios.create({
            baseURL: `https://${shop}`,
        });
    },

    createHttpClientWithHeader: function (shop, header) {
        return axios.create({
            baseURL: `https://${shop}`,
            headers: header
        });
    },

    getShopifyAccessToken: function (httpClient, payload) {
        return httpClient.post('/admin/oauth/access_token', payload);
    },

    getShopifyStoreFrontAccessToken: function (httpClient, accessToken) {
        // request storefront_access_tokens
        return httpClient.post('/admin/api/2020-04/storefront_access_tokens.json', {
            "access_token": accessToken,
            "storefront_access_token": {
                "title": "Maestro"
            }
        });
    },

    startShopifyCheckout: function (httpClient, payload) {
        return httpClient.post("/admin/checkouts.json", payload)
    },

    getShippingRates: function (httpClient, token) {
        return httpClient.get(`/admin/checkouts/${token}/shipping_rates.json`);
    },

    createCheckoutHeader: function (access_token, shop) {
        return {
            "X-Shopify-Access-Token": access_token,
            "Content-Type": "application/json",
            "X-Host-Override": shop,
        };
    }
}