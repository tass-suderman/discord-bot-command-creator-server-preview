"use strict";
/**
* @author Tass Suderman, Levi Krozser
 * Routes:
 * GET -- returns all commands
 *        -- supports sortorder, sortby, and where
 * GET One -- Returns one command based on commandID
 * POST -- Adds a command
 *         -- Requires cName, cText, memeID
 * PUT -- Updates a command
 *         -- Requires cName, cText, memeID
 *         -- Requires commandID in params
 *         -- Can only be changed by command creator
 * DELETE -- Deletes a command
 *         -- Requires commmandID in params
 *         -- Can only be performed by command creator
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CommandController = void 0;
var routing_controllers_1 = require("routing-controllers");
var AController_1 = require("./AController");
var data_source_1 = require("../data-source");
var Command_1 = require("../entity/Command");
var class_validator_1 = require("class-validator");
var Meme_1 = require("../entity/Meme");
var RegisteredUser_1 = require("../entity/RegisteredUser");
// Defines what would replace a self reference and other person reference
var mentionSelfRef = '$self';
var mentionHead = '$mention';
var mentionTails = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F'];
var MISSING_ID_ERR = 'ID must be provided and numeric';
var MISSING_MEMEID_ERR = 'Invalid body sent. Check your memeID';
var EDIT_UNAUTHORIZED_ERR = 'Only the command creator can update their command';
var DELETE_UNAUTHORIZED_ERR = 'Only the command creator can delete their command';
var CommandController = /** @class */ (function (_super) {
    __extends(CommandController, _super);
    function CommandController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SORT_FIELDS = ['commandID', 'cName', 'cNumMentions', 'cCreator', 'cCreator.userName'];
        _this.commandRepo = data_source_1.AppDataSource.getRepository(Command_1.Command);
        _this.memeRepo = data_source_1.AppDataSource.getRepository(Meme_1.Meme);
        return _this;
    }
    /**
     * GET Route handler for /commands
     * Returns commands, sorted or filtered, if requested.
     * By default, it returns all commands, sorted in ascending order by ID
     * Defining sortby can change the field it sorts by (see SORT_FIELDS for acceptable options)
     * Declaring descending in sortorder can make it sort in descending order instead
     * (See DESCENDING_OPTIONS in AController for more)
     * Declaring where and adding any number of characters will filter to command results where they are LIKE the where value
     * After the GET options are parsed, the results are returned in an array
     * @param req Client Request
     */
    CommandController.prototype.getCommands = function (req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var where, queryWhere, sortOptions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        where = (_a = req.query.where) !== null && _a !== void 0 ? _a : '%';
                        queryWhere = "%".concat(where, "%");
                        sortOptions = this.getSortOptions(req);
                        return [4 /*yield*/, this.commandRepo
                                .createQueryBuilder('command')
                                .leftJoinAndSelect('command.cCreator', 'cCreator')
                                .leftJoinAndSelect('command.meme', 'meme')
                                .where('cCreator.userName LIKE :queryWhere', { queryWhere: queryWhere })
                                .orWhere('cCreator.uID LIKE :queryWhere', { queryWhere: queryWhere })
                                .orWhere('cNumMentions LIKE :queryWhere', { queryWhere: queryWhere })
                                .orWhere('cName LIKE :queryWhere', { queryWhere: queryWhere })
                                .orWhere('cText LIKE :queryWhere', { queryWhere: queryWhere })
                                .addOrderBy(sortOptions.field, sortOptions.order)
                                .getMany()];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * GET Route handler for /commands/:commandID
     * Takes in a parameter, defining the requested command ID.
     * If the CommandID is not a number or is otherwise not provided, it returns a 400 Bad request status
     * It then searches for a command with that ID
     * If it exists, it is returned as JSON.
     * Else, a 404 is returned.
     * @param commandID commandID to search for
     * @param res Server Response
     */
    CommandController.prototype.getOneCommand = function (commandID, res) {
        return __awaiter(this, void 0, void 0, function () {
            var returnCommand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!commandID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
                        }
                        return [4 /*yield*/, this.commandRepo.findOneBy({ commandID: commandID })];
                    case 1:
                        returnCommand = _a.sent();
                        if (!returnCommand) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND, "Command of ID ".concat(commandID, " is not found"))];
                        }
                        return [2 /*return*/, res.json(returnCommand)];
                }
            });
        });
    };
    /**
     * POST handler for /commands/
     * Used to create and save Command objects
     * There are three paths that this code block can take
     * 1) No meme ID Provided => Exit with bad request error code and message
     * 2) Command provided fails validation => Exit with unprocessable entity and error messages
     * 3) All goes as planned => Create and save command. Return it as JSON.
     * @param req Client Request
     * @param res Server Response
     */
    CommandController.prototype.post = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userFields, user, newCommand, violations;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.memeID)) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_MEMEID_ERR)];
                        }
                        userFields = {
                            uID: req.headers.uID, userName: req.headers.userName
                        };
                        user = Object.assign(new RegisteredUser_1.RegisteredUser(), userFields);
                        return [4 /*yield*/, this.commandBuilder(req, res, user)];
                    case 1:
                        newCommand = _b.sent();
                        return [4 /*yield*/, (0, class_validator_1.validate)(newCommand)];
                    case 2:
                        violations = _b.sent();
                        if (violations.length) {
                            return [2 /*return*/, this.exitWithViolations(res, violations)];
                        }
                        return [4 /*yield*/, this.commandRepo.save(newCommand)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * PUT handler for /commands/:commandID
     * Used to modify and update saved commands.
     * The paths that the code can take
     * 1) No command ID / Invalid command ID => Exit with status 400
     * 2) Command ID doesn't point to an existing command => Exit with Error 404
     * 3) Command Creator does not match logged in creator => Exit with Error 401
     * 4) Command edits introduce validation errors => Exit with Error 422 and validation error messages
     * 5) All is well => Command is saved and returned
     * @param commandID ID of the command to be updated
     * @param req Client request
     * @param res Server response
     */
    CommandController.prototype.update = function (commandID, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, commandToUpdate, newCommand, violations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!commandID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
                        }
                        user = Object.assign(new RegisteredUser_1.RegisteredUser(), { uID: req.headers.uID, userName: req.headers.userName });
                        return [4 /*yield*/, this.commandRepo.findOneBy({ commandID: commandID })];
                    case 1:
                        commandToUpdate = _a.sent();
                        if (!commandToUpdate) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND, "Command of ID ".concat(commandID, " is not found"))];
                        }
                        if (user.uID !== commandToUpdate.cCreator.uID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.UNAUTHORIZED_STATUS, EDIT_UNAUTHORIZED_ERR)];
                        }
                        return [4 /*yield*/, this.commandBuilder(req, res, user)];
                    case 2:
                        newCommand = _a.sent();
                        return [4 /*yield*/, (0, class_validator_1.validate)(newCommand)];
                    case 3:
                        violations = _a.sent();
                        if (violations.length) {
                            return [2 /*return*/, this.exitWithViolations(res, violations)];
                        }
                        newCommand.commandID = commandToUpdate.commandID;
                        return [4 /*yield*/, this.commandRepo.save(newCommand)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * DELETE Route handler for /commands/:commandID
     * Takes in request, response, and param
     * Paths are as follows
     * 1) Command ID invalid / not provided => Exit with Error 400
     * 2) Command ID provided does not point to a valid command => Exit with Error 404
     * 3) Logged-in user does not match the command creator => Exit with Error 401
     * 4) All is well. Delete command and return results
     * @param commandID ID of command to be deleted
     * @param req Client Request
     * @param res Server Response
     */
    CommandController.prototype.delete = function (commandID, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, commandToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!commandID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
                        }
                        user = Object.assign(new RegisteredUser_1.RegisteredUser(), { uID: req.headers.uID, userName: req.headers.userName });
                        return [4 /*yield*/, this.commandRepo.findOneBy({ commandID: parseInt(req.params.commandID, 10) })]; // if things get broky look at this line
                    case 1:
                        commandToRemove = _a.sent() // if things get broky look at this line
                        ;
                        if (!commandToRemove) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND, "Command of ID ".concat(commandID, " is not found"))];
                        }
                        if (user.uID !== commandToRemove.cCreator.uID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.UNAUTHORIZED_STATUS, DELETE_UNAUTHORIZED_ERR)];
                        }
                        res.statusCode = AController_1.AController.STATUS_CODES.NO_CONTENT.code; // delete me if broky
                        return [4 /*yield*/, this.commandRepo.remove(commandToRemove)];
                    case 2: // delete me if broky
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * DELETE Route handler for /commands/
     * Only used when ID is not provided.
     * Returns error 400
     * @param res Server Response
     */
    CommandController.prototype.deleteNoID = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
            });
        });
    };
    /**
     * PUT Route handler for /commands/
     * Only used when ID is not provided.
     * Returns error 400
     * @param res Server Response
     */
    CommandController.prototype.updateNoID = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
            });
        });
    };
    /**
     * This function takes in the text of a command and returns some command metadata used for functional
     * tasks later on. Counts number of distinct mentioned users and whether or not a user wants to mention themself
     * @param commandText Text to be looked through
     */
    CommandController.prototype.commandParser = function (commandText) {
        var mentionsUser = commandText.includes(mentionSelfRef);
        var numMentions = 0;
        for (var _i = 0, mentionTails_1 = mentionTails; _i < mentionTails_1.length; _i++) {
            var tail = mentionTails_1[_i];
            if (commandText.includes(mentionHead + tail)) {
                numMentions++;
            }
        }
        return { cNumMentions: numMentions, cMentionsUser: mentionsUser };
    };
    /**
     * This function takes in a request, response, and user object, and does the bulk of building the command object.
     * Once built, it is returned to the appropriate route.
     * @param req Client Request
     * @param res Server Response
     * @param user Logged-in user
     */
    CommandController.prototype.commandBuilder = function (req, res, user) {
        return __awaiter(this, void 0, void 0, function () {
            var meme, commandData, commandFields, newCommand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memeRepo.findOneBy({ memeID: req.body.memeID })];
                    case 1:
                        meme = _a.sent();
                        if (!meme) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND, "Meme with ID ".concat(req.body.memeID, " not found."))];
                        }
                        commandData = req.body.cText ? this.commandParser(req.body.cText) : { cNumMentions: 0, cMentionsUser: false };
                        commandFields = {
                            cName: req.body.cName,
                            cText: req.body.cText,
                            cMentionsUser: commandData.cMentionsUser,
                            cNumMentions: commandData.cNumMentions
                        };
                        newCommand = Object.assign(new Command_1.Command(), commandFields);
                        newCommand.meme = meme;
                        newCommand.cCreator = user;
                        return [2 /*return*/, newCommand];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Get)('/commands/'),
        __param(0, (0, routing_controllers_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], CommandController.prototype, "getCommands", null);
    __decorate([
        (0, routing_controllers_1.Get)('/commands/:commandID'),
        __param(0, (0, routing_controllers_1.Param)('commandID')),
        __param(1, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], CommandController.prototype, "getOneCommand", null);
    __decorate([
        (0, routing_controllers_1.Post)('/commands/'),
        __param(0, (0, routing_controllers_1.Req)()),
        __param(1, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], CommandController.prototype, "post", null);
    __decorate([
        (0, routing_controllers_1.Put)('/commands/:commandID'),
        __param(0, (0, routing_controllers_1.Param)('commandID')),
        __param(1, (0, routing_controllers_1.Req)()),
        __param(2, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Object]),
        __metadata("design:returntype", Promise)
    ], CommandController.prototype, "update", null);
    __decorate([
        (0, routing_controllers_1.Delete)('/commands/:commandID'),
        __param(0, (0, routing_controllers_1.Param)('commandID')),
        __param(1, (0, routing_controllers_1.Req)()),
        __param(2, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Object]),
        __metadata("design:returntype", Promise)
    ], CommandController.prototype, "delete", null);
    __decorate([
        (0, routing_controllers_1.Delete)('/commands/'),
        __param(0, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], CommandController.prototype, "deleteNoID", null);
    __decorate([
        (0, routing_controllers_1.Put)('/commands/'),
        __param(0, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], CommandController.prototype, "updateNoID", null);
    CommandController = __decorate([
        (0, routing_controllers_1.Controller)()
    ], CommandController);
    return CommandController;
}(AController_1.AController));
exports.CommandController = CommandController;
//# sourceMappingURL=CommandController.js.map