import { Controller, Delete, Get, Param, Post, Put, Req, Res } from 'routing-controllers'
import { AController } from './AController'
import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Command } from '../entity/Command'
import { ValidationError } from 'class-validator'

const MISSING_ID_ERR: string = 'ID must be provided and numeric'

@Controller()
export class CommandController extends AController {
  public override readonly SORT_FIELDS: string[] =
    ['commandID', 'cName', 'cNumMentions', 'cCreator', 'cCreator.userName']

  private readonly commandRepo = AppDataSource.getRepository(Command)

  @Get('/commands/')
  async getCommands (@Req() req: Request): Promise<Command[]> {
    const where: string = req.query.where as string ?? '%'
    const queryWhere: string = `%${where}%`
    const sortOptions: any = this.getSortOptions(req)
    return await this.commandRepo
      .createQueryBuilder('command')
      .leftJoinAndSelect('command.cCreator', 'cCreator')
      .leftJoinAndSelect('command.meme', 'meme')
      .where('cCreator.userName LIKE :queryWhere', { queryWhere })
      .orWhere('cCreator.uID LIKE :queryWhere', { queryWhere })
      .orWhere('cNumMentions LIKE :queryWhere', { queryWhere })
      .orWhere('cName LIKE :queryWhere', { queryWhere })
      .orWhere('cText LIKE :queryWhere', { queryWhere })
      .addOrderBy(sortOptions.field, sortOptions.order)
      .getMany()
  }

  @Get('/commands/:commandID')
  async getOneCommand (@Param('commandID') commandID: number, @Res() res: Response): Promise<Command | any> {
    if (!commandID) {
      return this.exitWithMessage(res, AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)
    }
    const returnCommand: Command | null = await this.commandRepo.findOneBy({ commandID })

    if (!returnCommand) {
      return this.exitWithMessage(res, AController.STATUS_CODES.ITEM_NOT_FOUND,
          `Command of ID ${commandID} is not found`)
    }
    return res.json(returnCommand)
  }

  @Post('/commands/')
  async post (@Req() req: Request, @Res() res: Response): Promise<Command | ValidationError[]> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }

  @Put('/commands/:commandID')
  async update (@Param('commandID') commandID: number, @Req() req: Request, @Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }

  @Delete('/commands/:commandID')
  async delete (@Param('commandID') commandID: number, @Req() req: Request, @Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }

  @Delete('/commands/')
  async deleteNoID (@Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }

  @Put('/commands/')
  async updateNoID (@Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }
}
