import { Controller, Req } from 'routing-controllers'
import { Request, Response } from 'express'

@Controller()
export abstract class AController {
  public static readonly STATUS_CODES: any = {
    OK_STATUS: { code: 200, message: 'Request has succeeded and is fulfilled.' },
    NO_CONTENT: { code: 204, message: 'Request succeeded.' },
    BAD_REQUEST: { code: 400, message: 'Your request cannot be completed as it is malformed.' },
    UNAUTHORIZED_STATUS: { code: 401, message: 'You are not authorized to perform this action.' },
    ITEM_NOT_FOUND: { code: 404, message: 'Requested resource could not be located.' },
    CONFLICT: { code: 409, message: 'Request conflicts with requested resource state.' },
    UNPROCESSABLE_ENTITY: { code: 422, message: 'The provided entity cannot be processes.' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'The server has an internal error.' },
    NOT_IMPLEMENTED_ERROR: { code: 501, message: 'This method is not implemented on this version of the software.' }
  }

  public static readonly DEMO_CONTENT_LOCK: string = 'This feature is unavailable in this version of this software'

  public static readonly DESCENDING_OPTIONS: string[] = ['DESC', 'DESCENDING', 'D']

  public static readonly DESCENDING: string = 'DESC'
  public static readonly ASCENDING: string = 'ASC'

  public abstract readonly SORT_FIELDS: string[]

  exitWithMessage (res: Response, errorCode: any, message?: string): any {
    const status: number = isNaN(errorCode) ? errorCode.code : parseInt(errorCode, 10)
    res.statusCode = status
    return res.json({ code: status, message: message ?? errorCode.message })
  }

  getSortOptions (@Req() req: Request): any {
    const sortOptions: any = {
      order: {},
      field: ''
    }
    sortOptions.field = this.SORT_FIELDS.includes(req.query.sortby as string) ? req.query.sortby : this.SORT_FIELDS[0]
    sortOptions.order = AController.DESCENDING_OPTIONS.includes((req.query.sortorder as string)?.toUpperCase()) // if broky look here
      ? AController.DESCENDING
      : AController.ASCENDING
    return sortOptions
  }
}
