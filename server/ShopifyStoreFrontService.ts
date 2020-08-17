export default class ShopifyStoreFrontService {
    private httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    getStoreFrontAccessToken(accessToken: string): Promise<any> {
        return this.httpClient.post('/admin/api/2020-04/storefront_access_tokens.json',
            this.generateStorePayload(accessToken));
    }

    startCheckout(payload: object): Promise<any> {
        return this.httpClient.post("/admin/checkouts.json", payload);
    }

    getShippingRates(token: object): Promise<any> {
        return this.httpClient.get(`/admin/checkouts/${token}/shipping_rates.json`);
    }

    createCheckoutPayment(checkout: { token: string, payload: object }): Promise<any> {
        return this.httpClient.post(`/admin/checkouts/${checkout.token}/payments.json`, checkout.payload);
    };

    private generateStorePayload(accessToken: string): object {
        return { "access_token": accessToken, "storefront_access_token": { "title": "Maestro" } };
    }
}