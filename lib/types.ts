export type Level = 'silly' | 'debug' | 'info' | 'warn' | 'error'

export interface IDefaultMetadata {
  [key: string]: string
}

export interface IMetadata {
  [key: string]: any
}

export interface ILoggerOptions {
  level?: Level,
  meta?: IDefaultMetadata,
  prettyPrint?: boolean,
  silent?: boolean,
}
