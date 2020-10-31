import debug from 'debug'

import { IDefaultMetadata, ILoggerOptions, IMetadata, Level } from './types'
import { update } from './config'
import { WinstonLogger, createWinstonLogger, getWinstonLoggerOptions } from './winston'

const dlog = debug('@martinnirtl/logging:main')

export class Logger {
  private logger: WinstonLogger

  constructor(options?: ILoggerOptions) {
    dlog('creating logger %O', options)

    this.logger = createWinstonLogger(options)
  }

  configure(options?: ILoggerOptions) {
    this.logger.configure(getWinstonLoggerOptions(options))
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
  const updatedConfig = update(options)

  logger.configure(updatedConfig)
}

export default logger
