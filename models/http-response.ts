import { isObject } from "class-validator";
import { IHttpResponse } from "./interfaces/http-response";

export class HttpResponse implements IHttpResponse {
    status: number = 0;
    headers: Record<string, string> = {};
    body?: string = "";
    json?: unknown;
    constructor(data?: IHttpResponse) {
        if (!isObject(data)) {
            return;
        }
        this.status = Object.prototype.hasOwnProperty.call(data, 'status') ? data.status : this.status;
        this.headers = Object.prototype.hasOwnProperty.call(data, 'headers') && isObject(data.headers) ? data.headers : this.headers;
        this.body = Object.prototype.hasOwnProperty.call(data, 'body') ? data.body : this.body;
        this.json = Object.prototype.hasOwnProperty.call(data, 'json') ? data.json : this.json;
    }
}
