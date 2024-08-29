import {
  addressToScript,
  rawTransactionToHash,
  scriptToHash,
  serializeWitnessArgs,
  signWitnesses,
} from '@utxo-stack/branch'
import { genUnlockingCkbRequestCellsTx, getCkbRequestLockScript, getCkbSecp256k1CellDep } from '@utxo-stack/leap'
import { CKB_PRIVATE_KEY, ckbAddress, ckbCollector, isMainnet } from './env'

const unlockRequestCells = async () => {
  const unsignedTx = await genUnlockingCkbRequestCellsTx({
    ckbCollector,
    ckbAddress,
    requestOutPoints: [
      {
        txHash: '0x17affa4383b1a39a14945ab701e0323b81ddfb05764685286effcc131f0b8db8',
        index: '0x0',
      },
    ],
    isMainnet,
  })
  // If you use another lock script(JoyID, omni, etc.), the related cellDep should be added to cellDeps
  unsignedTx.cellDeps.push(getCkbSecp256k1CellDep(isMainnet))

  // If you use another lock script(JoyID, omni, etc.), the related signer should be used to sign the transaction
  const keyMap = new Map<string, string>()
  keyMap.set(scriptToHash(addressToScript(ckbAddress)), CKB_PRIVATE_KEY)
  keyMap.set(scriptToHash(getCkbRequestLockScript(isMainnet)), '')

  // The cell to pay transaction fee is at the last of the inputs
  const feePaidCellIndex = unsignedTx.inputs.length - 1
  const cells = unsignedTx.inputs.map((input, index) => ({
    outPoint: input.previousOutput,
    lock: index === feePaidCellIndex ? addressToScript(ckbAddress) : getCkbRequestLockScript(isMainnet),
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
  const txHash = await ckbCollector.branch.rpc.sendTransaction(signedTx)

  console.log('Unlock CKB request cells and CKB tx hash is', txHash)
}

unlockRequestCells()
