import * as express from 'express'
import * as bodyParser from 'body-parser'
import { AppDataSource } from './data-source'
import * as cors from 'cors'
import { MemeController } from './controller/MemeController'
import { CommandController } from './controller/CommandController'
import { TagController } from './controller/TagController'
import { AController } from './controller/AController'
import { useExpressServer } from 'routing-controllers'
import { Request, Response } from 'express'

// Backend server port
const port: number = 3030

const ROUTE_NOT_FOUND_ERR: string = 'Route not found'
const ROUTE_NOT_FOUND: any = { code: AController.STATUS_CODES.ITEM_NOT_FOUND.code, message: ROUTE_NOT_FOUND_ERR }

const corsOptions = {
  origin: /^.*tass-suderman\.ca\/.*/i,
  credentials: true,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  methods: 'GET,PUT,POST,DELETE'
}

const NOT_FOUND_HANDLER = async (req: Request, res: Response): Promise<any> => {
  if (!res.headersSent) {
    res.statusCode = AController.STATUS_CODES.ITEM_NOT_FOUND.code
    return res.json(ROUTE_NOT_FOUND)
  }
}

const controllers: Array<typeof AController> = [MemeController, CommandController, TagController]

AppDataSource.initialize().then(async () => {
  // app setup
  const app = express()
  app.use(bodyParser.json())
  app.use(cors(corsOptions))

  useExpressServer(app, { controllers })

  app.use(NOT_FOUND_HANDLER)

  app.listen(port)
}).catch(error => console.log(error))
