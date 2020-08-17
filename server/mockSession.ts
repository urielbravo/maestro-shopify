export type Tokens = {
    accessToken: string,
    storefrontAccessToken?: string,
    shop: string
}

export function Session(): Tokens {
    let session: Tokens = { 
        accessToken: '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',
        storefrontAccessToken: 'b3b3d1dcffb02d681b1a14323d3d94f5',
        shop: 'maestro-store-1.myshopify.com'
    };
    return session; 
}