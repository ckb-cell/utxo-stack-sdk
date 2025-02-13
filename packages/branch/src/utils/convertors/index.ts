import { assertToBeHexStringOrBigint } from '../validators'
import { HexStringWithout0xException } from '../exceptions'

export const remove0x = (hex: string): string => {
  if (hex.startsWith('0x')) {
    return hex.substring(2)
  }
  return hex
}

export const append0x = (hex: string): string => {
  return hex.startsWith('0x') ? hex : `0x${hex}`
}

/**
 * Converts an uint16 into a hex string in little endian
 *
 * @memberof convertors
 * @param {string|bigint} uint16 The uint16 to convert
 * @returns {string} Returns a hex string
 */
export const toUint16Le = (uint16: string | bigint) => {
  assertToBeHexStringOrBigint(uint16)
  const dv = new DataView(new ArrayBuffer(2))
  dv.setUint16(0, Number(uint16), true)
  return `0x${dv.getUint16(0, false).toString(16).padStart(4, '0')}`
}

/**
 * Converts an uint32 into a hex string in little endian
 *
 * @memberof convertors
 * @param {string|bigint} uint32 The uint32 to convert
 * @returns {string} Returns a hex string
 */
export const toUint32Le = (uint32: string | bigint) => {
  assertToBeHexStringOrBigint(uint32)
  const dv = new DataView(new ArrayBuffer(4))
  dv.setUint32(0, Number(uint32), true)
  return `0x${dv.getUint32(0, false).toString(16).padStart(8, '0')}`
}

/**
 * Converts an uint64 into a hex string in little endian
 *
 * @memberof convertors
 * @param {string|bigint} uint64 The uint64 to convert
 * @returns {string} Returns a hex string
 */
export const toUint64Le = (uint64: string | bigint) => {
  assertToBeHexStringOrBigint(uint64)
  const val = (typeof uint64 === 'bigint' ? uint64.toString(16) : uint64.slice(2)).padStart(16, '0')
  const viewRight = toUint32Le(`0x${val.slice(0, 8)}`).slice(2)
  const viewLeft = toUint32Le(`0x${val.slice(8)}`).slice(2)
  return `0x${viewLeft}${viewRight}`
}

/**
 * Converts an uint128 into a hex string in little endian
 *
 * @memberof convertors
 * @param {string|bigint} uint128 The uint128 to convert
 * @returns {string} Returns a hex string
 */
export const toUint128Le = (uint128: string | bigint) => {
  assertToBeHexStringOrBigint(uint128)
  const val = (typeof uint128 === 'bigint' ? uint128.toString(16) : uint128.slice(2)).padStart(32, '0')
  const viewRight = toUint64Le(`0x${val.slice(0, 16)}`).slice(2)
  const viewLeft = toUint64Le(`0x${val.slice(16)}`).slice(2)
  return `0x${viewLeft}${viewRight}`
}

export const hexToBytes = (rawhex: string | number | bigint) => {
  if (rawhex === '') return new Uint8Array()
  if (typeof rawhex === 'string' && !rawhex.startsWith('0x')) {
    throw new HexStringWithout0xException(rawhex)
  }

  let hex = rawhex.toString(16).replace(/^0x/i, '')
  hex = hex.length % 2 ? `0${hex}` : hex

  const bytes: number[] = []
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substring(c, c + 2), 16))
  }

  return new Uint8Array(bytes)
}

/**
 * Converts a hex string in little endian into big endian
 *
 * @memberof convertors
 * @param {string} leHex The hex string to convert
 * @returns {string} Returns a big endian
 */
export const toBigEndian = (leHex: string) => {
  const bytes = hexToBytes(append0x(leHex))
  return `0x${bytes.reduceRight((pre, cur) => pre + cur.toString(16).padStart(2, '0'), '')}`
}

export const leToUInt = (leHex: string) => {
  return BigInt(toBigEndian(leHex))
}

export const bytesToHex = (bytes: Uint8Array): string =>
  `0x${[...bytes].map(b => b.toString(16).padStart(2, '0')).join('')}`
