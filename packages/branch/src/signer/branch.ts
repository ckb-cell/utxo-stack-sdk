import { BranchRPC } from '../rpc'
import { ParameterRequiredException } from '../utils/exceptions'
import * as utils from '../utils'
import { isMap, signWitnesses } from './signWitnesses'
import { BranchComponents } from '../types'

const filterCellsByInputs = (
  cells: Pick<BranchComponents.ResolvedCell, 'outPoint' | 'lock'>[],
  inputs: Pick<BranchComponents.CellInput, 'previousOutput'>[],
) => {
  return inputs.map(input => {
    const outPoint = input.previousOutput
    const cell = cells.find(c => c.outPoint?.txHash === outPoint?.txHash && c.outPoint?.index === outPoint?.index)
    if (!cell) {
      throw new Error(`Cell of ${JSON.stringify(outPoint)} is not found`)
    }
    return cell
  })
}

type Key = string
type LockHash = string
type URL = string

export class Branch {
  public rpc: BranchRPC
  public utils = utils

  constructor(nodeUrl: URL = 'http://localhost:8114') {
    this.rpc = new BranchRPC(nodeUrl)
  }

  public loadSecp256k1Dep = async (): Promise<BranchComponents.CellDep> => {
    const genesisBlock = await this.rpc.getBlockByNumber('0x0')
    if (!genesisBlock) {
      throw new Error('Fail to load the genesis block')
    }
    const secp256k1DepTxHash = genesisBlock?.transactions[1].hash
    return {
      outPoint: {
        txHash: secp256k1DepTxHash,
        index: '0x0',
      },
      depType: 'depGroup',
    }
  }

  public signWitnesses = signWitnesses

  public signTransaction =
    (key: Key | Map<LockHash, Key>) =>
    (
      transaction: BranchComponents.RawTransactionToSign,
      cells: Array<{ outPoint: BranchComponents.OutPoint; lock: BranchComponents.Script }> = [],
    ) => {
      if (!key) throw new ParameterRequiredException('Private key or address object')
      this.#validateTransactionToSign(transaction)

      const transactionHash = this.utils.rawTransactionToHash(transaction)
      const inputCells = isMap(key) ? filterCellsByInputs(cells, transaction.inputs) : undefined

      const signedWitnesses = this.signWitnesses(key)({
        transactionHash,
        witnesses: transaction.witnesses,
        inputCells,
      })
      return {
        ...transaction,
        witnesses: signedWitnesses.map(witness =>
          typeof witness === 'string' ? witness : this.utils.serializeWitnessArgs(witness),
        ),
      }
    }

  #validateTransactionToSign = (transaction: BranchComponents.RawTransactionToSign) => {
    if (!transaction) throw new ParameterRequiredException('Transaction')
    if (!transaction.witnesses) throw new ParameterRequiredException('Witnesses')
    if (!transaction.outputsData) throw new ParameterRequiredException('OutputsData')
    if (transaction.outputsData.length < transaction.outputs.length) throw new Error('Invalid count of outputsData')
  }
}
