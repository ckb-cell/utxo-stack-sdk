import { BranchComponents } from './blockchain'

export interface DepCellInfo {
  hashType: BranchComponents.ScriptHashType
  codeHash: BranchComponents.Hash256
  typeHash?: BranchComponents.Hash256
  outPoint: BranchComponents.OutPoint
  depType: BranchComponents.DepType
}

export type StructuredWitness = BranchComponents.WitnessArgs | BranchComponents.Witness

export namespace LoadCellsParams {
  interface Base {
    start?: string | bigint
    end?: string | bigint
  }

  export interface Normal extends Base {
    lockHash: BranchComponents.Hash
    start?: string | bigint
    end?: string | bigint
    STEP?: string | bigint
  }

  export interface FromIndexer extends Base {
    lock: BranchComponents.Script
    indexer: any
    CellCollector: any
  }
}

export namespace RawTransactionParams {
  export type LockHash = string
  export type Capacity = string | bigint
  export type Cell = {
    data: string
    lock: BranchComponents.Script
    type?: BranchComponents.Script
    capacity: BranchComponents.Capacity
    outPoint: BranchComponents.OutPoint
  }
  export type Fee =
    | Capacity
    | {
        feeRate: Capacity
        reconciler: (params: {
          tx: BranchComponents.RawTransactionToSign
          feeRate: Capacity
          changeThreshold: Capacity
          cells: Array<{ capacity: string; outPoint: BranchComponents.OutPoint }>
          extraCount: number
        }) => BranchComponents.RawTransactionToSign
      }
  export interface Base {
    fee?: Fee
    safeMode: boolean
    deps: DepCellInfo | DepCellInfo[]
    capacityThreshold?: Capacity
    changeThreshold?: Capacity
    changeLockScript?: BranchComponents.Script
    witnesses?: Array<BranchComponents.WitnessArgs | BranchComponents.Witness>
    outputsData?: Array<string>
  }

  export interface Simple extends Base {
    inputScript: BranchComponents.Script
    outputScript: BranchComponents.Script
    capacity: Capacity
    cells?: Cell[]
  }

  export interface Output {
    capacity: string | bigint
    lock: BranchComponents.Script
    type?: BranchComponents.Script | null
  }

  export interface Complex extends Base {
    inputScripts: BranchComponents.Script[]
    outputs: Output[]
    cells?: Map<LockHash, Cell[]>
  }
}
