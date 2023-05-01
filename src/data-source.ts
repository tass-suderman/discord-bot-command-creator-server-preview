/**
 * @author Tass Suderman, Levi Krozser
 */
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Meme } from './entity/Meme'
import { Command } from './entity/Command'
import { RegisteredUser } from './entity/RegisteredUser'
import { Tag } from './entity/Tag'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'meme-world.db',
  synchronize: true,
  logging: false,
  entities: [Meme, Command, RegisteredUser, Tag],
  migrations: [],
  subscribers: []
})
