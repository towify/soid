export const DEFAULT_REQUEST_OPTIONS = {
    ignoreCache: false,
    headers: {
        Accept: "application/json, text/javascript, text/plain",
    },
    // default max duration for a request
    timeout: 5000,
};
function queryParams(params = {}) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
}
function withQuery(url, params = {}) {
    const queryString = queryParams(params);
    return queryString ? url + (url.indexOf("?") === -1 ? "?" : "&") + queryString : url;
}
function parseXHRResult(xhr) {
    return {
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: xhr.responseText,
        json: () => JSON.parse(xhr.responseText),
    };
}
function errorResponse(xhr, message = null) {
    return {
        ok: false,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: message || xhr.statusText,
        json: () => JSON.parse(message || xhr.statusText),
    };
}
export function request(method, url, queryParams = {}, body = null, options = DEFAULT_REQUEST_OPTIONS) {
    const ignoreCache = options.ignoreCache || DEFAULT_REQUEST_OPTIONS.ignoreCache;
    const headers = options.headers || DEFAULT_REQUEST_OPTIONS.headers;
    const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, withQuery(url, queryParams));
        if (headers) {
            Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
        }
        if (ignoreCache) {
            xhr.setRequestHeader("Cache-Control", "no-cache");
        }
        xhr.timeout = timeout;
        xhr.onload = evt => {
            resolve(parseXHRResult(xhr));
        };
        xhr.onerror = evt => {
            resolve(errorResponse(xhr, "Failed to make request."));
        };
        xhr.ontimeout = evt => {
            resolve(errorResponse(xhr, "Request took longer than expected."));
        };
        if (method === "post" && body) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body));
        }
        else {
            xhr.send();
        }
    });
}
