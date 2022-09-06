import { isObject } from "class-validator";
import { HttpRequest } from "./http-request";

export class HttpRequestMatcher {
    path: string;
    method: string;
    headers: Record<string, string> = {};
    params: Record<string, boolean | string | number> = {};

    constructor(path: string, method: string, headers?: Record<string, string>, params?: Record<string, boolean | string | number>) {
        this.path = path;
        this.method = method.toLowerCase();
        if (!!headers && isObject(headers)) {

            Object.keys(headers).forEach(key => {
                this.headers[key.toLowerCase()] = headers[key];
            });
        }
        if (!!params && isObject(params)) {

            Object.keys(params).forEach(key => {
                this.params[key.toLowerCase()] = params[key];
            });
        }
    }
    public IsMatch(request: HttpRequest): boolean {
        const pathRegexp = new RegExp(request.path);
        if (!pathRegexp.test(this.path)) return false;
        if (request.method != this.method) return false;
        if (request.headers && isObject(request.headers)) {
            for (const key of Object.keys(request.headers).map(k => k.toLowerCase())) {
                const headerRegex = new RegExp(request.headers[key]);
                if (!headerRegex.test(this.headers[key])) return false;
            }
        }
        if (request.params && isObject(request.params)) {
            for (const key of Object.keys(request.params).map(k => k.toLowerCase())) {
                const paramRegex = new RegExp(request.params[key].toString());
                if (!paramRegex.test(this.params[key]?.toString())) return false;
            }
        }

        return true;
    }
}
