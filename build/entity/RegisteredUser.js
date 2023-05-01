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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredUser = void 0;
/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Registered user entity for CWEB280FinalProject
 */
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Meme_1 = require("./Meme");
var USER_ID_MIN = 17;
var USER_ID_MAX = 20;
var USER_ID_LENGTH_ERR = 'User ID must be from $constraint1 to $constraint2 characters';
var USER_NAME_MIN = 2;
var USER_NAME_MAX = 32;
var USER_NAME_LENGTH_ERR = 'Username must be from $constraint1 to $constraint2 characters';
var RegisteredUser = /** @class */ (function () {
    function RegisteredUser() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: USER_ID_MAX }),
        (0, class_validator_1.Length)(USER_ID_MIN, USER_ID_MAX, { message: USER_ID_LENGTH_ERR }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], RegisteredUser.prototype, "uID", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: USER_NAME_MAX }),
        (0, class_validator_1.Length)(USER_NAME_MIN, USER_NAME_MAX, { message: USER_NAME_LENGTH_ERR }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], RegisteredUser.prototype, "userName", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return Meme_1.Meme; }, function (meme) { return meme.mCreator; }),
        __metadata("design:type", Array)
    ], RegisteredUser.prototype, "memes", void 0);
    RegisteredUser = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['uID'])
    ], RegisteredUser);
    return RegisteredUser;
}());
exports.RegisteredUser = RegisteredUser;
//# sourceMappingURL=RegisteredUser.js.map