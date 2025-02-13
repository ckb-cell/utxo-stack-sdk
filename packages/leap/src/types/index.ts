import { BranchComponents, Collector } from '@utxo-stack/branch'

export type Hex = string
export type CKBAddress = string

//  1:ckb->branch, 2:branch->ckb, 3:branch->branch
export enum RequestType {
  CkbToBranch = 1,
  BranchToCkb = 2,
  BranchToBranch = 3,
}

export interface RequestLockArgsParams {
  ownerLockHash: Hex
  assetTypeHash: Hex
  transferAmount: bigint
  requestType: RequestType
  requestTypeHash: Hex
  timeout?: Hex
  initialChainId?: Hex
  targetChainId?: Hex
}

export interface LeapingFromCkbToBranchParams {
  ckbCollector: Collector
  fromCkbAddress: CKBAddress
  assetTypeScript: BranchComponents.Script
  transferAmount: bigint
  requestTypeHash: Hex
  isMainnet: boolean
  timeout?: Hex
  targetChainId?: Hex
  feeRate?: number
  witnessLockPlaceholderSize?: number
}

export interface UnlockCkbRequestCellsParams {
  ckbCollector: Collector
  ckbAddress: CKBAddress
  requestOutPoints: BranchComponents.OutPoint[]
  isMainnet: boolean
  feeRate?: number
  witnessLockPlaceholderSize?: number
}

export interface LeapingFromBranchToCkbParams {
  branchCollector: Collector
  fromCkbAddress?: CKBAddress
  fromBranchAddress: CKBAddress
  assetTypeScript: BranchComponents.Script
  transferAmount: bigint
  requestTypeHash: Hex
  isMainnet: boolean
  timeout?: Hex
  targetChainId?: Hex
  feeRate?: number
  witnessLockPlaceholderSize?: number
}

export interface UnlockBranchRequestCellsParams {
  branchCollector: Collector
  fromBranchAddress: CKBAddress
  requestOutPoints: BranchComponents.OutPoint[]
  isMainnet: boolean
  feeRate?: number
  witnessLockPlaceholderSize?: number
}
