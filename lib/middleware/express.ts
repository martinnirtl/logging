import { NextFunction, Request } from "express";
import { getLogger, Logger } from "../core";

import { ILoggerOptions, IMetadata, Level } from "../core/types";

export interface IExtendedRequest extends Request {
  logger: Logger
}

export interface IExpressMiddleware {
  (req: IExtendedRequest, res: Response, next: NextFunction): void
}

interface LogIncomingConfig {
  level?: Level
  metadata?: {
    body?: boolean | string[]
    headers?: boolean | string[]
    query?: boolean | string[]
    params?: boolean | string[]
  }
}

export interface ILoggerOptionsExpress extends ILoggerOptions {
  addToRequest: boolean
  logIncoming: boolean | Level | LogIncomingConfig
}

const processLogIncoming = (config: boolean | Level | LogIncomingConfig): [enabled: boolean, level: Level] => {
  switch (typeof config) {
    case 'boolean':
      return [true, 'info']
    case 'string':
      return [true, config]
    case 'object':
      return [true, config.level || 'info']

    default:
      return [false, 'info']
  }
}

const getFields = (obj: Record<string, string>, { metadata }: LogIncomingConfig): Record<string, string> | undefined =>
  metadata && metadata === true ? obj :
    Object.entries(obj).filter(([key]) => (metadata as string[]).includes(key)).reduce((agg: Record<string, string>, [key, value], i) => {
      if (i === 0) {
        agg = {}
      }

      agg[key] = value

      return agg
    }, {})

const getMetadata = (config: boolean | Level | LogIncomingConfig, req: Request): IMetadata => {
  switch (typeof config) {
    case 'boolean':
      return {}

    case 'string':
      return {}

    case 'object':
      const metadata: IMetadata = {}

      if (config.metadata) {
        for (const key of Object.keys(config.metadata)) {
          metadata[key] = getFields((req as any)[key], config)
        }
      }

      return metadata

    default:
      return {}
  }
}

export const getMiddleware = (options: ILoggerOptionsExpress): IExpressMiddleware => {
  const [enabled, level] = processLogIncoming(options.logIncoming)

  const logger = getLogger(options)

  return (req, _res, next) => {
    req.logger = logger

    if (enabled) {
      logger[level](`[${req.method} ${req.path}] processing request...`,
        getMetadata(options.logIncoming, req),
      )
    }

    next()
  }
}
