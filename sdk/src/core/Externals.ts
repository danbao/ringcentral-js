const root =
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (function getRoot() {
        return this;
    })();

export interface ExternalsOptions {
    fetch?: typeof fetch;
    Request?: typeof Request;
    Response?: typeof Response;
    Headers?: typeof Headers;
    localStorage?: Storage;
}

export default class Externals implements ExternalsOptions {
    public fetch = root.fetch || globalThis.fetch;

    public Request = root.Request || globalThis.Request;

    public Response = root.Response || globalThis.Response;

    public Headers = root.Headers || globalThis.Headers;

    public localStorage = root.localStorage;

    public constructor({
        fetch: fetchImpl,
        Request: RequestImpl,
        Response: ResponseImpl,
        Headers: HeadersImpl,
        localStorage,
    }: ExternalsOptions = {}) {
        if (fetchImpl) {this.fetch = fetchImpl;}
        if (RequestImpl) {this.Request = RequestImpl;}
        if (ResponseImpl) {this.Response = ResponseImpl;}
        if (HeadersImpl) {this.Headers = HeadersImpl;}
        if (localStorage) {this.localStorage = localStorage;}

        /* istanbul ignore next */
        if (!this.fetch || !this.Response || !this.Request || !this.Headers) {
            throw new Error('Fetch API is missing. Please provide fetch, Request, Response, and Headers implementations.');
        }

        /* istanbul ignore next */
        if (!this.localStorage) {
            // Instead of throwing error, use in-memory storage as fallback
            const DomStorage = require('dom-storage');
            this.localStorage = new DomStorage(null, { strict: true });
        }
    }
}
