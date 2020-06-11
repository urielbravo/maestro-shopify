const dotenv = require('dotenv');
dotenv.config();
const Router = require('koa-router');
const axios = require('axios');

const {
    SHOPIFY_API_SECRET_KEY,
    SHOPIFY_API_KEY,
    FRONT_END_URL,
} = process.env;

module.exports = function (app) {
    const router = new Router();
    console.log('start Shopify Auth Callback module');

    router.get('/callback', async (ctx) => {

        if (typeof (ctx.request.query.code) == 'undefined')
            ctx.throw(401, 'Missing code in querystring.', {});

        let code = ctx.request.query.code;

        // TODO: validate shop
        if (typeof (ctx.request.query.shop) == 'undefined')
            ctx.throw(401, 'Missing shop in querystring.', {});

        let shop = ctx.request.query.shop;

        console.log('send request to get access token');
        console.log('shop: ' + shop);
        console.log('code: ' + code);

        let token = await getStoreFrontAccessToken(shop, code);
        // ctx.body = { storefront_access_token: token }
        ctx.redirect(`${FRONT_END_URL}?storefrontaccesstoken=${token}`);

    });

    app.use(router.routes());
}

function getStoreFrontAccessToken(shop, code) {
    let accessToken;
    let storeFrontAccessToken;

    const httpClient = axios.create({
        baseURL: `https://${shop}`,
    });

    // request access_token
    return httpClient.post('/admin/oauth/access_token', {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET_KEY,
        code: code
    })
        .then(function (response) {
            accessToken = response.data.access_token;

            // TODO: save access_token
            console.log('received access_token: ');
            console.log(accessToken);

            // request storefront_access_tokens
            return httpClient.post('/admin/api/2020-04/storefront_access_tokens.json', {
                "access_token": accessToken,
                "storefront_access_token": {
                    "title": "Maestro"
                }
            })
                .then(function (response) {
                    storeFrontAccessToken = response.data.storefront_access_token.access_token;

                    console.log('received storefrontaccesstoken: ');
                    console.log(storeFrontAccessToken);
                    return storeFrontAccessToken;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}
