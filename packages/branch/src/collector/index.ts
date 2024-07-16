import { Branch }  from '../signer'
import { CellIndexer } from '../indexer'
import { BranchComponents, CollectResult, Hex, IndexerCell, IndexerSearchKey } from '../types';

const MIN_CAPACITY = BigInt(61)

export class Collector {
  branch: Branch
  indexer: CellIndexer

  constructor({ ckbNodeUrl, ckbIndexerUrl }: { ckbNodeUrl: string; ckbIndexerUrl: string }) {
    this.branch = new Branch(ckbNodeUrl)
    this.indexer = new CellIndexer(ckbIndexerUrl)
  }

  async getCells({
    lock,
    type,
    isDataMustBeEmpty = true,
    outputCapacityRange,
  }: {
    lock?: BranchComponents.Script
    type?: BranchComponents.Script
    isDataMustBeEmpty?: boolean
    outputCapacityRange?: Hex[]
  }): Promise<IndexerCell[]> {
    const searchKey: IndexerSearchKey = lock
      ? {
          scriptSearchMode: 'exact',
          script: lock,
          scriptType: 'lock',
          filter: {
            script: type,
            outputDataLenRange: isDataMustBeEmpty && !type ? ['0x0', '0x1'] : undefined,
            outputCapacityRange: outputCapacityRange,
          },
        }
      : {
          scriptSearchMode: 'exact',
          script: type,
          scriptType: 'type',
        }
    return this.indexer.getCells(searchKey, { order: 'asc', limit: 100 })
  }

  collectInputs(liveCells: IndexerCell[], needCapacity: bigint, fee: bigint, changeCapacity = MIN_CAPACITY): CollectResult {
    const inputs: BranchComponents.CellInput[] = []
    let sumInputsCapacity = BigInt(0)
    for (const cell of liveCells) {
      inputs.push({
        previousOutput: cell.outPoint,
        since: '0x0',
      })
      sumInputsCapacity += BigInt(cell.output.capacity)
      if (sumInputsCapacity >= needCapacity + changeCapacity + fee) {
        break
      }
    }
    if (sumInputsCapacity < needCapacity + changeCapacity + fee) {
      throw new Error('Insufficient free CKB balance')
    }
    return { inputs, sumInputsCapacity }
  }

  async getLiveCell(outPoint: BranchComponents.OutPoint, withData = false): Promise<BranchComponents.LiveCell> {
    const { cell } = await this.branch.rpc.getLiveCell(outPoint, withData)
    return cell
  }

  async getLiveCells(outPoints: BranchComponents.OutPoint[], withData = false): Promise<BranchComponents.LiveCell[]> {
    const batch = this.branch.rpc.createBatchRequest(outPoints.map(outPoint => ['getLiveCell', outPoint, withData]))
    return batch.exec().then(liveCells => liveCells.map(liveCell => liveCell.cell))
  }
}
