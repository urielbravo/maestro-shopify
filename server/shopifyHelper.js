const axios = require('axios');
const R = require('ramda');

const createHttpClient = (shop, accessToken) =>
    R.ifElse(
        R.isNil,
        R.partial((shop) => axios.create({ baseURL: `https://${shop}` }), [shop]),
        R.partial((shop) => axios.create({
            baseURL: `https://${shop}`,
            headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json",
                "X-Host-Override": shop,
            }
        }), [shop])
    )(accessToken);

module.exports = {

    getShopifyAccessToken: ({shop, payload}) => R.compose(
        R.partial((payload, httpClient) =>
            httpClient.post('/admin/oauth/access_token', payload), [payload]),
        createHttpClient
    )(shop),

    // request storefront_access_tokens
    getShopifyStoreFrontAccessToken: ({shop, accessToken}) =>
        R.compose(
            R.partial((accessToken, httpClient) =>
                httpClient.post('/admin/api/2020-04/storefront_access_tokens.json', {
                    "access_token": accessToken,
                    "storefront_access_token": {
                        "title": "Maestro"
                    }
                }),
                [accessToken]),
            createHttpClient
        )(shop),

    startShopifyCheckout: ({shop, accessToken, payload}) => R.compose(
        R.partial((payload, httpClient) => httpClient.post("/admin/checkouts.json", payload), [payload]),
        createHttpClient,
    )(shop, accessToken),

    getShippingRates: ({shop, accessToken, token}) => R.compose(
        R.partial((token, httpClient) => httpClient.get(`/admin/checkouts/${token}/shipping_rates.json`), [token]),
        createHttpClient,
    )(shop, accessToken),

    createCheckoutPayment: ({shop, accessToken, token, payload}) => R.compose(
        R.partial((token, payload, httpClient) => httpClient.post(`/admin/checkouts/${token}/payments.json`, payload), [token, payload]),
        createHttpClient,
    )(shop, accessToken)
}