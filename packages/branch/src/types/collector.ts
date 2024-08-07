import { BranchComponents } from './blockchain'

export interface CollectResult {
  inputs: BranchComponents.CellInput[]
  sumInputsCapacity: bigint
}

export interface CollectUdtResult {
  udtInputs: BranchComponents.CellInput[]
  sumUdtInputsCapacity: bigint
  sumAmount: bigint
}
