import debug from 'debug'
import { NextFunction, Request as ExpressRequest } from "express";
import { getLogger, Logger } from "../core";

import { ILoggerOptions, IMetadata, Level } from "../core/types";

const dlog = debug('@martinnirtl/logging:express')

export interface IExtendedRequest extends ExpressRequest {
  logger: Logger
}

export interface IExpressMiddleware {
  (req: IExtendedRequest, res: Response, next: NextFunction): void
}

interface MetadataSelector {
  body?: boolean | string[]
  headers?: boolean | string[]
  query?: boolean | string[]
  params?: boolean | string[]
}

interface LogIncomingOptions {
  level?: Level
  metadata?: MetadataSelector
}


export interface ILoggerOptionsExpress extends ILoggerOptions {
  addToRequestObject?: boolean
  logIncoming?: boolean | Level | LogIncomingOptions
}

const processLogIncoming = (config?: boolean | Level | LogIncomingOptions): [enabled: boolean, level: Level] => {
  switch (typeof config) {
    case 'boolean':
      return [true, 'info']
    case 'string':
      return [true, config]
    case 'object':
      return [true, config.level || 'info']

    default:
      return [true, 'info']
  }
}

const getFields = (obj: Record<string, string>, fields?: boolean | string[]): Record<string, string> | undefined =>
  fields && fields === true ? obj :
    Object.entries(obj).filter(([key]) => (fields as string[]).includes(key)).reduce((agg: Record<string, string>, [key, value], i) => {
      if (i === 0) {
        agg = {}
      }

      agg[key] = value

      return agg
    }, {})

const extractMetadata = (req: IExtendedRequest, config?: boolean | Level | LogIncomingOptions): IMetadata | undefined => {
  switch (typeof config) {
    case 'boolean':
      return {}

    case 'string':
      return {}

    case 'object':
      const metadata: IMetadata = {}

      if (config.metadata) {
        for (const key of Object.keys(config.metadata) as (keyof MetadataSelector)[]) {
          metadata[key] = getFields(req[key], config.metadata[key])
        }
      }

      return metadata

    default:
      return undefined
  }
}

export function getMiddleware(options: ILoggerOptionsExpress): IExpressMiddleware {
  dlog(`init express middleware %O`, options)

  const [enabled, level] = processLogIncoming(options.logIncoming)

  dlog('logging of incoming requests is %s', enabled ? 'enabled' : 'disabled')

  const logger = getLogger(options)

  return (req, _res, next) => {
    if (options.addToRequestObject ?? true) {
      req.logger = logger
    }

    if (enabled) {
      logger[level](`[${req.method} ${req.path}] processing request...`,
        extractMetadata(req, options.logIncoming),
      )
    }

    next()
  }
}
