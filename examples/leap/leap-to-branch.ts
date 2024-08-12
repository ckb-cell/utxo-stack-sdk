import { scriptToHash } from '@utxo-stack/branch'
import {
  generateTimeout,
  genLeapingFromCkbToBranchRequestTx,
  getSecp256k1CellDep,
  getXudtTypeScript,
  utf8ToHex,
} from '@utxo-stack/leap'
import { CKB_PRIVATE_KEY, ckbAddress, collector, isMainnet } from './env'

// The chain id of the https://branch0.dev.utxostack.network
const CHAIN_ID = '/branch_dev/155e7f3b'

const leapXudtToBranch = async () => {
  // The following variables can be updated by developers, and it is recommended to use 48 block numbers as a minimum timeout
  const timeoutBlockNumber = BigInt(48)
  const transferAmount = BigInt(800 * 10 ** 8)

  // owner can unlock request cell after 48 ckb blocks
  const timeout = generateTimeout({ relative: true, type: 'blockNumber', value: timeoutBlockNumber })
  // The request type hash is from the Message Queue cell of CKB
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
    transferAmount,
    requestTypeHash,
    timeout,
    targetChainId: utf8ToHex(CHAIN_ID),
    isMainnet,
  })
  // If you use another lock script(JoyID, omni, etc.), the related cellDep should be added to cellDeps
  unsignedTx.cellDeps.push(getSecp256k1CellDep(isMainnet))

  // If you use another lock script(JoyID, omni, etc.), the related signer should be used to sign the transaction
  const signedTx = collector.branch.signTransaction(CKB_PRIVATE_KEY)(unsignedTx)
  const txHash = await collector.branch.rpc.sendTransaction(signedTx)

  console.log('Leap xUDT from CKB to Branch chain and CKB tx hash is', txHash)
}

leapXudtToBranch()
