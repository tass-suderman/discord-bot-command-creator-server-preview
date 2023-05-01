"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
/**
 * @author Tass Suderman, Levi Krozser
 */
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Meme_1 = require("./entity/Meme");
var Command_1 = require("./entity/Command");
var RegisteredUser_1 = require("./entity/RegisteredUser");
var Tag_1 = require("./entity/Tag");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'better-sqlite3',
    database: 'sqlite.db',
    synchronize: true,
    logging: false,
    entities: [Meme_1.Meme, Command_1.Command, RegisteredUser_1.RegisteredUser, Tag_1.Tag],
    migrations: [],
    subscribers: []
});
//# sourceMappingURL=data-source.js.map