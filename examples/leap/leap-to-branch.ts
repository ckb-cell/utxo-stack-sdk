import { AddressPrefix, Collector, privateKeyToAddress, scriptToHash } from '@utxo-stack/branch'
import {
  generateTimeout,
  genLeapingFromCkbToBranchRequestTx,
  getSecp256k1CellDep,
  getXudtTypeScript,
} from '@utxo-stack/leap'

const SECP256K1_PRIVATE_KEY = '0x'

const leapXudtToBranch = async () => {
  const address = privateKeyToAddress(SECP256K1_PRIVATE_KEY, { prefix: AddressPrefix.Testnet })
  const isMainnet = false

  const collector = new Collector({ indexerUrl: 'https://testnet.ckb.dev', nodeUrl: 'https://testnet.ckb.dev' })
  const unsignedTx = await genLeapingFromCkbToBranchRequestTx({
    collector,
    fromCkbAddress: address,
    assetTypeScript: {
      ...getXudtTypeScript(isMainnet),
      args: '0x562e4e8a2f64a3e9c24beb4b7dd002d0ad3b842d0cc77924328e36ad114e3ebe',
    },
    transferAmount: BigInt(800 * 10 ** 8),
    requestTypeHash: scriptToHash({
      codeHash: '0x2da1e80cec3e553a76e22d826b63ce5f65d77622de48caa5a2fe724b0f9a18f2',
      args: '0x4242',
      hashType: 'type',
    }),
    timeout: generateTimeout({ relative: true, type: 'blockNumber', value: BigInt(10) }), // owner can unlock request cell after 10 ckb blocks
    targetChainId: '0x1234',
    isMainnet,
  })
  unsignedTx.cellDeps.push(getSecp256k1CellDep(isMainnet))

  const signedTx = collector.branch.signTransaction(SECP256K1_PRIVATE_KEY)(unsignedTx)
  const txHash = await collector.branch.rpc.sendTransaction(signedTx)

  console.log('txHash', txHash)
}

leapXudtToBranch()
