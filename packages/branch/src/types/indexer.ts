import { BranchComponents } from './blockchain'

export type Hex = string
export type IndexerRange = Hex[]
export type ScriptType = 'lock' | 'type'
export type ScriptSearchMode = 'prefix' | 'exact'

export interface IndexerSearchKey {
  script?: BranchComponents.Script
  scriptType?: ScriptType
  scriptSearchMode?: ScriptSearchMode
  filter?: {
    script?: BranchComponents.Script
    scriptLenRange?: IndexerRange
    outputDataLenRange?: IndexerRange
    outputCapacityRange?: IndexerRange
    blockRange?: IndexerRange
  }
  withData?: boolean
}

export interface IndexerCell {
  blockNumber: BranchComponents.BlockNumber
  outPoint: BranchComponents.OutPoint
  output: BranchComponents.CellOutput
  outputData: Hex
  txIndex: Hex
}

export interface IndexerCapacity {
  blockNumber: BranchComponents.BlockNumber
  blockHash: BranchComponents.Hash
  capacity: Hex
}
