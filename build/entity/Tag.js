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
exports.Tag = void 0;
/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Tag entity for CWEB280FinalProject
 */
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Meme_1 = require("./Meme");
var TAG_NAME_MIN = 1;
var TAG_NAME_MAX = 12;
var TAG_NAME_ERR = 'Tag name must be from $constraint1 to $constraint2 characters';
var Tag = /** @class */ (function () {
    function Tag() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: TAG_NAME_MAX }),
        (0, class_validator_1.IsAlphanumeric)(),
        (0, class_validator_1.Length)(TAG_NAME_MIN, TAG_NAME_MAX, { message: TAG_NAME_ERR }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], Tag.prototype, "tagName", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Meme_1.Meme; }, function (meme) { return meme.tags; }),
        __metadata("design:type", Array)
    ], Tag.prototype, "memes", void 0);
    Tag = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['tagName'])
    ], Tag);
    return Tag;
}());
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map