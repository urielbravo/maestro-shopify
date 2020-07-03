const dotenv = require('dotenv');
dotenv.config();
const Router = require('koa-router');
const R = require('ramda');
const mockSession = require('./mockSession');
const shopifyHelper = require('./shopifyHelper');

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
            shopifyHelper.getShopifyAccessToken
        )(httpClient, {
            client_id: SHOPIFY_API_KEY,
            client_secret: SHOPIFY_API_SECRET_KEY,
            code: code
        });

        let storefront_access_token = await R.compose(
            R.partial(logReceivedData, ['Received storefront_access_token']),
            R.partial(getDataFromResponse, [["data", "storefront_access_token", "access_token"]]),
            shopifyHelper.getShopifyStoreFrontAccessToken
        )(httpClient, access_token);

        saveTokensInSession({ access_token, storefront_access_token, shop });

        ctx.redirect(`${FRONT_END_URL}?storefrontaccesstoken=${storefront_access_token}&shop=${shop}`);
    });

    router.post('/admin/checkouts', async (ctx) => {
        const { access_token, shop } = getTokensFromSession();

        const httpClient = R.compose(
            R.partial(shopifyHelper.createHttpClientWithHeader, [shop]),
            shopifyHelper.createCheckoutHeader
        )(access_token, shop);

        let response = await R.compose(
            R.partial(logReceivedData, ['Received checkout info']),
            R.partial(getDataFromResponse, [["data"]]),
            shopifyHelper.startShopifyCheckout
        )(httpClient, ctx.request.body);

        ctx.body = response;
    });

    router.get('/admin/checkouts/:token/shipping_rates', async (ctx) => {
        const { access_token, shop } = getTokensFromSession();

        const httpClient = R.compose(
            R.partial(shopifyHelper.createHttpClientWithHeader, [shop]),
            shopifyHelper.createCheckoutHeader
        )(access_token, shop);

        let response = await R.compose(
            R.partial(logReceivedData, ['Received shipping rate']),
            R.partial(getDataFromResponse, [["data"]]),
            R.partial(shopifyHelper.getShippingRates, [httpClient])
        )(ctx.params.token);

        ctx.body = response;
    });

    app.use(router.routes());
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
