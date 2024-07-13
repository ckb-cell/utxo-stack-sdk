import camelcaseKeys from 'camelcase-keys'
import { toSnake } from 'convert-keys'

export const toCamelCase = <T>(obj: object): T | undefined => {
  try {
    return camelcaseKeys(obj, {
      deep: true,
    }) as T
  } catch (error) {
    console.error(error)
  }
  return undefined
}

export const toSnakeCase = (obj: object) => {
  try {
    return toSnake(obj)
  } catch (error) {
    console.error(error)
  }
  return undefined
}
