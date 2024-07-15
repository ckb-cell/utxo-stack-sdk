import { BranchComponents } from './blockchain'

export type Hex = string
export type IndexerRange = Hex[]
export type ScriptType = 'lock' | 'type'
export type ScriptSearchMode = 'prefix' | 'exact'
export type IndexerOrder = 'asc' | 'desc'

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
  // Only for get_cells RPC
  withData?: boolean
  // Only for get_transactions RPC
  groupByTransaction?: boolean
}

export interface IndexerConfig {
  order?: IndexerOrder
  limit?: number
  afterCursor?: BranchComponents.Hash256
}

export interface IndexerCell {
  blockNumber: BranchComponents.BlockNumber
  outPoint: BranchComponents.OutPoint
  output: BranchComponents.CellOutput
  outputData: Hex
  txIndex: Hex
}

interface UngroupedTransaction {
  blockNumber: BranchComponents.BlockNumber
  txHash: BranchComponents.Hash
  txIndex: Hex
  ioType: 'input' | 'output'
  ioIndex: Hex
}

interface GroupedTransaction {
  blockNumber: BranchComponents.BlockNumber
  txHash: BranchComponents.Hash
  txIndex: Hex
  cells: {
    ioType: 'input' | 'output'
    ioIndex: Hex
  }[]
}

export type IndexerTransaction = UngroupedTransaction | GroupedTransaction

export interface IndexerCapacity {
  blockNumber: BranchComponents.BlockNumber
  blockHash: BranchComponents.Hash
  capacity: BranchComponents.Capacity
}
