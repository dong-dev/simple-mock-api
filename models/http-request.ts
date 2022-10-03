import { isObject } from "class-validator";
import { HTTP_METHOD } from "../common/http/method";
import { IHttpRequest } from "./interfaces/http-request";

export class HttpRequest implements IHttpRequest {
    path: string = "";
    method: string = "";
    headers?: Record<string, string>;
    body?: string;
    params?: Record<string, boolean | string | number>;
    constructor(data?: IHttpRequest) {
        if (!isObject(data)) {
            return;
        }
        this.path = Object.prototype.hasOwnProperty.call(data, 'path') ? data.path : this.path;
        this.method = Object.prototype.hasOwnProperty.call(data, 'method') ? data.method.toLowerCase() : this.method;
        this.headers = Object.prototype.hasOwnProperty.call(data, 'headers') && isObject(data.headers) ? data.headers : this.headers;
        this.params = Object.prototype.hasOwnProperty.call(data, 'params') && isObject(data.params) ? data.params : this.params;
        this.body = Object.prototype.hasOwnProperty.call(data, 'body') ? data.body : this.body;
    }
}
