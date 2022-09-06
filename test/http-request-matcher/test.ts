import { HTTP_METHOD } from "../../common/http/method";
import { HttpRequest } from "../../models/http-request";
import { HttpRequestMatcher } from "../../models/http-request-matcher";

describe('Http Request Matcher', () => {
    it('should match', () => {
        const theRequestBeingCache = new HttpRequest({
            path: "^/.*$",
            method: HTTP_METHOD.GET,
        });
        const theRequestMatcher = new HttpRequestMatcher("/", HTTP_METHOD.GET);
        const isMatched = theRequestMatcher.IsMatch(theRequestBeingCache);
        expect(isMatched).toBe(true);
    });
    it('should match + header', () => {
        const theRequestBeingCache = new HttpRequest({
            path: "^/.*$",
            method: HTTP_METHOD.GET,
            headers: {
                Authorization: "^Bearer.*$"
            }
        });
        const theRequestMatcher = new HttpRequestMatcher("/", HTTP_METHOD.GET, {
            Authorization: "Bearer jwt"
        });
        const isMatched = theRequestMatcher.IsMatch(theRequestBeingCache);
        expect(isMatched).toBe(true);
    });
    it('should match + params', () => {
        const theRequestBeingCache = new HttpRequest({
            path: "^/.*$",
            method: HTTP_METHOD.GET,
            params: {
                page: "1"
            }
        });
        const theRequestMatcher = new HttpRequestMatcher("/", HTTP_METHOD.GET, {}, {
            page: 1,
        });
        const isMatched = theRequestMatcher.IsMatch(theRequestBeingCache);
        expect(isMatched).toBe(true);
    });
    it('should not match if having invalid path', () => {
        const theRequestBeingCache = new HttpRequest({
            path: "^h.*$",
            method: HTTP_METHOD.GET,
        });
        const theRequestMatcher = new HttpRequestMatcher("/", HTTP_METHOD.GET);
        const isMatched = theRequestMatcher.IsMatch(theRequestBeingCache);
        expect(isMatched).toBe(false);
    });
    it('should not match if having invalid method', () => {
        const theRequestBeingCache = new HttpRequest({
            path: "^/.*$",
            method: HTTP_METHOD.POST,
        });
        const theRequestMatcher = new HttpRequestMatcher("/", HTTP_METHOD.GET);
        const isMatched = theRequestMatcher.IsMatch(theRequestBeingCache);
        expect(isMatched).toBe(false);
    });
});
