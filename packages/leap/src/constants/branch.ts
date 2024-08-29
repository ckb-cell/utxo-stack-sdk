import { BranchComponents } from '@utxo-stack/branch'

const TestnetInfo = {
  Secp256k1LockDep: {
    outPoint: {
      txHash: '0xde836a3233cbd4904f60ec9bfb5a2055d15314b751c9c0d4acff37d5e402f003',
      index: '0x0',
    },
    depType: 'depGroup',
  } as BranchComponents.CellDep,

  XUDTTypeScript: {
    codeHash: '0x6283a479a3cf5d4276cd93594de9f1827ab9b55c7b05b3d28e4c2e0a696cfefd',
    hashType: 'type',
    args: '',
  } as BranchComponents.Script,

  XUDTTypeDep: {
    outPoint: {
      txHash: '0x1c21f865d6564c7b54e5a616adee365378b41b92e5c941cdf45c572c0c9e5811',
      index: '0x5',
    },
    depType: 'code',
  } as BranchComponents.CellDep,

  RequestLockScript: {
    codeHash: '0x1a1e4fef34f5982906f745b048fe7b1089647e82346074e0f32c2ece26cf6b1e',
    hashType: 'type',
    args: '',
  } as BranchComponents.Script,

  RequestLockDep: {
    outPoint: {
      txHash: '0x1c21f865d6564c7b54e5a616adee365378b41b92e5c941cdf45c572c0c9e5811',
      index: '0x6',
    },
    depType: 'code',
  } as BranchComponents.CellDep,
}

const MainnetInfo = {
  Secp256k1LockDep: {
    outPoint: {
      txHash: '0xde836a3233cbd4904f60ec9bfb5a2055d15314b751c9c0d4acff37d5e402f003',
      index: '0x0',
    },
    depType: 'depGroup',
  } as BranchComponents.CellDep,

  XUDTTypeScript: {
    codeHash: '0x6283a479a3cf5d4276cd93594de9f1827ab9b55c7b05b3d28e4c2e0a696cfefd',
    hashType: 'type',
    args: '',
  } as BranchComponents.Script,

  XUDTTypeDep: {
    outPoint: {
      txHash: '0x1c21f865d6564c7b54e5a616adee365378b41b92e5c941cdf45c572c0c9e5811',
      index: '0x5',
    },
    depType: 'code',
  } as BranchComponents.CellDep,

  RequestLockScript: {
    codeHash: '0x1a1e4fef34f5982906f745b048fe7b1089647e82346074e0f32c2ece26cf6b1e',
    hashType: 'type',
    args: '',
  } as BranchComponents.Script,

  RequestLockDep: {
    outPoint: {
      txHash: '0x1c21f865d6564c7b54e5a616adee365378b41b92e5c941cdf45c572c0c9e5811',
      index: '0x6',
    },
    depType: 'code',
  } as BranchComponents.CellDep,
}

export const getBranchSecp256k1CellDep = (isMainnet: boolean) =>
  isMainnet ? MainnetInfo.Secp256k1LockDep : TestnetInfo.Secp256k1LockDep

export const getBranchXudtTypeScript = (isMainnet: boolean) =>
  isMainnet ? MainnetInfo.XUDTTypeScript : TestnetInfo.XUDTTypeScript
export const getBranchXudtDep = (isMainnet: boolean) => (isMainnet ? MainnetInfo.XUDTTypeDep : TestnetInfo.XUDTTypeDep)

export const getBranchRequestLockScript = (isMainnet: boolean) =>
  isMainnet ? MainnetInfo.RequestLockScript : TestnetInfo.RequestLockScript
export const getBranchRequestDep = (isMainnet: boolean) =>
  isMainnet ? MainnetInfo.RequestLockDep : TestnetInfo.RequestLockDep
