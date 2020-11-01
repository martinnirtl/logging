import { IExpressMiddleware, ILoggerOptionsExpress, getMiddleware as getExpressMiddleware } from "./express";
import { IGraphqlMiddleware, ILoggerOptionsGraphql, getMiddleware as getGraphqlMiddleware } from "./graphql";

export function middleware(integration: 'express', loggerOptions: ILoggerOptionsExpress): IExpressMiddleware;
export function middleware(integration: 'graphql', loggerOptions: ILoggerOptionsGraphql): IGraphqlMiddleware;
export function middleware(integration: 'express' | 'graphql', loggerOptions: ILoggerOptionsExpress | ILoggerOptionsGraphql): (IExpressMiddleware | IGraphqlMiddleware) {
  switch (integration) {
    case 'express':
      return getExpressMiddleware(loggerOptions as ILoggerOptionsExpress)

    case 'graphql':
      return getGraphqlMiddleware(loggerOptions as ILoggerOptionsGraphql)

    default:
      throw new Error('Unknown integration specified')
  }
}
