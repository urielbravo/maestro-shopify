export default class AuthenticateShopifyService {
    private httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    getAccessToken(config: { code: string, clientId: string, clientSecret: string }): Promise<any> {
        return this.httpClient.post('/admin/oauth/access_token',
            this.generatePartnerPayload(config)
        )
    }

    private generatePartnerPayload(config: { code: string, clientId: string, clientSecret: string }): object {
        return { "client_id": config.clientId, "client_secret": config.clientSecret, code: config.code };
    }
}