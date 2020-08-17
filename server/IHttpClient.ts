interface IHttpClient {
    get(path: string): Promise<any>;
    post(path: string, payload: {}): Promise<any>;
}