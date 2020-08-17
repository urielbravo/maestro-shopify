import dotenv from 'dotenv';
import Router from 'koa-router';
import { Session, Tokens } from './mockSession';
import AuthenticateShopifyService from './AuthenticateShopifyService';
import ShopifyStoreFrontService from './ShopifyStoreFrontService';
import HttpClientFactory from './HttpClientFactory';

dotenv.config();
const shopifyConfig = {
    clientId: process.env.SHOPIFY_API_KEY,
    clientSecret: process.env.SHOPIFY_API_SECRET_KEY,
    frontEndUrl: process.env.FRONT_END_URL
};

let mockSession: Tokens = Session();

export function createRouter(): Router {
    const router = new Router();
    console.log('Start Shopify Auth Callback module');

    router.get('/callback', async (ctx: any) => {

        console.log('Send request to get access token');
        const shop = getValueQuerystringOrThrow401(ctx, ['request', 'query', 'shop'], 'Missing shop in querystring.');
        const code = getValueQuerystringOrThrow401(ctx, ['request', 'query', 'code'], 'Missing code in querystring.');

        const authenticateService = new AuthenticateShopifyService(
            HttpClientFactory.create({ shop })
        );
        const accessToken =
            await authenticateService.getAccessToken((<any>Object).assign({ code }, shopifyConfig))
                .then(resp => processResponse(resp, ["data", "access_token"], 'Received access_token'));

        const shopifyStore = new ShopifyStoreFrontService(
            HttpClientFactory.create({ shop, accessToken })
        );
        const storefrontAccessToken =
            await shopifyStore.getStoreFrontAccessToken(accessToken)
                .then(resp => processResponse(resp, ["data", "storefront_access_token", "access_token"],
                    'Received storefront_access_token'));

        saveTokensInSession({ accessToken, storefrontAccessToken, shop });

        ctx.redirect(`${shopifyConfig.frontEndUrl}?storefrontaccesstoken=${storefrontAccessToken}&shop=${shop}`);
    });

    router.post('/admin/checkouts', async (ctx) => {
        const shopifyStore = new ShopifyStoreFrontService(
            HttpClientFactory.create(getTokensFromSession())
        );
        ctx.body =
            await shopifyStore.startCheckout(ctx.request.body)
                .then(resp => processResponse(resp, ["data"], 'Received checkout info'));
    });

    router.get('/admin/checkouts/:token/shipping_rates', async (ctx) => {
        const shopifyStore = new ShopifyStoreFrontService(
            HttpClientFactory.create(getTokensFromSession())
        );
        ctx.body =
            await shopifyStore.getShippingRates(ctx.params.token)
                .then(resp => processResponse(resp, ["data"], 'Received shipping rate'));
    });

    router.post('/admin/checkouts/:token/payments', async (ctx) => {
        const shopifyStore = new ShopifyStoreFrontService(
            HttpClientFactory.create(getTokensFromSession())
        );
        ctx.body =
            await shopifyStore.createCheckoutPayment({ token: ctx.params.token, payload: ctx.request.body })
                .then(resp => processResponse(resp, ["data"], 'Received payment information'));
    });

    return router;
}

const getValueQuerystringOrThrow401 = (ctx: any, dataPath: string[], logMsg: string) => {
    const queryStringValue = getPathFromObject(ctx, dataPath);
    if (typeof queryStringValue == 'undefined') {
        ctx.throw(401, logMsg);
    }
    return queryStringValue;
}

const processResponse = (resp: object, dataPath: string[], logMsg: string) => {
    const responseValue = getPathFromObject(resp, dataPath);
    console.log(`${logMsg}: ${responseValue}`)
    return responseValue;
}

const getPathFromObject = (obj: any, path: string[]): string => {
    if (path.length == 1) {
        return obj[path.join()];
    }
    return getPathFromObject(obj[path[0]], path.slice(1));
}

function saveTokensInSession(tokens: Tokens) {
    mockSession = tokens;
}

const getTokensFromSession = () => mockSession;
