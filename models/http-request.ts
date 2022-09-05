import { isObject } from "class-validator";
import { HTTP_METHOD } from "../common/http/method";
import { IHttpRequest } from "./interfaces/http-request";

export class HttpRequest implements IHttpRequest {
    path: string = "";
    method: string = "";
    headers?: Record<string, string> | undefined;
    body?: string;
    constructor(data?: IHttpRequest) {
        if (!isObject(data)) {
            return;
        }
        this.path = Object.prototype.hasOwnProperty.call(data, 'path') ? data.path : this.path;
        this.method = Object.prototype.hasOwnProperty.call(data, 'method') ? data.method : this.method;
        this.headers = Object.prototype.hasOwnProperty.call(data, 'headers') && isObject(data.headers) ? data.headers : this.headers;
        this.body = Object.prototype.hasOwnProperty.call(data, 'body') ? data.body : this.body;
    }
}
