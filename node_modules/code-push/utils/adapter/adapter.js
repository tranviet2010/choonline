"use strict";
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
var request_manager_1 = __importDefault(require("../request-manager"));
var Adapter = /** @class */ (function () {
    function Adapter(_requestManager) {
        this._requestManager = _requestManager;
    }
    Adapter.prototype.toLegacyAccount = function (profile) {
        return {
            name: profile.name,
            email: profile.email,
            linkedProviders: []
        };
    };
    Adapter.prototype.toLegacyAccessKey = function (apiToken) {
        var accessKey = {
            createdTime: Date.parse(apiToken.created_at),
            expires: Date.parse('9999-12-31T23:59:59'),
            key: apiToken.api_token,
            name: apiToken.description
        };
        return accessKey;
    };
    Adapter.prototype.toLegacyAccessKeyList = function (apiTokens) {
        console.log(apiTokens);
        var accessKeyList = apiTokens.map(function (apiToken) {
            var accessKey = {
                createdTime: Date.parse(apiToken.created_at),
                expires: Date.parse('9999-12-31T23:59:59'),
                name: apiToken.description,
            };
            return accessKey;
        });
        accessKeyList.sort(function (first, second) {
            var firstTime = first.createdTime || 0;
            var secondTime = second.createdTime || 0;
            return firstTime - secondTime;
        });
        return accessKeyList;
    };
    Adapter.prototype.toLegacyApp = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, deployments, deploymentsNames;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.getUser(), this.getDeployments(app.owner.name, app.name)])];
                    case 1:
                        _a = _b.sent(), user = _a[0], deployments = _a[1];
                        deploymentsNames = deployments.map(function (deployment) { return deployment.name; });
                        return [2 /*return*/, this.toLegacyRestApp(app, user, deploymentsNames)];
                }
            });
        });
    };
    ;
    Adapter.prototype.toLegacyApps = function (apps) {
        return __awaiter(this, void 0, void 0, function () {
            var user, sortedApps, legacyApps;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUser()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, Promise.all(apps.sort(function (first, second) {
                                var firstOwner = first.owner.name || '';
                                var secondOwner = second.owner.name || '';
                                // First sort by owner, then by app name
                                if (firstOwner !== secondOwner) {
                                    return firstOwner.localeCompare(secondOwner);
                                }
                                else {
                                    return first.name.localeCompare(second.name);
                                }
                            }))];
                    case 2:
                        sortedApps = _a.sent();
                        return [4 /*yield*/, Promise.all(sortedApps.map(function (app) { return __awaiter(_this, void 0, void 0, function () {
                                var deployments, deploymentsNames;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getDeployments(app.owner.name, app.name)];
                                        case 1:
                                            deployments = _a.sent();
                                            deploymentsNames = deployments.map(function (deployment) { return deployment.name; });
                                            return [2 /*return*/, this.toLegacyRestApp(app, user, deploymentsNames)];
                                    }
                                });
                            }); }))];
                    case 3:
                        legacyApps = _a.sent();
                        return [2 /*return*/, legacyApps];
                }
            });
        });
    };
    ;
    Adapter.prototype.toApigatewayAppCreationRequest = function (appToCreate) {
        if (appToCreate.os !== 'iOS' &&
            appToCreate.os !== 'Android' &&
            appToCreate.os !== 'Windows' &&
            appToCreate.os !== 'Linux') {
            throw this.getCodePushError("The app OS \"" + appToCreate.os + "\" isn't valid. It should be \"iOS\", \"Android\", \"Windows\" or \"Linux\".", request_manager_1.default.ERROR_CONFLICT);
        }
        if (appToCreate.platform !== 'React-Native' &&
            appToCreate.platform !== 'Cordova' &&
            appToCreate.platform !== 'Electron') {
            throw this.getCodePushError("The app platform \"" + appToCreate.platform + "\" isn't valid. It should be \"React-Native\", \"Cordova\" or \"Electron\".", request_manager_1.default.ERROR_CONFLICT);
        }
        var org = this.getOrgFromLegacyAppRequest(appToCreate);
        var appcenterClientApp = this.toAppcenterClientApp(appToCreate);
        if (!this.isValidAppCenterAppName(appcenterClientApp.display_name)) {
            throw this.getCodePushError("The app name \"" + appcenterClientApp.display_name + "\" isn't valid. It can only contain alphanumeric characters, dashes, periods, or underscores.", request_manager_1.default.ERROR_CONFLICT);
        }
        return { org: org, appcenterClientApp: appcenterClientApp };
    };
    Adapter.prototype.addStandardDeployments = function (apiAppName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appOwner, appName, deploymentsToCreate;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.parseApiAppName(apiAppName)];
                    case 1:
                        _a = _b.sent(), appOwner = _a.appOwner, appName = _a.appName;
                        deploymentsToCreate = ['Staging', 'Production'];
                        return [4 /*yield*/, Promise.all(deploymentsToCreate.map(function (deploymentName) { return __awaiter(_this, void 0, void 0, function () {
                                var deployment;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            deployment = { name: deploymentName };
                                            return [4 /*yield*/, this._requestManager.post("/apps/" + appOwner + "/" + appName + "/deployments/", JSON.stringify(deployment), /*expectResponseBody=*/ true)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    Adapter.prototype.getRenamedApp = function (newName, appOwner, oldName) {
        return __awaiter(this, void 0, void 0, function () {
            var app, updatedApp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getApp(appOwner, oldName)];
                    case 1:
                        app = _a.sent();
                        if (newName.indexOf('/') !== -1) {
                            throw this.getCodePushError("The new app name \"" + newName + "\" must be unqualified, not having a '/' character.", request_manager_1.default.ERROR_CONFLICT);
                        }
                        if (!this.isValidAppCenterAppName(newName)) {
                            throw this.getCodePushError("The app name \"" + newName + "\" isn't valid. It can only contain alphanumeric characters, dashes, periods, or underscores.", request_manager_1.default.ERROR_CONFLICT);
                        }
                        updatedApp = app.name === app.display_name
                            ? {
                                name: newName,
                                display_name: newName
                            }
                            : { name: newName };
                        return [2 /*return*/, updatedApp];
                }
            });
        });
    };
    Adapter.prototype.resolveAccessKey = function (accessKeyName) {
        return __awaiter(this, void 0, void 0, function () {
            var accessKeys, foundAccessKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getApiTokens()];
                    case 1:
                        accessKeys = _a.sent();
                        foundAccessKey = accessKeys.find(function (key) {
                            return key.description === accessKeyName;
                        });
                        if (!foundAccessKey) {
                            throw this.getCodePushError("Access key \"" + accessKeyName + "\" does not exist.", request_manager_1.default.ERROR_NOT_FOUND);
                        }
                        return [2 /*return*/, foundAccessKey];
                }
            });
        });
    };
    Adapter.prototype.toLegacyDeployments = function (deployments) {
        deployments.sort(function (first, second) {
            return first.name.localeCompare(second.name);
        });
        return this.toLegacyRestDeployments(deployments);
    };
    ;
    Adapter.prototype.toLegacyDeployment = function (deployment) {
        return this.toLegacyRestDeployment(deployment);
    };
    ;
    Adapter.prototype.toLegacyCollaborators = function (userList, appOwner) {
        return __awaiter(this, void 0, void 0, function () {
            var callingUser, legacyCollaborators;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUser()];
                    case 1:
                        callingUser = _a.sent();
                        legacyCollaborators = {};
                        userList.forEach(function (user) {
                            legacyCollaborators[user.email] = {
                                isCurrentAccount: callingUser.email === user.email,
                                permission: _this.toLegacyUserPermission(user.permissions[0], user.name && user.name === appOwner)
                            };
                        });
                        return [2 /*return*/, legacyCollaborators];
                }
            });
        });
    };
    Adapter.prototype.toLegacyDeploymentMetrics = function (deploymentMetrics) {
        return __awaiter(this, void 0, void 0, function () {
            var legacyDeploymentMetrics;
            return __generator(this, function (_a) {
                legacyDeploymentMetrics = {};
                deploymentMetrics.forEach(function (deployment) {
                    legacyDeploymentMetrics[deployment.label] = {
                        active: deployment.active,
                        downloaded: deployment.downloaded,
                        failed: deployment.failed,
                        installed: deployment.installed
                    };
                });
                return [2 /*return*/, legacyDeploymentMetrics];
            });
        });
    };
    Adapter.prototype.parseApiAppName = function (apiAppName) {
        return __awaiter(this, void 0, void 0, function () {
            var callingUser, _a, appOwner, appName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getUser()];
                    case 1:
                        callingUser = _b.sent();
                        // If the separating / is not included, assume the owner is the calling user and only the app name is provided
                        if (!apiAppName.includes("/")) {
                            return [2 /*return*/, {
                                    appOwner: callingUser.name,
                                    appName: apiAppName,
                                }];
                        }
                        _a = apiAppName.split("/"), appOwner = _a[0], appName = _a[1];
                        return [2 /*return*/, {
                                appOwner: appOwner,
                                appName: appName,
                            }];
                }
            });
        });
    };
    Adapter.prototype.toLegacyDeploymentHistory = function (releases) {
        var _this = this;
        return releases.map(function (release) { return _this.releaseToPackage(release); });
    };
    Adapter.prototype.toLegacyRestApp = function (app, user, deployments) {
        var _a;
        var isCurrentAccount = user.id === app.owner.id;
        var isNameAndDisplayNameSame = app.name === app.display_name;
        var appName = app.name;
        if (!isCurrentAccount) {
            appName = app.owner.name + '/' + app.name;
        }
        if (!isNameAndDisplayNameSame) {
            appName += "  (" + app.display_name + ")";
        }
        return {
            name: appName,
            collaborators: (_a = {},
                _a[app.owner.name] = {
                    isCurrentAccount: user.id === app.owner.id,
                    permission: 'Owner'
                },
                _a),
            deployments: deployments,
            os: app.os,
            platform: app.platform
        };
    };
    Adapter.prototype.toReleaseUploadProperties = function (updateMetadata, releaseUploadAssets, deploymentName) {
        var releaseUpload = {
            release_upload: releaseUploadAssets,
            target_binary_version: updateMetadata.appVersion,
            deployment_name: deploymentName,
            no_duplicate_release_error: false,
        };
        if (updateMetadata.description)
            releaseUpload.description = updateMetadata.description;
        if (updateMetadata.isDisabled)
            releaseUpload.disabled = updateMetadata.isDisabled;
        if (updateMetadata.isMandatory)
            releaseUpload.mandatory = updateMetadata.isMandatory;
        if (updateMetadata.rollout)
            releaseUpload.rollout = updateMetadata.rollout;
        return releaseUpload;
    };
    Adapter.prototype.toRestReleaseModification = function (legacyCodePushReleaseInfo) {
        var releaseModification = {};
        if (legacyCodePushReleaseInfo.appVersion)
            releaseModification.target_binary_range = legacyCodePushReleaseInfo.appVersion;
        if (legacyCodePushReleaseInfo.isDisabled)
            releaseModification.is_disabled = legacyCodePushReleaseInfo.isDisabled;
        if (legacyCodePushReleaseInfo.isMandatory)
            releaseModification.is_mandatory = legacyCodePushReleaseInfo.isMandatory;
        if (legacyCodePushReleaseInfo.description)
            releaseModification.description = legacyCodePushReleaseInfo.description;
        if (legacyCodePushReleaseInfo.rollout)
            releaseModification.rollout = legacyCodePushReleaseInfo.rollout;
        if (legacyCodePushReleaseInfo.label)
            releaseModification.label = legacyCodePushReleaseInfo.label;
        return releaseModification;
    };
    Adapter.prototype.releaseToPackage = function (releasePackage) {
        var sdkPackage = {
            blobUrl: releasePackage.blob_url,
            size: releasePackage.size,
            uploadTime: releasePackage.upload_time,
            isDisabled: !!releasePackage.is_disabled,
            isMandatory: !!releasePackage.is_mandatory,
        };
        if (releasePackage.target_binary_range)
            sdkPackage.appVersion = releasePackage.target_binary_range;
        if (releasePackage.description)
            sdkPackage.description = releasePackage.description;
        if (releasePackage.label)
            sdkPackage.label = releasePackage.label;
        if (releasePackage.package_hash)
            sdkPackage.packageHash = releasePackage.package_hash;
        if (releasePackage.rollout)
            sdkPackage.rollout = releasePackage.rollout;
        if (releasePackage.diff_package_map)
            sdkPackage.diffPackageMap = releasePackage.diff_package_map;
        if (releasePackage.original_label)
            sdkPackage.originalLabel = releasePackage.original_label;
        if (releasePackage.original_deployment)
            sdkPackage.originalDeployment = releasePackage.original_deployment;
        if (releasePackage.released_by)
            sdkPackage.releasedBy = releasePackage.released_by;
        if (releasePackage.release_method)
            sdkPackage.releaseMethod = releasePackage.release_method;
        return sdkPackage;
    };
    Adapter.prototype.toLegacyRestDeployments = function (apiGatewayDeployments) {
        var _this = this;
        var deployments = apiGatewayDeployments.map(function (deployment) {
            return _this.toLegacyRestDeployment(deployment);
        });
        return deployments;
    };
    Adapter.prototype.toLegacyRestDeployment = function (deployment) {
        var apiGatewayPackage = deployment.latest_release ? this.releaseToPackage(deployment.latest_release) : null;
        var restDeployment = {
            name: deployment.name,
            key: deployment.key,
            package: apiGatewayPackage
        };
        return restDeployment;
    };
    Adapter.prototype.getUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._requestManager.get("/user")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.body];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Adapter.prototype.getApiTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._requestManager.get("/api_tokens")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.body];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Adapter.prototype.getApp = function (appOwner, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._requestManager.get("/apps/" + appOwner + "/" + appName)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.body];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Adapter.prototype.getDeployments = function (appOwner, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._requestManager.get("/apps/" + appOwner + "/" + appName + "/deployments/")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.body];
                    case 2:
                        error_4 = _a.sent();
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Adapter.prototype.toLegacyUserPermission = function (expectedPermission, isOwner) {
        if (expectedPermission === 'manager') {
            return isOwner ? 'Owner' : 'Manager';
        }
        else if (expectedPermission === 'developer') {
            return 'Collaborator';
        }
        return 'Reader';
    };
    Adapter.prototype.getOrgFromLegacyAppRequest = function (legacyCreateAppRequest) {
        var slashIndex = legacyCreateAppRequest.name.indexOf('/');
        var org = slashIndex !== -1 ? legacyCreateAppRequest.name.substring(0, slashIndex) : null;
        return org;
    };
    Adapter.prototype.toAppcenterClientApp = function (legacyCreateAppRequest) {
        // If the app name contains a slash, then assume that the app is intended to be owned by an org, with the org name
        // before the slash. Update the app info accordingly.
        var slashIndex = legacyCreateAppRequest.name.indexOf('/');
        return {
            os: legacyCreateAppRequest.os,
            platform: legacyCreateAppRequest.platform,
            display_name: slashIndex !== -1 ? legacyCreateAppRequest.name.substring(slashIndex + 1) : legacyCreateAppRequest.name
        };
    };
    Adapter.prototype.isValidAppCenterAppName = function (name) {
        return this.getStringValidator(/*maxLength=*/ 1000, /*minLength=*/ 1)(name) && /^[a-zA-Z0-9-._]+$/.test(name); // Only allow alphanumeric characters, dashes, periods, or underscores
    };
    Adapter.prototype.getStringValidator = function (maxLength, minLength) {
        if (maxLength === void 0) { maxLength = 1000; }
        if (minLength === void 0) { minLength = 0; }
        return function isValidString(value) {
            if (typeof value !== 'string') {
                return false;
            }
            if (maxLength > 0 && value.length > maxLength) {
                return false;
            }
            return value.length >= minLength;
        };
    };
    Adapter.prototype.getCodePushError = function (message, errorCode) {
        return {
            message: message,
            statusCode: errorCode
        };
    };
    return Adapter;
}());
module.exports = Adapter;
