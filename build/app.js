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
/**
 * @author Tass Suderman, Levi Krozser
 */
var express = require("express");
var bodyParser = require("body-parser");
var data_source_1 = require("./data-source");
var cors = require("cors");
var MemeController_1 = require("./controller/MemeController");
var CommandController_1 = require("./controller/CommandController");
var TagController_1 = require("./controller/TagController");
var AController_1 = require("./controller/AController");
var routing_controllers_1 = require("routing-controllers");
// Backend server port
var port = 3030;
var NOT_LOGGED_IN_ERR = 'You must be logged in to a discord session to perform this action';
// todo maybe ? https://github.com/typestack/routing-controllers#using-authorization-features
var ROUTE_NOT_FOUND_ERR = 'Route not found';
var ROUTE_NOT_FOUND = { code: AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND.code, message: ROUTE_NOT_FOUND_ERR };
// CORS options
var corsOptions = {
    origin: /localhost:\d{4,5}$/i,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    methods: 'GET,PUT,POST,DELETE'
};
/**
 * This function is used as a handler for all incoming requests.
 * It passes the headers into our function used to fetch a user from discord via their bearer token
 * If that check returns correctly, their user info is appended to the request headers
 * If it fails, the request is turned away with an unauthorized status code and an error message
 * If it succeeds, we pass the request down to the next handler
 * @param req Client Request
 * @param res Server response
 * @param next Next function to be executed
 */
var ACCOUNT_CHECKER = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, userFields;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, AController_1.AController.getUser(req.headers)];
            case 1:
                userInfo = _a.sent();
                if (userInfo) {
                    userFields = userInfo.split(AController_1.AController.DELIM);
                    req.headers.uID = userFields[0];
                    req.headers.userName = userFields[1];
                    next();
                }
                else {
                    res.statusCode = AController_1.AController.STATUS_CODES.UNAUTHORIZED_STATUS.code;
                    return [2 /*return*/, res.json({
                            code: AController_1.AController.STATUS_CODES.UNAUTHORIZED_STATUS.code,
                            message: NOT_LOGGED_IN_ERR
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * This function is used as a handler for cases wherein another route is not used. This typically means the user has
 * entered an invalid URL. In this case, we first ensure headers have not been sent to the client. This acts as a second
 * layer of fault tolerance to ensure we are not reaching this handler after a request has been addressed.
 * If headers have not been sent, it is fair to assume that the client's request has not been tended to. In this instance
 * we will set the status code to 404 and inform the user that their request has not been fulfilled
 * @param req Client Request
 * @param res Server response
 */
var NOT_FOUND_HANDLER = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!res.headersSent) {
            res.statusCode = AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND.code;
            return [2 /*return*/, res.json(ROUTE_NOT_FOUND)];
        }
        return [2 /*return*/];
    });
}); };
var controllers = [MemeController_1.MemeController, CommandController_1.CommandController, TagController_1.TagController];
data_source_1.AppDataSource.initialize().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = express();
        app.use(bodyParser.json());
        app.use(cors(corsOptions));
        // first use the account checker
        app.use(ACCOUNT_CHECKER);
        // then the controllers
        (0, routing_controllers_1.useExpressServer)(app, { controllers: controllers });
        // if the controllers do not fulfill your request, you receive a 404 for your efforts
        app.use(NOT_FOUND_HANDLER);
        app.listen(port);
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
//# sourceMappingURL=app.js.map