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
exports.Command = void 0;
/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Command entity for CWEB280FinalProject
 */
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var RegisteredUser_1 = require("./RegisteredUser");
var Meme_1 = require("./Meme");
var NAME_MIN = 1;
var NAME_MAX = 25;
var COMMAND_NAME_LENGTH_ERR = 'Command name must be from $constraint1 to $constraint2 characters,';
var TEXT_MIN = 1;
var TEXT_MAX = 1024;
var COMMAND_TEXT_LENGTH_ERR = 'Command text output must be from $constraint1 to $constraint2 characters,}';
var MENTION_MIN = 0;
var COMMAND_MENTION_MIN_ERR = 'Mention number cannot be smaller than $constraint1';
var MENTION_MAX = 16;
var COMMAND_MENTION_MAX_ERR = 'Cannot exceed $constraint1 mentions';
var Command = /** @class */ (function () {
    function Command() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], Command.prototype, "commandID", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: NAME_MAX }),
        (0, class_validator_1.Length)(NAME_MIN, NAME_MAX, { message: COMMAND_NAME_LENGTH_ERR }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Command.prototype, "cName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: NAME_MAX }),
        (0, class_validator_1.Length)(TEXT_MIN, TEXT_MAX, { message: COMMAND_TEXT_LENGTH_ERR }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], Command.prototype, "cText", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Boolean)
    ], Command.prototype, "cMentionsUser", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'integer', default: MENTION_MIN }),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.Min)(MENTION_MIN, { message: COMMAND_MENTION_MIN_ERR }),
        (0, class_validator_1.Max)(MENTION_MAX, { message: COMMAND_MENTION_MAX_ERR }),
        __metadata("design:type", Number)
    ], Command.prototype, "cNumMentions", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return RegisteredUser_1.RegisteredUser; }, {
            cascade: ['insert', 'update'],
            eager: true
        }),
        __metadata("design:type", RegisteredUser_1.RegisteredUser)
    ], Command.prototype, "cCreator", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Meme_1.Meme; }, { eager: true }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Meme_1.Meme)
    ], Command.prototype, "meme", void 0);
    Command = __decorate([
        (0, typeorm_1.Entity)()
    ], Command);
    return Command;
}());
exports.Command = Command;
//# sourceMappingURL=Command.js.map