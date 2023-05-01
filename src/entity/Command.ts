/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Command entity for CWEB280FinalProject
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsInt, IsNotEmpty, IsOptional, Length, Max, Min } from 'class-validator'
import { RegisteredUser } from './RegisteredUser'
import { Meme } from './Meme'

const NAME_MIN: number = 1
const NAME_MAX: number = 25
const COMMAND_NAME_LENGTH_ERR: string = 'Command name must be from $constraint1 to $constraint2 characters,'

const TEXT_MIN: number = 1
const TEXT_MAX: number = 1024
const COMMAND_TEXT_LENGTH_ERR: string = 'Command text output must be from $constraint1 to $constraint2 characters,}'

const MENTION_MIN: number = 0
const COMMAND_MENTION_MIN_ERR: string = 'Mention number cannot be smaller than $constraint1'

const MENTION_MAX: number = 16
const COMMAND_MENTION_MAX_ERR: string = 'Cannot exceed $constraint1 mentions'

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  @IsOptional()
    commandID: number

  @Column({ type: 'varchar', length: NAME_MAX })
  @Length(NAME_MIN, NAME_MAX,
    { message: COMMAND_NAME_LENGTH_ERR })
  @IsNotEmpty()
    cName: string

  @Column({ type: 'varchar', length: NAME_MAX })
  @Length(TEXT_MIN, TEXT_MAX,
    { message: COMMAND_TEXT_LENGTH_ERR })
  @IsOptional()
    cText: string

  @Column({ type: 'boolean', default: false })
  @IsOptional()
    cMentionsUser: boolean

  @Column({ type: 'integer', default: MENTION_MIN })
  @IsInt()
  @Min(MENTION_MIN, { message: COMMAND_MENTION_MIN_ERR })
  @Max(MENTION_MAX, { message: COMMAND_MENTION_MAX_ERR })
    cNumMentions: number

  @ManyToOne(() => RegisteredUser, {
    cascade: ['insert', 'update'],
    eager: true
  })
    cCreator: RegisteredUser

  @ManyToOne(() => Meme, { eager: true })
  @IsNotEmpty()
    meme: Meme
}
