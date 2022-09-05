import { IHttpRequest } from "./http-request";
import { IHttpResponse } from "./http-response";

export interface IMockFile {
    duration: number;
    request: IHttpRequest;
    response: IHttpResponse;
}
