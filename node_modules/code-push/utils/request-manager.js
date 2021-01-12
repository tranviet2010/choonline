"use strict";
var superagent = require("superagent");
var code_push_error_1 = require("../script/code-push-error");
var superproxy = require("superagent-proxy");
superproxy(superagent);
var RequestManager = /** @class */ (function () {
    function RequestManager(accessKey, customHeaders, serverUrl, proxy) {
        if (!accessKey)
            throw new code_push_error_1.CodePushUnauthorizedError("A token must be specified.");
        this._accessKey = accessKey;
        this._customHeaders = customHeaders;
        this._serverUrl = serverUrl || RequestManager.SERVER_URL;
        this._proxy = proxy;
    }
    RequestManager.prototype.get = function (endpoint, expectResponseBody) {
        if (expectResponseBody === void 0) { expectResponseBody = true; }
        return this.makeApiRequest("get", endpoint, /*requestBody=*/ null, expectResponseBody, /*contentType=*/ null);
    };
    RequestManager.prototype.post = function (endpoint, requestBody, expectResponseBody, contentType) {
        if (contentType === void 0) { contentType = "application/json;charset=UTF-8"; }
        return this.makeApiRequest("post", endpoint, requestBody, expectResponseBody, contentType);
    };
    RequestManager.prototype.patch = function (endpoint, requestBody, expectResponseBody, contentType) {
        if (expectResponseBody === void 0) { expectResponseBody = false; }
        if (contentType === void 0) { contentType = "application/json;charset=UTF-8"; }
        return this.makeApiRequest("patch", endpoint, requestBody, expectResponseBody, contentType);
    };
    RequestManager.prototype.del = function (endpoint, expectResponseBody) {
        if (expectResponseBody === void 0) { expectResponseBody = false; }
        return this.makeApiRequest("del", endpoint, /*requestBody=*/ null, expectResponseBody, /*contentType=*/ null);
    };
    RequestManager.prototype.makeApiRequest = function (method, endpoint, requestBody, expectResponseBody, contentType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = superagent[method](_this._serverUrl + endpoint);
            if (_this._proxy)
                request.proxy(_this._proxy);
            _this.attachCredentials(request);
            if (requestBody) {
                if (contentType) {
                    request = request.set("Content-Type", contentType);
                }
                request = request.send(requestBody);
            }
            request.end(function (err, res) {
                if (err) {
                    reject(_this.getCodePushError(err, res));
                    return;
                }
                try {
                    var body = JSON.parse(res.text);
                }
                catch (err) {
                }
                if (res.ok) {
                    if (expectResponseBody && !body) {
                        reject({ message: "Could not parse response: " + res.text, statusCode: RequestManager.ERROR_INTERNAL_SERVER });
                    }
                    else {
                        resolve({
                            headers: res.header,
                            body: body
                        });
                    }
                }
                else {
                    if (body) {
                        reject({ message: body.message, statusCode: _this.getErrorStatus(err, res) });
                    }
                    else {
                        reject({ message: res.text, statusCode: _this.getErrorStatus(err, res) });
                    }
                }
            });
        });
    };
    RequestManager.prototype.getCodePushError = function (error, response) {
        if (error.syscall === "getaddrinfo") {
            error.message = "Unable to connect to the CodePush server. Are you offline, or behind a firewall or proxy?\n(" + error.message + ")";
        }
        return {
            message: this.getErrorMessage(error, response),
            statusCode: this.getErrorStatus(error, response)
        };
    };
    RequestManager.prototype.getErrorStatus = function (error, response) {
        return (error && error.status) || (response && response.status) || RequestManager.ERROR_GATEWAY_TIMEOUT;
    };
    RequestManager.prototype.getErrorMessage = function (error, response) {
        return response && response.body.message ? response.body.message : error.message;
    };
    RequestManager.prototype.attachCredentials = function (request) {
        if (this._customHeaders) {
            for (var headerName in this._customHeaders) {
                request.set(headerName, this._customHeaders[headerName]);
            }
        }
        request.set("x-api-token", "" + this._accessKey);
    };
    RequestManager.SERVER_URL = "https://api.appcenter.ms/v0.1";
    RequestManager.ERROR_GATEWAY_TIMEOUT = 504; // Used if there is a network error
    RequestManager.ERROR_INTERNAL_SERVER = 500;
    RequestManager.ERROR_NOT_FOUND = 404;
    RequestManager.ERROR_CONFLICT = 409; // Used if the resource already exists
    RequestManager.ERROR_UNAUTHORIZED = 401;
    return RequestManager;
}());
module.exports = RequestManager;
