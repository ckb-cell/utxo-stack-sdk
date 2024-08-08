import { BranchComponents } from '@utxo-stack/branch'

export const CKB_UNIT = BigInt(10000_0000)
export const MAX_FEE = BigInt(2000_0000)
export const MIN_CAPACITY = BigInt(61) * BigInt(10000_0000)
export const WITNESS_LOCK_DEFAULT_PLACEHOLDER = 65

const TestnetInfo = {
  Secp256k1LockDep: {
    outPoint: {
      txHash: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
      index: '0x0',
    },
    depType: 'depGroup',
  } as BranchComponents.CellDep,

  XUDTTypeScript: {
    codeHash: '0x25c29dc317811a6f6f3985a7a9ebc4838bd388d19d0feeecf0bcd60f6c0975bb',
    hashType: 'type',
    args: '',
  } as BranchComponents.Script,

  XUDTTypeDep: {
    outPoint: {
      txHash: '0xbf6fb538763efec2a70a6a3dcb7242787087e1030c4e7d86585bc63a9d337f5f',
      index: '0x0',
    },
    depType: 'code',
  } as BranchComponents.CellDep,

  RequestLockScript: {
    codeHash: '0x2fca96b423bd2b4d0d4b5098bf7a3e74ea42c3f2e1bb6f973f7c1c68adfa3d9c',
    hashType: 'type',
    args: '',
  } as BranchComponents.Script,

  RequestLockDep: {
    outPoint: {
      txHash: '0x79e7a69cf175cde1d8f4fd1f7f5c9792cf07b4099a4a75946393ac6616b7aa0b',
      index: '0x0',
    },
    depType: 'code',
  } as BranchComponents.CellDep,
}

const MainnetInfo = {
  Secp256k1LockDep: {
    outPoint: {
      txHash: '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c',
      index: '0x0',
    },
    depType: 'depGroup',
  } as BranchComponents.CellDep,

  XUDTTypeScript: {
    codeHash: '0x50bd8d6680b8b9cf98b73f3c08faf8b2a21914311954118ad6609be6e78a1b95',
    hashType: 'data1',
    args: '',
  } as BranchComponents.Script,

  XUDTTypeDep: {
    outPoint: {
      txHash: '0xc07844ce21b38e4b071dd0e1ee3b0e27afd8d7532491327f39b786343f558ab7',
      index: '0x0',
    },
    depType: 'code',
  } as BranchComponents.CellDep,

  RequestLockScript: {
    codeHash: '0x2fca96b423bd2b4d0d4b5098bf7a3e74ea42c3f2e1bb6f973f7c1c68adfa3d9c',
    hashType: 'type',
    args: '',
  } as BranchComponents.Script,

  RequestLockDep: {
    outPoint: {
      txHash: '0x79e7a69cf175cde1d8f4fd1f7f5c9792cf07b4099a4a75946393ac6616b7aa0b',
      index: '0x0',
    },
    depType: 'code',
  } as BranchComponents.CellDep,
}

export const getSecp256k1CellDep = (isMainnet: boolean) =>
  isMainnet ? MainnetInfo.Secp256k1LockDep : TestnetInfo.Secp256k1LockDep

export const getXudtTypeScript = (isMainnet: boolean) =>
  isMainnet ? MainnetInfo.XUDTTypeScript : TestnetInfo.XUDTTypeScript
export const getXudtDep = (isMainnet: boolean) => (isMainnet ? MainnetInfo.XUDTTypeDep : TestnetInfo.XUDTTypeDep)

export const getRequestLockScript = (isMainnet: boolean) =>
  isMainnet ? MainnetInfo.RequestLockScript : TestnetInfo.RequestLockScript
export const getRequestDep = (isMainnet: boolean) =>
  isMainnet ? MainnetInfo.RequestLockDep : TestnetInfo.RequestLockDep
