import { isNumber, isObject } from "class-validator";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";
import { IMockFile } from "./interfaces/mock-file";

export class MockFile implements IMockFile {
    request: HttpRequest = new HttpRequest();
    response: HttpResponse = new HttpResponse();
    duration: number = 0;
    constructor(data?: IMockFile) {
        if (!isObject(data)) {
            return;
        }
        this.request = Object.prototype.hasOwnProperty.call(data, 'request') && isObject(data.request) ? new HttpRequest(data.request) : this.request;
        this.response = Object.prototype.hasOwnProperty.call(data, 'response') && isObject(data.response) ? new HttpResponse(data.response) : this.response;
        this.duration = Object.prototype.hasOwnProperty.call(data, 'duration') && isNumber(data.duration) ? data.duration : this.duration;

    }
}
