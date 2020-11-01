import { RequestHandler } from "express";
import logger, { getLogger } from "../core";

import { ILoggerOptions, Level } from "../core/types";

export interface IExpressMiddleware extends RequestHandler { }

export interface ILoggerOptionsExpress extends ILoggerOptions {
  addToRequest: boolean
  logIncoming: boolean | Level
}

export const getMiddleware = (options: ILoggerOptionsExpress): IExpressMiddleware =>
  (req: any, _res, next) => {
    req.logger = getLogger(options)

    if (options.logIncoming) {
      logger[typeof options.logIncoming === 'boolean' ? 'info' : options.logIncoming](`[${req.method} ${req.path}] processing request...`, { headers: req.headers, body: req.body, query: req.query })
    }

    next()
  }
