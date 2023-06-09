import { Controller, Get, Param, Req, Res } from 'routing-controllers'
import { AController } from './AController'
import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Tag } from '../entity/Tag'

const MISSING_NAME_ERR = 'Tag name must be provided.'

@Controller()
export class TagController extends AController {
  public override readonly SORT_FIELDS: string[] = ['tagName']
  private readonly tagRepo = AppDataSource.getRepository(Tag)

  @Get('/tags/')
  async getTags (@Req() req: Request): Promise<Tag[]> {
    const findOptions: any = { order: {} }
    const sortField: string = this.SORT_FIELDS.includes(req.query.sortby as string)
      ? req.query.sortby as string
      : this.SORT_FIELDS[0]
    findOptions.order[sortField] =
      AController.DESCENDING_OPTIONS.includes(req.query.sortOrder as string)
        ? AController.DESCENDING
        : AController.ASCENDING
    return await this.tagRepo.find(findOptions)
  }

  @Get('/tags/:tagName')
  async getOneTag (@Param('tagName') tagName: string, @Res() res: Response): Promise<any> {
    if (!tagName) {
      return this.exitWithMessage(res, AController.STATUS_CODES.BAD_REQUEST, MISSING_NAME_ERR)
    }
    const returnTag: Tag | null = await this.tagRepo
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.memes', 'meme')
      .leftJoinAndSelect('meme.mCreator', 'creator')
      .leftJoinAndSelect('meme.tags', 'memetag')
      .where({ tagName })
      .getOne()
    if (!returnTag) {
      return this.exitWithMessage(res, AController.STATUS_CODES.ITEM_NOT_FOUND,
        `Tag with name ${tagName} is not found`)
    }
    return res.json(returnTag)
  }
}
