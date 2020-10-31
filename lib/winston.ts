import { createLogger, format, LoggerOptions, transports } from 'winston'

import { ILoggerOptions, Level } from './types'
import { get } from './config'

const baseFormat = format.combine(
  format.metadata(),
  format.timestamp(),
  format.ms(),
  format.errors(),
)

const getFormat = (prettyPrint: boolean) =>
  format.combine(baseFormat, prettyPrint ? format.prettyPrint({ colorize: true }) : format.json())

export { Logger as WinstonLogger } from 'winston'

export const createWinstonLogger = (options?: ILoggerOptions) =>
  createLogger(getWinstonLoggerOptions(options))

export const getWinstonLoggerOptions = (options?: ILoggerOptions): LoggerOptions => ({
  level: options?.level ?? get('level') as Level,
  defaultMeta: { ...get('meta') as {}, ...options?.meta },
  format: getFormat(options?.prettyPrint ?? get('prettyPrint') as boolean),
  transports: [
    new transports.Console()
  ],
  silent: options?.silent ?? get('silent') as boolean,
})
