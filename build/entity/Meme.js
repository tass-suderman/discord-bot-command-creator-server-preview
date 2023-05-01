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
exports.Meme = void 0;
/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Meme entity for CWEB280FinalProject
 */
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Tag_1 = require("./Tag");
var RegisteredUser_1 = require("./RegisteredUser");
var DESC_MIN = 1;
var DESC_MAX = 64;
var DESC_LENGTH_ERROR = 'Meme description must be from $constraint1 to $constraint2 characters';
// https://stackoverflow.com/questions/4098415/use-regex-to-get-image-url-in-html-js
var IMAGE_LENGTH_MIN = 5;
var IMAGE_LENGTH_MAX = 512;
var IMAGE_LENGTH_ERR = 'Image route path must be from $constraint1 to $constraint2 characters';
var IMAGE_REGEX = /(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|svg))/;
var IMAGE_URL_ERR = 'Meme image must be a valid image URL';
var Meme = /** @class */ (function () {
    function Meme() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], Meme.prototype, "memeID", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: DESC_MAX }),
        (0, class_validator_1.Length)(DESC_MIN, DESC_MAX, { message: DESC_LENGTH_ERROR }),
        __metadata("design:type", String)
    ], Meme.prototype, "mDescription", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: IMAGE_LENGTH_MAX }),
        (0, class_validator_1.Length)(IMAGE_LENGTH_MIN, IMAGE_LENGTH_MAX, { message: IMAGE_LENGTH_ERR }),
        (0, class_validator_1.Matches)(IMAGE_REGEX, {
            message: IMAGE_URL_ERR
        }),
        __metadata("design:type", String)
    ], Meme.prototype, "mImageRoute", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Tag_1.Tag; }, function (tag) { return tag.memes; }, {
            cascade: ['insert'],
            eager: true
        }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Meme.prototype, "tags", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return RegisteredUser_1.RegisteredUser; }, function (user) { return user.memes; }, {
            cascade: ['insert', 'update'],
            eager: true
        }),
        __metadata("design:type", RegisteredUser_1.RegisteredUser)
    ], Meme.prototype, "mCreator", void 0);
    Meme = __decorate([
        (0, typeorm_1.Entity)()
    ], Meme);
    return Meme;
}());
exports.Meme = Meme;
//# sourceMappingURL=Meme.js.map