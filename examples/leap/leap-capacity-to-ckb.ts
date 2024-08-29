import { scriptToHash } from '@utxo-stack/branch'
import { generateTimeout, genLeapingCapacityToCkbRequestTx, getCkbXudtTypeScript } from '@utxo-stack/leap'
import { branchCollector, isMainnet, branchAddress, BRANCH_PRIVATE_KEY, ckbAddress } from './env'

const leapCapacityToCkb = async () => {
  // The following variables can be updated by developers, and it is recommended to use 48 block numbers as a minimum timeout
  const timeoutBlockNumber = BigInt(48)
  const transferAmount = BigInt(80 * 10 ** 8)

  // owner can unlock request cell after 48 ckb blocks
  const timeout = generateTimeout({ relative: true, type: 'blockNumber', value: timeoutBlockNumber })
  // The request type hash is from the Message Queue cell of CKB
  const requestTypeHash = scriptToHash({
    codeHash: '0x9c6933d977360f115a3e9cd5a2e0e475853681b80d775d93ad0f8969da343e56',
    args: '0x4242',
    hashType: 'type',
  })
  const unsignedTx = await genLeapingCapacityToCkbRequestTx({
    branchCollector,
    fromCkbAddress: ckbAddress,
    fromBranchAddress: branchAddress,
    assetTypeScript: {
      ...getCkbXudtTypeScript(isMainnet),
      args: '0x562e4e8a2f64a3e9c24beb4b7dd002d0ad3b842d0cc77924328e36ad114e3ebe',
    },
    transferAmount,
    requestTypeHash,
    timeout,
    isMainnet,
  })
  // If you use another lock script(JoyID, omni, etc.), the related cellDep should be added to cellDeps
  unsignedTx.cellDeps.push(await branchCollector.branch.loadSecp256k1Dep())

  console.log(JSON.stringify(unsignedTx))

  // If you use another lock script(JoyID, omni, etc.), the related signer should be used to sign the transaction
  const signedTx = branchCollector.branch.signTransaction(BRANCH_PRIVATE_KEY)(unsignedTx)
  const txHash = await branchCollector.branch.rpc.sendTransaction(signedTx)

  console.log('Leap Capacity from Branch to CKB chain and Branch tx hash is', txHash)
}

leapCapacityToCkb()
