"use strict";
/**
 * @author Tass Suderman, Levi Krozser
 * * GET -- returns all memes
 *  *        -- supports sortorder, sortby, and where
 *  * GET One -- Returns one meme based on memeID
 *  * POST -- Adds a meme
 *  *         -- Requires mDescription, mImageRoute, tags
 *  * PUT -- Updates a meme
 *  *         -- Requires mDescription, mImageRoute, tags
 *  *         -- Requires memeID in params
 *  *         -- Can only be changed by meme creator
 *  * DELETE -- Deletes a meme
 *  *         -- Requires memeID in params
 *  *         -- Can only be performed by meme creator
 * */
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
exports.MemeController = void 0;
var routing_controllers_1 = require("routing-controllers");
var data_source_1 = require("../data-source");
var RegisteredUser_1 = require("../entity/RegisteredUser");
var Meme_1 = require("../entity/Meme");
var class_validator_1 = require("class-validator");
var AController_1 = require("./AController");
var MISSING_ID_ERR = 'ID must be provided and numeric';
var EDIT_UNAUTHORIZED_ERR = 'Only the meme creator can update their command';
var DELETE_UNAUTHORIZED_ERR = 'Only the meme creator can delete their command';
var MemeController = /** @class */ (function (_super) {
    __extends(MemeController, _super);
    function MemeController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SORT_FIELDS = ['memeID', 'mCreator', 'mCreator.userName'];
        _this.memeRepo = data_source_1.AppDataSource.getRepository(Meme_1.Meme);
        return _this;
    }
    /**
     * GET Route handler for /memes
     * Returns memes, sorted or filtered, if requested.
     * By default, it returns all memes, sorted in ascending order by ID
     * Defining sortby can change the field it sorts by (see SORT_FIELDS for acceptable options)
     * Declaring descending in sortorder can make it sort in descending order instead
     * (See DESCENDING_OPTIONS in AController for more)
     * Declaring where and adding any number of characters will filter to meme results where they are LIKE the where value
     * After the GET options are parsed, the results are returned in an array
     * @param req Client Request
     */
    MemeController.prototype.getMemes = function (req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var where, queryWhere, sortOptions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        where = (_a = req.query.where) !== null && _a !== void 0 ? _a : '%';
                        queryWhere = "%".concat(where, "%");
                        sortOptions = this.getSortOptions(req);
                        return [4 /*yield*/, this.memeRepo
                                .createQueryBuilder('meme')
                                .leftJoinAndSelect('meme.mCreator', 'mCreator')
                                .leftJoinAndSelect('meme.tags', 'tags')
                                .where('mCreator.userName LIKE :queryWhere', { queryWhere: queryWhere })
                                .orWhere('mCreator.uID LIKE :queryWhere', { queryWhere: queryWhere })
                                .orWhere('tags.tagName LIKE :queryWhere', { queryWhere: queryWhere })
                                .orWhere('mDescription LIKE :queryWhere', { queryWhere: queryWhere })
                                .addOrderBy(sortOptions.field, sortOptions.order)
                                .getMany()];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * GET route handler for /memes/:memeID
     * Route Paths:
     * 1) No Meme ID Provided / invalid Meme ID Provided => Exit with status 400
     * 2) No meme associated with provided ID => Exit with status 404
     * 3) Meme successfully retrieved => return meme
     * @param memeID ID of the meme to return
     * @param res Server Response
     */
    MemeController.prototype.getOneMeme = function (memeID, res) {
        return __awaiter(this, void 0, void 0, function () {
            var returnMeme;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!memeID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
                        }
                        return [4 /*yield*/, this.memeRepo.findOneBy({ memeID: memeID })];
                    case 1:
                        returnMeme = _a.sent();
                        if (!returnMeme) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND, "Meme of ID ".concat(memeID, " is not found"))];
                        }
                        return [2 /*return*/, res.json(returnMeme)];
                }
            });
        });
    };
    /**
     * POST handler for /memes/
     * Used to create and save Meme objects
     * Constructs meme, and checks for validation errors
     * If validation passes, save it and return the result
     * If validation fails, return the violations with status code 422
     * @param req Client Request
     * @param res Server Response
     */
    MemeController.prototype.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newMeme, violations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memeBuilder(req, res)];
                    case 1:
                        newMeme = _a.sent();
                        newMeme.mCreator = Object.assign(new RegisteredUser_1.RegisteredUser(), { uID: req.headers.uID, userName: req.headers.userName });
                        return [4 /*yield*/, (0, class_validator_1.validate)(newMeme)];
                    case 2:
                        violations = _a.sent();
                        if (violations.length) {
                            return [2 /*return*/, this.exitWithViolations(res, violations)];
                        }
                        return [4 /*yield*/, this.memeRepo.save(newMeme)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * PUT handler for /memes/:memeID
     * Used to modify and update saved memes.
     * The paths that the code can take
     * 1) No Meme ID / Invalid Meme ID => Exit with status 400
     * 2) Meme ID doesn't point to an existing command => Exit with Error 404
     * 3) Meme Creator does not match logged in creator => Exit with Error 401
     * 4) Meme edits introduce validation errors => Exit with Error 422 and validation error messages
     * 5) All is well => Meme is saved and returned
     * @param memeID ID of the meme to be updated
     * @param req Client request
     * @param res Server response
     */
    MemeController.prototype.update = function (memeID, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, oldMeme, newMeme, violations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!memeID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
                        }
                        user = Object.assign(new RegisteredUser_1.RegisteredUser(), { uID: req.headers.uID, userName: req.headers.userName });
                        return [4 /*yield*/, this.memeRepo.findOneBy({ memeID: memeID })];
                    case 1:
                        oldMeme = _a.sent();
                        if (!oldMeme) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND, "Meme of ID ".concat(memeID, " is not found"))];
                        }
                        if (user.uID !== oldMeme.mCreator.uID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.UNAUTHORIZED_STATUS, EDIT_UNAUTHORIZED_ERR)];
                        }
                        return [4 /*yield*/, this.memeBuilder(req, res)];
                    case 2:
                        newMeme = _a.sent();
                        return [4 /*yield*/, (0, class_validator_1.validate)(newMeme)];
                    case 3:
                        violations = _a.sent();
                        if (violations.length) {
                            return [2 /*return*/, this.exitWithViolations(res, violations)];
                        }
                        newMeme.memeID = oldMeme.memeID;
                        return [4 /*yield*/, this.memeRepo.save(newMeme)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * DELETE Route handler for /memes/:memeID
     * Takes in request, response, and param
     * Paths are as follows
     * 1) Meme ID invalid / not provided => Exit with Error 400
     * 2) Meme ID provided does not point to a valid command => Exit with Error 404
     * 3) Logged-in user does not match the meme creator => Exit with Error 401
     * 4) All is well. Delete command and return results
     * @param memeID ID of command to be deleted
     * @param req Client Request
     * @param res Server Response
     */
    MemeController.prototype.delete = function (memeID, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, memeToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!memeID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
                        }
                        user = Object.assign(new RegisteredUser_1.RegisteredUser(), { uID: req.headers.uID, userName: req.headers.userName });
                        return [4 /*yield*/, this.memeRepo.findOneBy({ memeID: parseInt(req.params.memeID) })];
                    case 1:
                        memeToRemove = _a.sent();
                        if (!memeToRemove) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.ITEM_NOT_FOUND, "Meme of ID ".concat(memeID, " is not found"))];
                        }
                        if (user.uID !== memeToRemove.mCreator.uID) {
                            return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.UNAUTHORIZED_STATUS, DELETE_UNAUTHORIZED_ERR)];
                        }
                        res.statusCode = AController_1.AController.STATUS_CODES.NO_CONTENT.code; // delete me if broky
                        return [4 /*yield*/, this.memeRepo.remove(memeToRemove)];
                    case 2: // delete me if broky
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * DELETE Route handler for /memes/
     * Only used when ID is not provided.
     * Returns error 400
     * @param res Server Response
     */
    MemeController.prototype.deleteNoID = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
            });
        });
    };
    /**
     * PUT Route handler for /memes/
     * Only used when ID is not provided.
     * Returns error 400
     * @param res Server Response
     */
    MemeController.prototype.updateNoID = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.exitWithMessage(res, AController_1.AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)];
            });
        });
    };
    /**
     * This function takes in a request and response, and works to build meme objects as they exist thus far.
     * Once constructed and validated, it is returned to the appropriate route.
     * @param req Client request
     * @param res Server response
     */
    MemeController.prototype.memeBuilder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newMeme, tags, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        newMeme = Object.assign(new Meme_1.Meme(), {
                            mDescription: req.body.mDescription,
                            mImageRoute: req.body.mImageRoute
                        });
                        tags = req.body.tags;
                        _a = newMeme;
                        return [4 /*yield*/, this.buildTags(tags)];
                    case 1:
                        _a.tags = _b.sent();
                        return [2 /*return*/, newMeme];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Get)('/memes/'),
        __param(0, (0, routing_controllers_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MemeController.prototype, "getMemes", null);
    __decorate([
        (0, routing_controllers_1.Get)('/memes/:memeID'),
        __param(0, (0, routing_controllers_1.Param)('memeID')),
        __param(1, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], MemeController.prototype, "getOneMeme", null);
    __decorate([
        (0, routing_controllers_1.Post)('/memes/'),
        __param(0, (0, routing_controllers_1.Req)()),
        __param(1, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], MemeController.prototype, "post", null);
    __decorate([
        (0, routing_controllers_1.Put)('/memes/:memeID'),
        __param(0, (0, routing_controllers_1.Param)('memeID')),
        __param(1, (0, routing_controllers_1.Req)()),
        __param(2, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Object]),
        __metadata("design:returntype", Promise)
    ], MemeController.prototype, "update", null);
    __decorate([
        (0, routing_controllers_1.Delete)('/memes/:memeID'),
        __param(0, (0, routing_controllers_1.Param)('memeID')),
        __param(1, (0, routing_controllers_1.Req)()),
        __param(2, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Object]),
        __metadata("design:returntype", Promise)
    ], MemeController.prototype, "delete", null);
    __decorate([
        (0, routing_controllers_1.Delete)('/memes/'),
        __param(0, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MemeController.prototype, "deleteNoID", null);
    __decorate([
        (0, routing_controllers_1.Put)('/memes/'),
        __param(0, (0, routing_controllers_1.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MemeController.prototype, "updateNoID", null);
    MemeController = __decorate([
        (0, routing_controllers_1.Controller)()
    ], MemeController);
    return MemeController;
}(AController_1.AController));
exports.MemeController = MemeController;
//# sourceMappingURL=MemeController.js.map