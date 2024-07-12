import { CKBComponents } from './blockchain'

export interface DepCellInfo {
  hashType: CKBComponents.ScriptHashType
  codeHash: CKBComponents.Hash256
  typeHash?: CKBComponents.Hash256
  outPoint: CKBComponents.OutPoint
  depType: CKBComponents.DepType
}

export type StructuredWitness = CKBComponents.WitnessArgs | CKBComponents.Witness

export namespace LoadCellsParams {
  interface Base {
    start?: string | bigint
    end?: string | bigint
  }

  export interface Normal extends Base {
    lockHash: CKBComponents.Hash
    start?: string | bigint
    end?: string | bigint
    STEP?: string | bigint
  }

  export interface FromIndexer extends Base {
    lock: CKBComponents.Script
    indexer: any
    CellCollector: any
  }
}

export namespace RawTransactionParams {
  export type LockHash = string
  export type Capacity = string | bigint
  export type Cell = {
    data: string
    lock: CKBComponents.Script
    type?: CKBComponents.Script
    capacity: CKBComponents.Capacity
    outPoint: CKBComponents.OutPoint
  }
  export type Fee =
    | Capacity
    | {
        feeRate: Capacity
        reconciler: (params: {
          tx: CKBComponents.RawTransactionToSign
          feeRate: Capacity
          changeThreshold: Capacity
          cells: Array<{ capacity: string; outPoint: CKBComponents.OutPoint }>
          extraCount: number
        }) => CKBComponents.RawTransactionToSign
      }
  export interface Base {
    fee?: Fee
    safeMode: boolean
    deps: DepCellInfo | DepCellInfo[]
    capacityThreshold?: Capacity
    changeThreshold?: Capacity
    changeLockScript?: CKBComponents.Script
    witnesses?: Array<CKBComponents.WitnessArgs | CKBComponents.Witness>
    outputsData?: Array<string>
  }

  export interface Simple extends Base {
    inputScript: CKBComponents.Script
    outputScript: CKBComponents.Script
    capacity: Capacity
    cells?: Cell[]
  }

  export interface Output {
    capacity: string | bigint
    lock: CKBComponents.Script
    type?: CKBComponents.Script | null
  }

  export interface Complex extends Base {
    inputScripts: CKBComponents.Script[]
    outputs: Output[]
    cells?: Map<LockHash, Cell[]>
  }
}
