import express, { static as EStatic } from 'express';
import { delay } from './helpers/delay';
import { HttpRequestMatcher } from './models/http-request-matcher';
import { mocks } from './store/mock-files';
import cors from "cors";

export const app = express();

app.use(cors());
app.use(EStatic('public'));

app.all("*", async function (req, res, next) {
    const theRequestMatcher: HttpRequestMatcher = new HttpRequestMatcher(req.path, req.method, JSON.parse(JSON.stringify(req.headers)));
    const mock = mocks.find(e => theRequestMatcher.IsMatch(e.request));
    if (mock === undefined) {
        next();
        return;
    }
    Object.keys(mock.response.headers).forEach(key => {
        res.setHeader(key, mock.response.headers[key]);
    });
    res.status(mock.response.status);
    await delay(mock.duration);
    if (mock.response.json !== undefined) {
        return res.json(mock.response.json);
    }
    return res.send(mock.response.body);
})
app.all("*", function (req, res) {
    res.status(404);

    res.json({
        name: "NotFound",
        message: "Resource not found!",
    });
});
