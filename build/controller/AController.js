"use strict";
/**
 * @author Levi Krozser + Tass Suderman
 * Abstract controller class
 */
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AController = void 0;
var routing_controllers_1 = require("routing-controllers");
var node_fetch_1 = require("node-fetch");
var Tag_1 = require("../entity/Tag");
var class_validator_1 = require("class-validator");
var DISCORD_URL = 'https://discord.com/api/v9/users/@me';
var AUTHORIZATION_HEADER = 'Authorization';
var AController = /** @class */ (function () {
    function AController() {
    }
    AController_1 = AController;
    /**
     * This function takes in a request header and uses it to discover more about the user that sent the request.
     * It does this by:
     *  1) Ensuring there is an authorization header in the request
     *  2) Making a request to the Discord API using the very same authorization header.
     * If the request succeeds, the user's ID and username are returned, delimited by :
     * If the request fails, null is returned
     * @param head Request header
     * @return {string | null} Discord ID and username or null
     */
    AController.getUser = function (head) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var authToken, fetchHeaders, response, discordUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        authToken = (_a = head.authorization) === null || _a === void 0 ? void 0 : _a.toString();
                        if (!authToken) return [3 /*break*/, 3];
                        fetchHeaders = new node_fetch_1.Headers();
                        fetchHeaders.append(AUTHORIZATION_HEADER, authToken);
                        return [4 /*yield*/, (0, node_fetch_1.default)(DISCORD_URL, { method: 'GET', headers: fetchHeaders })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        discordUser = _b.sent();
                        return [2 /*return*/, "".concat(discordUser.id).concat(AController_1.DELIM).concat(discordUser.username) || null];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * This method takes in a server response, an error code object, and optionally a message.
     * It will then set the status code of the response to the code of the provided error object.
     * If the errorCode provided is a number, it will be used instead.
     * The response will then be returned as a JSON object with a code and message.
     * If a message is provided when the function is used, it will be returned to the user.
     * Otherwise, the default error message associated with the status code, as declared above, will be returned.
     * @param res Server response
     * @param errorCode Error code object. Also supports numbers if you are bad at reading JSDocs
     * @param message Overridden error message response.
     */
    AController.prototype.exitWithMessage = function (res, errorCode, message) {
        var status = isNaN(errorCode) ? errorCode.code : parseInt(errorCode, 10);
        res.statusCode = status;
        return res.json({ code: status, message: message !== null && message !== void 0 ? message : errorCode.message });
    };
    /**
     * This method takes in a server response and an array of ValidationErrors
     * It will then set the status code of the response to 422 (Unprocessable entity),
     * and will loop through the validation errors, mapping them to an object which associates
     * each error message with the offending property.
     * After this is complete, the newly created error object is returned in the server response as JSON
     * @param res Server response
     * @param violations Array of validation errors
     */
    AController.prototype.exitWithViolations = function (res, violations) {
        var _a;
        res.statusCode = AController_1.STATUS_CODES.UNPROCESSABLE_ENTITY.code;
        var errors = [];
        for (var _i = 0, violations_1 = violations; _i < violations_1.length; _i++) {
            var error = violations_1[_i];
            errors.push((_a = {}, _a[error.property] = Object.values(error.constraints)[0], _a));
        }
        return res.json(errors);
    };
    /**
     * This function takes in a string array and uses them to create instances of Tag objects
     * After an instance of a Tag object is created, it is validated against the validation rules outlined for Tag
     * entities. If there are errors, the tag is simply dropped from the list. If there are no errors, we ensure
     * The tag does not already exist in the list.
     * If it does, we skip over it.
     * If it does not, we add it to the return array of Tag objects.
     * Once all the tags are loops through, return the newly generated array.
     * @param tags String array of tagNames.
     */
    AController.prototype.buildTags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            var tagReturn, _i, tags_1, tag, newTag, violations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagReturn = [];
                        _i = 0, tags_1 = tags;
                        _a.label = 1;
                    case 1:
                        if (!(_i < tags_1.length)) return [3 /*break*/, 4];
                        tag = tags_1[_i];
                        newTag = Object.assign(new Tag_1.Tag(), { tagName: tag.toLowerCase() });
                        return [4 /*yield*/, (0, class_validator_1.validate)(newTag)];
                    case 2:
                        violations = _a.sent();
                        if (!violations.length && !tagReturn.includes(newTag)) {
                            tagReturn.push(newTag);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, tagReturn];
                }
            });
        });
    };
    /**
     * This function takes in a request object and generates Sort field and Sort order from the request's query.
     * If the request specifies neither of these, defaults are used (Often the ID Number in ascending order)
     * Otherwise, the request parameters are checked against allowed fields and sort orders, and are generated as
     * requested. They are then returned as an anonymous sorting object.
     * @param req Client Request
     */
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
        UNPROCESSABLE_ENTITY: { code: 422, message: 'The provided entity cannot be processes.' },
        OK_STATUS: { code: 200, message: 'Request has succeeded and is fulfilled.' },
        UNAUTHORIZED_STATUS: { code: 401, message: 'You are not authorized to perform this action.' },
        ITEM_NOT_FOUND: { code: 404, message: 'Requested resource could not be located.' },
        INTERNAL_SERVER_ERROR: { code: 500, message: 'The server has an internal error.' },
        NO_CONTENT: { code: 204, message: 'Request succeeded.' },
        BAD_REQUEST: { code: 400, message: 'Your request cannot be completed as it is malformed.' }
    };
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
    __decorate([
        __param(0, (0, routing_controllers_1.Head)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AController, "getUser", null);
    AController = AController_1 = __decorate([
        (0, routing_controllers_1.Controller)()
    ], AController);
    return AController;
}());
exports.AController = AController;
//# sourceMappingURL=AController.js.map