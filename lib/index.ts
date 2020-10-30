import { createLogger, format, transports, Logger as WinstonLogger } from 'winston'

import { IDefaultMetadata, ILoggerOptions, IMetadata, Level } from './types'
import { get, update } from './config'

export class Logger {
  private logger: WinstonLogger

  constructor(options?: ILoggerOptions) {
    this.logger = createLogger({
      level: options?.level || get('level') as Level,
      defaultMeta: { ...get('meta') as {}, ...options?.meta },
      format: format.combine(
        format.metadata(),
        format.timestamp(),
        format.ms(),
        format.errors(),
        options?.prettyPrint || get('prettyPrint') as boolean ? format.prettyPrint({ colorize: true }) : format.json(),
      ),
      transports: [
        new transports.Console()
      ],
      silent: options?.silent || get('silent') as boolean,
    })
  }

  setLevel(level: Level) {
    this.logger.level = level
  }

  setMeta(meta: IDefaultMetadata) {
    this.logger.defaultMeta = meta
  }

  log(level: Level, message: string, meta?: IMetadata) {
    this.logger.log({
      level,
      message,
      ...meta,
    })
  }

  silly(message: string, meta?: IMetadata) {
    this.log('silly', message, meta)
  }

  debug(message: string, meta?: IMetadata) {
    this.log('debug', message, meta)
  }

  info(message: string, meta?: IMetadata) {
    this.log('info', message, meta)
  }

  warn(message: string, meta?: IMetadata) {
    this.log('warn', message, meta)
  }

  error(message: string, meta?: IMetadata) {
    this.log('error', message, meta)
  }

  profile(id: string | number, { level = 'info', message = '' }: { level: Level, message: string }) {
    this.logger.profile(id, { level, message })
  }
}

export const getLogger = (options?: ILoggerOptions): Logger => new Logger(options)

const logger = new Logger()

export const setDefaults = (options: ILoggerOptions) => {
  update(options)
}

export default logger
