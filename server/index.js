const dotenv = require('dotenv');
dotenv.config();
const Router = require('koa-router');
const axios = require('axios');
const R = require('ramda');
const mockSession = require('./mockSession');

const {
    SHOPIFY_API_SECRET_KEY,
    SHOPIFY_API_KEY,
    FRONT_END_URL,
} = process.env;

module.exports = function (app) {
    const router = new Router();
    console.log('Start Shopify Auth Callback module');

    router.get('/callback', async (ctx, next) => {

        if (typeof (ctx.request.query.code) == 'undefined')
            ctx.throw(401, 'Missing code in querystring.', {});

        const code = ctx.request.query.code;

        // TODO: validate shop
        if (typeof (ctx.request.query.shop) == 'undefined')
            ctx.throw(401, 'Missing shop in querystring.', {});

        const shop = ctx.request.query.shop;

        console.log('Send request to get access token');
        console.log('Shop: ' + shop);
        console.log('Code: ' + code);

        const httpClient = createHttpClient(shop);

        let access_token = await R.compose(
            R.partial(logReceivedData, ['Received access_token']),
            R.partial(getDataFromResponse, [["data", "access_token"]]),
            getShopifyAccessToken
        )(httpClient, {
            client_id: SHOPIFY_API_KEY,
            client_secret: SHOPIFY_API_SECRET_KEY,
            code: code
        });

        let storefront_access_token = await R.compose(
            R.partial(logReceivedData, ['Received storefront_access_token']),
            R.partial(getDataFromResponse, [["data", "storefront_access_token", "access_token"]]),
            getShopifyStoreFrontAccessToken
        )(httpClient, access_token);

        saveTokensInSession({ access_token, storefront_access_token, shop });

        ctx.redirect(`${FRONT_END_URL}?storefrontaccesstoken=${storefront_access_token}&shop=${shop}`);
    });

    router.post('/admin/checkout', async (ctx) => {
        const { access_token, shop } = getTokensFromSession();

        const httpClient = R.compose(
            R.partial(createHttpClientWithHeader, [shop]),
            createCheckoutHeader
        )(access_token, shop);

        let response = await R.compose(
            R.partial(logReceivedData, ['Received checkout info']),
            R.partial(getDataFromResponse, [["data"]]),
            startShopifyCheckout
        )(httpClient, ctx.request.body);

        ctx.body = response;
    });

    app.use(router.routes());
}

function createHttpClient(shop) {
    return axios.create({
        baseURL: `https://${shop}`,
    });
}

function createHttpClientWithHeader(shop, header) {
    return axios.create({
        baseURL: `https://${shop}`,
        headers: header
    });
}

function getShopifyAccessToken(httpClient, payload) {
    return httpClient.post('/admin/oauth/access_token', payload);
}

function getShopifyStoreFrontAccessToken(httpClient, accessToken) {
    // request storefront_access_tokens
    return httpClient.post('/admin/api/2020-04/storefront_access_tokens.json', {
        "access_token": accessToken,
        "storefront_access_token": {
            "title": "Maestro"
        }
    });
}

function startShopifyCheckout(httpClient, payload) {
    return httpClient.post("/admin/checkouts.json", payload)
}

function createCheckoutHeader(access_token, shop) {
    return {
        "X-Shopify-Access-Token": access_token,
        "Content-Type": "application/json",
        "X-Host-Override": shop,
    };
}

function logReceivedData(msg, promise) {
    return promise
        .then((data) => {
            console.log(`${msg}: ${data}`);
            return data;
        });
}

function getDataFromResponse(path, promise) {
    return promise
        .then((response) => R.path(path, response))
        .catch((error) => console.error(error));
}

function saveTokensInSession(tokens) {
    //ctx.cookies.set('tokens', ctx.tokens.access_token, { signed: true, httpOnly: false });
    mockSession.tokens = tokens;
}

function getTokensFromSession() {
    return mockSession.tokens;
}
