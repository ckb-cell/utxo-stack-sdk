/* eslint-disable no-param-reassign */
import {
  OutLenTooSmallException,
  OutLenTooLargeException,
  KeyLenTooSmallException,
  KeyLenTooLargeException,
  OutTypeException,
  SaltTypeException,
  SaltLenException,
  InputTypeException,
  KeyTypeException,
  PersonalTypeException,
  PersonalLenException,
} from '../exceptions'

const BYTES_MIN = 16
const BYTES_MAX = 64

const KEYBYTES_MIN = 16
const KEYBYTES_MAX = 64

const SALTBYTES = 16
const PERSONALBYTES = 16

const v = new Uint32Array(32)
const m = new Uint32Array(32)

/**
 * @function ADD64AA
 * @description 64-bit unsigned addition, set vec[a, a + 1] += vec[b, b + 1]
 * @param {Uint32Array} vec
 * @param {number} a
 * @param {number} b
 */
const ADD64AA = (vec: Uint32Array, a: number, b: number) => {
  const o0 = vec[a] + vec[b]
  let o1 = vec[a + 1] + vec[b + 1]
  if (o0 >= 0x100000000) {
    o1++
  }
  vec[a] = o0
  vec[a + 1] = o1
}

/**
 * @function ADD64AC
 * @description 64-bit unsigned addition, set vec[a, a + 1] += b, b0 is the low 32 bits of b and b1 is the high 32 bits
 * @param {Uint32Array} vec
 * @param {number} a
 * @param {number} b0
 * @param {number} b1
 */
const ADD64AC = (vec: Uint32Array, a: number, b0: number, b1: number) => {
  let o0 = vec[a] + b0
  if (b0 < 0) {
    o0 += 0x100000000
  }
  let o1 = vec[a + 1] + b1
  if (o0 >= 0x100000000) {
    o1++
  }
  vec[a] = o0
  vec[a + 1] = o1
}

// Little-endian byte access
const B2B_GET32 = (arr: Uint8Array, i: number) => {
  return arr[i] ^ (arr[i + 1] << 8) ^ (arr[i + 2] << 16) ^ (arr[i + 3] << 24)
}

// G Mixing function
// The ROTRs are inlined for speed
const B2B_G = (a: number, b: number, c: number, d: number, ix: number, iy: number) => {
  const x0 = m[ix]
  const x1 = m[ix + 1]
  const y0 = m[iy]
  const y1 = m[iy + 1]

  ADD64AA(v, a, b) // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
  ADD64AC(v, a, x0, x1) // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
  let xor0 = v[d] ^ v[a]
  let xor1 = v[d + 1] ^ v[a + 1]
  v[d] = xor1
  v[d + 1] = xor0

  ADD64AA(v, c, d)

  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
  xor0 = v[b] ^ v[c]
  xor1 = v[b + 1] ^ v[c + 1]
  v[b] = (xor0 >>> 24) ^ (xor1 << 8)
  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8)

  ADD64AA(v, a, b)
  ADD64AC(v, a, y0, y1)

  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
  xor0 = v[d] ^ v[a]
  xor1 = v[d + 1] ^ v[a + 1]
  v[d] = (xor0 >>> 16) ^ (xor1 << 16)
  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16)

  ADD64AA(v, c, d)

  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
  xor0 = v[b] ^ v[c]
  xor1 = v[b + 1] ^ v[c + 1]
  v[b] = (xor1 >>> 31) ^ (xor0 << 1)
  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1)
}

/* eslint-disable prettier/prettier */
// Initialization Vector
const BLAKE2B_IV32 = new Uint32Array([
  0xf3bcc908, 0x6a09e667, 0x84caa73b, 0xbb67ae85, 0xfe94f82b, 0x3c6ef372, 0x5f1d36f1, 0xa54ff53a, 0xade682d1,
  0x510e527f, 0x2b3e6c1f, 0x9b05688c, 0xfb41bd6b, 0x1f83d9ab, 0x137e2179, 0x5be0cd19,
])

const SIGMA8 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12,
  0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10,
  15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0,
  7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7,
  1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
]
/* eslint-enable prettier/prettier */

// These are offsets into a uint64 buffer.
// Multiply them all by 2 to make them offsets into a uint32 buffer,
// because this is JavaScript and we don't have uint64s
const SIGMA82 = new Uint8Array(
  SIGMA8.map(x => {
    return x * 2
  }),
)

const blake2bCompress = (ctx: Blake2b, last: boolean) => {
  let i = 0

  // init work variables
  for (i = 0; i < 16; i++) {
    v[i] = ctx.h[i]
    v[i + 16] = BLAKE2B_IV32[i]
  }

  // low 64 bits of offset
  v[24] ^= ctx.t
  v[25] ^= ctx.t / 0x100000000
  // high 64 bits not supported, offset may not be higher than 2**53-1

  // last block flag set ?
  if (last) {
    v[28] = ~v[28]
    v[29] = ~v[29]
  }

  // get little-endian words
  for (i = 0; i < 32; i++) {
    m[i] = B2B_GET32(ctx.b, 4 * i)
  }

  // twelve rounds of mixing
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

/**
 * @function blake2bUpdate
 * @description updates a BLAKE2b streaming hash, requires hash context and Uint8Array
 */
const blake2bUpdate = (ctx: Blake2b, input: Uint8Array) => {
  for (let i = 0; i < input.length; i++) {
    // buffer full?
    if (ctx.c === 128) {
      ctx.t += ctx.c // add counters
      blake2bCompress(ctx, false) // compress (not last)
      ctx.c = 0 // counter to zero
    }
    ctx.b[ctx.c++] = +input[i]
  }
}

// Completes a BLAKE2b streaming hash
// Returns a Uint8Array containing the message digest
/**
 * @function blake2bFinal
 * @description completes a BLAKE2b streaming hash, returns a Uint8Array containing the message digest
 */
const blake2bFinal = (ctx: Blake2b, out: Uint8Array) => {
  ctx.t += ctx.c // mark last block offset

  // fill up with zeros
  while (ctx.c < 128) {
    ctx.b[ctx.c++] = 0
  }
  blake2bCompress(ctx, true) // final block flag = 1

  for (let i = 0; i < ctx.outlen; i++) {
    out[i] = ctx.h[i >> 2] >> (8 * (i & 3))
  }
  return out
}

const toHex = (n: number) => {
  if (n < 16) return `0${n.toString(16)}`
  return n.toString(16)
}

const hexSlice = (buf: string | Uint8Array) => {
  let str = ''
  for (let i = 0; i < buf.length; i++) str += toHex(+buf[i])
  return str
}

/* eslint-disable prettier/prettier */
// reusable parameterBlock
const parameterBlock = new Uint8Array([
  0,
  0,
  0,
  0, //  0: outlen, keylen, fanout, depth 0,
  0,
  0,
  0,
  0, //  4: leaf length, sequential mode 0,
  0,
  0,
  0,
  0, //  8: node offset
  0,
  0,
  0,
  0, // 12: node offset
  0,
  0,
  0,
  0, // 16: node depth, inner length, rfu
  0,
  0,
  0,
  0, // 20: rfu
  0,
  0,
  0,
  0, // 24: rfu
  0,
  0,
  0,
  0, // 28: rfu
  0,
  0,
  0,
  0, // 32: salt
  0,
  0,
  0,
  0, // 36: salt
  0,
  0,
  0,
  0, // 40: salt
  0,
  0,
  0,
  0, // 44: salt
  0,
  0,
  0,
  0, // 48: personal
  0,
  0,
  0,
  0, // 52: personal
  0,
  0,
  0,
  0, // 56: personal
  0,
  0,
  0,
  0, // 60: personal
])
/* eslint-enable prettier/prettier */

export class Blake2b {
  b: Uint8Array

  h: Uint32Array

  t: number

  c: number

  outlen: number

  // Creates a BLAKE2b hashing context
  // Requires an output length between 1 and 64 bytes
  // Takes an optional Uint8Array key
  constructor(outlen: number, key: Uint8Array | null, salt: Uint8Array | null, personal: Uint8Array | null) {
    // zero out parameterBlock before usage
    parameterBlock.fill(0)
    // state, 'param block'

    this.b = new Uint8Array(128)
    this.h = new Uint32Array(16)
    this.t = 0 // input count
    this.c = 0 // pointer within buffer
    this.outlen = outlen // output length in bytes

    parameterBlock[0] = outlen
    if (key) parameterBlock[1] = key.length
    parameterBlock[2] = 1 // fanout
    parameterBlock[3] = 1 // depth

    if (salt) parameterBlock.set(salt, 32)
    if (personal) parameterBlock.set(personal, 48)

    // initialize hash state
    for (let i = 0; i < 16; i++) {
      this.h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameterBlock, i * 4)
    }

    // key the hash, if applicable
    if (key) {
      blake2bUpdate(this, key)
      // at the end
      this.c = 128
    }
  }

  update = (input: Uint8Array) => {
    if (!(input instanceof Uint8Array)) {
      throw new InputTypeException()
    }
    blake2bUpdate(this, input)
    return this
  }

  digest = (out: 'binary' | 'hex') => {
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

  final = this.digest
}

export const blake2b = (
  outlen: number,
  key: Uint8Array | null,
  salt: Uint8Array | null,
  personal: Uint8Array | null,
  noAssert?: boolean,
) => {
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
