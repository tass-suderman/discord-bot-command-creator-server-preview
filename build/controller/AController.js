"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AController = void 0;
var routing_controllers_1 = require("routing-controllers");
var AController = /** @class */ (function () {
    function AController() {
    }
    AController_1 = AController;
    AController.prototype.exitWithMessage = function (res, errorCode, message) {
        var status = isNaN(errorCode) ? errorCode.code : parseInt(errorCode, 10);
        res.statusCode = status;
        return res.json({ code: status, message: message !== null && message !== void 0 ? message : errorCode.message });
    };
    AController.prototype.getSortOptions = function (req) {
        var _a;
        var sortOptions = {
            order: {},
            field: ''
        };
        sortOptions.field = this.SORT_FIELDS.includes(req.query.sortby) ? req.query.sortby : this.SORT_FIELDS[0];
        sortOptions.order = AController_1.DESCENDING_OPTIONS.includes((_a = req.query.sortorder) === null || _a === void 0 ? void 0 : _a.toUpperCase()) // if broky look here
            ? AController_1.DESCENDING
            : AController_1.ASCENDING;
        return sortOptions;
    };
    var AController_1;
    AController.STATUS_CODES = {
        OK_STATUS: { code: 200, message: 'Request has succeeded and is fulfilled.' },
        NO_CONTENT: { code: 204, message: 'Request succeeded.' },
        BAD_REQUEST: { code: 400, message: 'Your request cannot be completed as it is malformed.' },
        UNAUTHORIZED_STATUS: { code: 401, message: 'You are not authorized to perform this action.' },
        ITEM_NOT_FOUND: { code: 404, message: 'Requested resource could not be located.' },
        CONFLICT: { code: 409, message: 'Request conflicts with requested resource state.' },
        UNPROCESSABLE_ENTITY: { code: 422, message: 'The provided entity cannot be processes.' },
        INTERNAL_SERVER_ERROR: { code: 500, message: 'The server has an internal error.' },
        NOT_IMPLEMENTED_ERROR: { code: 501, message: 'This method is not implemented on this version of the software.' }
    };
    AController.DEMO_CONTENT_LOCK = 'This feature is unavailable in this version of this software';
    AController.DESCENDING_OPTIONS = ['DESC', 'DESCENDING', 'D'];
    AController.DESCENDING = 'DESC';
    AController.ASCENDING = 'ASC';
    // UUID and Username delimited by :, because those are not allowed in user ids or name
    // source: https://discord.com/developers/docs/resources/user
    AController.DELIM = ':';
    __decorate([
        __param(0, (0, routing_controllers_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], AController.prototype, "getSortOptions", null);
    AController = AController_1 = __decorate([
        (0, routing_controllers_1.Controller)()
    ], AController);
    return AController;
}());
exports.AController = AController;
//# sourceMappingURL=AController.js.map