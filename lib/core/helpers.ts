import { Level } from './types'

const levelPriority = {
  silly: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
}

export const compareLevels = (loggerLevel: Level, levelToBeLogged: Level): boolean => {
  return levelPriority[loggerLevel] <= levelPriority[levelToBeLogged]
}
