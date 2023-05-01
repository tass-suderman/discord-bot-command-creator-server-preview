/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Registered user entity for CWEB280FinalProject
 */
import { Entity, Column, Unique, PrimaryColumn, OneToMany } from 'typeorm'
import { IsOptional, Length } from 'class-validator'
import { Meme } from './Meme'

const USER_ID_MIN: number = 17
const USER_ID_MAX: number = 20
const USER_ID_LENGTH_ERR: string = 'User ID must be from $constraint1 to $constraint2 characters'
const USER_NAME_MIN: number = 2
const USER_NAME_MAX: number = 32
const USER_NAME_LENGTH_ERR: string = 'Username must be from $constraint1 to $constraint2 characters'

@Entity()
@Unique(['uID'])
export class RegisteredUser {
  @PrimaryColumn({ type: 'varchar', length: USER_ID_MAX })
  @Length(USER_ID_MIN, USER_ID_MAX,
    { message: USER_ID_LENGTH_ERR })
  @IsOptional()
    uID: string

  @Column({ type: 'varchar', length: USER_NAME_MAX })
  @Length(USER_NAME_MIN, USER_NAME_MAX,
    { message: USER_NAME_LENGTH_ERR })
  @IsOptional()
    userName: string

  @OneToMany(type => Meme, meme => meme.mCreator)
    memes: Meme[]
}
