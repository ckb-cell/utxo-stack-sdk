import { scriptToHash } from '@utxo-stack/branch'
import { generateTimeout, genLeapingFromBranchToCkbRequestTx, getCkbXudtTypeScript } from '@utxo-stack/leap'
import { branchCollector, isMainnet, ckbAddress, CKB_PRIVATE_KEY } from './env'

const leapXudtToCkb = async () => {
  // The following variables can be updated by developers, and it is recommended to use 48 block numbers as a minimum timeout
  const timeoutBlockNumber = BigInt(48)
  const transferAmount = BigInt(100 * 10 ** 8)

  // owner can unlock request cell after 48 ckb blocks
  const timeout = generateTimeout({ relative: true, type: 'blockNumber', value: timeoutBlockNumber })
  // The request type hash is from the Message Queue cell of CKB
  const requestTypeHash = scriptToHash({
    codeHash: '0x9c6933d977360f115a3e9cd5a2e0e475853681b80d775d93ad0f8969da343e56',
    args: '0x4242',
    hashType: 'type',
  })
  const unsignedTx = await genLeapingFromBranchToCkbRequestTx({
    branchCollector,
    fromBranchAddress: ckbAddress,
    assetTypeScript: {
      ...getCkbXudtTypeScript(isMainnet),
      args: '0x92b419a8d8e03c683a47b960f707f2b866f6114b70327b6628762719b243c5ca',
    },
    transferAmount,
    requestTypeHash,
    timeout,
    isMainnet,
  })
  // If you use another lock script(JoyID, omni, etc.), the related cellDep should be added to cellDeps
  unsignedTx.cellDeps.push(await branchCollector.branch.loadSecp256k1Dep())

  // If you use another lock script(JoyID, omni, etc.), the related signer should be used to sign the transaction
  const signedTx = branchCollector.branch.signTransaction(CKB_PRIVATE_KEY)(unsignedTx)
  const txHash = await branchCollector.branch.rpc.sendTransaction(signedTx)

  console.log('Leap xUDT from Branch to CKB chain and Branch tx hash is', txHash)
}

leapXudtToCkb()
