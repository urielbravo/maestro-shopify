const dotenv = require('dotenv');
dotenv.config();
const Router = require('koa-router');
const R = require('ramda');
const mockSession = require('./mockSession');
const shopifyHelper = require('./shopifyHelper');

const { FRONT_END_URL } = process.env;

module.exports = function (app) {
    const router = new Router();
    console.log('Start Shopify Auth Callback module');

    router.get('/callback', async (ctx) => {

        console.log('Send request to get access token');
        const shop = getValueQuerystring(ctx.request.query, ['shop'], ctx); // TODO: validate shop

        let accessToken = await R.compose(
            R.curry(processResponse)(["data", "access_token"], 'Received access_token'),
            shopifyHelper.getShopifyAccessToken
        )({ shop, code: getValueQuerystring(ctx.request.query, ['code'], ctx) });

        let storefrontAccessToken = await R.compose(
            R.curry(processResponse)(
                ["data", "storefront_access_token", "access_token"], 'Received storefront_access_token'),
            shopifyHelper.getShopifyStoreFrontAccessToken
        )({ shop, accessToken });

        saveTokensInSession({ accessToken, storefrontAccessToken, shop });

        ctx.redirect(`${FRONT_END_URL}?storefrontaccesstoken=${storefrontAccessToken}&shop=${shop}`);
    });

    router.post('/admin/checkouts', async (ctx) => {
        ctx.body = await R.compose(
            R.curry(processResponse)(["data"], 'Received checkout info'),
            shopifyHelper.startShopifyCheckout,
        )(R.merge(getTokensFromSession(), { payload: ctx.request.body }));
    });

    router.get('/admin/checkouts/:token/shipping_rates', async (ctx) => {
        ctx.body = await R.compose(
            R.curry(processResponse)(["data"], 'Received shipping rate'),
            shopifyHelper.getShippingRates,
            R.tap(data => console.log(data))
        )(R.merge(getTokensFromSession(), { token: ctx.params.token }));
    });

    router.post('/admin/checkouts/:token/payments', async (ctx) => {
        ctx.body = await R.compose(
            R.curry(processResponse)(["data"], 'Received payment information'),
            shopifyHelper.createCheckoutPayment
        )(R.merge(getTokensFromSession(), { token: ctx.params.token, payload: ctx.request.body }));
    })

    app.use(router.routes());
}

const getValueQuerystring = (queryString, dataPath, ctx) => R.compose(
    R.tap((data) => console.log(`${dataPath.join()}: ${data}`)),
    R.unless(R.compose(R.not, R.isNil), () => { ctx.throw(401, `Missing ${dataPath.join()} in querystring.`) })
)(R.path(dataPath, queryString));

const processResponse = (dataPath, logMsg, promise) => R.compose(
    R.tap(R.partial((msg, promise) => promise.then((data) => console.log(`${msg}: ${data}`)), [logMsg])),
    promise => R.otherwise(error => console.error(error))(promise),
    R.partial((path, promise) => R.andThen(response => R.path(path, response))(promise), [dataPath])
)(promise);

function saveTokensInSession(tokens) {
    mockSession.tokens = tokens;
}

const getTokensFromSession = () => mockSession.tokens;
