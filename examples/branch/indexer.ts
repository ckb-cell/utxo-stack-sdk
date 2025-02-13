import { BranchComponents, CellIndexer } from '@utxo-stack/branch'
import { BRANCH_NODE_URL } from './env'

const run = async () => {
  const lock: BranchComponents.Script = {
    codeHash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
    hashType: 'type',
    args: '0xf9a9ad51ed14936d33f7bb854aaefa5f47a3ccbd',
  }
  const indexer = new CellIndexer(BRANCH_NODE_URL)

  const balance = await indexer.getCellsCapacity({ script: lock, scriptType: 'lock' })
  console.log('balance capacity', BigInt(balance.capacity).toString())

  const cells = await indexer.getCells({ script: lock, scriptType: 'lock' }, { limit: 3 })
  console.log('cells', JSON.stringify(cells))

  const transactions = await indexer.getTransactions({ script: lock, scriptType: 'lock' }, { limit: 3 })
  console.log('transactions', JSON.stringify(transactions))
}

run()
