"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodePushUnauthorizedError = exports.CodePushPackageError = exports.CodePushDeployStatusError = exports.CodePushHttpError = exports.CodePushError = void 0;
var CodePushError = /** @class */ (function (_super) {
    __extends(CodePushError, _super);
    function CodePushError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CodePushError.prototype);
        return _this;
    }
    return CodePushError;
}(Error));
exports.CodePushError = CodePushError;
var CodePushHttpError = /** @class */ (function (_super) {
    __extends(CodePushHttpError, _super);
    function CodePushHttpError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CodePushHttpError.prototype);
        return _this;
    }
    return CodePushHttpError;
}(CodePushError));
exports.CodePushHttpError = CodePushHttpError;
var CodePushDeployStatusError = /** @class */ (function (_super) {
    __extends(CodePushDeployStatusError, _super);
    function CodePushDeployStatusError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CodePushDeployStatusError.prototype);
        return _this;
    }
    return CodePushDeployStatusError;
}(CodePushError));
exports.CodePushDeployStatusError = CodePushDeployStatusError;
var CodePushPackageError = /** @class */ (function (_super) {
    __extends(CodePushPackageError, _super);
    function CodePushPackageError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CodePushPackageError.prototype);
        return _this;
    }
    return CodePushPackageError;
}(CodePushError));
exports.CodePushPackageError = CodePushPackageError;
var CodePushUnauthorizedError = /** @class */ (function (_super) {
    __extends(CodePushUnauthorizedError, _super);
    function CodePushUnauthorizedError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CodePushUnauthorizedError.prototype);
        return _this;
    }
    return CodePushUnauthorizedError;
}(CodePushError));
exports.CodePushUnauthorizedError = CodePushUnauthorizedError;
