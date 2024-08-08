import { scriptToHash } from '@utxo-stack/branch'
import {
  generateTimeout,
  genLeapingFromCkbToBranchRequestTx,
  getSecp256k1CellDep,
  getXudtTypeScript,
} from '@utxo-stack/leap'
import { CKB_PRIVATE_KEY, ckbAddress, collector, isMainnet } from './env'

const leapXudtToBranch = async () => {
  // owner can unlock request cell after 10 ckb blocks
  const timeout = generateTimeout({ relative: true, type: 'blockNumber', value: BigInt(10) })
  const requestTypeHash = scriptToHash({
    codeHash: '0x2da1e80cec3e553a76e22d826b63ce5f65d77622de48caa5a2fe724b0f9a18f2',
    args: '0x4242',
    hashType: 'type',
  })
  const unsignedTx = await genLeapingFromCkbToBranchRequestTx({
    collector,
    fromCkbAddress: ckbAddress,
    assetTypeScript: {
      ...getXudtTypeScript(isMainnet),
      args: '0x562e4e8a2f64a3e9c24beb4b7dd002d0ad3b842d0cc77924328e36ad114e3ebe',
    },
    transferAmount: BigInt(800 * 10 ** 8),
    requestTypeHash,
    timeout,
    targetChainId: '0x1234',
    isMainnet,
  })
  unsignedTx.cellDeps.push(getSecp256k1CellDep(isMainnet))

  const signedTx = collector.branch.signTransaction(CKB_PRIVATE_KEY)(unsignedTx)
  const txHash = await collector.branch.rpc.sendTransaction(signedTx)

  console.log('Leap xUDT from CKB to Branch chain and CKB tx hash is', txHash)
}

leapXudtToBranch()
