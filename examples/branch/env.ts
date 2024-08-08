import dotenv from 'dotenv'
import { AddressPrefix, Collector, privateKeyToAddress } from '@utxo-stack/branch'

dotenv.config({ path: __dirname + '/.env' })

export const isMainnet = process.env.IS_MAINNET === 'true' ? true : false

export const BRANCH_NODE_URL = process.env.BRANCH_NODE_URL!
export const collector = new Collector(process.env.BRANCH_NODE_URL!)

export const BRANCH_PRIVATE_KEY = process.env.BRANCH_SECP256K1_PRIVATE_KEY!
export const branchAddress = privateKeyToAddress(BRANCH_PRIVATE_KEY, {
  prefix: isMainnet ? AddressPrefix.Mainnet : AddressPrefix.Testnet,
})
