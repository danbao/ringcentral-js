import DomStorage from 'dom-storage';
import nodeFetch, {Request as NodeRequest, Response as NodeResponse, Headers as NodeHeaders} from 'node-fetch';
import {setDefaultExternals} from './SDK';

export * from './SDK';

// Determine environment
const isBrowser = typeof window !== 'undefined';
const isCloudflareWorker = typeof globalThis !== 'undefined' && 'Deno' in globalThis === false && 'Bun' in globalThis === false && 'fastly' in globalThis === false && 'EdgeRuntime' in globalThis === false;

// Set up externals based on environment
const externals: any = {};

if (isBrowser) {
    // Browser environment
    externals.localStorage = window.localStorage;
    externals.fetch = window.fetch.bind(window);
    externals.Request = window.Request;
    externals.Response = window.Response;
    externals.Headers = window.Headers;
} else if (isCloudflareWorker) {
    // Cloudflare Workers environment
    externals.localStorage = new DomStorage(null, {strict: true});
    externals.fetch = fetch;
    externals.Request = Request;
    externals.Response = Response;
    externals.Headers = Headers;
} else {
    // Node.js environment
    externals.localStorage = new DomStorage(null, {strict: true});
    externals.fetch = nodeFetch;
    externals.Request = NodeRequest;
    externals.Response = NodeResponse;
    externals.Headers = NodeHeaders;
}

setDefaultExternals(externals);
