import { createLogger, format, LoggerOptions, transports } from 'winston'

import { ILoggerOptions, Level } from '../core/types'
import { get } from '../core/config'

const baseFormat = format.combine(
  format.metadata(),
  format.timestamp(),
  // format.ms(),
  format.errors({ stack: true }),
)

const getFormat = (prettyPrint: boolean) =>
  format.combine(baseFormat, prettyPrint ? format.prettyPrint({ colorize: true }) : format.json())

export { Logger as WinstonLogger } from 'winston'

export const createWinstonLogger = (options?: ILoggerOptions) =>
  createLogger(getWinstonLoggerOptions(options))

export const getWinstonLoggerOptions = (options?: ILoggerOptions): LoggerOptions => ({
  level: options?.level ?? get('level') as Level,
  defaultMeta: { ...get('metadata') as {}, ...options?.metadata },
  format: getFormat(options?.prettyPrint ?? get('prettyPrint') as boolean),
  transports: [
    new transports.Console({
      handleExceptions: true,
    })
  ],
  silent: options?.silent ?? get('silent') as boolean,
})
