'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs
  } else {
    return rhsFn()
  }
}
function _optionalChain(ops) {
  let lastAccessLHS = undefined
  let value = ops[0]
  let i = 1
  while (i < ops.length) {
    const op = ops[i]
    const fn = ops[i + 1]
    i += 2
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value
      value = fn(value)
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args))
      lastAccessLHS = undefined
    }
  }
  return value
}
var __defProp = Object.defineProperty
var __typeError = msg => {
  throw TypeError(msg)
}
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true })
}
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError('Cannot ' + msg)
var __privateGet = (obj, member, getter) => (
  __accessCheck(obj, member, 'read from private field'), getter ? getter.call(obj) : member.get(obj)
)
var __privateAdd = (obj, member, value) =>
  member.has(obj)
    ? __typeError('Cannot add the same private member more than once')
    : member instanceof WeakSet
      ? member.add(obj)
      : member.set(obj, value)
var __privateSet = (obj, member, value, setter) => (
  __accessCheck(obj, member, 'write to private field'), setter ? setter.call(obj, value) : member.set(obj, value), value
)

// src/rpc/index.ts
var _axios = require('axios')
var _axios2 = _interopRequireDefault(_axios)

// src/utils/index.ts
var utils_exports = {}
__export(utils_exports, {
  ANYONE_CAN_PAY_MAINNET: () => ANYONE_CAN_PAY_MAINNET,
  ANYONE_CAN_PAY_TESTNET: () => ANYONE_CAN_PAY_TESTNET,
  AddressException: () => AddressException,
  AddressFormatTypeAndEncodeMethodNotMatchException: () => AddressFormatTypeAndEncodeMethodNotMatchException,
  AddressFormatTypeException: () => AddressFormatTypeException,
  AddressPayloadException: () => AddressPayloadException,
  AddressPrefix: () => AddressPrefix,
  AddressType: () => AddressType,
  Bech32Type: () => Bech32Type,
  CodeHashException: () => CodeHashException,
  ECPair: () => ECPair,
  EMPTY_SECP_SIG: () => EMPTY_SECP_SIG,
  EMPTY_WITNESS_ARGS: () => EMPTY_WITNESS_ARGS,
  ErrorCode: () => ErrorCode,
  HashTypeException: () => HashTypeException,
  HexStringException: () => HexStringException,
  HexStringWithout0xException: () => HexStringWithout0xException,
  InputTypeException: () => InputTypeException,
  JSBI: () => _jsbi2.default,
  KeyLenTooLargeException: () => KeyLenTooLargeException,
  KeyLenTooSmallException: () => KeyLenTooSmallException,
  KeyTypeException: () => KeyTypeException,
  OutLenTooLargeException: () => OutLenTooLargeException,
  OutLenTooSmallException: () => OutLenTooSmallException,
  OutTypeException: () => OutTypeException,
  PERSONAL: () => PERSONAL,
  ParameterRequiredException: () => ParameterRequiredException,
  PersonalLenException: () => PersonalLenException,
  PersonalTypeException: () => PersonalTypeException,
  PrivateKeyLenException: () => PrivateKeyLenException,
  ReconciliationException: () => ReconciliationException,
  SECP256K1_BLAKE160: () => SECP256K1_BLAKE160,
  SECP256K1_MULTISIG: () => SECP256K1_MULTISIG,
  SaltLenException: () => SaltLenException,
  SaltTypeException: () => SaltTypeException,
  SignMessageException: () => SignMessageException,
  addressToScript: () => addressToScript,
  assertToBeHexString: () => assertToBeHexString,
  assertToBeHexStringOrBigint: () => assertToBeHexStringOrBigint,
  bech32: () => _bech32.bech32,
  bech32Address: () => bech32Address,
  bech32m: () => _bech32.bech32m,
  blake160: () => blake160,
  blake2b: () => blake2b,
  bytesToHex: () => bytesToHex,
  calculateMaximumWithdraw: () => calculateMaximumWithdraw,
  calculateTransactionFee: () => calculateTransactionFee,
  cellOccupied: () => cellOccupied,
  extraInputs: () => extraInputs,
  extractDAOData: () => extractDAOData,
  fullLengthSize: () => fullLengthSize,
  fullPayloadToAddress: () => fullPayloadToAddress,
  getOffsets: () => getOffsets,
  getTransactionSize: () => getTransactionSize,
  getWithdrawEpoch: () => getWithdrawEpoch,
  hexToBytes: () => hexToBytes,
  offsetSize: () => offsetSize,
  parseAddress: () => parseAddress,
  parseEpoch: () => parseEpoch,
  privateKeyToAddress: () => privateKeyToAddress,
  privateKeyToPublicKey: () => privateKeyToPublicKey,
  pubkeyToAddress: () => pubkeyToAddress,
  rawTransactionToHash: () => rawTransactionToHash,
  scriptOccupied: () => scriptOccupied,
  scriptToAddress: () => scriptToAddress,
  scriptToHash: () => scriptToHash,
  serializeArgs: () => serializeArgs,
  serializeArray: () => serializeArray,
  serializeCellDep: () => serializeCellDep,
  serializeCellDeps: () => serializeCellDeps,
  serializeCodeHash: () => serializeCodeHash,
  serializeDepType: () => serializeDepType,
  serializeDynVec: () => serializeDynVec,
  serializeEpoch: () => serializeEpoch,
  serializeFixVec: () => serializeFixVec,
  serializeHashType: () => serializeHashType,
  serializeHeaderDeps: () => serializeHeaderDeps,
  serializeInput: () => serializeInput,
  serializeInputs: () => serializeInputs,
  serializeOption: () => serializeOption,
  serializeOutPoint: () => serializeOutPoint,
  serializeOutput: () => serializeOutput,
  serializeOutputs: () => serializeOutputs,
  serializeOutputsData: () => serializeOutputsData,
  serializeRawTransaction: () => serializeRawTransaction,
  serializeScript: () => serializeScript,
  serializeStruct: () => serializeStruct,
  serializeTable: () => serializeTable,
  serializeTransaction: () => serializeTransaction,
  serializeVersion: () => serializeVersion,
  serializeWitnessArgs: () => serializeWitnessArgs,
  serializeWitnesses: () => serializeWitnesses,
  toAddressPayload: () => toAddressPayload,
  toBigEndian: () => toBigEndian,
  toUint16Le: () => toUint16Le,
  toUint32Le: () => toUint32Le,
  toUint64Le: () => toUint64Le,
})
var _jsbi = require('jsbi')
var _jsbi2 = _interopRequireDefault(_jsbi)

// src/utils/ecpair.ts
var _elliptic = require('elliptic')

// src/utils/exceptions/ErrorCode.ts
var ErrorCode = /* @__PURE__ */ (ErrorCode3 => {
  ErrorCode3[(ErrorCode3['ParameterInvalid'] = 101)] = 'ParameterInvalid'
  ErrorCode3[(ErrorCode3['ParameterRequired'] = 102)] = 'ParameterRequired'
  ErrorCode3[(ErrorCode3['SignMessageFailed'] = 103)] = 'SignMessageFailed'
  ErrorCode3[(ErrorCode3['AddressInvalid'] = 104)] = 'AddressInvalid'
  ErrorCode3[(ErrorCode3['ReconciliationFailed'] = 105)] = 'ReconciliationFailed'
  return ErrorCode3
})(ErrorCode || {})

// src/utils/exceptions/common.ts
var ParameterRequiredException = class extends Error {
  constructor(name) {
    super(`${name} is required`)
    this.code = 102 /* ParameterRequired */
  }
}
var SignMessageException = class extends Error {
  constructor() {
    super('Fail to sign the message')
    this.code = 103 /* SignMessageFailed */
  }
}

// src/utils/exceptions/string.ts
var HexStringException = class extends Error {
  constructor(hex) {
    super(`${hex} is an invalid hex string`)
    this.code = 101 /* ParameterInvalid */
  }
}
var HexStringWithout0xException = class extends Error {
  constructor(hex) {
    super(`Hex string ${hex} should start with 0x`)
    this.code = 101 /* ParameterInvalid */
  }
}

// src/utils/exceptions/address.ts
var AddressPayloadException = class extends Error {
  constructor(payload, type) {
    super(`'${payload}' is not a valid ${type ? `${type} version ` : ''}address payload`)
    this.code = 104 /* AddressInvalid */
    this.type = type
  }
}
var AddressException = class extends Error {
  constructor(addr, stack, type) {
    super(`'${addr}' is not a valid ${type ? `${type} version ` : ''}address`)
    this.code = 104 /* AddressInvalid */
    this.type = type
    this.stack = stack
  }
}
var CodeHashException = class extends Error {
  constructor(codeHash) {
    super(`'${codeHash}' is not a valid code hash`)
    this.code = 104 /* AddressInvalid */
  }
}
var HashTypeException = class extends Error {
  constructor(hashType) {
    super(`'${hashType}' is not a valid hash type`)
    this.code = 104 /* AddressInvalid */
  }
}
var AddressFormatTypeException = class extends Error {
  constructor(type) {
    super(`0x${type.toString(16).padStart(2, '0')} is not a valid address format type`)
    this.code = 104 /* AddressInvalid */
  }
}
var AddressFormatTypeAndEncodeMethodNotMatchException = class extends Error {
  constructor(type, bech32Type = 'unknown') {
    super(`Address format type 0x${type.toString(16).padStart(2, '0')} doesn't match encode method ${bech32Type}`)
    this.code = 104 /* AddressInvalid */
  }
}

// src/utils/exceptions/blake2b.ts
var OutLenTooSmallException = class extends Error {
  constructor(outlen, minLen) {
    super(`Expect outlen to be at least ${minLen}, but ${outlen} received`)
    this.code = 101 /* ParameterInvalid */
  }
}
var OutLenTooLargeException = class extends Error {
  constructor(outlen, maxLen) {
    super(`Expect outlen to be at most ${maxLen}, but ${outlen} received`)
    this.code = 101 /* ParameterInvalid */
  }
}
var KeyLenTooSmallException = class extends Error {
  constructor(keyLen, minLen) {
    super(`Expect key length to be at least ${minLen}, but ${keyLen} received`)
    this.code = 101 /* ParameterInvalid */
  }
}
var KeyLenTooLargeException = class extends Error {
  constructor(keyLen, maxLen) {
    super(`Expect key length to be at most ${maxLen}, but ${keyLen} received`)
    this.code = 101 /* ParameterInvalid */
  }
}
var OutTypeException = class extends TypeError {
  constructor() {
    super(`Expect out to be "binary", "hex", Uint8Array, or Buffer`)
    this.code = 101 /* ParameterInvalid */
  }
}
var SaltTypeException = class extends TypeError {
  constructor() {
    super(`Expect salt to be Uint8Array or Buffer`)
    this.code = 101 /* ParameterInvalid */
  }
}
var SaltLenException = class extends Error {
  constructor(saltLen, requiredLen) {
    super(`Expect salt length to be ${requiredLen}, but ${saltLen} received`)
    this.code = 101 /* ParameterInvalid */
  }
}
var InputTypeException = class extends TypeError {
  constructor() {
    super(`Expect input to be Uint8Array or Buffer`)
    this.code = 101 /* ParameterInvalid */
  }
}
var KeyTypeException = class extends TypeError {
  constructor() {
    super(`Expect key to be Uint8Array or Buffer`)
    this.code = 101 /* ParameterInvalid */
  }
}
var PersonalTypeException = class extends TypeError {
  constructor() {
    super(`Expect PERSONAL to be Uint8Array or Buffer`)
    this.code = 101 /* ParameterInvalid */
  }
}
var PersonalLenException = class extends Error {
  constructor(personalLen, requiredLen) {
    super(`Expect PERSONAL length to be ${requiredLen}, but ${personalLen} received`)
    this.code = 101 /* ParameterInvalid */
  }
}

// src/utils/exceptions/privateKey.ts
var PrivateKeyLenException = class extends Error {
  constructor() {
    super('Private key has invalid length')
    this.code = 101 /* ParameterInvalid */
  }
}

// src/utils/exceptions/transaction.ts
var ReconciliationException = class extends Error {
  constructor() {
    super(`Fail to reconcile transaction, try to increase extra count or check the transaction`)
    this.code = 105 /* ReconciliationFailed */
  }
}

// src/utils/validators.ts
var assertToBeHexString = value => {
  if (typeof value !== 'string' || !value.startsWith('0x') || Number.isNaN(+value)) {
    throw new HexStringException(value)
  }
  return true
}
var assertToBeHexStringOrBigint = value => {
  if (typeof value === 'bigint') {
    return true
  }
  if (typeof value === 'string') {
    if (!value.startsWith('0x')) {
      throw new HexStringWithout0xException(value)
    }
    return true
  }
  throw new TypeError(`${value} should be type of string or bigint`)
}

// src/utils/convertors/index.ts
var toUint16Le = uint16 => {
  assertToBeHexStringOrBigint(uint16)
  const dv = new DataView(new ArrayBuffer(2))
  dv.setUint16(0, Number(uint16), true)
  return `0x${dv.getUint16(0, false).toString(16).padStart(4, '0')}`
}
var toUint32Le = uint32 => {
  assertToBeHexStringOrBigint(uint32)
  const dv = new DataView(new ArrayBuffer(4))
  dv.setUint32(0, Number(uint32), true)
  return `0x${dv.getUint32(0, false).toString(16).padStart(8, '0')}`
}
var toUint64Le = uint64 => {
  assertToBeHexStringOrBigint(uint64)
  const val = (typeof uint64 === 'bigint' ? uint64.toString(16) : uint64.slice(2)).padStart(16, '0')
  const viewRight = toUint32Le(`0x${val.slice(0, 8)}`).slice(2)
  const viewLeft = toUint32Le(`0x${val.slice(8)}`).slice(2)
  return `0x${viewLeft}${viewRight}`
}
var hexToBytes = rawhex => {
  if (rawhex === '') return new Uint8Array()
  if (typeof rawhex === 'string' && !rawhex.startsWith('0x')) {
    throw new HexStringWithout0xException(rawhex)
  }
  let hex = rawhex.toString(16).replace(/^0x/i, '')
  hex = hex.length % 2 ? `0${hex}` : hex
  const bytes = []
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substring(c, c + 2), 16))
  }
  return new Uint8Array(bytes)
}
var toBigEndian = leHex => {
  assertToBeHexString(leHex)
  const bytes = hexToBytes(leHex)
  return `0x${bytes.reduceRight((pre, cur) => pre + cur.toString(16).padStart(2, '0'), '')}`
}
var bytesToHex = bytes => `0x${[...bytes].map(b => b.toString(16).padStart(2, '0')).join('')}`

// src/utils/ecpair.ts
var ec = new (0, _elliptic.ec)('secp256k1')
var ECPair = class {
  constructor(
    sk,
    { compressed = true } = {
      compressed: true,
    },
  ) {
    this.compressed = false
    this.getPrivateKey = (enc = 'hex') => {
      if (enc === 'hex') {
        return this.privateKey
      }
      return this.key.getPrivate(enc)
    }
    this.getPublicKey = enc => {
      if (enc === 'hex') {
        return this.publicKey
      }
      return this.key.getPublic(this.compressed, enc)
    }
    this.sign = message => {
      const msg = typeof message === 'string' ? hexToBytes(message) : message
      return `0x${this.key
        .sign(msg, {
          canonical: true,
        })
        .toDER('hex')}`
    }
    this.verify = (message, sig) => {
      const msg = typeof message === 'string' ? hexToBytes(message) : message
      const signature = typeof sig === 'string' ? hexToBytes(sig) : sig
      return this.key.verify(msg, signature)
    }
    this.signRecoverable = message => {
      const msg = typeof message === 'string' ? hexToBytes(message) : message
      const { r, s, recoveryParam } = this.key.sign(msg, {
        canonical: true,
      })
      if (recoveryParam === null) throw new SignMessageException()
      const fmtR = r.toString(16).padStart(64, '0')
      const fmtS = s.toString(16).padStart(64, '0')
      return `0x${fmtR}${fmtS}0${recoveryParam}`
    }
    if (sk === void 0) throw new ParameterRequiredException('Private key')
    if (typeof sk === 'string' && !sk.startsWith('0x')) {
      throw new HexStringWithout0xException(sk)
    }
    if (typeof sk === 'string' && sk.length !== 66) {
      throw new PrivateKeyLenException()
    }
    if (typeof sk === 'object' && sk.byteLength !== 32) {
      throw new PrivateKeyLenException()
    }
    this.key = ec.keyFromPrivate(typeof sk === 'string' ? sk.replace(/^0x/, '') : sk)
    this.compressed = compressed
  }
  get privateKey() {
    return `0x${this.key.getPrivate('hex').padStart(64, '0')}`
  }
  get publicKey() {
    return `0x${this.key.getPublic(this.compressed, 'hex')}`
  }
}

// src/utils/systemScripts.ts
var SECP256K1_BLAKE160 = {
  codeHash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  hashType: 'type',
  depType: 'depGroup',
  mainnetOutPoint: {
    txHash: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
    index: '0x0',
  },
  testnetOutPoint: {
    txHash: '0xf8de3bb47d055cdf460d93a2a6e1b05f7432f9777c8c474abf4eec1d4aee5d37',
    index: '0x0',
  },
}
var SECP256K1_MULTISIG = {
  codeHash: '0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8',
  hashType: 'type',
  depType: 'depGroup',
  mainnetOutPoint: {
    txHash: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
    index: '0x1',
  },
  testnetOutPoint: {
    txHash: '0xf8de3bb47d055cdf460d93a2a6e1b05f7432f9777c8c474abf4eec1d4aee5d37',
    index: '0x1',
  },
}
var ANYONE_CAN_PAY_MAINNET = {
  codeHash: '0xd369597ff47f29fbc0d47d2e3775370d1250b85140c670e4718af712983a2354',
  hashType: 'type',
  depType: 'depGroup',
  mainnetOutPoint: {
    txHash: '0x4153a2014952d7cac45f285ce9a7c5c0c0e1b21f2d378b82ac1433cb11c25c4d',
    index: '0x0',
  },
}
var ANYONE_CAN_PAY_TESTNET = {
  codeHash: '0x3419a1c09eb2567f6552ee7a8ecffd64155cffe0f1796e6e61ec088d740c1356',
  hashType: 'type',
  depType: 'depGroup',
  testnetOutPoint: {
    txHash: '0xec26b0f85ed839ece5f11c4c4e837ec359f5adc4420410f6453b1f6b60fb96a6',
    index: '0x0',
  },
}

// src/utils/address/index.ts
var MAX_BECH32_LIMIT = 1023
var AddressPrefix = /* @__PURE__ */ (AddressPrefix2 => {
  AddressPrefix2['Mainnet'] = 'ckb'
  AddressPrefix2['Testnet'] = 'ckt'
  return AddressPrefix2
})(AddressPrefix || {})
var AddressType = /* @__PURE__ */ (AddressType2 => {
  AddressType2['FullVersion'] = '0x00'
  AddressType2['HashIdx'] = '0x01'
  AddressType2['DataCodeHash'] = '0x02'
  AddressType2['TypeCodeHash'] = '0x04'
  return AddressType2
})(AddressType || {})
var Bech32Type = /* @__PURE__ */ (Bech32Type2 => {
  Bech32Type2['Bech32'] = 'bech32'
  Bech32Type2['Bech32m'] = 'bech32m'
  return Bech32Type2
})(Bech32Type || {})
var HashType = /* @__PURE__ */ (HashType2 => {
  HashType2['data'] = '00'
  HashType2['type'] = '01'
  HashType2['data1'] = '02'
  HashType2['data2'] = '04'
  return HashType2
})(HashType || {})
var payloadToAddress = (payload, isMainnet = true) =>
  _bech32.bech32m.encode(
    isMainnet ? 'ckb' /* Mainnet */ : 'ckt' /* Testnet */,
    _bech32.bech32m.toWords(payload),
    MAX_BECH32_LIMIT,
  )
var scriptToPayload = ({ codeHash, hashType, args }) => {
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
var scriptToAddress = (script, isMainnet = true) => payloadToAddress(scriptToPayload(script), isMainnet)
var toAddressPayload = (args, type = '0x01' /* HashIdx */, codeHashOrCodeHashIndex, hashType) => {
  if (typeof args === 'string' && !args.startsWith('0x')) {
    throw new HexStringWithout0xException(args)
  }
  if (
    !['0x01' /* HashIdx */, '0x02' /* DataCodeHash */, '0x04' /* TypeCodeHash */, '0x00' /* FullVersion */].includes(
      type,
    )
  ) {
    throw new AddressFormatTypeException(+type)
  }
  if (['0x02' /* DataCodeHash */, '0x04' /* TypeCodeHash */].includes(type)) {
    console.warn(
      `Address of 'AddressType.DataCodeHash' or 'AddressType.TypeCodeHash' is deprecated, please use address of AddressPrefix.FullVersion`,
    )
  }
  if (!codeHashOrCodeHashIndex) {
    codeHashOrCodeHashIndex = type === '0x01' /* HashIdx */ ? '0x00' : SECP256K1_BLAKE160.codeHash
  }
  if (type !== '0x00' /* FullVersion */) {
    return new Uint8Array([
      ...hexToBytes(type),
      ...hexToBytes(codeHashOrCodeHashIndex),
      ...(typeof args === 'string' ? hexToBytes(args) : args),
    ])
  }
  if (!hashType && codeHashOrCodeHashIndex === SECP256K1_BLAKE160.codeHash) {
    hashType = SECP256K1_BLAKE160.hashType
  }
  if (
    !_optionalChain([codeHashOrCodeHashIndex, 'optionalAccess', _2 => _2.startsWith, 'call', _3 => _3('0x')]) ||
    codeHashOrCodeHashIndex.length !== 66
  ) {
    throw new CodeHashException(codeHashOrCodeHashIndex)
  }
  if (!hashType) {
    throw new ParameterRequiredException('hashType')
  }
  return scriptToPayload({
    codeHash: codeHashOrCodeHashIndex,
    hashType,
    args: typeof args === 'string' ? args : bytesToHex(args),
  })
}
var bech32Address = (
  args,
  { prefix = 'ckb' /* Mainnet */, type = '0x01' /* HashIdx */, codeHashOrCodeHashIndex = '' } = {},
) =>
  _bech32.bech32.encode(
    prefix,
    _bech32.bech32.toWords(toAddressPayload(args, type, codeHashOrCodeHashIndex)),
    MAX_BECH32_LIMIT,
  )
var fullPayloadToAddress = ({ args, prefix, type = '0x02' /* DataCodeHash */, codeHash }) =>
  bech32Address(args, { prefix, type, codeHashOrCodeHashIndex: codeHash })
var pubkeyToAddress = (pubkey, options = {}) => {
  const publicKeyHash = blake160(pubkey)
  return bech32Address(publicKeyHash, options)
}
var isValidShortVersionPayload = (payload, bech32Type) => {
  const [type, index, ...data] = payload
  if (bech32Type !== 'bech32' /* Bech32 */) {
    throw new AddressFormatTypeAndEncodeMethodNotMatchException(type, bech32Type)
  }
  switch (index) {
    case 0:
    case 1: {
      if (data.length !== 20) {
        throw new AddressPayloadException(payload, 'short')
      }
      break
    }
    case 2: {
      if (data.length === 20 || data.length === 22 || data.length === 24) {
        break
      }
      throw new AddressPayloadException(payload, 'short')
    }
    default: {
      throw new AddressPayloadException(payload, 'short')
    }
  }
}
var isPayloadValid = (payload, bech32Type) => {
  const type = payload[0]
  const data = payload.slice(1)
  switch (type) {
    case +'0x01' /* HashIdx */: {
      isValidShortVersionPayload(payload, bech32Type)
      break
    }
    case +'0x02' /* DataCodeHash */:
    case +'0x04' /* TypeCodeHash */: {
      if (bech32Type !== 'bech32' /* Bech32 */) {
        throw new AddressFormatTypeAndEncodeMethodNotMatchException(type, bech32Type)
      }
      if (data.length < 32) {
        throw new AddressPayloadException(payload, 'full')
      }
      break
    }
    case +'0x00' /* FullVersion */: {
      if (bech32Type !== 'bech32m' /* Bech32m */) {
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
}
var parseAddress = (address, encode = 'binary') => {
  let bech32Type
  let payload = new Uint8Array()
  try {
    const decoded = _bech32.bech32.decode(address, MAX_BECH32_LIMIT)
    bech32Type = 'bech32' /* Bech32 */
    payload = new Uint8Array(_bech32.bech32.fromWords(new Uint8Array(decoded.words)))
  } catch (e) {
    const decoded = _bech32.bech32m.decode(address, MAX_BECH32_LIMIT)
    bech32Type = 'bech32m' /* Bech32m */
    payload = new Uint8Array(_bech32.bech32m.fromWords(new Uint8Array(decoded.words)))
  }
  try {
    isPayloadValid(payload, bech32Type)
  } catch (err) {
    if (err instanceof AddressFormatTypeAndEncodeMethodNotMatchException) {
      throw err
    }
    throw new AddressException(address, err.stack, err.type)
  }
  return encode === 'binary' ? payload : bytesToHex(payload)
}
var addressToScript = address => {
  const payload = parseAddress(address)
  const type = payload[0]
  switch (type) {
    case +'0x00' /* FullVersion */: {
      const HASH_TYPE = {
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
    case +'0x01' /* HashIdx */: {
      const codeHashIndices = [
        SECP256K1_BLAKE160,
        SECP256K1_MULTISIG,
        address.startsWith('ckb' /* Mainnet */) ? ANYONE_CAN_PAY_MAINNET : ANYONE_CAN_PAY_TESTNET,
      ]
      const index = payload[1]
      const args = payload.slice(2)
      const script = _nullishCoalesce(codeHashIndices[index], () => SECP256K1_BLAKE160)
      return {
        codeHash: script.codeHash,
        hashType: script.hashType,
        args: bytesToHex(args),
      }
    }
    case +'0x02' /* DataCodeHash */:
    case +'0x04' /* TypeCodeHash */: {
      const codeHashAndArgs = bytesToHex(payload.slice(1))
      const hashType = type === +'0x02' /* DataCodeHash */ ? 'data' : 'type'
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

// src/utils/crypto/index.ts
var _bech32 = require('bech32')

// src/utils/crypto/blake2b.ts
var BYTES_MIN = 16
var BYTES_MAX = 64
var KEYBYTES_MIN = 16
var KEYBYTES_MAX = 64
var SALTBYTES = 16
var PERSONALBYTES = 16
var v = new Uint32Array(32)
var m = new Uint32Array(32)
var ADD64AA = (vec, a, b) => {
  const o0 = vec[a] + vec[b]
  let o1 = vec[a + 1] + vec[b + 1]
  if (o0 >= 4294967296) {
    o1++
  }
  vec[a] = o0
  vec[a + 1] = o1
}
var ADD64AC = (vec, a, b0, b1) => {
  let o0 = vec[a] + b0
  if (b0 < 0) {
    o0 += 4294967296
  }
  let o1 = vec[a + 1] + b1
  if (o0 >= 4294967296) {
    o1++
  }
  vec[a] = o0
  vec[a + 1] = o1
}
var B2B_GET32 = (arr, i) => {
  return arr[i] ^ (arr[i + 1] << 8) ^ (arr[i + 2] << 16) ^ (arr[i + 3] << 24)
}
var B2B_G = (a, b, c, d, ix, iy) => {
  const x0 = m[ix]
  const x1 = m[ix + 1]
  const y0 = m[iy]
  const y1 = m[iy + 1]
  ADD64AA(v, a, b)
  ADD64AC(v, a, x0, x1)
  let xor0 = v[d] ^ v[a]
  let xor1 = v[d + 1] ^ v[a + 1]
  v[d] = xor1
  v[d + 1] = xor0
  ADD64AA(v, c, d)
  xor0 = v[b] ^ v[c]
  xor1 = v[b + 1] ^ v[c + 1]
  v[b] = (xor0 >>> 24) ^ (xor1 << 8)
  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8)
  ADD64AA(v, a, b)
  ADD64AC(v, a, y0, y1)
  xor0 = v[d] ^ v[a]
  xor1 = v[d + 1] ^ v[a + 1]
  v[d] = (xor0 >>> 16) ^ (xor1 << 16)
  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16)
  ADD64AA(v, c, d)
  xor0 = v[b] ^ v[c]
  xor1 = v[b + 1] ^ v[c + 1]
  v[b] = (xor1 >>> 31) ^ (xor0 << 1)
  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1)
}
var BLAKE2B_IV32 = new Uint32Array([
  4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137,
  1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225,
])
var SIGMA8 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12,
  0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10,
  15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0,
  7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7,
  1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
]
var SIGMA82 = new Uint8Array(
  SIGMA8.map(x => {
    return x * 2
  }),
)
var blake2bCompress = (ctx, last) => {
  let i = 0
  for (i = 0; i < 16; i++) {
    v[i] = ctx.h[i]
    v[i + 16] = BLAKE2B_IV32[i]
  }
  v[24] ^= ctx.t
  v[25] ^= ctx.t / 4294967296
  if (last) {
    v[28] = ~v[28]
    v[29] = ~v[29]
  }
  for (i = 0; i < 32; i++) {
    m[i] = B2B_GET32(ctx.b, 4 * i)
  }
  for (i = 0; i < 12; i++) {
    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1])
    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3])
    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5])
    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7])
    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9])
    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11])
    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13])
    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15])
  }
  for (i = 0; i < 16; i++) {
    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16]
  }
}
var blake2bUpdate = (ctx, input) => {
  for (let i = 0; i < input.length; i++) {
    if (ctx.c === 128) {
      ctx.t += ctx.c
      blake2bCompress(ctx, false)
      ctx.c = 0
    }
    ctx.b[ctx.c++] = +input[i]
  }
}
var blake2bFinal = (ctx, out) => {
  ctx.t += ctx.c
  while (ctx.c < 128) {
    ctx.b[ctx.c++] = 0
  }
  blake2bCompress(ctx, true)
  for (let i = 0; i < ctx.outlen; i++) {
    out[i] = ctx.h[i >> 2] >> (8 * (i & 3))
  }
  return out
}
var toHex = n => {
  if (n < 16) return `0${n.toString(16)}`
  return n.toString(16)
}
var hexSlice = buf => {
  let str = ''
  for (let i = 0; i < buf.length; i++) str += toHex(+buf[i])
  return str
}
var parameterBlock = new Uint8Array([
  0, 0, 0, 0,
  //  0: outlen, keylen, fanout, depth 0,
  0, 0, 0, 0,
  //  4: leaf length, sequential mode 0,
  0, 0, 0, 0,
  //  8: node offset
  0, 0, 0, 0,
  // 12: node offset
  0, 0, 0, 0,
  // 16: node depth, inner length, rfu
  0, 0, 0, 0,
  // 20: rfu
  0, 0, 0, 0,
  // 24: rfu
  0, 0, 0, 0,
  // 28: rfu
  0, 0, 0, 0,
  // 32: salt
  0, 0, 0, 0,
  // 36: salt
  0, 0, 0, 0,
  // 40: salt
  0, 0, 0, 0,
  // 44: salt
  0, 0, 0, 0,
  // 48: personal
  0, 0, 0, 0,
  // 52: personal
  0, 0, 0, 0,
  // 56: personal
  0, 0, 0, 0,
  // 60: personal
])
var Blake2b = class {
  // Creates a BLAKE2b hashing context
  // Requires an output length between 1 and 64 bytes
  // Takes an optional Uint8Array key
  constructor(outlen, key, salt, personal) {
    this.update = input => {
      if (!(input instanceof Uint8Array)) {
        throw new InputTypeException()
      }
      blake2bUpdate(this, input)
      return this
    }
    this.digest = out => {
      const buf = !out || out === 'binary' || out === 'hex' ? new Uint8Array(this.outlen) : out
      if (!(buf instanceof Uint8Array)) {
        throw new OutTypeException()
      }
      if (buf.length < this.outlen) {
        throw new Error('out must have at least outlen bytes of space')
      }
      blake2bFinal(this, buf)
      if (out === 'hex') return hexSlice(buf)
      return buf
    }
    this.final = this.digest
    parameterBlock.fill(0)
    this.b = new Uint8Array(128)
    this.h = new Uint32Array(16)
    this.t = 0
    this.c = 0
    this.outlen = outlen
    parameterBlock[0] = outlen
    if (key) parameterBlock[1] = key.length
    parameterBlock[2] = 1
    parameterBlock[3] = 1
    if (salt) parameterBlock.set(salt, 32)
    if (personal) parameterBlock.set(personal, 48)
    for (let i = 0; i < 16; i++) {
      this.h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameterBlock, i * 4)
    }
    if (key) {
      blake2bUpdate(this, key)
      this.c = 128
    }
  }
}
var blake2b = (outlen, key, salt, personal, noAssert) => {
  if (noAssert !== true) {
    if (outlen < BYTES_MIN) {
      throw new OutLenTooSmallException(outlen, BYTES_MIN)
    }
    if (outlen > BYTES_MAX) {
      throw new OutLenTooLargeException(outlen, BYTES_MAX)
    }
    if (key !== null) {
      if (!(key instanceof Uint8Array)) {
        throw new KeyTypeException()
      }
      if (key.length < KEYBYTES_MIN) {
        throw new KeyLenTooSmallException(key.length, KEYBYTES_MIN)
      }
      if (key.length > KEYBYTES_MAX) {
        throw new KeyLenTooLargeException(key.length, KEYBYTES_MAX)
      }
    }
    if (salt !== null) {
      if (!(salt instanceof Uint8Array)) {
        throw new SaltTypeException()
      }
      if (salt.length !== SALTBYTES) {
        throw new SaltLenException(salt.length, SALTBYTES)
      }
    }
    if (personal !== null) {
      if (!(personal instanceof Uint8Array)) {
        throw new PersonalTypeException()
      }
      if (personal.length !== PERSONALBYTES) {
        throw new PersonalLenException(personal.length, PERSONALBYTES)
      }
    }
  }
  return new Blake2b(outlen, key, salt, personal)
}

// src/utils/const.ts
var PERSONAL = new Uint8Array([99, 107, 98, 45, 100, 101, 102, 97, 117, 108, 116, 45, 104, 97, 115, 104])
var EMPTY_WITNESS_ARGS = {
  lock: '',
  inputType: '',
  outputType: '',
}
var EMPTY_SECP_SIG = `0x${'0'.repeat(130)}`

// src/utils/crypto/blake160.ts
var blake160 = (data, encode = 'binary') => {
  const formattedData = typeof data === 'string' ? hexToBytes(data) : data
  const s = blake2b(32, null, null, PERSONAL)
  s.update(formattedData)
  return s.digest(encode).slice(0, encode === 'binary' ? 20 : 40)
}

// src/utils/serialization/basic.ts
var offsetSize = 4
var fullLengthSize = 4
var getOffsets = elmLengths => {
  const headerLength = fullLengthSize + offsetSize * elmLengths.length
  const offsets = [headerLength]
  elmLengths.forEach((_, idx) => {
    if (idx) {
      offsets.push(offsets[offsets.length - 1] + elmLengths[idx - 1])
    }
  })
  return offsets
}
var serializeArray = array => {
  if (typeof array !== 'string' && !Array.isArray(array)) {
    throw new TypeError('The array to be serialized should by type of string or bytes')
  }
  const bytes = typeof array === 'string' ? hexToBytes(array) : array
  return bytesToHex(bytes)
}
var serializeStruct = struct => {
  let res = ''
  struct.forEach(value => {
    res += serializeArray(value).slice(2)
  })
  return `0x${res}`
}
var serializeFixVec = fixVec => {
  if (typeof fixVec !== 'string' && !Array.isArray(fixVec)) {
    throw new TypeError('The fixed vector to be serialized should be a string or an array of bytes')
  }
  const vec = typeof fixVec === 'string' ? [...hexToBytes(fixVec)].map(b => `0x${b.toString(16)}`) : fixVec
  const serializedItemVec = vec.map(item => serializeArray(item).slice(2))
  const header = toUint32Le(`0x${serializedItemVec.length.toString(16)}`).slice(2)
  return `0x${header}${serializedItemVec.join('')}`
}
var serializeDynVec = dynVec => {
  if (!Array.isArray(dynVec)) {
    throw new TypeError('The dynamic vector to be serialized should be an array of bytes')
  }
  const serializedItemVec = dynVec.map(item => serializeArray(item).slice(2))
  const body = serializedItemVec.join('')
  let offsets = ''
  if (serializedItemVec.length) {
    offsets = getOffsets(serializedItemVec.map(item => item.length / 2))
      .map(offset => toUint32Le(`0x${offset.toString(16)}`).slice(2))
      .join('')
  }
  const headerLength = fullLengthSize + offsetSize * serializedItemVec.length
  const fullLength = toUint32Le(`0x${(headerLength + body.length / 2).toString(16)}`).slice(2)
  return `0x${fullLength}${offsets}${body}`
}
var serializeTable = table => {
  const bodyElms = []
  table.forEach(value => {
    bodyElms.push(serializeArray(value).slice(2))
  })
  const body = bodyElms.join('')
  const headerLength = fullLengthSize + offsetSize * table.size
  const fullLength = toUint32Le(`0x${(headerLength + body.length / 2).toString(16)}`).slice(2)
  const offsets = getOffsets(bodyElms.map(arg => arg.length / 2))
    .map(offset => toUint32Le(`0x${offset.toString(16)}`).slice(2))
    .join('')
  return `0x${fullLength}${offsets}${body}`
}
var serializeOption = innerItem => (!innerItem ? '0x' : innerItem)

// src/utils/serialization/script.ts
var serializeCodeHash = codeHash => serializeArray(codeHash)
var serializeHashType = hashType => {
  if (hashType === 'data') return '0x00'
  if (hashType === 'type') return '0x01'
  if (hashType === 'data1') return '0x02'
  if (hashType === 'data2') return '0x04'
  throw new TypeError("Hash type must be either of 'data' or 'type'")
}
var serializeArgs = args => serializeFixVec(args)
var serializeScript = script => {
  if (!script) throw new ParameterRequiredException('Script')
  const { codeHash = '', hashType, args = '' } = script
  const serializedCodeHash = serializeCodeHash(codeHash)
  const serializedHashType = serializeHashType(hashType)
  const serializedArgs = serializeArgs(args)
  const table = /* @__PURE__ */ new Map([
    ['codeHash', serializedCodeHash],
    ['hashType', serializedHashType],
    ['args', serializedArgs],
  ])
  return serializeTable(table)
}

// src/utils/serialization/transaction.ts
var serializeVersion = version => toUint32Le(version)
var serializeOutPoint = outPoint => {
  if (!outPoint) return ''
  const struct = /* @__PURE__ */ new Map([
    ['txHash', outPoint.txHash],
    ['index', toUint32Le(outPoint.index)],
  ])
  return serializeStruct(struct)
}
var serializeDepType = type => {
  if (type === 'code') return '0x00'
  if (type === 'depGroup') return '0x01'
  throw new TypeError("Dep type must be either of 'code' or 'depGroup'")
}
var serializeCellDep = dep => {
  const serializedOutPoint = serializeOutPoint(dep.outPoint)
  const serializedDepType = serializeDepType(dep.depType)
  const struct = /* @__PURE__ */ new Map([
    ['outPoint', serializedOutPoint],
    ['depType', serializedDepType],
  ])
  return serializeStruct(struct)
}
var serializeCellDeps = cellDeps => {
  const serializedCellDepList = cellDeps.map(dep => serializeCellDep(dep))
  return serializeFixVec(serializedCellDepList)
}
var serializeHeaderDeps = deps => {
  const serializedHeaderDepList = deps.map(dep => serializeArray(dep))
  return serializeFixVec(serializedHeaderDepList)
}
var serializeInput = input => {
  const serializedOutPoint = serializeOutPoint(input.previousOutput)
  const serializedSince = toUint64Le(input.since)
  const struct = /* @__PURE__ */ new Map([
    ['since', serializedSince],
    ['previousOutput', serializedOutPoint],
  ])
  return serializeStruct(struct)
}
var serializeInputs = inputs => {
  const serializedInputList = inputs.map(input => serializeInput(input))
  return serializeFixVec(serializedInputList)
}
var serializeOutput = output => {
  const serializedCapacity = toUint64Le(output.capacity)
  const serializedLockScript = serializeScript(output.lock)
  const serialiedTypeScript = output.type ? serializeScript(output.type) : ''
  const table = /* @__PURE__ */ new Map([
    ['capacity', serializedCapacity],
    ['lock', serializedLockScript],
    ['type', serialiedTypeScript],
  ])
  return serializeTable(table)
}
var serializeOutputs = outputs => {
  const serializedOutputList = outputs.map(output => serializeOutput(output))
  return serializeDynVec(serializedOutputList)
}
var serializeOutputsData = outputsData => {
  const serializedOutputsDatumList = outputsData.map(datum => serializeFixVec(datum))
  return serializeDynVec(serializedOutputsDatumList)
}
var serializeWitnessArgs = witnessArgs => {
  const { lock, inputType, outputType } = witnessArgs
  const table = /* @__PURE__ */ new Map([
    ['lock', serializeOption(lock) === '0x' ? '0x' : serializeFixVec(lock)],
    ['inputType', serializeOption(inputType) === '0x' ? '0x' : serializeFixVec(inputType)],
    ['outputType', serializeOption(outputType) === '0x' ? '0x' : serializeFixVec(outputType)],
  ])
  return serializeTable(table)
}
var serializeWitnesses = witnesses => {
  const serializedWitnessList = witnesses.map(witness => serializeFixVec(witness))
  return serializeDynVec(serializedWitnessList)
}
var serializeRawTransaction = rawTransaction => {
  const serializedVersion = serializeVersion(rawTransaction.version)
  const serializedCellDeps = serializeCellDeps(rawTransaction.cellDeps)
  const serializedHeaderDeps = serializeHeaderDeps(rawTransaction.headerDeps)
  const serializedInputs = serializeInputs(rawTransaction.inputs)
  const serializedOutputs = serializeOutputs(rawTransaction.outputs)
  const serializedOutputsData = serializeOutputsData(rawTransaction.outputsData)
  const table = /* @__PURE__ */ new Map([
    ['version', serializedVersion],
    ['cellDeps', serializedCellDeps],
    ['headerDeps', serializedHeaderDeps],
    ['inputs', serializedInputs],
    ['outputs', serializedOutputs],
    ['outputsData', serializedOutputsData],
  ])
  return serializeTable(table)
}
var serializeTransaction = rawTransaction => {
  const serializedRawTransaction = serializeRawTransaction(rawTransaction)
  const serializedWitnesses = serializeWitnesses(rawTransaction.witnesses || [])
  const table = /* @__PURE__ */ new Map([
    ['raw', serializedRawTransaction],
    ['witnesses', serializedWitnesses],
  ])
  return serializeTable(table)
}

// src/utils/occupiedCapacity.ts
var codeHashOccupied = 32
var hashTypeOccupied = 1
var scriptOccupied = script => {
  return script.args.slice(2).length / 2 + codeHashOccupied + hashTypeOccupied
}
var cellOccupied = cell => {
  return 8 + scriptOccupied(cell.lock) + (cell.type ? scriptOccupied(cell.type) : 0)
}

// src/utils/epochs.ts

var serializeEpoch = ({ length, index, number }) => {
  assertToBeHexString(length)
  assertToBeHexString(index)
  assertToBeHexString(number)
  const epochSince = _jsbi2.default.add(
    _jsbi2.default.add(
      _jsbi2.default.add(
        _jsbi2.default.leftShift(_jsbi2.default.BigInt(32), _jsbi2.default.BigInt(56)),
        _jsbi2.default.leftShift(_jsbi2.default.BigInt(length), _jsbi2.default.BigInt(40)),
      ),
      _jsbi2.default.leftShift(_jsbi2.default.BigInt(index), _jsbi2.default.BigInt(24)),
    ),
    _jsbi2.default.BigInt(number),
  )
  return `0x${epochSince.toString(16)}`
}
var parseEpoch = epoch => ({
  length: `0x${_jsbi2.default
    .bitwiseAnd(
      _jsbi2.default.signedRightShift(_jsbi2.default.BigInt(epoch), _jsbi2.default.BigInt(40)),
      _jsbi2.default.BigInt(65535),
    )
    .toString(16)}`,
  index: `0x${_jsbi2.default
    .bitwiseAnd(
      _jsbi2.default.signedRightShift(_jsbi2.default.BigInt(epoch), _jsbi2.default.BigInt(24)),
      _jsbi2.default.BigInt(65535),
    )
    .toString(16)}`,
  number: `0x${_jsbi2.default.bitwiseAnd(_jsbi2.default.BigInt(epoch), _jsbi2.default.BigInt(16777215)).toString(16)}`,
})
var getWithdrawEpoch = (depositEpoch, withdrawingEpoch) => {
  const EPOCHS_PER_WITHDRAW_CYCLE = 180
  const depositEpochInfo = parseEpoch(depositEpoch)
  const withdrawingEpochInfo = parseEpoch(withdrawingEpoch)
  let depositedEpochCount = +withdrawingEpochInfo.number - +depositEpochInfo.number
  if (+withdrawingEpochInfo.index * +depositEpochInfo.length > +depositEpochInfo.index * +withdrawingEpochInfo.length) {
    depositedEpochCount += 1
  }
  const minEpockCountToLock =
    depositedEpochCount <= EPOCHS_PER_WITHDRAW_CYCLE
      ? EPOCHS_PER_WITHDRAW_CYCLE
      : (Math.floor((depositedEpochCount - 1) / EPOCHS_PER_WITHDRAW_CYCLE) + 1) * EPOCHS_PER_WITHDRAW_CYCLE
  return serializeEpoch({
    index: depositEpochInfo.index,
    length: depositEpochInfo.length,
    number: `0x${(+depositEpochInfo.number + minEpockCountToLock).toString(16)}`,
  })
}

// src/utils/sizes.ts
var getTransactionSize = transaction => {
  const tx = {
    ...transaction,
    witnesses: transaction.witnesses.map(wit => (typeof wit === 'string' ? wit : serializeWitnessArgs(wit))),
  }
  const VIRTUAL_COST = 4
  const serializedTransaction = serializeTransaction(tx)
  return serializedTransaction.slice(2).length / 2 + VIRTUAL_COST
}

// src/utils/reconcilers/extraInputs.ts

// src/utils/calculateTransactionFee.ts

var calculateTransactionFee = (transactionSize, feeRate) => {
  assertToBeHexStringOrBigint(transactionSize)
  assertToBeHexStringOrBigint(feeRate)
  const ratio = _jsbi2.default.BigInt(1e3)
  const base = _jsbi2.default.multiply(_jsbi2.default.BigInt(`${transactionSize}`), _jsbi2.default.BigInt(`${feeRate}`))
  const fee = _jsbi2.default.divide(base, ratio)
  if (_jsbi2.default.lessThan(_jsbi2.default.multiply(fee, ratio), base)) {
    return `0x${_jsbi2.default.add(fee, _jsbi2.default.BigInt(1)).toString(16)}`
  }
  return `0x${fee.toString(16)}`
}

// src/utils/reconcilers/extraInputs.ts
var extraInputs = params => {
  const changeThreshold = _jsbi2.default.BigInt(`${params.changeThreshold}`)
  const feeRate = _jsbi2.default.BigInt(`${params.feeRate}`)
  const currentChangeOutput = params.tx.outputs[params.tx.outputs.length - 1]
  const currentChange = _jsbi2.default.BigInt(currentChangeOutput.capacity)
  const fee = _jsbi2.default.BigInt(
    calculateTransactionFee(`0x${getTransactionSize(params.tx).toString(16)}`, `0x${feeRate.toString(16)}`),
  )
  const lack = _jsbi2.default.subtract(_jsbi2.default.add(fee, changeThreshold), currentChange)
  if (_jsbi2.default.LE(lack, _jsbi2.default.BigInt(0))) {
    return {
      ...params.tx,
      outputs: [
        ...params.tx.outputs.slice(0, -1),
        {
          ...currentChangeOutput,
          capacity: `0x${_jsbi2.default.subtract(currentChange, fee).toString(16)}`,
        },
      ],
    }
  }
  params.cells.sort(
    (c1, c2) => +_jsbi2.default.subtract(_jsbi2.default.BigInt(c1.capacity), _jsbi2.default.BigInt(c2.capacity)),
  )
  const SIZE_PER_INPUT = _jsbi2.default.BigInt(44)
  const FEE_PER_INPUT = _jsbi2.default.divide(
    _jsbi2.default.multiply(SIZE_PER_INPUT, feeRate),
    _jsbi2.default.BigInt(1e3),
  )
  for (let i = 1; i <= Math.min(params.extraCount, params.cells.length); i++) {
    const extraCost = _jsbi2.default.multiply(_jsbi2.default.BigInt(i), FEE_PER_INPUT)
    const totalLack = _jsbi2.default.add(lack, extraCost)
    const extraCapacity = params.cells
      .slice(0, i)
      .reduce((sum, c) => _jsbi2.default.add(sum, _jsbi2.default.BigInt(c.capacity)), _jsbi2.default.BigInt(0))
    if (_jsbi2.default.GE(extraCapacity, totalLack)) {
      const inputs = [
        ...params.tx.inputs,
        ...params.cells.slice(0, i).map(c => ({
          previousOutput: c.outPoint,
          since: '0x0',
        })),
      ]
      const change = _jsbi2.default.add(changeThreshold, _jsbi2.default.subtract(extraCapacity, totalLack))
      const changeOutput = { ...currentChangeOutput, capacity: `0x${change.toString(16)}` }
      const outputs = [...params.tx.outputs.slice(0, -1), changeOutput]
      const tx = { ...params.tx, inputs, outputs }
      return tx
    }
  }
  throw new ReconciliationException()
}

// src/utils/index.ts
var scriptToHash = script => {
  if (!script) throw new ParameterRequiredException('Script')
  const serializedScript = serializeScript(script)
  const s = blake2b(32, null, null, PERSONAL)
  s.update(hexToBytes(serializedScript))
  const digest = s.digest('hex')
  return `0x${digest}`
}
var rawTransactionToHash = rawTransaction => {
  if (!rawTransaction) throw new ParameterRequiredException('Raw transaction')
  const serializedRawTransaction = serializeRawTransaction(rawTransaction)
  const s = blake2b(32, null, null, PERSONAL)
  s.update(hexToBytes(serializedRawTransaction))
  const digest = s.digest('hex')
  return `0x${digest}`
}
var privateKeyToPublicKey = privateKey => {
  const keyPair = new ECPair(privateKey)
  return keyPair.publicKey
}
var privateKeyToAddress = (privateKey, options) => pubkeyToAddress(privateKeyToPublicKey(privateKey), options)
var extractDAOData = dao => {
  if (!dao.startsWith('0x')) {
    throw new HexStringWithout0xException(dao)
  }
  const value = dao.replace('0x', '')
  return {
    c: toBigEndian(`0x${value.slice(0, 16)}`),
    ar: toBigEndian(`0x${value.slice(16, 32)}`),
    s: toBigEndian(`0x${value.slice(32, 48)}`),
    u: toBigEndian(`0x${value.slice(48, 64)}`),
  }
}
var calculateMaximumWithdraw = (outputCell, outputDataCapacity, depositDAO, withdrawDAO) => {
  const depositCellSerialized = cellOccupied(outputCell) + outputDataCapacity.slice(2).length / 2
  const occupiedCapacity = _jsbi2.default.asUintN(
    128,
    _jsbi2.default.multiply(_jsbi2.default.BigInt(1e8), _jsbi2.default.BigInt(depositCellSerialized)),
  )
  return `0x${_jsbi2.default
    .add(
      _jsbi2.default.divide(
        _jsbi2.default.multiply(
          _jsbi2.default.subtract(
            _jsbi2.default.asUintN(128, _jsbi2.default.BigInt(outputCell.capacity)),
            occupiedCapacity,
          ),
          _jsbi2.default.asUintN(128, _jsbi2.default.BigInt(extractDAOData(withdrawDAO).ar)),
        ),
        _jsbi2.default.asUintN(128, _jsbi2.default.BigInt(extractDAOData(depositDAO).ar)),
      ),
      occupiedCapacity,
    )
    .toString(16)}`
}

// src/rpc/exceptions/formatter.ts
var PageSizeTooLargeException = class extends RangeError {
  constructor(pageSize, maxSize) {
    super(`Expect page size to be at most ${maxSize}, but ${pageSize} received`)
    this.code = 101 /* ParameterInvalid */
  }
}
var PageSizeTooSmallException = class extends RangeError {
  constructor(pageSize, minSize) {
    super(`Expect page size to be at least ${minSize}, but ${pageSize} received`)
    this.code = 101 /* ParameterInvalid */
  }
}
var OutputsValidatorTypeException = class extends TypeError {
  constructor() {
    super(`Expect outputs validator to be 'default' or 'passthrough'`)
    this.code = 101 /* ParameterInvalid */
  }
}
var BigintOrHexStringTypeException = class extends TypeError {
  constructor(value) {
    super(`Expect number to be bigint or hex string, but ${value} received`)
    this.code = 101 /* ParameterInvalid */
  }
}
var StringHashTypeException = class extends TypeError {
  constructor(hash) {
    super(`Expect hash to be string, but ${hash} received`)
    this.code = 101 /* ParameterInvalid */
  }
}

// src/rpc/exceptions/rpc.ts
var IdNotMatchException = class extends Error {
  constructor(requestId, responseId) {
    super(`Expect json rpc id to be ${requestId}, but ${responseId} received`)
    this.code = 201 /* IdNotMatch */
  }
}
var ResponseException = class extends Error {
  constructor() {
    super(...arguments)
    this.code = 204 /* ResponseMessage */
  }
}

// src/rpc/exceptions/batch.ts
var ERROR_LABEL = 'Batch Request'
var MethodInBatchNotFoundException = class extends Error {
  constructor(name) {
    super(`[${ERROR_LABEL}]: Method ${name} is not found`)
    this.code = 202 /* MethodNotFound */
  }
}
var PayloadInBatchException = class extends Error {
  constructor(index, message) {
    super(`[${ERROR_LABEL} ${index}]: ${message}`)
    this.code = 203 /* PayloadMessage */
    this.index = index
  }
}
var IdNotMatchedInBatchException = class extends IdNotMatchException {
  constructor(index, requestId, responseId) {
    super(requestId, responseId)
    this.message = `[${ERROR_LABEL} ${index}]: ${this.message}`
    this.index = index
  }
}

// src/rpc/paramsFormatter.ts
var formatter = {
  toOptional: format => arg => {
    if (!format || arg === void 0 || arg === null) {
      return arg
    }
    return format(arg)
  },
  toArray: format => arg => {
    if (typeof format !== 'function' || !Array.isArray(arg)) {
      return arg
    }
    return arg.map(format)
  },
  toHash: hash => {
    if (typeof hash !== 'string') {
      throw new StringHashTypeException(hash)
    }
    return hash.startsWith('0x') ? hash : `0x${hash}`
  },
  toNumber: number => {
    if (typeof number === 'bigint') {
      return `0x${number.toString(16)}`
    }
    if (typeof number !== 'string') {
      throw new BigintOrHexStringTypeException(number)
    }
    if (!number.startsWith('0x')) {
      throw new HexStringWithout0xException(number)
    }
    return number
  },
  toScript: script => {
    const { codeHash, hashType: hash_type, ...rest } = script
    return {
      code_hash: formatter.toHash(codeHash),
      hash_type,
      ...rest,
    }
  },
  toOutPoint: outPoint => {
    if (!outPoint) return outPoint
    const { txHash, index, ...rest } = outPoint
    return {
      tx_hash: formatter.toHash(txHash),
      index: formatter.toNumber(index),
      ...rest,
    }
  },
  toInput: input => {
    if (!input) return input
    const { previousOutput, since, ...rest } = input
    return {
      previous_output: formatter.toOutPoint(previousOutput),
      since: formatter.toNumber(since),
      ...rest,
    }
  },
  toOutput: output => {
    if (!output) return output
    const { capacity, lock, type = null, ...rest } = output
    return {
      capacity: formatter.toNumber(capacity),
      lock: formatter.toScript(lock),
      type: type ? formatter.toScript(type) : type,
      ...rest,
    }
  },
  toDepType: type => {
    if (type === 'depGroup') {
      return 'dep_group'
    }
    return type
  },
  toCellDep: cellDep => {
    if (!cellDep) return cellDep
    const { outPoint = null, depType = 'code', ...rest } = cellDep
    return {
      out_point: formatter.toOutPoint(outPoint),
      dep_type: formatter.toDepType(depType),
      ...rest,
    }
  },
  toRawTransaction: transaction => {
    if (!transaction) return transaction
    const {
      version,
      cellDeps = [],
      inputs = [],
      outputs = [],
      outputsData: outputs_data = [],
      headerDeps: header_deps = [],
      ...rest
    } = transaction
    const formattedInputs = inputs.map(input => formatter.toInput(input))
    const formattedOutputs = outputs.map(output => formatter.toOutput(output))
    const formattedCellDeps = cellDeps.map(cellDep => formatter.toCellDep(cellDep))
    const tx = {
      version: formatter.toNumber(version),
      cell_deps: formattedCellDeps,
      inputs: formattedInputs,
      outputs: formattedOutputs,
      outputs_data,
      header_deps,
      ...rest,
    }
    return tx
  },
  toPageNumber: (pageNo = '0x1') => formatter.toNumber(pageNo),
  toPageSize: (pageSize = '0x32') => {
    const size = _jsbi2.default.BigInt(`${pageSize}`)
    const MAX_SIZE = 50
    const MIN_SIZE = 0
    if (_jsbi2.default.greaterThan(size, _jsbi2.default.BigInt(MAX_SIZE)))
      throw new PageSizeTooLargeException(pageSize, MAX_SIZE)
    if (_jsbi2.default.lessThan(size, _jsbi2.default.BigInt(MIN_SIZE)))
      throw new PageSizeTooSmallException(pageSize, MIN_SIZE)
    return formatter.toNumber(`0x${size.toString(16)}`)
  },
  toReverseOrder: (reverse = false) => !!reverse,
  toOutputsValidator: outputsValidator => {
    if (!outputsValidator) return void 0
    const VALIDATORS = ['default', 'passthrough']
    if (VALIDATORS.indexOf(outputsValidator) > -1) {
      return outputsValidator
    }
    throw new OutputsValidatorTypeException()
  },
  toBoolean: value => {
    return !!value
  },
  toTransactionProof: proof => {
    if (!proof) return proof
    const { blockHash: block_hash, witnessesRoot: witnesses_root, ...rest } = proof
    return {
      block_hash,
      witnesses_root,
      ...rest,
    }
  },
}
var paramsFormatter_default = formatter

// src/rpc/resultFormatter.ts
var resultFormatter_exports = {}
__export(resultFormatter_exports, {
  toAlertMessage: () => toAlertMessage,
  toBannedAddress: () => toBannedAddress,
  toBannedAddresses: () => toBannedAddresses,
  toBlock: () => toBlock,
  toBlockEconomicState: () => toBlockEconomicState,
  toBlockchainInfo: () => toBlockchainInfo,
  toCapacityByLockHash: () => toCapacityByLockHash,
  toCell: () => toCell,
  toCellDep: () => toCellDep,
  toCellIncludingOutPoint: () => toCellIncludingOutPoint,
  toCellbaseOutputCapacityDetails: () => toCellbaseOutputCapacityDetails,
  toCells: () => toCells,
  toCellsIncludingOutPoint: () => toCellsIncludingOutPoint,
  toConsensus: () => toConsensus,
  toDepType: () => toDepType,
  toEpoch: () => toEpoch,
  toFeeRate: () => toFeeRate,
  toHash: () => toHash,
  toHeader: () => toHeader,
  toInput: () => toInput,
  toLiveCell: () => toLiveCell,
  toLiveCellWithStatus: () => toLiveCellWithStatus,
  toLiveCellsByLockHash: () => toLiveCellsByLockHash,
  toLocalNodeInfo: () => toLocalNodeInfo,
  toLockHashIndexState: () => toLockHashIndexState,
  toLockHashIndexStates: () => toLockHashIndexStates,
  toNumber: () => toNumber,
  toOutPoint: () => toOutPoint,
  toOutput: () => toOutput,
  toPeers: () => toPeers,
  toRawTxPool: () => toRawTxPool,
  toRemoteNodeInfo: () => toRemoteNodeInfo,
  toScript: () => toScript,
  toSyncState: () => toSyncState,
  toTransaction: () => toTransaction,
  toTransactionPoint: () => toTransactionPoint,
  toTransactionProof: () => toTransactionProof,
  toTransactionWithStatus: () => toTransactionWithStatus,
  toTransactionsByLockHash: () => toTransactionsByLockHash,
  toTxPoolInfo: () => toTxPoolInfo,
  toUncleBlock: () => toUncleBlock,
})
var isTxPoolIds = rawTxPool => {
  return Array.isArray(rawTxPool.pending)
}
var toNumber = number => number.toString()
var toHash = hash => hash
var toHeader = header => {
  if (!header) return header
  const {
    compact_target: compactTarget,
    transactions_root: transactionsRoot,
    proposals_hash: proposalsHash,
    extra_hash: extraHash,
    parent_hash: parentHash,
    ...rest
  } = header
  return {
    compactTarget,
    parentHash,
    transactionsRoot,
    proposalsHash,
    extraHash,
    ...rest,
  }
}
var toScript = script => {
  if (!script) return script
  const { code_hash: codeHash, hash_type: hashType, ...rest } = script
  return {
    codeHash,
    hashType,
    ...rest,
  }
}
var toInput = input => {
  if (!input) return input
  const { previous_output: previousOutput, ...rest } = input
  return {
    previousOutput: previousOutput ? toOutPoint(previousOutput) : previousOutput,
    ...rest,
  }
}
var toOutput = output => {
  if (!output) return output
  const { lock, type, ...rest } = output
  return {
    lock: toScript(lock),
    type: type ? toScript(type) : type,
    ...rest,
  }
}
var toOutPoint = outPoint => {
  if (!outPoint) return outPoint
  const { tx_hash: txHash, ...rest } = outPoint
  return {
    txHash,
    ...rest,
  }
}
var toDepType = type => {
  if (type === 'dep_group') {
    return 'depGroup'
  }
  return type
}
var toCellDep = cellDep => {
  if (!cellDep) return cellDep
  const { out_point: outPoint = null, dep_type = 'code', ...rest } = cellDep
  return {
    outPoint: toOutPoint(outPoint),
    depType: toDepType(dep_type),
    ...rest,
  }
}
function toTransaction(tx) {
  if (!tx) return tx
  const {
    cell_deps: cellDeps = [],
    inputs = [],
    outputs = [],
    outputs_data: outputsData = [],
    header_deps: headerDeps = [],
    ...rest
  } = tx
  return {
    cellDeps: cellDeps.map(toCellDep),
    inputs: inputs.map(toInput),
    outputs: outputs.map(toOutput),
    outputsData,
    headerDeps,
    ...rest,
  }
}
var toUncleBlock = uncleBlock => {
  if (!uncleBlock) return uncleBlock
  const { header, ...rest } = uncleBlock
  return {
    header: toHeader(header),
    ...rest,
  }
}
var toBlock = block => {
  if (!block) return block
  const { header, uncles = [], transactions = [], ...rest } = block
  return {
    header: toHeader(header),
    uncles: uncles.map(toUncleBlock),
    transactions: transactions.map(toTransaction),
    ...rest,
  }
}
var toAlertMessage = alertMessage => {
  if (!alertMessage) return alertMessage
  const { notice_until: noticeUntil, ...rest } = alertMessage
  return {
    noticeUntil,
    ...rest,
  }
}
var toBlockchainInfo = info => {
  if (!info) return info
  const { is_initial_block_download: isInitialBlockDownload, median_time: medianTime, alerts, ...rest } = info
  return {
    isInitialBlockDownload,
    medianTime,
    alerts: alerts.map(toAlertMessage),
    ...rest,
  }
}
var toLocalNodeInfo = info => {
  if (!info) return info
  const { node_id: nodeId, protocols, ...rest } = info
  return {
    nodeId,
    protocols: protocols.map(({ id, name, support_versions: supportVersions }) => ({ id, name, supportVersions })),
    ...rest,
  }
}
var toRemoteNodeInfo = info => {
  if (!info) return info
  const {
    node_id: nodeId,
    connected_duration: connectedDuration,
    is_outbound: isOutbound,
    last_ping_duration: lastPingDuration,
    sync_state,
    ...rest
  } = info
  return {
    nodeId,
    connectedDuration,
    isOutbound,
    lastPingDuration,
    syncState: {
      bestKnownHeaderHash: sync_state.best_known_header_hash,
      bestKnownHeaderNumber: sync_state.best_known_header_number,
      canFetchCount: sync_state.can_fetch_count,
      inflightCount: sync_state.inflight_count,
      lastCommonHeaderHash: sync_state.last_common_header_hash,
      lastCommonHeaderNumber: sync_state.last_common_header_number,
      unknownHeaderListSize: sync_state.unknown_header_list_size,
    },
    ...rest,
  }
}
var toTxPoolInfo = info => {
  if (!info) return info
  const {
    last_txs_updated_at: lastTxsUpdatedAt,
    tip_hash: tipHash,
    tip_number: tipNumber,
    total_tx_cycles: totalTxCycles,
    total_tx_size: totalTxSize,
    min_fee_rate: minFeeRate,
    ...rest
  } = info
  return {
    lastTxsUpdatedAt,
    tipHash,
    tipNumber,
    totalTxCycles,
    totalTxSize,
    minFeeRate,
    ...rest,
  }
}
var toPeers = nodes => {
  if (!Array.isArray(nodes)) return []
  return nodes.map(toRemoteNodeInfo)
}
var toCell = cell => {
  if (!cell) return cell
  const { lock, type, ...rest } = cell
  return {
    lock: toScript(lock),
    type: type ? toScript(type) : null,
    ...rest,
  }
}
var toLiveCell = liveCell => {
  if (!liveCell) return liveCell
  const { data, output, ...rest } = liveCell
  return {
    data,
    output: toOutput(output),
    ...rest,
  }
}
var toLiveCellWithStatus = cellWithStatus => {
  if (!cellWithStatus) return cellWithStatus
  const { cell, ...rest } = cellWithStatus
  return {
    cell: toLiveCell(cell),
    ...rest,
  }
}
var toCells = cells => {
  if (!Array.isArray(cells)) return []
  return cells.map(toCell)
}
var toCellIncludingOutPoint = cell => {
  if (!cell) return cell
  const { lock, block_hash: blockHash, out_point, output_data_len: outputDataLen, ...rest } = cell
  return {
    blockHash,
    lock: toScript(lock),
    outPoint: toOutPoint(out_point),
    outputDataLen,
    ...rest,
  }
}
var toCellsIncludingOutPoint = cells => {
  if (!Array.isArray(cells)) return []
  return cells.map(toCellIncludingOutPoint)
}
var toTransactionWithStatus = txWithStatus => {
  if (!txWithStatus) return txWithStatus
  const {
    transaction,
    tx_status: { block_hash: blockHash, status },
    ...rest
  } = txWithStatus
  return {
    transaction: toTransaction(transaction),
    txStatus: {
      blockHash,
      status,
    },
    ...rest,
  }
}
var toEpoch = epoch => {
  if (!epoch) return epoch
  const { start_number: startNumber, compact_target: compactTarget, ...rest } = epoch
  return {
    compactTarget,
    startNumber,
    ...rest,
  }
}
var toTransactionPoint = transactionPoint => {
  if (!transactionPoint) return transactionPoint
  const { block_number: blockNumber, tx_hash: txHash, ...rest } = transactionPoint
  return {
    blockNumber,
    txHash,
    ...rest,
  }
}
var toTransactionsByLockHash = transactions => {
  if (!transactions) return transactions
  return transactions.map(tx => ({
    consumedBy: tx.consumed_by ? toTransactionPoint(tx.consumed_by) : tx.consumed_by,
    createdBy: toTransactionPoint(tx.created_by),
  }))
}
var toLiveCellsByLockHash = cells => {
  if (!cells) return cells
  return cells.map(cell => ({
    cellOutput: toCell(cell.cell_output),
    createdBy: toTransactionPoint(cell.created_by),
    cellbase: cell.cellbase,
    outputDataLen: cell.output_data_len,
  }))
}
var toLockHashIndexState = index => {
  if (!index) return index
  const { block_hash: blockHash, block_number: blockNumber, lock_hash: lockHash, ...rest } = index
  return {
    blockHash,
    blockNumber,
    lockHash,
    ...rest,
  }
}
var toLockHashIndexStates = states => {
  if (!states) return states
  return states.map(toLockHashIndexState)
}
var toBannedAddress = bannedAddress => {
  if (!bannedAddress) return bannedAddress
  const { ban_reason: banReason, ban_until: banUntil, created_at: createdAt, ...rest } = bannedAddress
  return {
    banReason,
    banUntil,
    createdAt,
    ...rest,
  }
}
var toBannedAddresses = bannedAddresses => {
  if (!bannedAddresses) return bannedAddresses
  return bannedAddresses.map(banAddr => toBannedAddress(banAddr))
}
var toCellbaseOutputCapacityDetails = details => {
  if (!details) return details
  const { proposal_reward: proposalReward, tx_fee: txFee, ...rest } = details
  return {
    proposalReward,
    txFee,
    ...rest,
  }
}
var toFeeRate = feeRateObj => {
  if (!feeRateObj) {
    return feeRateObj
  }
  const { fee_rate: feeRate, ...rest } = feeRateObj
  return {
    feeRate,
    ...rest,
  }
}
var toCapacityByLockHash = capacityByLockHash => {
  if (!capacityByLockHash) {
    return capacityByLockHash
  }
  const { cells_count: cellsCount, block_number: blockNumber, capacity, ...rest } = capacityByLockHash
  return {
    blockNumber,
    capacity,
    cellsCount,
    ...rest,
  }
}
var toBlockEconomicState = blockEconomicState => {
  if (!blockEconomicState) {
    return blockEconomicState
  }
  const { finalized_at: finalizedAt, miner_reward: minerReward, txs_fee: txsFee, ...rest } = blockEconomicState
  return {
    finalizedAt,
    minerReward,
    txsFee,
    ...rest,
  }
}
var toSyncState = state => {
  if (!state) {
    return state
  }
  return {
    bestKnownBlockNumber: state.best_known_block_number,
    bestKnownBlockTimestamp: state.best_known_block_timestamp,
    fastTime: state.fast_time,
    ibd: state.ibd,
    inflightBlocksCount: state.inflight_blocks_count,
    lowTime: state.low_time,
    normalTime: state.normal_time,
    orphanBlocksCount: state.orphan_blocks_count,
  }
}
var toTransactionProof = proof => {
  if (!proof) {
    return proof
  }
  const { block_hash: blockHash, witnesses_root: witnessesRoot, ...rest } = proof
  return {
    blockHash,
    witnessesRoot,
    ...rest,
  }
}
var toConsensus = consensus => {
  if (!consensus) return consensus
  return {
    blockVersion: consensus.block_version,
    cellbaseMaturity: consensus.cellbase_maturity,
    daoTypeHash: consensus.dao_type_hash,
    epochDurationTarget: consensus.epoch_duration_target,
    genesisHash: consensus.genesis_hash,
    id: consensus.id,
    initialPrimaryEpochReward: consensus.initial_primary_epoch_reward,
    maxBlockBytes: consensus.max_block_bytes,
    maxBlockCycles: consensus.max_block_cycles,
    maxBlockProposalsLimit: consensus.max_block_proposals_limit,
    maxUnclesNum: consensus.max_uncles_num,
    medianTimeBlockCount: consensus.median_time_block_count,
    orphanRateTarget: consensus.orphan_rate_target,
    permanentDifficultyInDummy: consensus.permanent_difficulty_in_dummy,
    primaryEpochRewardHalvingInterval: consensus.primary_epoch_reward_halving_interval,
    proposerRewardRatio: consensus.proposer_reward_ratio,
    secondaryEpochReward: consensus.secondary_epoch_reward,
    secp256k1Blake160MultisigAllTypeHash: consensus.secp256k1_blake160_multisig_all_type_hash,
    secp256k1Blake160SighashAllTypeHash: consensus.secp256k1_blake160_sighash_all_type_hash,
    txProposalWindow: consensus.tx_proposal_window,
    txVersion: consensus.tx_version,
    typeIdCodeHash: consensus.type_id_code_hash,
    hardforkFeatures: _nullishCoalesce(
      _optionalChain([
        consensus,
        'access',
        _4 => _4.hardfork_features,
        'optionalAccess',
        _5 => _5.map,
        'call',
        _6 => _6(({ epoch_number: epochNumber, ...rest }) => ({ epochNumber, ...rest })),
      ]),
      () => consensus.hardfork_features,
    ),
  }
}
var toRawTxPool = rawTxPool => {
  if (!rawTxPool) return rawTxPool
  if (isTxPoolIds(rawTxPool)) {
    return rawTxPool
  }
  const toTxVerbosity = ({
    ancestors_count: ancestorsCount,
    ancestors_cycles: ancestorsCycles,
    ancestors_size: ancestorsSize,
    ...rest
  }) => ({
    ancestorsCount,
    ancestorsCycles,
    ancestorsSize,
    ...rest,
  })
  const proposed = {}
  const pending = {}
  Object.keys(rawTxPool.proposed).forEach(hash => {
    proposed[hash] = toTxVerbosity(rawTxPool.proposed[hash])
  })
  Object.keys(rawTxPool.pending).forEach(hash => {
    pending[hash] = toTxVerbosity(rawTxPool.pending[hash])
  })
  return { proposed, pending }
}

// src/rpc/base/chain.ts
var chain_default = {
  getTipBlockNumber: {
    method: 'get_tip_block_number',
    paramsFormatters: [],
    resultFormatters: toNumber,
  },
  getTipHeader: {
    method: 'get_tip_header',
    paramsFormatters: [],
    resultFormatters: toHeader,
  },
  getCurrentEpoch: {
    method: 'get_current_epoch',
    paramsFormatters: [],
    resultFormatters: toEpoch,
  },
  getEpochByNumber: {
    method: 'get_epoch_by_number',
    paramsFormatters: [paramsFormatter_default.toNumber],
    resultFormatters: toEpoch,
  },
  getBlockHash: {
    method: 'get_block_hash',
    paramsFormatters: [paramsFormatter_default.toNumber],
  },
  getBlock: {
    method: 'get_block',
    paramsFormatters: [paramsFormatter_default.toHash],
    resultFormatters: toBlock,
  },
  getBlockByNumber: {
    method: 'get_block_by_number',
    paramsFormatters: [paramsFormatter_default.toNumber],
    resultFormatters: toBlock,
  },
  getHeader: {
    method: 'get_header',
    paramsFormatters: [paramsFormatter_default.toHash],
    resultFormatters: toHeader,
  },
  getHeaderByNumber: {
    method: 'get_header_by_number',
    paramsFormatters: [paramsFormatter_default.toNumber],
    resultFormatters: toHeader,
  },
  getLiveCell: {
    method: 'get_live_cell',
    paramsFormatters: [paramsFormatter_default.toOutPoint],
    resultFormatters: toLiveCellWithStatus,
  },
  getTransaction: {
    method: 'get_transaction',
    paramsFormatters: [paramsFormatter_default.toHash],
    resultFormatters: toTransactionWithStatus,
  },
  getCellbaseOutputCapacityDetails: {
    method: 'get_cellbase_output_capacity_details',
    paramsFormatters: [paramsFormatter_default.toHash],
    resultFormatters: toCellbaseOutputCapacityDetails,
  },
  getBlockEconomicState: {
    method: 'get_block_economic_state',
    paramsFormatters: [paramsFormatter_default.toHash],
    resultFormatters: toBlockEconomicState,
  },
  getTransactionProof: {
    method: 'get_transaction_proof',
    paramsFormatters: [
      paramsFormatter_default.toArray(paramsFormatter_default.toHash),
      paramsFormatter_default.toOptional(paramsFormatter_default.toHash),
    ],
    resultFormatters: toTransactionProof,
  },
  verifyTransactionProof: {
    method: 'verify_transaction_proof',
    paramsFormatters: [paramsFormatter_default.toTransactionProof],
  },
  getConsensus: {
    method: 'get_consensus',
    paramsFormatters: [],
    resultFormatters: toConsensus,
  },
}

// src/rpc/base/experimental.ts
var experimental_default = {
  dryRunTransaction: {
    method: 'dry_run_transaction',
    paramsFormatters: [paramsFormatter_default.toRawTransaction],
  },
  // skip _compute_transaction_hash
  calculateDaoMaximumWithdraw: {
    method: 'calculate_dao_maximum_withdraw',
    paramsFormatters: [paramsFormatter_default.toOutPoint, paramsFormatter_default.toHash],
  },
  // skip estimate_fee_rate
  // skip _compute_script_hash
}

// src/rpc/base/net.ts
var net_default = {
  localNodeInfo: {
    method: 'local_node_info',
    paramsFormatters: [],
    resultFormatters: toLocalNodeInfo,
  },
  getPeers: {
    method: 'get_peers',
    paramsFormatters: [],
    resultFormatters: toPeers,
  },
  getBannedAddresses: {
    method: 'get_banned_addresses',
    paramsFormatters: [],
    resultFormatters: toBannedAddresses,
  },
  clearBannedAddresses: {
    method: 'clear_banned_addresses',
    paramsFormatters: [],
  },
  setBan: {
    method: 'set_ban',
    paramsFormatters: [],
  },
  syncState: {
    method: 'sync_state',
    paramsFormatters: [],
    resultFormatters: toSyncState,
  },
  setNetworkActive: {
    method: 'set_network_active',
    paramsFormatters: [paramsFormatter_default.toBoolean],
  },
  addNode: {
    method: 'add_node',
    paramsFormatters: [],
  },
  removeNode: {
    method: 'remove_node',
    paramsFormatters: [],
  },
  pingPeers: {
    method: 'ping_peers',
    paramsFormatters: [],
  },
}

// src/rpc/base/pool.ts
var pool_default = {
  sendTransaction: {
    method: 'send_transaction',
    paramsFormatters: [paramsFormatter_default.toRawTransaction, paramsFormatter_default.toOutputsValidator],
    resultFormatters: toHash,
  },
  txPoolInfo: {
    method: 'tx_pool_info',
    paramsFormatters: [],
    resultFormatters: toTxPoolInfo,
  },
  clearTxPool: {
    method: 'clear_tx_pool',
    paramsFormatters: [],
  },
  getRawTxPool: {
    method: 'get_raw_tx_pool',
    paramsFormatters: [],
    resultFormatters: toRawTxPool,
  },
}

// src/rpc/base/stats.ts
var stats_default = {
  getBlockchainInfo: {
    method: 'get_blockchain_info',
    paramsFormatters: [],
    resultFormatters: toBlockchainInfo,
  },
  getFeeRateStats: {
    method: 'get_fee_rate_statistics',
    paramsFormatters: [],
  },
}

// src/rpc/base/index.ts
var rpcProperties = {
  ...chain_default,
  ...experimental_default,
  // skip minerRpc
  ...net_default,
  ...pool_default,
  ...stats_default,
  // skip subscription
}
var _rpcProperties
var Base = class {
  constructor() {
    __privateAdd(this, _rpcProperties, rpcProperties)
  }
  get rpcProperties() {
    return __privateGet(this, _rpcProperties)
  }
}
_rpcProperties = new WeakMap()
var base_default = Base

// src/rpc/method.ts

var _name, _options, _node
var Method = class {
  constructor(node, options) {
    __privateAdd(this, _name)
    __privateAdd(this, _options, {
      name: '',
      method: '',
      paramsFormatters: [],
      resultFormatters: void 0,
    })
    __privateAdd(this, _node)
    this.call = (...params) => {
      const payload = this.getPayload(...params)
      return _axios2.default
        .call(void 0, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          data: payload,
          url: __privateGet(this, _node).url,
          httpAgent: __privateGet(this, _node).httpAgent,
          httpsAgent: __privateGet(this, _node).httpsAgent,
        })
        .then(res => {
          if (res.data.id !== payload.id) {
            throw new IdNotMatchException(payload.id, res.data.id)
          }
          if (res.data.error) {
            throw new ResponseException(JSON.stringify(res.data.error))
          }
          return _nullishCoalesce(
            _optionalChain([
              __privateGet,
              'call',
              _7 => _7(this, _options),
              'access',
              _8 => _8.resultFormatters,
              'optionalCall',
              _9 => _9(res.data.result),
            ]),
            () => res.data.result,
          )
        })
    }
    this.getPayload = (...params) => {
      const data = params.map(
        (p, i) =>
          (__privateGet(this, _options).paramsFormatters[i] && __privateGet(this, _options).paramsFormatters[i](p)) ||
          p,
      )
      const id = Math.round(Math.random() * 1e4)
      const payload = {
        id,
        method: __privateGet(this, _options).method,
        params: data,
        jsonrpc: '2.0',
      }
      return payload
    }
    __privateSet(this, _node, node)
    __privateSet(this, _options, options)
    __privateSet(this, _name, options.name)
    Object.defineProperty(this.call, 'name', { value: options.name, configurable: false, writable: false })
  }
  get name() {
    return __privateGet(this, _name)
  }
}
_name = new WeakMap()
_options = new WeakMap()
_node = new WeakMap()

// src/rpc/index.ts
var _node2, _paramsFormatter, _resultFormatter
var BranchRPC = class extends base_default {
  constructor(url) {
    super()
    __privateAdd(this, _node2, {
      url: '',
    })
    __privateAdd(this, _paramsFormatter, paramsFormatter_default)
    __privateAdd(this, _resultFormatter, resultFormatter_exports)
    this.addMethod = options => {
      const method = new Method(this.node, options)
      Object.defineProperty(this, options.name, {
        value: method.call,
        enumerable: true,
      })
    }
    /* eslint-disable prettier/prettier */
    this.createBatchRequest = (params = []) => {
      const ctx = this
      const proxied = new Proxy([], {
        set(...p) {
          const methods = Object.keys(ctx)
          if (p[1] !== 'length') {
            const name = _optionalChain([p, 'optionalAccess', _10 => _10[2], 'optionalAccess', _11 => _11[0]])
            if (methods.indexOf(name) === -1) {
              throw new MethodInBatchNotFoundException(name)
            }
          }
          return Reflect.set(...p)
        },
      })
      Object.defineProperties(proxied, {
        add: {
          value(...args) {
            this.push(args)
            return this
          },
        },
        remove: {
          value(i) {
            this.splice(i, 1)
            return this
          },
        },
        exec: {
          async value() {
            const payload = proxied.map(([f, ...p], i) => {
              try {
                const method = new Method(ctx.node, { ...ctx.rpcProperties[f], name: f })
                return method.getPayload(...p)
              } catch (err) {
                throw new PayloadInBatchException(i, err.message)
              }
            })
            if (!payload.length) {
              return []
            }
            const batchRes = await _axios2.default.call(void 0, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              data: payload,
              url: __privateGet(ctx, _node2).url,
              httpAgent: __privateGet(ctx, _node2).httpAgent,
              httpsAgent: __privateGet(ctx, _node2).httpsAgent,
            })
            return batchRes.data.map((res, i) => {
              if (res.id !== payload[i].id) {
                return new IdNotMatchedInBatchException(i, payload[i].id, res.id)
              }
              return _nullishCoalesce(
                _optionalChain([
                  ctx,
                  'access',
                  _12 => _12.rpcProperties,
                  'access',
                  _13 => _13[proxied[i][0]],
                  'access',
                  _14 => _14.resultFormatters,
                  'optionalCall',
                  _15 => _15(res.result),
                ]),
                () => res.result,
              )
            })
          },
        },
      })
      params.forEach(p => proxied.push(p))
      return proxied
    }
    this.setNode({ url })
    Object.defineProperties(this, {
      addMethod: { value: this.addMethod, enumerable: false, writable: false, configurable: false },
      setNode: { value: this.setNode, enumerable: false, writable: false, configurable: false },
      createBatchRequest: { value: this.createBatchRequest, enumerable: false, writable: false, configurable: false },
    })
    Object.keys(this.rpcProperties).forEach(name => {
      this.addMethod({ name, ...this.rpcProperties[name] })
    })
  }
  get node() {
    return __privateGet(this, _node2)
  }
  get paramsFormatter() {
    return __privateGet(this, _paramsFormatter)
  }
  get resultFormatter() {
    return __privateGet(this, _resultFormatter)
  }
  setNode(node) {
    Object.assign(this.node, node)
    return this.node
  }
}
_node2 = new WeakMap()
_paramsFormatter = new WeakMap()
_resultFormatter = new WeakMap()

// src/core/generateRawTransaction.ts
var EMPTY_DATA = '0x'
var MIN_CELL_CAPACITY = `0x${(61e8).toString(16)}`
var getBigInts = ({ fee, capacityThreshold, changeThreshold }) => {
  assertToBeHexStringOrBigint(fee)
  assertToBeHexStringOrBigint(capacityThreshold)
  assertToBeHexStringOrBigint(changeThreshold)
  return {
    targetFee: _jsbi2.default.BigInt(`${fee}`),
    minCapacity: _jsbi2.default.BigInt(`${capacityThreshold}`),
    minChange: _jsbi2.default.BigInt(`${changeThreshold}`),
    zeroBigInt: _jsbi2.default.BigInt(0),
  }
}
var getKeyAndCellsPairs = params => {
  const inputScripts = 'inputScript' in params ? [params.inputScript] : params.inputScripts
  const outputs = 'outputScript' in params ? [{ lock: params.outputScript, capacity: params.capacity }] : params.outputs
  let unspentCellsMap = /* @__PURE__ */ new Map()
  if ('inputScript' in params) {
    const lockHash = scriptToHash(params.inputScript)
    unspentCellsMap.set(lockHash, params.cells || [])
  } else {
    unspentCellsMap = params.cells || /* @__PURE__ */ new Map()
  }
  return { inputScripts, outputs, unspentCellsMap }
}
var getTargetOutputs = ({ outputs, minCapacity }) => {
  return outputs.map(output => {
    const capacity = _jsbi2.default.BigInt(`${output.capacity}`)
    if (_jsbi2.default.lessThan(capacity, minCapacity)) {
      throw new Error(`Capacity should be at least ${minCapacity} shannon`)
    }
    return { ...output, capacity }
  })
}
var getInputs = ({ inputScripts, safeMode, costCapacity, unspentCellsMap }) => {
  const inputs = []
  let sum = _jsbi2.default.BigInt(0)
  for (let i = 0; i < inputScripts.length; i++) {
    const lockHash = scriptToHash(inputScripts[i])
    const unspentCells = unspentCellsMap.get(lockHash) || []
    for (let j = 0; j < unspentCells.length; j++) {
      const c = unspentCells[j]
      if (!safeMode || (c.data === EMPTY_DATA && !c.type)) {
        inputs.push({ previousOutput: c.outPoint, since: '0x0', lockHash })
        sum = _jsbi2.default.add(sum, _jsbi2.default.BigInt(c.capacity))
        if (_jsbi2.default.greaterThanOrEqual(sum, costCapacity)) {
          break
        }
      }
    }
    if (_jsbi2.default.greaterThan(sum, costCapacity)) {
      break
    }
  }
  if (_jsbi2.default.lessThan(sum, costCapacity)) {
    throw new Error('Input capacity is not enough')
  }
  return { inputs, sum }
}
var getLeftCells = ({ usedCells, inputScripts, unspentCellsMap }) => {
  const leftCells = []
  const isCellUsed = cell =>
    usedCells.some(
      used =>
        _optionalChain([used, 'access', _16 => _16.previousOutput, 'optionalAccess', _17 => _17.txHash]) ===
          _optionalChain([cell, 'access', _18 => _18.outPoint, 'optionalAccess', _19 => _19.txHash]) &&
        _optionalChain([used, 'access', _20 => _20.previousOutput, 'optionalAccess', _21 => _21.index]) ===
          _optionalChain([cell, 'access', _22 => _22.outPoint, 'optionalAccess', _23 => _23.index]),
    )
  inputScripts.forEach(script => {
    const lockhash = scriptToHash(script)
    const cells = unspentCellsMap.get(lockhash)
    if (_optionalChain([cells, 'optionalAccess', _24 => _24.length])) {
      cells.forEach(cell => {
        if (cell.data === EMPTY_DATA && !cell.type && !isCellUsed(cell)) {
          leftCells.push({
            outPoint: cell.outPoint,
            capacity: cell.capacity,
          })
        }
      })
    }
  })
  return leftCells
}
var isFee = fee => typeof fee !== 'object'
var generateRawTransaction = ({
  fee = '0x0',
  changeLockScript,
  safeMode = true,
  deps,
  capacityThreshold = MIN_CELL_CAPACITY,
  changeThreshold = MIN_CELL_CAPACITY,
  ...params
}) => {
  if (!deps) {
    throw new Error('The dep is not loaded')
  }
  const { targetFee, minCapacity, minChange, zeroBigInt } = getBigInts({
    fee: isFee(fee) ? fee : '0x0',
    capacityThreshold,
    changeThreshold,
  })
  const { inputScripts, outputs: toOutputs, unspentCellsMap } = getKeyAndCellsPairs(params)
  const targetOutputs = getTargetOutputs({ outputs: toOutputs, minCapacity })
  const targetCapacity = targetOutputs.reduce((acc, o) => _jsbi2.default.add(acc, o.capacity), zeroBigInt)
  const costCapacity = _jsbi2.default.add(_jsbi2.default.add(targetCapacity, targetFee), minChange)
  const changeOutput = {
    capacity: zeroBigInt,
    lock: changeLockScript || inputScripts[0],
  }
  const { inputs, sum: inputSum } = getInputs({ inputScripts, safeMode, costCapacity, unspentCellsMap })
  if (_jsbi2.default.greaterThan(inputSum, _jsbi2.default.add(targetCapacity, targetFee))) {
    changeOutput.capacity = _jsbi2.default.subtract(_jsbi2.default.subtract(inputSum, targetCapacity), targetFee)
  }
  const outputs = targetOutputs.map(o => ({ ...o, capacity: `0x${o.capacity.toString(16)}` }))
  if (_jsbi2.default.greaterThan(changeOutput.capacity, zeroBigInt)) {
    outputs.push({ ...changeOutput, capacity: `0x${changeOutput.capacity.toString(16)}` })
  }
  const cellDeps = Array.isArray(deps) ? deps : [deps]
  const witnesses = _nullishCoalesce(params.witnesses, () => [])
  inputs.forEach((input, idx) => {
    if (!witnesses[idx]) {
      witnesses[idx] =
        input.lockHash !==
        _optionalChain([inputs, 'access', _25 => _25[idx - 1], 'optionalAccess', _26 => _26.lockHash])
          ? EMPTY_WITNESS_ARGS
          : '0x'
    }
  })
  const outputsData = _nullishCoalesce(params.outputsData, () => [])
  outputs.forEach((_, idx) => {
    if (!outputsData[idx]) {
      outputsData[idx] = '0x'
    }
  })
  const tx = {
    version: '0x0',
    cellDeps: cellDeps.map(dep => ({ outPoint: dep.outPoint, depType: dep.depType })),
    headerDeps: [],
    inputs: inputs.map(({ previousOutput, since }) => ({ previousOutput, since })),
    outputs,
    witnesses,
    outputsData,
  }
  if (!isFee(fee)) {
    const leftCells = getLeftCells({ inputScripts, usedCells: tx.inputs, unspentCellsMap })
    return fee.reconciler({ tx, feeRate: fee.feeRate, changeThreshold, cells: leftCells, extraCount: 10 })
  }
  return tx
}

// src/core/loadCellsFromIndexer.ts
var loadCellsFromIndexer = async ({ CellCollector, indexer, lock, start, end }) => {
  const collector = new CellCollector(indexer, {
    lock: {
      code_hash: lock.codeHash,
      hash_type: lock.hashType,
      args: lock.args,
    },
    fromBlock: start,
    toBlock: end,
  })
  const cells = []
  for await (const {
    data,
    cell_output: { capacity, type },
    out_point,
  } of collector.collect()) {
    cells.push({
      data,
      lock,
      type: type && { codeHash: type.code_hash, hashType: type.hash_type, args: type.args },
      capacity,
      outPoint: { txHash: out_point.tx_hash, index: out_point.index },
    })
  }
  return cells
}

// src/core/multisig.ts
function isMultisigConfig(config) {
  return (
    config &&
    !Number.isNaN(+config.r) &&
    !Number.isNaN(+config.m) &&
    !Number.isNaN(+config.n) &&
    Array.isArray(config.blake160s)
  )
}
var SignStatus = /* @__PURE__ */ (SignStatus2 => {
  SignStatus2['Signed'] = 'Signed'
  SignStatus2['Unsigned'] = 'Unsigned'
  SignStatus2['PartiallySigned'] = 'PartiallySigned'
  return SignStatus2
})(SignStatus || {})
var validateMultisigCount = v2 => {
  if (v2 < 0 || v2 > 255) {
    throw new Error('For multisig sign, signer should between 0 and 255')
  }
}
var toHex2 = v2 => {
  return v2.toString(16).padStart(2, '0')
}
var validateMultisigConfig = config => {
  validateMultisigCount(config.r)
  validateMultisigCount(config.m)
  validateMultisigCount(config.n)
  if (config.m > config.n) throw new Error(`For m of n multisig sign, m shouldn't be greater than n`)
  if (config.r > config.m) throw new Error(`For m of n multisig sign, r shouldn't be greater than m`)
  if (config.n !== config.blake160s.length)
    throw new Error(`For m of n multisig sign, signer's length should equal with n`)
}
var serializeMultisigConfig = config => {
  validateMultisigConfig(config)
  return `0x00${toHex2(config.r)}${toHex2(config.m)}${toHex2(config.n)}${config.blake160s.reduce((pre, cur) => pre + cur.slice(2), '')}`
}
var hashMultisig = config => {
  const blake2bHash = blake2b(32, null, null, PERSONAL)
  blake2bHash.update(hexToBytes(serializeMultisigConfig(config)))
  return `0x${blake2bHash.digest('hex')}`.slice(0, 42)
}
var getMultisigStatus = (config, signatures = []) => {
  let signedForM = 0
  let signedForR = 0
  for (let i = 0; i < config.n; i++) {
    if (signatures.includes(config.blake160s[i])) {
      if (i < config.r) {
        signedForR += 1
      } else {
        signedForM += 1
      }
    }
  }
  if (signedForM + signedForR === 0) {
    return 'Unsigned' /* Unsigned */
  }
  if (signedForM > config.m - config.r) {
    throw new Error('More signature for multisig')
  }
  if (signedForM + signedForR < config.m) {
    return 'PartiallySigned' /* PartiallySigned */
  }
  return 'Signed' /* Signed */
}

// src/core/signWitnessGroup.ts
function signWitnessGroup(sk, transactionHash, witnessGroup, multisigConfig) {
  if (!witnessGroup.length) {
    throw new Error('WitnessGroup cannot be empty')
  }
  if (typeof witnessGroup[0] !== 'object') {
    throw new Error('The first witness in the group should be type of WitnessArgs')
  }
  const emptyWitness = {
    ...witnessGroup[0],
    lock: `0x${'0'.repeat(130)}`,
  }
  if (multisigConfig) {
    emptyWitness.lock = `${serializeMultisigConfig(multisigConfig)}${'0'.repeat(130 * multisigConfig.m)}`
  }
  const serializedEmptyWitnessBytes = hexToBytes(serializeWitnessArgs(emptyWitness))
  const serializedEmptyWitnessSize = serializedEmptyWitnessBytes.length
  const s = blake2b(32, null, null, PERSONAL)
  s.update(hexToBytes(transactionHash))
  s.update(hexToBytes(toUint64Le(`0x${serializedEmptyWitnessSize.toString(16)}`)))
  s.update(serializedEmptyWitnessBytes)
  witnessGroup.slice(1).forEach(w => {
    const bytes = hexToBytes(typeof w === 'string' ? w : serializeWitnessArgs(w))
    s.update(hexToBytes(toUint64Le(`0x${bytes.length.toString(16)}`)))
    s.update(bytes)
  })
  const message = `0x${s.digest('hex')}`
  if (typeof sk === 'string') {
    const keyPair = new ECPair(sk)
    emptyWitness.lock = keyPair.signRecoverable(message)
    return [multisigConfig ? emptyWitness : serializeWitnessArgs(emptyWitness), ...witnessGroup.slice(1)]
  } else {
    const skResult = sk(message, [emptyWitness, ...witnessGroup.slice(1)])
    if (typeof skResult === 'string') {
      emptyWitness.lock = skResult
      return [multisigConfig ? emptyWitness : serializeWitnessArgs(emptyWitness), ...witnessGroup.slice(1)]
    }
    return skResult.then(res => {
      emptyWitness.lock = res
      return [multisigConfig ? emptyWitness : serializeWitnessArgs(emptyWitness), ...witnessGroup.slice(1)]
    })
  }
}

// src/core/groupScripts.ts
var groupScripts = inputCells => {
  const groups = /* @__PURE__ */ new Map()
  inputCells.forEach((cell, i) => {
    const lockHash = scriptToHash(cell.lock)
    const group = groups.get(lockHash) || []
    groups.set(lockHash, [...group, i])
  })
  return groups
}

// src/core/signWitnesses.ts
var isMap = val => {
  return val.size !== void 0
}
function isMultisigOption(params) {
  if (params.sk && params.blake160 && params.config && params.signatures) {
    if (
      (typeof params.sk === 'string' || typeof params.sk === 'function') &&
      typeof params.blake160 === 'string' &&
      Array.isArray(params.signatures) &&
      isMultisigConfig(params.config)
    ) {
      return true
    }
    throw new Error('Multisig options is incorrect')
  }
  throw new Error('Multisig options miss some property')
}
var signWitnesses =
  key =>
  ({ transactionHash, witnesses = [], inputCells = [], skipMissingKeys = false }) => {
    if (!key) throw new ParameterRequiredException('Signature provider')
    if (!transactionHash) throw new ParameterRequiredException('Transaction hash')
    if (!witnesses.length) throw new Error('Witnesses is empty')
    if (isMap(key)) {
      if (!inputCells.length) {
        throw new Error(`Cell shouldn't be empty when key is Map`)
      }
      const rawWitnesses = witnesses
      const restWitnesses = witnesses.slice(inputCells.length)
      const groupedScripts = groupScripts(inputCells)
      groupedScripts.forEach((indices, lockHash) => {
        const sk = key.get(lockHash)
        if (!sk) {
          if (!skipMissingKeys) {
            throw new Error(`The signature provider to sign lock hash ${lockHash} is not found`)
          } else {
            return
          }
        }
        const ws = [...indices.map(idx => witnesses[idx]), ...restWitnesses]
        if (typeof sk === 'object' && isMultisigOption(sk)) {
          const witnessIncludeSignature = signWitnessGroup(sk.sk, transactionHash, ws, sk.config)[0]
          const firstWitness = rawWitnesses[indices[0]]
          if (typeof firstWitness !== 'object') {
            throw new Error('The first witness in the group should be type of WitnessArgs')
          }
          let lockAfterSign = witnessIncludeSignature.lock
          if (firstWitness.lock) {
            lockAfterSign =
              firstWitness.lock +
              _optionalChain([lockAfterSign, 'optionalAccess', _27 => _27.slice, 'call', _28 => _28(2)])
          } else {
            lockAfterSign =
              serializeMultisigConfig(sk.config) +
              _optionalChain([lockAfterSign, 'optionalAccess', _29 => _29.slice, 'call', _30 => _30(2)])
          }
          const firstWitSigned = { ...firstWitness, lock: lockAfterSign }
          rawWitnesses[indices[0]] = firstWitSigned
          if (getMultisigStatus(sk.config, [...sk.signatures, sk.blake160]) === 'Signed' /* Signed */) {
            indices.forEach(idx => {
              const wit = rawWitnesses[idx]
              rawWitnesses[idx] = typeof wit === 'string' ? wit : serializeWitnessArgs(wit)
            })
          }
        } else {
          const witnessIncludeSignature = signWitnessGroup(sk, transactionHash, ws)[0]
          rawWitnesses[indices[0]] = witnessIncludeSignature
        }
      })
      return rawWitnesses
    }
    return signWitnessGroup(key, transactionHash, witnesses)
  }

// src/core/branch.ts
var filterCellsByInputs = (cells, inputs) => {
  return inputs.map(input => {
    const outPoint = input.previousOutput
    const cell = cells.find(
      c =>
        _optionalChain([c, 'access', _31 => _31.outPoint, 'optionalAccess', _32 => _32.txHash]) ===
          _optionalChain([outPoint, 'optionalAccess', _33 => _33.txHash]) &&
        _optionalChain([c, 'access', _34 => _34.outPoint, 'optionalAccess', _35 => _35.index]) ===
          _optionalChain([outPoint, 'optionalAccess', _36 => _36.index]),
    )
    if (!cell) {
      throw new Error(`Cell of ${JSON.stringify(outPoint)} is not found`)
    }
    return cell
  })
}
var _secp256k1DepsShouldBeReady,
  _DAODepsShouldBeReady,
  _validateTransactionToSign,
  _isSimpleTransaction,
  _isComplexTransaction,
  _setSecp256k1Dep,
  _setDaoDep
var Branch = class {
  constructor(nodeUrl = 'http://localhost:8114') {
    this.cells = /* @__PURE__ */ new Map()
    this.utils = utils_exports
    this.config = {}
    this.generateLockHash = (args, dep = this.config.secp256k1Dep) => {
      if (!dep) {
        throw new ParameterRequiredException('deps')
      }
      return this.utils.scriptToHash({ ...dep, args })
    }
    this.loadDeps = async () => {
      const genesisBlock = await this.rpc.getBlockByNumber('0x0')
      if (!genesisBlock) {
        throw new Error('Fail to load the genesis block')
      }
      __privateGet(this, _setDaoDep).call(this, genesisBlock)
      __privateGet(this, _setSecp256k1Dep).call(this, genesisBlock)
      return this.config
    }
    /**
     * @memberof Core
     * @description The method used to load cells from lumos indexer as shown in the tutorial
     * @tutorial https://github.com/ckb-js/ckb-sdk-js/blob/develop/packages/ckb-sdk-core/examples/sendTransactionWithLumosCollector.js
     */
    this.loadCells = async params => {
      const lockHash = this.utils.scriptToHash(params.lock)
      const cells = await loadCellsFromIndexer(params)
      if (params.save) {
        this.cells.set(lockHash, cells)
      }
      return cells
    }
    this.signWitnesses = signWitnesses
    this.signTransaction =
      key =>
      (transaction, cells = []) => {
        if (!key) throw new ParameterRequiredException('Private key or address object')
        __privateGet(this, _validateTransactionToSign).call(this, transaction)
        const transactionHash = this.utils.rawTransactionToHash(transaction)
        const inputCells = isMap(key) ? filterCellsByInputs(cells, transaction.inputs) : void 0
        const signedWitnesses = this.signWitnesses(key)({
          transactionHash,
          witnesses: transaction.witnesses,
          inputCells,
        })
        return {
          ...transaction,
          witnesses: signedWitnesses.map(witness =>
            typeof witness === 'string' ? witness : this.utils.serializeWitnessArgs(witness),
          ),
        }
      }
    /**
     * @description Generate a raw transaction object to sign
     * @param {object} txObject, 1-1 tx or m-n tx
     * @returns rawTxToSign
     * @example 1-1 tx
     *```
     *          {
     *            fromAddress:          Address, specify the address of inputs
     *            toAddress:            Address, specify the address included in outputs
     *            capacity:             Capacity, specify the value to transfer in this tx
     *
     *            cells?:               Array<RawTransactionParams.Cell>, provide
     *                                  live cells to generate input cells in this tx
     *
     *            fee?:                 Fee, specify the fee or fee reconciler
     *                                  along with this tx, fee reconciler allows
     *                                  fee calculation on the fly
     *
     *            safeMode:             boolean, specify whether to skip cell
     *                                  containing data or type script or not,
     *                                  default to be true
     *
     *            deps:                 DepCellInfo | Array<DepCellInfo>
     *                                  specify deps included in this tx, filling
     *                                  in the `cellDeps` field of a raw tx
     *
     *            capacityThreshold?:   Capacity, specify the minimal capacity of
     *                                  each outputs, default to be 6_100_000_000
     *                                  shannon(61 CKB) for a bare cell
     *
     *            changeThreshold?:     Capacity, specify the minimal capacity of
     *                                  the change cell, default to be 6_100_000_000
     *                                  shannon(61 CKB) for a bare cell, useful on
     *                                  sending a tx without change by setting it 0
     *
     *            changeLockScript?:    CKBComponents.Script, specify the change
     *                                  receiver of this tx, default to be the owner
     *                                  of the first input
     *
     *            witnesses?:           Array<CKBComponents.WitnessArgs | CKBComponents.Witness>
     *                                  specify the witness list of this tx
     *
     *            outputsData?:         Array<string>, specify the output data list
     *                                  of this tx
     *          }
     * ```
     * @example m-n tx
     * ```
     *          {
     *            fromAddresses:        Address[], specify the address of inputs
     *
     *            receivePairs:         Array<{
     *                                    address: Address;
     *                                    capacity: Capacity;
     *                                    type?: CKBComponents.Script | null
     *                                  }>
     *                                  specify address, capacity and type lock
     *                                  of outputs
     *
     *            cells:                Map<LockHash, RawTransactionParams.Cell[]>
     *                                  provide live cells to generate input cells
     *                                  in this tx
     *
     *            fee?:                 same as that in 1-1 tx
     *            safeMode:             same as that in 1-1 tx
     *            deps:                 same as that in 1-1 tx
     *            capacityThreshold?:   same as that in 1-1 tx
     *            changeThreshold?:     same as that in 1-1 tx
     *            changeLockScript?:    same as that in 1-1 tx
     *            witnesses?:           same as that in 1-1 tx
     *            outputsData?:         same as that in 1-1 tx
     *          }
     * ```
     */
    this.generateRawTransaction = ({
      fee,
      safeMode = true,
      deps,
      capacityThreshold,
      changeThreshold,
      witnesses,
      outputsData,
      ...params
    }) => {
      if (__privateGet(this, _isSimpleTransaction).call(this, params)) {
        const inputScript = this.utils.addressToScript(params.fromAddress)
        const outputScript = this.utils.addressToScript(params.toAddress)
        let availableCells = params.cells || []
        if (!availableCells.length) {
          availableCells = _nullishCoalesce(this.cells.get(this.utils.scriptToHash(inputScript)), () => availableCells)
        }
        return generateRawTransaction({
          inputScript,
          outputScript,
          capacity: params.capacity,
          fee,
          safeMode,
          cells: availableCells,
          deps,
          capacityThreshold,
          changeThreshold,
          witnesses,
          outputsData,
        })
      }
      if (__privateGet(this, _isComplexTransaction).call(this, params)) {
        const inputScripts = params.fromAddresses.map(this.utils.addressToScript)
        const outputs = params.receivePairs.map(pair => ({
          lock: this.utils.addressToScript(pair.address),
          capacity: pair.capacity,
          type: pair.type,
        }))
        return generateRawTransaction({
          inputScripts,
          outputs,
          cells: params.cells || this.cells,
          fee,
          safeMode,
          deps,
          capacityThreshold,
          changeThreshold,
          witnesses,
          outputsData,
        })
      }
      throw new Error('Parameters of generateRawTransaction are invalid')
    }
    /**
     * @memberof Core
     * @description Generate a transaction to deposit capacity
     * @tutorial https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md#deposit
     */
    this.generateDaoDepositTransaction = ({ fromAddress, capacity, fee, cells = [] }) => {
      __privateGet(this, _secp256k1DepsShouldBeReady).call(this)
      __privateGet(this, _DAODepsShouldBeReady).call(this)
      const rawTx = this.generateRawTransaction({
        fromAddress,
        toAddress: fromAddress,
        capacity,
        fee,
        safeMode: true,
        cells,
        deps: [this.config.secp256k1Dep, this.config.daoDep],
      })
      rawTx.outputs[0].type = {
        codeHash: this.config.daoDep.typeHash,
        args: '0x',
        hashType: this.config.daoDep.hashType,
      }
      rawTx.outputsData[0] = '0x0000000000000000'
      return rawTx
    }
    /**
     * @memberof Core
     * @description Generate a transaction to start a withdraw
     * @tutorial https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md#withdraw-phase-1
     */
    this.generateDaoWithdrawStartTransaction = async ({ outPoint, fee, cells = [] }) => {
      __privateGet(this, _secp256k1DepsShouldBeReady).call(this)
      __privateGet(this, _DAODepsShouldBeReady).call(this)
      const cellStatus = await this.rpc.getLiveCell(outPoint, false)
      if (cellStatus.status !== 'live') throw new Error('Cell is not live yet.')
      const tx = await this.rpc.getTransaction(outPoint.txHash)
      if (tx.txStatus.status !== 'committed') throw new Error('Transaction is not committed yet')
      const depositBlockHeader = await this.rpc.getBlock(tx.txStatus.blockHash).then(b => b.header)
      const encodedBlockNumber = this.utils.toUint64Le(depositBlockHeader.number)
      const fromAddress = this.utils.bech32Address(cellStatus.cell.output.lock.args)
      const rawTx = this.generateRawTransaction({
        fromAddress,
        toAddress: fromAddress,
        capacity: '0x0',
        fee,
        safeMode: true,
        deps: [this.config.secp256k1Dep, this.config.daoDep],
        capacityThreshold: '0x0',
        cells,
      })
      rawTx.outputs[0] = tx.transaction.outputs[+outPoint.index]
      rawTx.outputsData[0] = encodedBlockNumber
      rawTx.inputs.unshift({ previousOutput: outPoint, since: '0x0' })
      rawTx.headerDeps.push(depositBlockHeader.hash)
      return rawTx
    }
    /**
     * @memberof Core
     * @description Generate a transaction to finish a withdraw
     * @tutorial https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md#withdraw-phase-2
     */
    this.generateDaoWithdrawTransaction = async ({ depositOutPoint, withdrawOutPoint, fee }) => {
      __privateGet(this, _secp256k1DepsShouldBeReady).call(this)
      __privateGet(this, _DAODepsShouldBeReady).call(this)
      const { JSBI: JSBI5 } = this.utils
      const cellStatus = await this.rpc.getLiveCell(withdrawOutPoint, true)
      if (cellStatus.status !== 'live') throw new Error('Cell is not live yet')
      const tx = await this.rpc.getTransaction(withdrawOutPoint.txHash)
      if (tx.txStatus.status !== 'committed') throw new Error('Transaction is not committed yet')
      const depositBlockNumber = this.utils.bytesToHex(
        this.utils
          .hexToBytes(
            _nullishCoalesce(
              _optionalChain([
                cellStatus,
                'access',
                _37 => _37.cell,
                'access',
                _38 => _38.data,
                'optionalAccess',
                _39 => _39.content,
              ]),
              () => '',
            ),
          )
          .reverse(),
      )
      const depositBlockHeader = await this.rpc.getBlockByNumber(BigInt(depositBlockNumber)).then(block => block.header)
      const withdrawStartBlockHeader = await this.rpc.getBlock(tx.txStatus.blockHash).then(block => block.header)
      const withdrawEndEpoch = this.utils.getWithdrawEpoch(depositBlockHeader.epoch, withdrawStartBlockHeader.epoch)
      const outputCapacity = await this.rpc.calculateDaoMaximumWithdraw(depositOutPoint, withdrawStartBlockHeader.hash)
      const targetCapacity = JSBI5.BigInt(outputCapacity)
      const targetFee = JSBI5.BigInt(`${fee}`)
      if (JSBI5.lessThan(targetCapacity, targetFee)) {
        throw new Error(`The fee(${targetFee}) is too big that withdraw(${targetCapacity}) is not enough`)
      }
      const outputs = [
        {
          capacity: `0x${JSBI5.subtract(targetCapacity, targetFee).toString(16)}`,
          lock: tx.transaction.outputs[+withdrawOutPoint.index].lock,
        },
      ]
      const outputsData = ['0x']
      return {
        version: '0x0',
        cellDeps: [
          { outPoint: this.config.secp256k1Dep.outPoint, depType: this.config.secp256k1Dep.depType },
          { outPoint: this.config.daoDep.outPoint, depType: this.config.daoDep.depType },
        ],
        headerDeps: [depositBlockHeader.hash, withdrawStartBlockHeader.hash],
        inputs: [
          {
            previousOutput: withdrawOutPoint,
            since: withdrawEndEpoch,
          },
        ],
        outputs,
        outputsData,
        witnesses: [
          {
            lock: '',
            inputType: '0x0000000000000000',
            outputType: '',
          },
        ],
      }
    }
    this.calculateDaoMaximumWithdraw = async (depositOutPoint, withdraw) => {
      let tx = await this.rpc.getTransaction(depositOutPoint.txHash)
      if (tx.txStatus.status !== 'committed') throw new Error('Transaction is not committed yet')
      const depositBlockHash = tx.txStatus.blockHash
      let cellOutput = tx.transaction.outputs[+depositOutPoint.index]
      let cellOutputData = tx.transaction.outputsData[+depositOutPoint.index]
      let withdrawBlockHash
      if (typeof withdraw === 'string') {
        withdrawBlockHash = withdraw
      } else {
        tx = await this.rpc.getTransaction(withdraw.txHash)
        if (tx.txStatus.status !== 'committed') throw new Error('Transaction is not committed yet')
        withdrawBlockHash = tx.txStatus.blockHash
        cellOutput = tx.transaction.outputs[+withdraw.index]
        cellOutputData = tx.transaction.outputsData[+withdraw.index]
      }
      const [depositHeader, withDrawHeader] = await Promise.all([
        this.rpc.getHeader(depositBlockHash),
        this.rpc.getHeader(withdrawBlockHash),
      ])
      return calculateMaximumWithdraw(cellOutput, cellOutputData, depositHeader.dao, withDrawHeader.dao)
    }
    __privateAdd(this, _secp256k1DepsShouldBeReady, () => {
      if (!this.config.secp256k1Dep) {
        throw new ParameterRequiredException('Secp256k1 dep')
      }
    })
    __privateAdd(this, _DAODepsShouldBeReady, () => {
      if (!this.config.daoDep) {
        throw new ParameterRequiredException('Dao dep')
      }
    })
    __privateAdd(this, _validateTransactionToSign, transaction => {
      if (!transaction) throw new ParameterRequiredException('Transaction')
      if (!transaction.witnesses) throw new ParameterRequiredException('Witnesses')
      if (!transaction.outputsData) throw new ParameterRequiredException('OutputsData')
      if (transaction.outputsData.length < transaction.outputs.length) throw new Error('Invalid count of outputsData')
    })
    __privateAdd(this, _isSimpleTransaction, params => {
      return 'fromAddress' in params && 'toAddress' in params
    })
    __privateAdd(this, _isComplexTransaction, params => {
      return 'fromAddresses' in params && 'receivePairs' in params
    })
    __privateAdd(this, _setSecp256k1Dep, async genesisBlock => {
      const secp256k1DepTxHash = _optionalChain([
        genesisBlock,
        'optionalAccess',
        _40 => _40.transactions,
        'access',
        _41 => _41[1],
        'access',
        _42 => _42.hash,
      ])
      const typeScript = _optionalChain([
        genesisBlock,
        'optionalAccess',
        _43 => _43.transactions,
        'access',
        _44 => _44[0],
        'optionalAccess',
        _45 => _45.outputs,
        'access',
        _46 => _46[1],
        'optionalAccess',
        _47 => _47.type,
      ])
      const secp256k1TypeHash = this.utils.scriptToHash(typeScript)
      this.config.secp256k1Dep = {
        hashType: 'type',
        codeHash: secp256k1TypeHash,
        outPoint: {
          txHash: secp256k1DepTxHash,
          index: '0x0',
        },
        depType: 'depGroup',
      }
    })
    __privateAdd(this, _setDaoDep, genesisBlock => {
      const daoDepTxHash = _optionalChain([
        genesisBlock,
        'optionalAccess',
        _48 => _48.transactions,
        'access',
        _49 => _49[0],
        'access',
        _50 => _50.hash,
      ])
      const typeScript = _optionalChain([
        genesisBlock,
        'optionalAccess',
        _51 => _51.transactions,
        'access',
        _52 => _52[0],
        'optionalAccess',
        _53 => _53.outputs,
        'access',
        _54 => _54[2],
        'optionalAccess',
        _55 => _55.type,
      ])
      const data = _optionalChain([
        genesisBlock,
        'optionalAccess',
        _56 => _56.transactions,
        'access',
        _57 => _57[0],
        'optionalAccess',
        _58 => _58.outputsData,
        'access',
        _59 => _59[2],
      ])
      const typeHash = this.utils.scriptToHash(typeScript)
      const s = blake2b(32, null, null, PERSONAL)
      s.update(hexToBytes(data))
      const codeHash = `0x${s.digest('hex')}`
      this.config.daoDep = {
        hashType: 'type',
        codeHash,
        typeHash,
        outPoint: {
          txHash: daoDepTxHash,
          index: '0x2',
        },
        depType: 'code',
      }
    })
    this._node = {
      url: nodeUrl,
    }
    this.rpc = new BranchRPC(nodeUrl)
  }
  setNode(node) {
    if (typeof node === 'string') {
      this._node.url = node
    } else {
      this._node = node
    }
    this.rpc.setNode(this._node)
    return this._node
  }
  get node() {
    return this._node
  }
}
_secp256k1DepsShouldBeReady = new WeakMap()
_DAODepsShouldBeReady = new WeakMap()
_validateTransactionToSign = new WeakMap()
_isSimpleTransaction = new WeakMap()
_isComplexTransaction = new WeakMap()
_setSecp256k1Dep = new WeakMap()
_setDaoDep = new WeakMap()

// src/types/blockchain.ts
var CKBComponents
;(CKBComponents2 => {
  let TransactionStatus
  ;(TransactionStatus2 => {
    TransactionStatus2['Pending'] = 'pending'
    TransactionStatus2['Proposed'] = 'proposed'
    TransactionStatus2['Committed'] = 'committed'
  })((TransactionStatus = CKBComponents2.TransactionStatus || (CKBComponents2.TransactionStatus = {})))
  let CellStatus
  ;(CellStatus2 => {
    CellStatus2['Live'] = 'live'
    CellStatus2['Unknown'] = 'unknown'
  })((CellStatus = CKBComponents2.CellStatus || (CKBComponents2.CellStatus = {})))
  let CapacityUnit
  ;(CapacityUnit2 => {
    CapacityUnit2[(CapacityUnit2['Shannon'] = 1)] = 'Shannon'
    CapacityUnit2[(CapacityUnit2['Byte'] = 1e8)] = 'Byte'
  })((CapacityUnit = CKBComponents2.CapacityUnit || (CKBComponents2.CapacityUnit = {})))
})(CKBComponents || (CKBComponents = exports.CKBComponents = {}))

exports.ANYONE_CAN_PAY_MAINNET = ANYONE_CAN_PAY_MAINNET
exports.ANYONE_CAN_PAY_TESTNET = ANYONE_CAN_PAY_TESTNET
exports.AddressException = AddressException
exports.AddressFormatTypeAndEncodeMethodNotMatchException = AddressFormatTypeAndEncodeMethodNotMatchException
exports.AddressFormatTypeException = AddressFormatTypeException
exports.AddressPayloadException = AddressPayloadException
exports.AddressPrefix = AddressPrefix
exports.AddressType = AddressType
exports.Bech32Type = Bech32Type
exports.Branch = Branch
exports.BranchRPC = BranchRPC
exports.CKBComponents = CKBComponents
exports.CodeHashException = CodeHashException
exports.ECPair = ECPair
exports.EMPTY_SECP_SIG = EMPTY_SECP_SIG
exports.EMPTY_WITNESS_ARGS = EMPTY_WITNESS_ARGS
exports.ErrorCode = ErrorCode
exports.HashTypeException = HashTypeException
exports.HexStringException = HexStringException
exports.HexStringWithout0xException = HexStringWithout0xException
exports.InputTypeException = InputTypeException
exports.JSBI = _jsbi2.default
exports.KeyLenTooLargeException = KeyLenTooLargeException
exports.KeyLenTooSmallException = KeyLenTooSmallException
exports.KeyTypeException = KeyTypeException
exports.Method = Method
exports.OutLenTooLargeException = OutLenTooLargeException
exports.OutLenTooSmallException = OutLenTooSmallException
exports.OutTypeException = OutTypeException
exports.PERSONAL = PERSONAL
exports.ParameterRequiredException = ParameterRequiredException
exports.PersonalLenException = PersonalLenException
exports.PersonalTypeException = PersonalTypeException
exports.PrivateKeyLenException = PrivateKeyLenException
exports.ReconciliationException = ReconciliationException
exports.SECP256K1_BLAKE160 = SECP256K1_BLAKE160
exports.SECP256K1_MULTISIG = SECP256K1_MULTISIG
exports.SaltLenException = SaltLenException
exports.SaltTypeException = SaltTypeException
exports.SignMessageException = SignMessageException
exports.SignStatus = SignStatus
exports.addressToScript = addressToScript
exports.assertToBeHexString = assertToBeHexString
exports.assertToBeHexStringOrBigint = assertToBeHexStringOrBigint
exports.bech32 = _bech32.bech32
exports.bech32Address = bech32Address
exports.bech32m = _bech32.bech32m
exports.blake160 = blake160
exports.blake2b = blake2b
exports.bytesToHex = bytesToHex
exports.calculateMaximumWithdraw = calculateMaximumWithdraw
exports.calculateTransactionFee = calculateTransactionFee
exports.cellOccupied = cellOccupied
exports.extraInputs = extraInputs
exports.extractDAOData = extractDAOData
exports.fullLengthSize = fullLengthSize
exports.fullPayloadToAddress = fullPayloadToAddress
exports.generateRawTransaction = generateRawTransaction
exports.getBigInts = getBigInts
exports.getInputs = getInputs
exports.getKeyAndCellsPairs = getKeyAndCellsPairs
exports.getLeftCells = getLeftCells
exports.getMultisigStatus = getMultisigStatus
exports.getOffsets = getOffsets
exports.getTargetOutputs = getTargetOutputs
exports.getTransactionSize = getTransactionSize
exports.getWithdrawEpoch = getWithdrawEpoch
exports.groupScripts = groupScripts
exports.hashMultisig = hashMultisig
exports.hexToBytes = hexToBytes
exports.isMap = isMap
exports.isMultisigConfig = isMultisigConfig
exports.loadCellsFromIndexer = loadCellsFromIndexer
exports.offsetSize = offsetSize
exports.parseAddress = parseAddress
exports.parseEpoch = parseEpoch
exports.privateKeyToAddress = privateKeyToAddress
exports.privateKeyToPublicKey = privateKeyToPublicKey
exports.pubkeyToAddress = pubkeyToAddress
exports.rawTransactionToHash = rawTransactionToHash
exports.scriptOccupied = scriptOccupied
exports.scriptToAddress = scriptToAddress
exports.scriptToHash = scriptToHash
exports.serializeArgs = serializeArgs
exports.serializeArray = serializeArray
exports.serializeCellDep = serializeCellDep
exports.serializeCellDeps = serializeCellDeps
exports.serializeCodeHash = serializeCodeHash
exports.serializeDepType = serializeDepType
exports.serializeDynVec = serializeDynVec
exports.serializeEpoch = serializeEpoch
exports.serializeFixVec = serializeFixVec
exports.serializeHashType = serializeHashType
exports.serializeHeaderDeps = serializeHeaderDeps
exports.serializeInput = serializeInput
exports.serializeInputs = serializeInputs
exports.serializeMultisigConfig = serializeMultisigConfig
exports.serializeOption = serializeOption
exports.serializeOutPoint = serializeOutPoint
exports.serializeOutput = serializeOutput
exports.serializeOutputs = serializeOutputs
exports.serializeOutputsData = serializeOutputsData
exports.serializeRawTransaction = serializeRawTransaction
exports.serializeScript = serializeScript
exports.serializeStruct = serializeStruct
exports.serializeTable = serializeTable
exports.serializeTransaction = serializeTransaction
exports.serializeVersion = serializeVersion
exports.serializeWitnessArgs = serializeWitnessArgs
exports.serializeWitnesses = serializeWitnesses
exports.signWitnessGroup = signWitnessGroup
exports.signWitnesses = signWitnesses
exports.toAddressPayload = toAddressPayload
exports.toBigEndian = toBigEndian
exports.toUint16Le = toUint16Le
exports.toUint32Le = toUint32Le
exports.toUint64Le = toUint64Le
//# sourceMappingURL=index.js.map
