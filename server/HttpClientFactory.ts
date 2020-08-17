import axios, { AxiosInstance } from 'axios';

type config = {
    shop: string,
    accessToken?: string
}

export default class HttpClientFactory {
    static create(config: config): IHttpClient {
        if (config.accessToken)
            return axios.create(HttpClientFactory.generateHeaderConfiguration(config));
        else
            return axios.create(HttpClientFactory.generateBaseConfiguration(config));
    }

    private static generateBaseConfiguration(config: config): object {
        return { 'baseURL': `https://${config.shop}` }
    };

    private static generateHeaderConfiguration(config: config): object {
        return (<any>Object).assign({
            'headers': {
                "X-Shopify-Access-Token": config.accessToken, "Content-Type": "application/json", "X-Host-Override": config.shop,
            }
        }, HttpClientFactory.generateBaseConfiguration(config));
    };
}