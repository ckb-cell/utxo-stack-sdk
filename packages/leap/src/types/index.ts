export type Hex = string

//  1:ckb->branch, 2:branch->ckb, 3:branch->branch
export enum RequestType {
  CkbToBranch = 1,
  BranchToCkb = 2,
  BranchToBranch = 3
}

export interface RequestLockArgsProps {
  ownerLockHash: Hex
  assetTypeHash: Hex
  transferAmount: bigint
  requestType: RequestType
  requestTypeHash: Hex
  timeout?: bigint,
  initialChainId?: Hex,
  targetChainId?: Hex
}
