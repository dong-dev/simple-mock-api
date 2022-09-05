import { resolve } from "path";
import { HTTP_METHOD } from "../../common/http/method";
import { mockFileLoader } from "../../helpers/mock-file-loader";
import { HttpRequestMatcher } from "../../models/http-request-matcher";

describe('Mock File Loader', () => {
    it('should get files', () => {
        const mocks = mockFileLoader(resolve(__dirname, "./mocks"));
        expect(mocks.length).toBeGreaterThanOrEqual(1);
    });
    it('should match a record', () => {
        const mocks = mockFileLoader(resolve(__dirname, "./mocks"));
        const theRequestMatcher = new HttpRequestMatcher(
            "/",
            HTTP_METHOD.GET,
        )
        const mock = mocks.find(e => theRequestMatcher.IsMatch(e.request));
        expect(mock).toBeDefined();
    });
    it('should not match any record', () => {
        const mocks = mockFileLoader(resolve(__dirname, "./mocks"));
        const theRequestMatcher = new HttpRequestMatcher(
            "/",
            HTTP_METHOD.POST,
        )
        const mock = mocks.find(e => theRequestMatcher.IsMatch(e.request));
        expect(mock).toBeUndefined();
    });
});
