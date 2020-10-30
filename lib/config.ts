import { ILoggerOptions, Level } from "./types"

let config: Required<ILoggerOptions> = {
  level: process.env.LOG_LEVEL as Level || 'info',
  meta: {},
  prettyPrint: !!process.env.LOG_PRETTY || false,
  silent: !!process.env.LOG_SILENT || false,
}

export const update = (options: ILoggerOptions) => {
  config = {
    ...config,
    ...options,
  }
}

export const get = (key: keyof ILoggerOptions): unknown => config[key]
