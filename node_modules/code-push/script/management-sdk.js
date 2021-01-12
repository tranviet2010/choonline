"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var slash = require("slash");
var recursiveFs = __importStar(require("recursive-fs"));
var yazl = __importStar(require("yazl"));
var adapter_1 = __importDefault(require("../utils/adapter/adapter"));
var request_manager_1 = __importDefault(require("../utils/request-manager"));
var code_push_error_1 = require("./code-push-error");
var appcenter_file_upload_client_1 = __importDefault(require("appcenter-file-upload-client"));
// A template string tag function that URL encodes the substituted values
function urlEncode(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var result = "";
    for (var i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            result += encodeURIComponent(values[i]);
        }
    }
    return result;
}
var AccountManager = /** @class */ (function () {
    function AccountManager(accessKey, customHeaders, serverUrl, proxy) {
        if (!accessKey)
            throw new code_push_error_1.CodePushUnauthorizedError("A token must be specified.");
        this._accessKey = accessKey;
        this._requestManager = new request_manager_1.default(accessKey, customHeaders, serverUrl, proxy);
        this._adapter = new adapter_1.default(this._requestManager);
        this._fileUploadClient = new appcenter_file_upload_client_1.default();
    }
    Object.defineProperty(AccountManager.prototype, "accessKey", {
        get: function () {
            return this._accessKey;
        },
        enumerable: false,
        configurable: true
    });
    AccountManager.prototype.isAuthenticated = function (throwIfUnauthorized) {
        return __awaiter(this, void 0, void 0, function () {
            var res, codePushError, error_1, authenticated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_1 || (templateObject_1 = __makeTemplateObject(["/user"], ["/user"]))), false)];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        codePushError = error_1;
                        if (codePushError && (codePushError.statusCode !== request_manager_1.default.ERROR_UNAUTHORIZED || throwIfUnauthorized)) {
                            throw codePushError;
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        authenticated = !!res && !!res.body;
                        return [2 /*return*/, authenticated];
                }
            });
        });
    };
    // Access keys
    AccountManager.prototype.addAccessKey = function (friendlyName, ttl) {
        return __awaiter(this, void 0, void 0, function () {
            var accessKeyRequest, res, accessKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!friendlyName) {
                            throw new code_push_error_1.CodePushUnauthorizedError("A name must be specified when adding an access key.");
                        }
                        accessKeyRequest = {
                            description: friendlyName
                        };
                        return [4 /*yield*/, this._requestManager.post(urlEncode(templateObject_2 || (templateObject_2 = __makeTemplateObject(["/api_tokens"], ["/api_tokens"]))), JSON.stringify(accessKeyRequest), /*expectResponseBody=*/ true)];
                    case 1:
                        res = _a.sent();
                        accessKey = this._adapter.toLegacyAccessKey(res.body);
                        return [2 /*return*/, accessKey];
                }
            });
        });
    };
    AccountManager.prototype.getAccessKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, accessKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_3 || (templateObject_3 = __makeTemplateObject(["/api_tokens"], ["/api_tokens"]))))];
                    case 1:
                        res = _a.sent();
                        accessKeys = this._adapter.toLegacyAccessKeyList(res.body);
                        return [2 /*return*/, accessKeys];
                }
            });
        });
    };
    AccountManager.prototype.removeAccessKey = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var accessKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.resolveAccessKey(name)];
                    case 1:
                        accessKey = _a.sent();
                        return [4 /*yield*/, this._requestManager.del(urlEncode(templateObject_4 || (templateObject_4 = __makeTemplateObject(["/api_tokens/", ""], ["/api_tokens/", ""])), accessKey.id))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    // Account
    AccountManager.prototype.getAccountInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, accountInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_5 || (templateObject_5 = __makeTemplateObject(["/user"], ["/user"]))))];
                    case 1:
                        res = _a.sent();
                        accountInfo = this._adapter.toLegacyAccount(res.body);
                        return [2 /*return*/, accountInfo];
                }
            });
        });
    };
    // Apps
    AccountManager.prototype.getApps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, apps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_6 || (templateObject_6 = __makeTemplateObject(["/apps"], ["/apps"]))))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, this._adapter.toLegacyApps(res.body)];
                    case 2:
                        apps = _a.sent();
                        return [2 /*return*/, apps];
                }
            });
        });
    };
    AccountManager.prototype.getApp = function (appName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, res, app;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_7 || (templateObject_7 = __makeTemplateObject(["/apps/", "/", ""], ["/apps/", "/", ""])), appParams.appOwner, appParams.appName))];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this._adapter.toLegacyApp(res.body)];
                    case 3:
                        app = _a.sent();
                        return [2 /*return*/, app];
                }
            });
        });
    };
    AccountManager.prototype.addApp = function (appName, appOs, appPlatform, manuallyProvisionDeployments) {
        if (manuallyProvisionDeployments === void 0) { manuallyProvisionDeployments = false; }
        return __awaiter(this, void 0, void 0, function () {
            var app, apigatewayAppCreationRequest, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = {
                            name: appName,
                            os: appOs,
                            platform: appPlatform,
                            manuallyProvisionDeployments: manuallyProvisionDeployments
                        };
                        apigatewayAppCreationRequest = this._adapter.toApigatewayAppCreationRequest(app);
                        path = apigatewayAppCreationRequest.org ? "/orgs/" + apigatewayAppCreationRequest.org + "/apps" : "/apps";
                        return [4 /*yield*/, this._requestManager.post(path, JSON.stringify(apigatewayAppCreationRequest.appcenterClientApp), /*expectResponseBody=*/ false)];
                    case 1:
                        _a.sent();
                        if (!!manuallyProvisionDeployments) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._adapter.addStandardDeployments(appName)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, app];
                }
            });
        });
    };
    AccountManager.prototype.removeApp = function (appName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.del(urlEncode(templateObject_8 || (templateObject_8 = __makeTemplateObject(["/apps/", "/", ""], ["/apps/", "/", ""])), appParams.appOwner, appParams.appName))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AccountManager.prototype.renameApp = function (oldAppName, newAppName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appOwner, appName, updatedApp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(oldAppName)];
                    case 1:
                        _a = _b.sent(), appOwner = _a.appOwner, appName = _a.appName;
                        return [4 /*yield*/, this._adapter.getRenamedApp(newAppName, appOwner, appName)];
                    case 2:
                        updatedApp = _b.sent();
                        return [4 /*yield*/, this._requestManager.patch(urlEncode(templateObject_9 || (templateObject_9 = __makeTemplateObject(["/apps/", "/", ""], ["/apps/", "/", ""])), appOwner, appName), JSON.stringify(updatedApp))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AccountManager.prototype.transferApp = function (appName, orgName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.post(urlEncode(templateObject_10 || (templateObject_10 = __makeTemplateObject(["/apps/", "/", "/transfer/", ""], ["/apps/", "/", "/transfer/", ""])), appParams.appOwner, appParams.appName, orgName), /*requestBody=*/ null, /*expectResponseBody=*/ false)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    // Collaborators
    AccountManager.prototype.getCollaborators = function (appName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, res, collaborators;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_11 || (templateObject_11 = __makeTemplateObject(["/apps/", "/", "/users"], ["/apps/", "/", "/users"])), appParams.appOwner, appParams.appName))];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this._adapter.toLegacyCollaborators(res.body, appParams.appOwner)];
                    case 3:
                        collaborators = _a.sent();
                        return [2 /*return*/, collaborators];
                }
            });
        });
    };
    AccountManager.prototype.addCollaborator = function (appName, email) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, userEmailRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        userEmailRequest = {
                            user_email: email
                        };
                        return [4 /*yield*/, this._requestManager.post(urlEncode(templateObject_12 || (templateObject_12 = __makeTemplateObject(["/apps/", "/", "/invitations"], ["/apps/", "/", "/invitations"])), appParams.appOwner, appParams.appName), JSON.stringify(userEmailRequest), /*expectResponseBody=*/ false)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AccountManager.prototype.removeCollaborator = function (appName, email) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.del(urlEncode(templateObject_13 || (templateObject_13 = __makeTemplateObject(["/apps/", "/", "/invitations/", ""], ["/apps/", "/", "/invitations/", ""])), appParams.appOwner, appParams.appName, email))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    // Deployments
    AccountManager.prototype.addDeployment = function (appName, deploymentName) {
        return __awaiter(this, void 0, void 0, function () {
            var deployment, appParams, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deployment = { name: deploymentName };
                        return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.post(urlEncode(templateObject_14 || (templateObject_14 = __makeTemplateObject(["/apps/", "/", "/deployments/"], ["/apps/", "/", "/deployments/"])), appParams.appOwner, appParams.appName), JSON.stringify(deployment), /*expectResponseBody=*/ true)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, this._adapter.toLegacyDeployment(res.body)];
                }
            });
        });
    };
    AccountManager.prototype.clearDeploymentHistory = function (appName, deploymentName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.del(urlEncode(templateObject_15 || (templateObject_15 = __makeTemplateObject(["/apps/", "/", "/deployments/", "/releases"], ["/apps/", "/", "/deployments/", "/releases"])), appParams.appOwner, appParams.appName, deploymentName))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AccountManager.prototype.getDeployments = function (appName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_16 || (templateObject_16 = __makeTemplateObject(["/apps/", "/", "/deployments/"], ["/apps/", "/", "/deployments/"])), appParams.appOwner, appParams.appName))];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, this._adapter.toLegacyDeployments(res.body)];
                }
            });
        });
    };
    AccountManager.prototype.getDeployment = function (appName, deploymentName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_17 || (templateObject_17 = __makeTemplateObject(["/apps/", "/", "/deployments/", ""], ["/apps/", "/", "/deployments/", ""])), appParams.appOwner, appParams.appName, deploymentName))];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, this._adapter.toLegacyDeployment(res.body)];
                }
            });
        });
    };
    AccountManager.prototype.renameDeployment = function (appName, oldDeploymentName, newDeploymentName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.patch(urlEncode(templateObject_18 || (templateObject_18 = __makeTemplateObject(["/apps/", "/", "/deployments/", ""], ["/apps/", "/", "/deployments/", ""])), appParams.appOwner, appParams.appName, oldDeploymentName), JSON.stringify({ name: newDeploymentName }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AccountManager.prototype.removeDeployment = function (appName, deploymentName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.del(urlEncode(templateObject_19 || (templateObject_19 = __makeTemplateObject(["/apps/", "/", "/deployments/", ""], ["/apps/", "/", "/deployments/", ""])), appParams.appOwner, appParams.appName, deploymentName))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AccountManager.prototype.getDeploymentMetrics = function (appName, deploymentName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, res, deploymentMetrics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_20 || (templateObject_20 = __makeTemplateObject(["/apps/", "/", "/deployments/", "/metrics"], ["/apps/", "/", "/deployments/", "/metrics"])), appParams.appOwner, appParams.appName, deploymentName))];
                    case 2:
                        res = _a.sent();
                        deploymentMetrics = this._adapter.toLegacyDeploymentMetrics(res.body);
                        return [2 /*return*/, deploymentMetrics];
                }
            });
        });
    };
    AccountManager.prototype.getDeploymentHistory = function (appName, deploymentName) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.get(urlEncode(templateObject_21 || (templateObject_21 = __makeTemplateObject(["/apps/", "/", "/deployments/", "/releases"], ["/apps/", "/", "/deployments/", "/releases"])), appParams.appOwner, appParams.appName, deploymentName))];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, this._adapter.toLegacyDeploymentHistory(res.body)];
                }
            });
        });
    };
    // Releases
    AccountManager.prototype.release = function (appName, deploymentName, filePath, targetBinaryVersion, updateMetadata, uploadProgressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var packageFile, appParams, assetJsonResponse, assets, releaseUploadProperties, releaseJsonResponse, releasePackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateMetadata.appVersion = targetBinaryVersion;
                        return [4 /*yield*/, this.packageFileFromPath(filePath)];
                    case 1:
                        packageFile = _a.sent();
                        return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 2:
                        appParams = _a.sent();
                        return [4 /*yield*/, this._requestManager.post(urlEncode(templateObject_22 || (templateObject_22 = __makeTemplateObject(["/apps/", "/", "/deployments/", "/uploads"], ["/apps/", "/", "/deployments/", "/uploads"])), appParams.appOwner, appParams.appName, deploymentName), null, true)];
                    case 3:
                        assetJsonResponse = _a.sent();
                        assets = assetJsonResponse.body;
                        return [4 /*yield*/, this._fileUploadClient.upload({
                                assetId: assets.id,
                                assetDomain: assets.upload_domain,
                                assetToken: assets.token,
                                file: packageFile.path,
                                onProgressChanged: function (progressData) {
                                    if (uploadProgressCallback) {
                                        uploadProgressCallback(progressData.percentCompleted);
                                    }
                                },
                            })];
                    case 4:
                        _a.sent();
                        releaseUploadProperties = this._adapter.toReleaseUploadProperties(updateMetadata, assets, deploymentName);
                        return [4 /*yield*/, this._requestManager.post(urlEncode(templateObject_23 || (templateObject_23 = __makeTemplateObject(["/apps/", "/", "/deployments/", "/releases"], ["/apps/", "/", "/deployments/", "/releases"])), appParams.appOwner, appParams.appName, deploymentName), JSON.stringify(releaseUploadProperties), true)];
                    case 5:
                        releaseJsonResponse = _a.sent();
                        releasePackage = this._adapter.releaseToPackage(releaseJsonResponse.body);
                        return [2 /*return*/, releasePackage];
                }
            });
        });
    };
    AccountManager.prototype.patchRelease = function (appName, deploymentName, label, updateMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, requestBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        requestBody = this._adapter.toRestReleaseModification(updateMetadata);
                        return [4 /*yield*/, this._requestManager.patch(urlEncode(templateObject_24 || (templateObject_24 = __makeTemplateObject(["/apps/", "/", "/deployments/", "/releases/", ""], ["/apps/", "/", "/deployments/", "/releases/", ""])), appParams.appOwner, appParams.appName, deploymentName, label), JSON.stringify(requestBody), /*expectResponseBody=*/ false)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AccountManager.prototype.promote = function (appName, sourceDeploymentName, destinationDeploymentName, updateMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, requestBody, res, releasePackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        requestBody = this._adapter.toRestReleaseModification(updateMetadata);
                        return [4 /*yield*/, this._requestManager.post(urlEncode(templateObject_25 || (templateObject_25 = __makeTemplateObject(["/apps/", "/", "/deployments/", "/promote_release/", ""], ["/apps/", "/", "/deployments/", "/promote_release/", ""])), appParams.appOwner, appParams.appName, sourceDeploymentName, destinationDeploymentName), JSON.stringify(requestBody), /*expectResponseBody=*/ true)];
                    case 2:
                        res = _a.sent();
                        releasePackage = this._adapter.releaseToPackage(res.body);
                        return [2 /*return*/, releasePackage];
                }
            });
        });
    };
    AccountManager.prototype.rollback = function (appName, deploymentName, targetRelease) {
        return __awaiter(this, void 0, void 0, function () {
            var appParams, requestBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._adapter.parseApiAppName(appName)];
                    case 1:
                        appParams = _a.sent();
                        requestBody = targetRelease ? {
                            label: targetRelease
                        } : {};
                        return [4 /*yield*/, this._requestManager.post(urlEncode(templateObject_26 || (templateObject_26 = __makeTemplateObject(["/apps/", "/", "/deployments/", "/rollback_release"], ["/apps/", "/", "/deployments/", "/rollback_release"])), appParams.appOwner, appParams.appName, deploymentName), JSON.stringify(requestBody), /*expectResponseBody=*/ false)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    // Deprecated
    AccountManager.prototype.getAccessKey = function (accessKeyName) {
        throw {
            message: 'Method is deprecated',
            statusCode: 404
        };
    };
    // Deprecated
    AccountManager.prototype.getSessions = function () {
        throw this.getDeprecatedMethodError();
    };
    // Deprecated
    AccountManager.prototype.patchAccessKey = function (oldName, newName, ttl) {
        throw this.getDeprecatedMethodError();
    };
    // Deprecated
    AccountManager.prototype.removeSession = function (machineName) {
        throw this.getDeprecatedMethodError();
    };
    AccountManager.prototype.packageFileFromPath = function (filePath) {
        var _this = this;
        var getPackageFilePromise;
        if (fs.lstatSync(filePath).isDirectory()) {
            getPackageFilePromise = new Promise(function (resolve, reject) {
                var directoryPath = filePath;
                recursiveFs.readdirr(directoryPath, function (error, directories, files) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    var baseDirectoryPath = path.dirname(directoryPath);
                    var fileName = _this.generateRandomFilename(15) + ".zip";
                    var zipFile = new yazl.ZipFile();
                    var writeStream = fs.createWriteStream(fileName);
                    zipFile.outputStream.pipe(writeStream)
                        .on("error", function (error) {
                        reject(error);
                    })
                        .on("close", function () {
                        filePath = path.join(process.cwd(), fileName);
                        resolve({ isTemporary: true, path: filePath });
                    });
                    for (var i = 0; i < files.length; ++i) {
                        var file = files[i];
                        var relativePath = path.relative(baseDirectoryPath, file);
                        // yazl does not like backslash (\) in the metadata path.
                        relativePath = slash(relativePath);
                        zipFile.addFile(file, relativePath);
                    }
                    zipFile.end();
                });
            });
        }
        else {
            getPackageFilePromise = new Promise(function (resolve, reject) {
                resolve({ isTemporary: false, path: filePath });
            });
        }
        return getPackageFilePromise;
    };
    AccountManager.prototype.generateRandomFilename = function (length) {
        var filename = "";
        var validChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            filename += validChar.charAt(Math.floor(Math.random() * validChar.length));
        }
        return filename;
    };
    AccountManager.prototype.getDeprecatedMethodError = function () {
        return {
            message: 'Method is deprecated',
            statusCode: 404
        };
    };
    AccountManager.AppPermission = {
        OWNER: "Owner",
        COLLABORATOR: "Collaborator"
    };
    return AccountManager;
}());
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26;
module.exports = AccountManager;
