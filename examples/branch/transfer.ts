import { addressToScript, BranchComponents, EMPTY_WITNESS_ARGS } from '@utxo-stack/branch'
import { BRANCH_PRIVATE_KEY, branchAddress, collector } from './env'

const TRANSFER_SATOSHI = BigInt(10000)
const Fee = BigInt(600)

const transferSatoshi = async () => {
  const lock = addressToScript(branchAddress)

  const cells = await collector.getCells({ lock })
  if (cells.length === 0) {
    throw new Error('No empty cells found')
  }
  const { inputs, sumInputsCapacity } = collector.collectInputs(cells, TRANSFER_SATOSHI, Fee)

  const outputs: BranchComponents.CellOutput[] = [
    {
      lock,
      capacity: `0x${(TRANSFER_SATOSHI - Fee).toString(16)}`,
    },
    {
      lock,
      capacity: `0x${(sumInputsCapacity - TRANSFER_SATOSHI).toString(16)}`,
    },
  ]
  const cellDeps = [await collector.branch.loadSecp256k1Dep()]
  const witnesses = inputs.map((_, index) => (index === 0 ? EMPTY_WITNESS_ARGS : '0x'))

  const rawTx: BranchComponents.RawTransactionToSign = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData: ['0x', '0x'],
    witnesses,
  }
  const signedTx = collector.branch.signTransaction(BRANCH_PRIVATE_KEY)(rawTx)
  const txHash = await collector.branch.rpc.sendTransaction(signedTx)

  console.log('txHash', txHash)
}

transferSatoshi()
