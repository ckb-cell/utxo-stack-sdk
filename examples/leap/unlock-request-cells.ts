import {
  addressToScript,
  rawTransactionToHash,
  scriptToHash,
  serializeWitnessArgs,
  signWitnesses,
} from '@utxo-stack/branch'
import { genUnlockingRequestCellsTx, getRequestLockScript, getSecp256k1CellDep } from '@utxo-stack/leap'
import { CKB_PRIVATE_KEY, ckbAddress, collector, isMainnet } from './env'

const unlockRequestCells = async () => {
  const unsignedTx = await genUnlockingRequestCellsTx({
    collector,
    ckbAddress,
    requestOutPoints: [
      {
        txHash: '0x17affa4383b1a39a14945ab701e0323b81ddfb05764685286effcc131f0b8db8',
        index: '0x0',
      },
    ],
    isMainnet,
  })
  unsignedTx.cellDeps.push(getSecp256k1CellDep(isMainnet))

  const keyMap = new Map<string, string>()
  keyMap.set(scriptToHash(addressToScript(ckbAddress)), CKB_PRIVATE_KEY)
  keyMap.set(scriptToHash(getRequestLockScript(isMainnet)), '')

  // The cell to pay transaction fee is at the last of the inputs
  const feePaidCellIndex = unsignedTx.inputs.length - 1
  const cells = unsignedTx.inputs.map((input, index) => ({
    outPoint: input.previousOutput,
    lock: index === feePaidCellIndex ? addressToScript(ckbAddress) : getRequestLockScript(isMainnet),
  }))

  const emptyWitness = { lock: '', inputType: '', outputType: '' }
  unsignedTx.witnesses = [...unsignedTx.witnesses, emptyWitness]

  const transactionHash = rawTransactionToHash(unsignedTx)
  const signedWitnesses = signWitnesses(keyMap)({
    transactionHash,
    witnesses: unsignedTx.witnesses,
    inputCells: cells,
    skipMissingKeys: true,
  })

  const signedTx = {
    ...unsignedTx,
    witnesses: signedWitnesses.map(witness => (typeof witness !== 'string' ? serializeWitnessArgs(witness) : witness)),
  }
  const txHash = await collector.branch.rpc.sendTransaction(signedTx)

  console.log('Unlock request cells and CKB tx hash is', txHash)
}

unlockRequestCells()
