/**
 * @see https://github.com/nervosnetwork/ckb/blob/develop/util/jsonrpc-types/src/blockchain.rs
 */

import { BranchComponents } from './blockchain'

/* eslint-disable camelcase */
export module RPC {
  export type ProposalShortId = BranchComponents.ProposalShortId
  export type Number = BranchComponents.Number
  export type UInt32 = BranchComponents.UInt32
  export type Count = BranchComponents.Count
  export type DAO = BranchComponents.DAO
  export type Hash = BranchComponents.Hash
  export type Hash256 = BranchComponents.Hash256
  export type Version = BranchComponents.Version
  export type Capacity = BranchComponents.Capacity
  export type Witness = BranchComponents.Witness
  export type Bytes = BranchComponents.Bytes
  export type Index = BranchComponents.Index
  export type Since = BranchComponents.Since
  export type Timestamp = BranchComponents.Timestamp
  export type BlockNumber = BranchComponents.BlockNumber
  export type EpochInHeader = string
  export type Difficulty = BranchComponents.Difficulty
  export type Cycles = BranchComponents.Cycles
  export type Size = BranchComponents.Size
  export type RationalU256 = BranchComponents.RationalU256
  export type ProposalWindow = BranchComponents.ProposalWindow
  export type EpochNumberWithFraction = BranchComponents.EpochNumberWithFraction
  export type JsonBytes = BranchComponents.JsonBytes

  export type ScriptHashType = BranchComponents.ScriptHashType

  export type DepType = 'code' | 'dep_group'

  export interface Script {
    args: Bytes
    code_hash: Hash256
    hash_type: ScriptHashType
  }

  export interface OutPoint {
    tx_hash: Hash256
    index: Index
  }

  export interface CellInput {
    previous_output: OutPoint | null
    since: Since
  }

  export interface CellOutput {
    capacity: Capacity
    lock: Script
    type?: Script | null
  }

  export type Cell = CellOutput

  export interface LiveCell {
    data?: {
      content: Hash
      hash: Hash256
    }
    output: CellOutput
  }

  export interface CellDep {
    out_point: OutPoint | null
    dep_type: DepType
  }

  export interface CellIncludingOutPoint {
    block_hash: Hash256
    capacity: Capacity
    lock: Script
    out_point: OutPoint | null
    cellbase: boolean
    output_data_len: string
  }

  export interface RawTransaction {
    version: Version
    cell_deps: CellDep[]
    header_deps: Hash256[]
    inputs: CellInput[]
    outputs: CellOutput[]
    witnesses: Witness[]
    outputs_data: Bytes[]
  }

  export interface Transaction extends RawTransaction {
    hash: Hash256
  }

  export interface TransactionWithStatus {
    transaction: Transaction
    tx_status:
      | {
          block_hash: Hash256
          status: BranchComponents.TransactionStatus.Committed
        }
      | {
          block_hash: null
          status: BranchComponents.TransactionStatus.Pending | BranchComponents.TransactionStatus.Proposed
        }
  }

  export interface TransactionPoint {
    block_number: BlockNumber
    index: Index
    tx_hash: Hash256
  }

  export interface TransactionByLockHash {
    consumed_by: null | TransactionPoint
    created_by: TransactionPoint
  }
  export type TransactionsByLockHash = TransactionByLockHash[]

  export interface LiveCellByLockHash {
    cell_output: CellOutput
    created_by: TransactionPoint
    cellbase: boolean
    output_data_len: string
  }
  export type LiveCellsByLockHash = LiveCellByLockHash[]

  export interface Header {
    compact_target: Hash
    dao: DAO
    epoch: EpochInHeader
    hash: Hash256
    number: BlockNumber
    parent_hash: Hash256
    proposals_hash: Hash256
    nonce: BranchComponents.Nonce
    timestamp: Timestamp
    transactions_root: Hash256
    extra_hash: Hash256
    version: Version
  }

  export interface UncleBlock {
    header: Header
    proposals: ProposalShortId[]
  }

  export interface Block {
    header: Header
    uncles: UncleBlock[]
    transactions: Transaction[]
    proposals: ProposalShortId[]
    extension?: JsonBytes | null
  }

  export interface AlertMessage {
    id: string
    priority: string
    notice_until: Timestamp
    message: string
  }

  export interface BlockchainInfo {
    is_initial_block_download: boolean
    epoch: string
    difficulty: string
    median_time: string
    chain: string
    alerts: AlertMessage[]
  }

  export interface LocalNodeInfo {
    active: boolean
    addresses: Record<'address' | 'score', string>[]
    connections: string
    node_id: string
    protocols: { id: string; name: string; support_versions: string[] }[]
    version: string
  }

  export interface RemoteNodeInfo {
    addresses: Record<'address' | 'score', string>[]
    connected_duration: string
    is_outbound: boolean
    last_ping_duration: string
    node_id: string
    protocols: Record<'id' | 'version', string>[]
    sync_state: Record<
      | 'best_known_header_hash'
      | 'best_known_header_number'
      | 'can_fetch_count'
      | 'inflight_count'
      | 'last_common_header_hash'
      | 'last_common_header_number'
      | 'unknown_header_list_size',
      string | null
    >
    version: string
  }

  export interface PeersState {
    last_updated: string
    blocks_in_flight: string
    peer: string
  }

  export interface TxPoolInfo {
    last_txs_updated_at: Timestamp
    min_fee_rate: string
    orphan: Count
    pending: Count
    proposed: Count
    tip_hash: Hash256
    tip_number: BlockNumber
    total_tx_cycles: Cycles
    total_tx_size: Size
  }

  export interface Epoch {
    compact_target: Hash
    length: string
    number: string
    start_number: string
  }

  export interface LockHashIndexState {
    block_hash: Hash256
    block_number: BlockNumber
    lock_hash: Hash256
  }

  export type LockHashIndexStates = LockHashIndexState[]

  export interface BannedAddress {
    address: string
    ban_reason: string
    ban_until: Timestamp
    created_at: Timestamp
  }
  export type BannedAddresses = BannedAddress[]

  export interface CellbaseOutputCapacityDetails {
    primary: string
    proposal_reward: string
    secondary: string
    total: string
    tx_fee: string
  }

  export interface FeeRate {
    fee_rate: string
  }

  export type FeeRateStats = {
    mean: string
    median: string
  }

  export interface CapacityByLockHash {
    block_number: BlockNumber
    capacity: Capacity
    cells_count: string
  }

  export interface BlockEconomicState {
    finalized_at: string
    issuance: {
      primary: string
      secondary: string
    }
    miner_reward: {
      committed: string
      primary: string
      proposal: string
      secondary: string
    }
    txs_fee: string
  }

  export interface SyncState {
    best_known_block_number: string
    best_known_block_timestamp: string
    fast_time: string
    ibd: boolean
    inflight_blocks_count: string
    low_time: string
    normal_time: string
    orphan_blocks_count: string
  }

  export interface TransactionProof {
    block_hash: Hash
    proof: {
      indices: Number[]
      lemmas: Hash[]
    }
    witnesses_root: Hash
  }

  export type TxPoolIds = Record<'pending' | 'proposed', Array<Hash256>>

  export interface TxVerbosity {
    cycles: Cycles
    size: Size
    fee: Capacity
    ancestors_size: Size
    ancestors_cycles: Cycles
    ancestors_count: Count
  }

  export type TxPoolVerbosity = Record<'pending' | 'proposed', Record<Hash256, TxVerbosity>>

  export type RawTxPool = TxPoolIds | TxPoolVerbosity

  export interface Consensus {
    id: string
    genesis_hash: Hash256
    hardfork_features: Array<{ rfc: string; epoch_number: string | null }>
    dao_type_hash: Hash256 | null
    secp256k1_blake160_sighash_all_type_hash: Hash256 | null
    secp256k1_blake160_multisig_all_type_hash: Hash256 | null
    initial_primary_epoch_reward: Capacity
    secondary_epoch_reward: Capacity
    max_uncles_num: string
    orphan_rate_target: RationalU256
    epoch_duration_target: string
    tx_proposal_window: ProposalWindow
    proposer_reward_ratio: RationalU256
    cellbase_maturity: EpochNumberWithFraction
    median_time_block_count: Count
    max_block_cycles: Cycles
    max_block_bytes: string
    block_version: Version
    tx_version: Version
    type_id_code_hash: Hash256
    max_block_proposals_limit: string
    primary_epoch_reward_halving_interval: string
    permanent_difficulty_in_dummy: boolean
  }
}
/* eslint-enable camelcase */
