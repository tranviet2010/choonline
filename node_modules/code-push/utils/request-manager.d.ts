import { Headers } from "../script/types";
interface JsonResponse {
    headers: Headers;
    body?: any;
}
declare class RequestManager {
    static SERVER_URL: string;
    static ERROR_GATEWAY_TIMEOUT: number;
    static ERROR_INTERNAL_SERVER: number;
    static ERROR_NOT_FOUND: number;
    static ERROR_CONFLICT: number;
    static ERROR_UNAUTHORIZED: number;
    private _accessKey;
    private _serverUrl;
    private _customHeaders;
    private _proxy;
    constructor(accessKey: string, customHeaders?: Headers, serverUrl?: string, proxy?: string);
    get(endpoint: string, expectResponseBody?: boolean): Promise<JsonResponse>;
    post(endpoint: string, requestBody: string, expectResponseBody: boolean, contentType?: string): Promise<JsonResponse>;
    patch(endpoint: string, requestBody: string, expectResponseBody?: boolean, contentType?: string): Promise<JsonResponse>;
    del(endpoint: string, expectResponseBody?: boolean): Promise<JsonResponse>;
    private makeApiRequest;
    private getCodePushError;
    private getErrorStatus;
    private getErrorMessage;
    private attachCredentials;
}
export = RequestManager;
