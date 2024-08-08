import dotenv from 'dotenv'
import { AddressPrefix, Collector, privateKeyToAddress } from '@utxo-stack/branch'

dotenv.config({ path: __dirname + '/.env' })

export const isMainnet = process.env.IS_MAINNET === 'true' ? true : false

export const collector = new Collector(process.env.CKB_NODE_URL!)
export const CKB_PRIVATE_KEY = process.env.CKB_SECP256K1_PRIVATE_KEY!
export const ckbAddress = privateKeyToAddress(CKB_PRIVATE_KEY, {
  prefix: isMainnet ? AddressPrefix.Mainnet : AddressPrefix.Testnet,
})
