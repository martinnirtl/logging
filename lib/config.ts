import debug from 'debug'

import { ILoggerOptions, Level } from './types'

const dlog = debug('@martinnirtl/logging:config')

let config: Required<ILoggerOptions> = {
  level: process.env.LOG_LEVEL as Level || 'info',
  meta: {},
  prettyPrint: !!process.env.LOG_PRETTY || false,
  silent: !!process.env.LOG_SILENT || false,
}

export const update = (options: ILoggerOptions) => {
  dlog('updating config %O', config)

  config = {
    ...config,
    ...options,
  }

  dlog('to %O', config)
}

export const get = (key: keyof ILoggerOptions): unknown => {
  dlog('getting %s from config %O', key, config)

  return config[key]
}
