import { isObject } from "class-validator";
import { HttpRequest } from "./http-request";

export class HttpRequestMatcher {
    path: string;
    method: string;
    headers: Record<string, string> = {};

    constructor(path: string, method: string, headers?: Record<string, string>) {
        this.path = path;
        this.method = method.toLowerCase();
        if (!!headers && isObject(headers)) {

            Object.keys(headers).forEach(key => {
                this.headers[key.toLowerCase()] = headers[key];
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
        return true;
    }
}
