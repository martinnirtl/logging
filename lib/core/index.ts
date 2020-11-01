import debug from 'debug'

import { IDefaultMetadata, ILoggerOptions, IMetadata, Level } from './types'
import { update } from './config'
import { WinstonLogger, createWinstonLogger, getWinstonLoggerOptions } from '../winston'

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

  setMetadata(metadata: IDefaultMetadata) {
    this.logger.defaultMeta = metadata
  }

  log(level: Level, message: string, metadata?: IMetadata) {
    this.logger.log({
      level,
      message,
      ...metadata,
    })
  }

  silly(message: string, metadata?: IMetadata) {
    this.log('silly', message, metadata)
  }

  debug(message: string, metadata?: IMetadata) {
    this.log('debug', message, metadata)
  }

  info(message: string, metadata?: IMetadata) {
    this.log('info', message, metadata)
  }

  warn(message: string, metadata?: IMetadata) {
    this.log('warn', message, metadata)
  }

  error(message: string, metadata?: IMetadata) {
    this.log('error', message, metadata)
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
