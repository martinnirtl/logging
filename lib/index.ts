import { createLogger, format, transports, Logger as WinstonLogger } from 'winston'

interface IDefaultMetadata {
  [key: string]: string
}

interface IMetadata {
  [key: string]: any
}

let defaultMeta: IDefaultMetadata = {}

export class Logger {
  private logger: WinstonLogger

  constructor(meta?: IDefaultMetadata) {
    this.logger = createLogger({
      defaultMeta: meta || defaultMeta,
      format: format.combine(
        format.timestamp(),
        format.metadata(),
        format.errors(),
        format.json()
      ),
      transports: [
        new transports.Console()
      ],
    })
  }

  setMeta(meta: IDefaultMetadata) {
    this.logger.defaultMeta = meta
  }

  info(message: string, meta?: IMetadata) {
    this.logger.log({
      level: 'info',
      message,
      ...meta,
    })
  }
}

export const getLogger = (meta?: IDefaultMetadata): Logger => new Logger(meta)

const logger = new Logger()

export function setDefaultMeta(meta: IMetadata) {
  defaultMeta = meta

  logger.setMeta(meta)
}

export default logger
