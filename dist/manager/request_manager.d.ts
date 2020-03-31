export interface RequestOptions {
    ignoreCache?: boolean;
    headers?: {
        [key: string]: string;
    };
    timeout?: number;
}
export declare const DEFAULT_REQUEST_OPTIONS: {
    ignoreCache: boolean;
    headers: {
        Accept: string;
    };
    timeout: number;
};
export interface RequestResult {
    ok: boolean;
    status: number;
    statusText: string;
    data: string;
    json: <T>() => T;
    headers: string;
}
export declare function request(method: "get" | "post", url: string, queryParams?: any, body?: any, options?: RequestOptions): Promise<RequestResult>;
