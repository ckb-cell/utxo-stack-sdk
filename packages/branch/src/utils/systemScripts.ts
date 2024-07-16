import { BranchComponents } from '../types'

/**
 * @summary System scripts are the smart contracts built and deployed by the Branch chain core team.
 *          System scripts complement the function of Branch chain in a flexible way.
 *          System scripts can provide
 *          -  core functions (e.g. secp256k1/blake160 and Nervos DAO),
 *          -  shared standard implementations (e.g. Simple UDT),
 *          -  or other auxiliary infrastructure components.
 * @see https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0024-ckb-system-script-list/0024-ckb-system-script-list.md
 */
interface SystemScript extends Omit<BranchComponents.Script, 'args'> {
  depType: BranchComponents.DepType
}

type OutPoints = Record<'mainnetOutPoint' | 'testnetOutPoint', BranchComponents.OutPoint>

/**
 * @memberof System Scripts
 * @typedef {Lock Script}
 * @name SECP256K1_BLAKE160
 * @description SECP256K1_BLAKE160 is the default lock script to verify Branch chain transaction signature
 */
export const SECP256K1_BLAKE160: SystemScript & OutPoints = {
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

/**
 * @memberof System Scripts
 * @typedef {Lock Script}
 * @name SECP256K1_MULTISIG
 * @description SECP256K1_MULTISIG is a script which allows a group of users to sign a single transaction
 */
export const SECP256K1_MULTISIG: SystemScript & OutPoints = {
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

/**
 * @memberof System Scripts
 * @typedef {Lock Script}
 * @name ANYONE_CAN_PAY
 * @description ANYONE_CAN_PAY allows a recipient to provide cell capacity in asset transfer
 */
export const ANYONE_CAN_PAY_MAINNET: SystemScript & Pick<OutPoints, 'mainnetOutPoint'> = {
  codeHash: '0xd369597ff47f29fbc0d47d2e3775370d1250b85140c670e4718af712983a2354',
  hashType: 'type',
  depType: 'depGroup',
  mainnetOutPoint: {
    txHash: '0x4153a2014952d7cac45f285ce9a7c5c0c0e1b21f2d378b82ac1433cb11c25c4d',
    index: '0x0',
  },
}

export const ANYONE_CAN_PAY_TESTNET: SystemScript & Pick<OutPoints, 'testnetOutPoint'> = {
  codeHash: '0x3419a1c09eb2567f6552ee7a8ecffd64155cffe0f1796e6e61ec088d740c1356',
  hashType: 'type',
  depType: 'depGroup',
  testnetOutPoint: {
    txHash: '0xec26b0f85ed839ece5f11c4c4e837ec359f5adc4420410f6453b1f6b60fb96a6',
    index: '0x0',
  },
}
