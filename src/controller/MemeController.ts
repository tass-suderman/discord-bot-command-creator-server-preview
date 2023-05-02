import { Controller, Delete, Get, Param, Post, Put, Req, Res } from 'routing-controllers'
import { AppDataSource } from '../data-source'
import { Meme } from '../entity/Meme'
import { Request, Response } from 'express'
import { AController } from './AController'

const MISSING_ID_ERR: string = 'ID must be provided and numeric'

@Controller()
export class MemeController extends AController {
  public override readonly SORT_FIELDS = ['memeID', 'mCreator', 'mCreator.userName']

  private readonly memeRepo = AppDataSource.getRepository(Meme)

  @Get('/memes/')
  async getMemes (@Req() req: Request): Promise<any> {
    const where: string = req.query.where as string ?? '%'
    const queryWhere: string = `%${where}%`
    const sortOptions: any = this.getSortOptions(req)
    return await this.memeRepo
      .createQueryBuilder('meme')
      .leftJoinAndSelect('meme.mCreator', 'mCreator')
      .leftJoinAndSelect('meme.tags', 'tags')
      .where('mCreator.userName LIKE :queryWhere', { queryWhere })
      .orWhere('mCreator.uID LIKE :queryWhere', { queryWhere })
      .orWhere('tags.tagName LIKE :queryWhere', { queryWhere })
      .orWhere('mDescription LIKE :queryWhere', { queryWhere })
      .addOrderBy(sortOptions.field, sortOptions.order)
      .getMany()
  }

  @Get('/memes/:memeID')
  async getOneMeme (@Param('memeID') memeID: number, @Res() res: Response): Promise<any> {
    if (!memeID) {
      return this.exitWithMessage(res, AController.STATUS_CODES.BAD_REQUEST, MISSING_ID_ERR)
    }
    const returnMeme: Meme | null = await this.memeRepo.findOneBy({ memeID })

    if (!returnMeme) {
      return this.exitWithMessage(res, AController.STATUS_CODES.ITEM_NOT_FOUND,
        `Meme of ID ${memeID} is not found`)
    }
    return res.json(returnMeme)
  }

  @Post('/memes/')
  async post (@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }

  @Put('/memes/:memeID')
  async update (@Param('memeID') memeID: number, @Req() req: Request, @Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }

  @Delete('/memes/:memeID')
  async delete (@Param('memeID') memeID: number, @Req() req: Request, @Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }

  @Delete('/memes/')
  async deleteNoID (@Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }

  @Put('/memes/')
  async updateNoID (@Res() res: Response): Promise<any> {
    return this.exitWithMessage(res, AController.STATUS_CODES.NOT_IMPLEMENTED_ERROR, AController.DEMO_CONTENT_LOCK)
  }
}
