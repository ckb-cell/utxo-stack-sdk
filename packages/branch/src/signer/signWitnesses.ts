import { scriptToHash, serializeWitnessArgs } from '../utils'
import { ParameterRequiredException } from '../utils/exceptions'
import { SignatureProvider, signWitnessGroup } from './signWitnessGroup'
import { getMultisigStatus, isMultisigConfig, MultisigConfig, serializeMultisigConfig, SignStatus } from './multisig'
import { BranchComponents, StructuredWitness } from '../types'

type LockHash = string
type TransactionHash = string
type Index = number
type Cell = { lock: BranchComponents.Script }
export type MultisigOption = {
  sk: SignatureProvider
  blake160: string
  config: MultisigConfig
  signatures: string[]
}

type SignWitnessesKey = SignatureProvider | Map<LockHash, SignatureProvider | MultisigOption>
export interface SignWitnesses {
  (
    key: SignatureProvider,
  ): (params: { transactionHash: TransactionHash; witnesses: StructuredWitness[] }) => StructuredWitness[]
  (
    key: Map<LockHash, SignatureProvider | MultisigOption>,
  ): (params: {
    transactionHash: TransactionHash
    witnesses: StructuredWitness[]
    inputCells: Cell[]
    skipMissingKeys: boolean
  }) => StructuredWitness[]
  (
    key: SignWitnessesKey,
  ): (params: {
    transactionHash: TransactionHash
    witnesses: StructuredWitness[]
    inputCells?: Cell[]
    skipMissingKeys?: boolean
  }) => StructuredWitness[]
}

export const isMap = <K = any, V = any>(val: any): val is Map<K, V> => {
  return val.size !== undefined
}

function isMultisigOption(params: any): params is MultisigOption {
  if (params.sk && params.blake160 && params.config && params.signatures) {
    if (
      (typeof params.sk === 'string' || typeof params.sk === 'function') &&
      typeof params.blake160 === 'string' &&
      Array.isArray(params.signatures) &&
      isMultisigConfig(params.config)
    ) {
      return true
    }
    throw new Error('Multisig options is incorrect')
  }
  throw new Error('Multisig options miss some property')
}

const groupScripts = (inputCells: Cell[]) => {
  const groups = new Map<LockHash, Index[]>()
  inputCells.forEach((cell, i) => {
    const lockHash = scriptToHash(cell.lock)
    const group = groups.get(lockHash) || []
    groups.set(lockHash, [...group, i])
  })
  return groups
}

export const signWitnesses: SignWitnesses =
  (key: SignWitnessesKey) =>
  ({
    transactionHash,
    witnesses = [],
    inputCells = [],
    skipMissingKeys = false,
  }: {
    transactionHash: string
    witnesses: StructuredWitness[]
    inputCells?: Cell[]
    skipMissingKeys?: boolean
  }) => {
    if (!key) throw new ParameterRequiredException('Signature provider')
    if (!transactionHash) throw new ParameterRequiredException('Transaction hash')
    if (!witnesses.length) throw new Error('Witnesses is empty')

    if (isMap(key)) {
      if (!inputCells.length) {
        throw new Error(`Cell shouldn't be empty when key is Map`)
      }
      const rawWitnesses = witnesses
      const restWitnesses = witnesses.slice(inputCells.length)
      const groupedScripts = groupScripts(inputCells)
      groupedScripts.forEach((indices, lockHash) => {
        const sk = key.get(lockHash)
        if (!sk) {
          if (!skipMissingKeys) {
            throw new Error(`The signature provider to sign lock hash ${lockHash} is not found`)
          } else {
            return
          }
        }

        const ws = [...indices.map(idx => witnesses[idx]), ...restWitnesses] as StructuredWitness[]
        if (typeof sk === 'object' && isMultisigOption(sk)) {
          const witnessIncludeSignature = signWitnessGroup(sk.sk, transactionHash, ws, sk.config)[0]
          // is multisig sign
          const firstWitness = rawWitnesses[indices[0]]
          if (typeof firstWitness !== 'object') {
            throw new Error('The first witness in the group should be type of WitnessArgs')
          }
          let lockAfterSign = (witnessIncludeSignature as BranchComponents.WitnessArgs).lock
          if (firstWitness.lock) {
            lockAfterSign = firstWitness.lock + lockAfterSign?.slice(2)
          } else {
            lockAfterSign = serializeMultisigConfig(sk.config) + lockAfterSign?.slice(2)
          }
          const firstWitSigned = { ...firstWitness, lock: lockAfterSign }
          rawWitnesses[indices[0]] = firstWitSigned
          if (getMultisigStatus(sk.config, [...sk.signatures, sk.blake160]) === SignStatus.Signed) {
            indices.forEach(idx => {
              const wit = rawWitnesses[idx]
              rawWitnesses[idx] = typeof wit === 'string' ? wit : serializeWitnessArgs(wit!)
            })
          }
        } else {
          const witnessIncludeSignature = signWitnessGroup(sk, transactionHash, ws)[0]
          rawWitnesses[indices[0]] = witnessIncludeSignature!
        }
      })
      return rawWitnesses
    }

    return signWitnessGroup(key, transactionHash, witnesses)
  }
