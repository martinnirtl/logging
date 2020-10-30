import { ILoggerOptions } from "./types"

let config: Required<ILoggerOptions> = {
  level: 'info',
  meta: {},
  prettyPrint: false,
  silent: false,
}

export const update = (options: ILoggerOptions) => {
  config = {
    ...config,
    ...options,
  }
}

export const get = (key: keyof ILoggerOptions): unknown => config[key]
