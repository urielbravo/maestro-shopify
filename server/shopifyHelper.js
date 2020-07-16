const axios = require('axios');
const R = require('ramda');

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

module.exports = {

    getShopifyAccessToken: ({ shop, code }) => R.compose(
        R.partial((payload, httpClient) =>
            httpClient.post('/admin/oauth/access_token', payload), [generatePartnerPayload(code)]),
        createHttpClient
    )(shop),

    getShopifyStoreFrontAccessToken: ({ shop, accessToken }) => R.compose(
        R.partial((accessToken, httpClient) =>
            httpClient.post('/admin/api/2020-04/storefront_access_tokens.json',),
            [generateStorePayload(accessToken)]),
        createHttpClient
    )(shop),

    startShopifyCheckout: ({ shop, accessToken, payload }) => R.compose(
        R.partial((payload, httpClient) => httpClient.post("/admin/checkouts.json", payload), [payload]),
        createHttpClient,
    )(shop, accessToken),

    getShippingRates: ({ shop, accessToken, token }) => R.compose(
        R.partial((token, httpClient) => httpClient.get(`/admin/checkouts/${token}/shipping_rates.json`), [token]),
        createHttpClient,
    )(shop, accessToken),

    createCheckoutPayment: ({ shop, accessToken, token, payload }) => R.compose(
        R.partial((token, payload, httpClient) => httpClient.post(`/admin/checkouts/${token}/payments.json`, payload), [token, payload]),
        createHttpClient,
    )(shop, accessToken)
}

const createHttpClient = (shop, accessToken) => R.compose(
    (conf) => axios.create(conf),
    generateHttpConfiguration
)(shop, accessToken);

const generateHttpConfiguration = (shop, accessToken) => R.ifElse(
    R.compose(R.isNil, R.prop('accessToken')),
    generateBaseConfiguration,
    generateHeaderConfiguration
)({ shop, accessToken });

const generateBaseConfiguration = ({ shop }) => { return { 'baseURL': `https://${shop}` } };

const generateHeaderConfiguration = ({ shop, accessToken }) => R.assoc('headers', {
    "X-Shopify-Access-Token": accessToken, "Content-Type": "application/json", "X-Host-Override": shop,
}, generateBaseConfiguration({shop}));

const generatePartnerPayload = (code) => {
    return { "client_id": SHOPIFY_API_KEY, "client_secret": SHOPIFY_API_SECRET_KEY, code };
};

const generateStorePayload = (accessToken) => {
    return { "access_token": accessToken, "storefront_access_token": { "title": "Maestro" } };
};
