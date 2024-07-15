import { blake160, bech32, bech32m } from '..'
import {
  SECP256K1_BLAKE160,
  SECP256K1_MULTISIG,
  ANYONE_CAN_PAY_MAINNET,
  ANYONE_CAN_PAY_TESTNET,
} from '../systemScripts'
import { hexToBytes, bytesToHex } from '../convertors'
import {
  HexStringWithout0xException,
  AddressException,
  AddressPayloadException,
  CodeHashException,
  HashTypeException,
  AddressFormatTypeException,
  AddressFormatTypeAndEncodeMethodNotMatchException,
} from '../exceptions'
import { BranchComponents } from '../../types'

const MAX_BECH32_LIMIT = 1023

// TODO: deprecate outdated methods

export enum AddressPrefix {
  Mainnet = 'ckb',
  Testnet = 'ckt',
}

export enum AddressType {
  FullVersion = '0x00', // full version identifies the hash_type
  HashIdx = '0x01', // short version for locks with popular codehash
  DataCodeHash = '0x02', // full version with hash type 'Data', deprecated
  TypeCodeHash = '0x04', // full version with hash type 'Type', deprecated
}

export enum Bech32Type {
  Bech32 = 'bech32',
  Bech32m = 'bech32m',
}

enum HashType {
  data = '00',
  type = '01',
  data1 = '02',
  data2 = '04',
}

/**
 * @description payload to a full address of new version
 */
const payloadToAddress = (payload: Uint8Array, isMainnet = true) =>
  bech32m.encode(isMainnet ? AddressPrefix.Mainnet : AddressPrefix.Testnet, bech32m.toWords(payload), MAX_BECH32_LIMIT)

const scriptToPayload = ({ codeHash, hashType, args }: BranchComponents.Script): Uint8Array => {
  if (!args.startsWith('0x')) {
    throw new HexStringWithout0xException(args)
  }

  if (!codeHash.startsWith('0x') || codeHash.length !== 66) {
    throw new CodeHashException(codeHash)
  }

  if (!HashType[hashType]) {
    throw new HashTypeException(hashType)
  }

  return hexToBytes(`0x00${codeHash.slice(2)}${HashType[hashType]}${args.slice(2)}`)
}

/**
 * @function scriptToAddress
 * @description The only way recommended to generated a full address of new version
 * @param {object} script
 * @param {boolean} isMainnet
 * @returns {string} address
 */
export const scriptToAddress = (script: BranchComponents.Script, isMainnet = true) =>
  payloadToAddress(scriptToPayload(script), isMainnet)

export interface AddressOptions {
  prefix?: AddressPrefix
  type?: AddressType
  codeHash?: BranchComponents.Hash256
}

/**
 * @function toAddressPayload
 * @description recommended payload = type(00) | code hash | hash type(00|01|02) | args
 * @see https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0021-ckb-address-format/0021-ckb-address-format.md
 * @param {string | Uint8Array} args, use as the identifier of an address, usually the public key hash is used.
 * @param {string} codeHash, the referenced code hash that the address binds to, default to be secp256k1 code hash
 */
export const toAddressPayload = (
  args: string | Uint8Array,
  codeHash = SECP256K1_BLAKE160.codeHash,
  hashType = SECP256K1_BLAKE160.hashType,
): Uint8Array => {
  if (typeof args === 'string' && !args.startsWith('0x')) {
    throw new HexStringWithout0xException(args)
  }

  if (!codeHash?.startsWith('0x') || codeHash.length !== 66) {
    throw new CodeHashException(codeHash)
  }

  return scriptToPayload({
    codeHash: codeHash,
    hashType,
    args: typeof args === 'string' ? args : bytesToHex(args),
  })
}

/**
 * @function bech32mAddress
 * @description generate the address by bech32m algorithm
 * @param args, used as the identifier of an address, usually the public key hash is used.
 * @param {[string]} prefix, the prefix precedes the address, default to be ckb.
 * @param {[string]} codeHash, the referenced code hash that the address binds to.
 */
export const bech32mAddress = (
  args: Uint8Array | string,
  { prefix = AddressPrefix.Mainnet, codeHash }: AddressOptions = {},
) => bech32m.encode(prefix, bech32m.toWords(toAddressPayload(args, codeHash)), MAX_BECH32_LIMIT)

export const pubkeyToAddress = (pubkey: Uint8Array | string, options: AddressOptions = {}) => {
  const publicKeyHash = blake160(pubkey)
  return bech32mAddress(publicKeyHash, options)
}

const isValidShortVersionPayload = (payload: Uint8Array, bech32Type?: Bech32Type) => {
  const [type, index, ...data] = payload
  if (bech32Type !== Bech32Type.Bech32) {
    throw new AddressFormatTypeAndEncodeMethodNotMatchException(type, bech32Type)
  }
  /* eslint-disable indent */
  switch (index) {
    case 0: // secp256k1 + blake160
    case 1: {
      // secp256k1 + multisig
      if (data.length !== 20) {
        throw new AddressPayloadException(payload, 'short')
      }
      break
    }
    case 2: {
      // anyone can pay
      if (data.length === 20 || data.length === 22 || data.length === 24) {
        break
      }
      throw new AddressPayloadException(payload, 'short')
    }
    default: {
      throw new AddressPayloadException(payload, 'short')
    }
  }
  /* eslint-enable indent */
}

const isPayloadValid = (payload: Uint8Array, bech32Type: Bech32Type) => {
  const type = payload[0]
  const data = payload.slice(1)
  /* eslint-disable indent */
  switch (type) {
    case +AddressType.HashIdx: {
      isValidShortVersionPayload(payload, bech32Type)
      break
    }
    case +AddressType.DataCodeHash:
    case +AddressType.TypeCodeHash: {
      if (bech32Type !== Bech32Type.Bech32) {
        throw new AddressFormatTypeAndEncodeMethodNotMatchException(type, bech32Type)
      }
      if (data.length < 32) {
        throw new AddressPayloadException(payload, 'full')
      }
      break
    }
    case +AddressType.FullVersion: {
      if (bech32Type !== Bech32Type.Bech32m) {
        throw new AddressFormatTypeAndEncodeMethodNotMatchException(type, bech32Type)
      }
      const codeHash = data.slice(0, 32)
      if (codeHash.length < 32) {
        throw new CodeHashException(bytesToHex(codeHash))
      }

      const hashType = parseInt(data[32].toString(), 16)
      if (hashType > 2 && hashType !== 4) {
        throw new HashTypeException(`0x${hashType.toString(16)}`)
      }

      break
    }
    default: {
      throw new AddressPayloadException(payload)
    }
  }
  /* eslint-enable indent */
}

export declare interface ParseAddress {
  (address: string): Uint8Array
  (address: string, encode: 'binary'): Uint8Array
  (address: string, encode: 'hex'): string
  (address: string, encode: 'binary' | 'hex'): Uint8Array | string
}
/**
 * @return addressPayload, consists of type | params | publicKeyHash
 *         e.g. 0x | 01 | 00 | e2fa82e70b062c8644b80ad7ecf6e015e5f352f6
 */
export const parseAddress: ParseAddress = (address: string, encode: 'binary' | 'hex' = 'binary'): any => {
  let bech32Type: Bech32Type | undefined
  let payload: Uint8Array = new Uint8Array()
  try {
    const decoded = bech32.decode(address, MAX_BECH32_LIMIT)
    bech32Type = Bech32Type.Bech32
    payload = new Uint8Array(bech32.fromWords(new Uint8Array(decoded.words)))
  } catch {
    const decoded = bech32m.decode(address, MAX_BECH32_LIMIT)
    bech32Type = Bech32Type.Bech32m
    payload = new Uint8Array(bech32m.fromWords(new Uint8Array(decoded.words)))
  }

  try {
    isPayloadValid(payload, bech32Type)
  } catch (err: any) {
    if (err instanceof AddressFormatTypeAndEncodeMethodNotMatchException) {
      throw err
    }
    throw new AddressException(address, err.stack, err.type)
  }
  return encode === 'binary' ? payload : bytesToHex(payload)
}

export const addressToScript = (address: string): BranchComponents.Script => {
  const payload = parseAddress(address)
  const type = payload[0]

  switch (type) {
    case +AddressType.FullVersion: {
      const HASH_TYPE: Record<string, BranchComponents.ScriptHashType> = {
        '00': 'data',
        '01': 'type',
        '02': 'data1',
        '04': 'data2',
      }
      const p = bytesToHex(payload)

      const codeHash = `0x${p.substring(4, 68)}`
      const hashType = HASH_TYPE[p.substring(68, 70)]
      const args = `0x${p.substring(70)}`
      return { codeHash, hashType, args }
    }
    case +AddressType.HashIdx: {
      const codeHashIndices = [
        SECP256K1_BLAKE160,
        SECP256K1_MULTISIG,
        address.startsWith(AddressPrefix.Mainnet) ? ANYONE_CAN_PAY_MAINNET : ANYONE_CAN_PAY_TESTNET,
      ]
      const index = payload[1]
      const args = payload.slice(2)
      const script = codeHashIndices[index] ?? SECP256K1_BLAKE160
      return {
        codeHash: script.codeHash,
        hashType: script.hashType,
        args: bytesToHex(args),
      }
    }
    case +AddressType.DataCodeHash:
    case +AddressType.TypeCodeHash: {
      const codeHashAndArgs = bytesToHex(payload.slice(1))
      const hashType = type === +AddressType.DataCodeHash ? 'data' : 'type'
      return {
        codeHash: codeHashAndArgs.substring(0, 66),
        hashType,
        args: `0x${codeHashAndArgs.substring(66)}`,
      }
    }
    default: {
      throw new AddressFormatTypeException(type)
    }
  }
}
