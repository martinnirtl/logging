import { ILoggerOptions } from "../core/types";

export interface IGraphqlMiddleware { }

export interface ILoggerOptionsGraphql extends ILoggerOptions { }


export const getMiddleware = (options: ILoggerOptionsGraphql) => {
  throw new Error('Not yet implemented')
}
