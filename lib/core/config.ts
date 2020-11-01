import debug from 'debug'

import { ILoggerOptions, Level } from './types'

const dlog = debug('@martinnirtl/logging:config')

let config: Required<ILoggerOptions> = {
  // fields: process.env.LOG_FIELDS?.split(',').map(field => field.trim()) || [],
  level: process.env.LOG_LEVEL as Level || 'info',
  metadata: Object.entries(process.env).filter(([key]) => key.startsWith('LOG_META_')).reduce((agg, [key, val]) => ({
    ...agg,
    [key.substring('LOG_META_'.length).toLowerCase()]: val,
  }), {}),
  prettyPrint: !!process.env.LOG_PRETTY || false,
  silent: !!process.env.LOG_SILENT || false,
}

dlog('initialized config %O', config)

export const update = (options: ILoggerOptions): Required<ILoggerOptions> => {
  dlog('updating config %O', config)

  config = {
    ...config,
    ...options,
  }

  dlog('to %O', config)

  return config
}

export const get = (key: keyof ILoggerOptions): unknown => {
  const value = config[key]

  dlog('getting %s from config: %s', key, value)

  return value
}
