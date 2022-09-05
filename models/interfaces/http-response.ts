export interface IHttpResponse {
    status: number;
    headers: Record<string, string>;
    body?: string;
    json?: unknown;
}
