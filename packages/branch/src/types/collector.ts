import { BranchComponents } from './blockchain'

export interface CollectResult {
  inputs: BranchComponents.CellInput[]
  sumInputsCapacity: bigint
}
