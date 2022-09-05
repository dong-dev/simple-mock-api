import { HTTP_METHOD } from "../../common/http/method";

export interface IHttpRequest {
    path: string;
    method: string;
    headers?: Record<string, string>;
    body?: string;
}
