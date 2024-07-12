import JSBI from 'jsbi'
export { default as JSBI } from 'jsbi'
import { bech32, bech32m } from 'bech32'
export { bech32, bech32m } from 'bech32'
import { ec } from 'elliptic'

/**
 * @see https://github.com/nervosnetwork/ckb/blob/develop/protocol/src/protocol.fbs for more information
 */
declare namespace CKBComponents {
  type DAO = string
  type Hash = string
  type Number = string
  type Hash256 = string
  type UInt32 = number
  type Index = string
  type Version = string
  type Count = string
  type Difficulty = string
  type BlockNumber = string
  type EpochInHeader = string
  type Capacity = string
  type ProposalShortId = string
  type Timestamp = string
  type Nonce = string
  type Cycles = string
  type Size = string
  type OutputsValidator = 'default' | 'passthrough' | undefined
  type RationalU256 = Record<'denom' | 'numer', string>
  type ProposalWindow = Record<'closest' | 'farthest', BlockNumber>
  type EpochNumberWithFraction = string
  enum TransactionStatus {
    Pending = 'pending',
    Proposed = 'proposed',
    Committed = 'committed',
  }
  type ScriptHashType = 'data' | 'type' | 'data1' | 'data2'
  type DepType = 'code' | 'depGroup'
  type JsonBytes = string
  /**
   * @typedef Bytes, keep consistent with CKB
   * @description Bytes will be serialized to string
   * @see https://github.com/nervosnetwork/ckb/blob/develop/util/jsonrpc-types/src/blockchain.rs#L19
   */
  type Bytes = string
  type Since = string
  interface Node {
    url: string
    httpAgent?: any
    httpsAgent?: any
  }
  interface Method {
    name: string
    method: string
    paramsFormatters: Function[]
    resultFormatters?: Function
  }
  /**
   * RPC Units
   */
  /**
   * @typedef Script, lock or type script
   * @description Script, the script model in CKB. CKB scripts use UNIX standard execution environment.
   *              Each script binary should contain a main function with the following signature `int main(int argc, char* argv[]);`.
   *              CKB will concat  `args`, then use the concatenated array to fill `argc/argv` part, then start the script execution.
   *              Upon termination, the executed `main` function here will provide a return code,
   *              `0` means the script execution succeeds, other values mean the execution fails.
   * @property args, arguments.
   * @property codeHash, point to its dependency, if the referred dependency is listed in the deps field in a transaction,
   *                     the codeHash means the hash of the referred cell's data.
   * @property hashType, a enumerate indicates the type of the code which is referened by the code hash
   */
  interface Script {
    args: Bytes
    codeHash: Hash256
    hashType: ScriptHashType
  }
  /**
   * @typedef CellInput, cell input in a transaction
   * @property previousOutput, point to its P1 cell
   * @property since, a parameter to prevent a cell to be spent before a centain block timestamp or a block number,
   *           [RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0017-tx-valid-since/0017-tx-valid-since.md)
   */
  interface CellInput {
    previousOutput: OutPoint | null
    since: Since
  }
  /**
   * @typedef CellOutput, cell output in a transaction
   * @property capacity, the capacity of the genereated P1 cell
   * @property lock, lock script
   * @property type, type script
   */
  interface CellOutput {
    capacity: Capacity
    lock: Script
    type?: Script | null
  }
  /**
   * @typedef OutPoint, used to refer a generated cell by transaction hash and output index
   * @property hash, transaction hash
   * @property index, index of cell output
   */
  interface OutPoint {
    txHash: Hash256
    index: Index
  }
  /**
   * @typeof CellDep, cell dependencies in a transaction
   * @property outPoint, the out point of the cell dependency
   * @property depType, indicate if the data of the cell containing a group of dependencies
   */
  interface CellDep {
    outPoint: OutPoint | null
    depType: DepType
  }
  type Witness = Bytes
  /**
   * @typedef RawTransaction, raw transaction object
   * @property version, transaction version
   * @property cellDeps, cell deps used in the transaction
   * @property headerDeps, header deps referenced to a specific block used in the transaction
   * @property inputs, cell inputs in the transaction
   * @property outputs, cell outputs in the transaction
   * @property witnesses, segrated witnesses
   * @property outputsData, data referenced by scripts
   */
  interface RawTransaction {
    version: Version
    cellDeps: CellDep[]
    headerDeps: Hash256[]
    inputs: CellInput[]
    outputs: CellOutput[]
    witnesses: Witness[]
    outputsData: Bytes[]
  }
  /**
   * @typedef Transaction, transaction object
   * @extends RawTransaction
   * @property hash, transaction hash
   */
  interface Transaction extends RawTransaction {
    hash: Hash256
  }
  interface TransactionWithStatus {
    transaction: Transaction
    txStatus:
      | {
          blockHash: Hash256
          status: TransactionStatus.Committed
        }
      | {
          blockHash: null
          status: TransactionStatus.Pending | TransactionStatus.Proposed
        }
  }
  /**
   * @typeof TransactionPoint
   * @property blockNumber
   * @property index
   * @property txHash
   */
  interface TransactionPoint {
    blockNumber: BlockNumber
    index: Index
    txHash: Hash256
  }
  /**
   * @TransactionByLockHash
   * @property consumedBy
   * @property createdBy
   */
  interface TransactionByLockHash {
    consumedBy: null | TransactionPoint
    createdBy: TransactionPoint
  }
  type TransactionsByLockHash = TransactionByLockHash[]
  /**
   * @typedef BlockHeader, header of a block
   * @property compactTarget
   * @property dao
   * @property epoch
   * @property hash
   * @property number
   * @property parentHash
   * @property proposalsHash
   * @property nonce
   * @property timestamp
   * @property transactionsRoot
   * @property extraHash
   * @property version
   */
  interface BlockHeader {
    compactTarget: Hash
    dao: DAO
    epoch: EpochInHeader
    hash: Hash256
    number: BlockNumber
    parentHash: Hash256
    proposalsHash: Hash256
    nonce: Nonce
    timestamp: Timestamp
    transactionsRoot: Hash256
    extraHash: Hash256
    version: Version
  }
  /**
   * @typedef UncleBlock, uncle block object
   * @property header, block header
   * @property proposals
   */
  interface UncleBlock {
    header: BlockHeader
    proposals: ProposalShortId[]
  }
  /**
   * @typedef Block, block object
   * @property header, block header
   * @property uncles, uncle blocks
   * @property transactions
   * @property proposals
   * @property extension
   */
  interface Block {
    header: BlockHeader
    uncles: UncleBlock[]
    transactions: Transaction[]
    proposals: ProposalShortId[]
    extension?: JsonBytes | null
  }
  /**
   * @typedef Cell, cell object
   * @property capacty, cell capacity
   * @property lock, lock hash
   */
  interface Cell extends CellOutput {}
  /**
   * @typeof Live Cell
   * @property data, the data and data hash of the live cell
   * @property output, the previous cell the live cell derives from
   */
  interface LiveCell {
    data?: {
      content: Hash
      hash: Hash256
    }
    output: CellOutput
  }
  /**
   * @typedef Cell, cell object
   * @property capacty, cell capacity
   * @property lock, lock hash
   * @property outPoint
   */
  interface CellIncludingOutPoint {
    blockHash: Hash256
    capacity: Capacity
    lock: Script
    outPoint: OutPoint | null
    cellbase: boolean
    outputDataLen: string
  }
  type TransactionTrace = {
    action: string
    info: string
    time: Timestamp
  }[]
  enum CellStatus {
    Live = 'live',
    Unknown = 'unknown',
  }
  interface LiveCellByLockHash {
    cellOutput: CellOutput
    createdBy: TransactionPoint
    cellbase: boolean
    outputDataLen: string
  }
  type LiveCellsByLockHash = LiveCellByLockHash[]
  interface AlertMessage {
    id: string
    priority: string
    noticeUntil: Timestamp
    message: string
  }
  interface BlockchainInfo {
    isInitialBlockDownload: boolean
    epoch: string
    difficulty: string
    medianTime: string
    chain: string
    alerts: AlertMessage[]
  }
  interface LocalNodeInfo {
    active: boolean
    addresses: Record<'address' | 'score', string>[]
    connections: string
    nodeId: string
    protocols: {
      id: string
      name: string
      supportVersions: string[]
    }[]
    version: string
  }
  interface RemoteNodeInfo {
    addresses: Record<'address' | 'score', string>[]
    connectedDuration: string
    isOutbound: boolean
    lastPingDuration: string
    nodeId: string
    protocols: Record<'id' | 'version', string>[]
    syncState: Record<
      | 'bestKnownHeaderHash'
      | 'bestKnownHeaderNumber'
      | 'canFetchCount'
      | 'inflightCount'
      | 'lastCommonHeaderHash'
      | 'lastCommonHeaderNumber'
      | 'unknownHeaderListSize',
      string | null
    >
    version: string
  }
  interface PeersState {
    lastUpdated: string
    blocksInFlight: string
    peer: string
  }
  interface TxPoolInfo {
    lastTxsUpdatedAt: Timestamp
    minFeeRate: string
    orphan: Count
    pending: Count
    proposed: Count
    tipHash: Hash256
    tipNumber: BlockNumber
    totalTxCycles: Cycles
    totalTxSize: Size
  }
  enum CapacityUnit {
    Shannon = 1,
    Byte = 100000000,
  }
  interface Epoch {
    compactTarget: Hash
    length: String
    number: String
    startNumber: String
  }
  interface RunDryResult {
    cycles: Cycles
  }
  interface LockHashIndexState {
    blockHash: Hash256
    blockNumber: BlockNumber
    lockHash: Hash256
  }
  type LockHashIndexStates = LockHashIndexState[]
  interface BannedAddress {
    address: string
    banReason: string
    banUntil: Timestamp
    createdAt: Timestamp
  }
  type BannedAddresses = BannedAddress[]
  interface CellbaseOutputCapacityDetails {
    primary: string
    proposalReward: string
    secondary: string
    total: string
    txFee: string
  }
  interface FeeRate {
    feeRate: string
  }
  type BytesOpt = Bytes | undefined
  interface WitnessArgs {
    lock: BytesOpt
    inputType: BytesOpt
    outputType: BytesOpt
  }
  interface RawTransactionToSign extends Omit<RawTransaction, 'witnesses'> {
    witnesses: (WitnessArgs | Witness)[]
  }
  interface CapacityByLockHash {
    blockNumber: BlockNumber
    capacity: Capacity
    cellsCount: string
  }
  interface BlockEconomicState {
    finalizedAt: string
    issuance: {
      primary: string
      secondary: string
    }
    minerReward: {
      committed: string
      primary: string
      proposal: string
      secondary: string
    }
    txsFee: string
  }
  interface SyncState {
    bestKnownBlockNumber: string
    bestKnownBlockTimestamp: string
    fastTime: string
    ibd: boolean
    inflightBlocksCount: string
    lowTime: string
    normalTime: string
    orphanBlocksCount: string
  }
  interface TransactionProof {
    blockHash: Hash
    proof: {
      indices: Number[]
      lemmas: Hash[]
    }
    witnessesRoot: Hash
  }
  type TxPoolIds = Record<'pending' | 'proposed', Array<Hash256>>
  interface TxVerbosity {
    cycles: Cycles
    size: Size
    fee: Capacity
    ancestorsSize: Size
    ancestorsCycles: Cycles
    ancestorsCount: Count
  }
  type TxPoolVerbosity = Record<'pending' | 'proposed', Record<Hash256, TxVerbosity>>
  type RawTxPool = TxPoolIds | TxPoolVerbosity
  interface Consensus {
    id: string
    genesisHash: Hash256
    hardforkFeatures: Array<{
      rfc: string
      epochNumber: string | null
    }>
    daoTypeHash: Hash256 | null
    secp256k1Blake160SighashAllTypeHash: Hash256 | null
    secp256k1Blake160MultisigAllTypeHash: Hash256 | null
    initialPrimaryEpochReward: Capacity
    secondaryEpochReward: Capacity
    maxUnclesNum: string
    orphanRateTarget: RationalU256
    epochDurationTarget: string
    txProposalWindow: ProposalWindow
    proposerRewardRatio: RationalU256
    cellbaseMaturity: EpochNumberWithFraction
    medianTimeBlockCount: Count
    maxBlockCycles: Cycles
    maxBlockBytes: string
    blockVersion: Version
    txVersion: Version
    typeIdCodeHash: Hash256
    maxBlockProposalsLimit: string
    primaryEpochRewardHalvingInterval: string
    permanentDifficultyInDummy: boolean
  }
  /**
   * FeeRateStatistics
   * mean: Uint64 - mean
   * median: Uint64 - median
   */
  type FeeRateStats = {
    mean: string
    median: string
  }
}

interface DepCellInfo {
  hashType: CKBComponents.ScriptHashType
  codeHash: CKBComponents.Hash256
  typeHash?: CKBComponents.Hash256
  outPoint: CKBComponents.OutPoint
  depType: CKBComponents.DepType
}
type StructuredWitness = CKBComponents.WitnessArgs | CKBComponents.Witness
declare namespace LoadCellsParams {
  interface Base {
    start?: string | bigint
    end?: string | bigint
  }
  export interface Normal extends Base {
    lockHash: CKBComponents.Hash
    start?: string | bigint
    end?: string | bigint
    STEP?: string | bigint
  }
  export interface FromIndexer extends Base {
    lock: CKBComponents.Script
    indexer: any
    CellCollector: any
  }
  export {}
}
declare namespace RawTransactionParams {
  type LockHash = string
  type Capacity = string | bigint
  type Cell = {
    data: string
    lock: CKBComponents.Script
    type?: CKBComponents.Script
    capacity: CKBComponents.Capacity
    outPoint: CKBComponents.OutPoint
  }
  type Fee =
    | Capacity
    | {
        feeRate: Capacity
        reconciler: (params: {
          tx: CKBComponents.RawTransactionToSign
          feeRate: Capacity
          changeThreshold: Capacity
          cells: Array<{
            capacity: string
            outPoint: CKBComponents.OutPoint
          }>
          extraCount: number
        }) => CKBComponents.RawTransactionToSign
      }
  interface Base {
    fee?: Fee
    safeMode: boolean
    deps: DepCellInfo | DepCellInfo[]
    capacityThreshold?: Capacity
    changeThreshold?: Capacity
    changeLockScript?: CKBComponents.Script
    witnesses?: Array<CKBComponents.WitnessArgs | CKBComponents.Witness>
    outputsData?: Array<string>
  }
  interface Simple extends Base {
    inputScript: CKBComponents.Script
    outputScript: CKBComponents.Script
    capacity: Capacity
    cells?: Cell[]
  }
  interface Output {
    capacity: string | bigint
    lock: CKBComponents.Script
    type?: CKBComponents.Script | null
  }
  interface Complex extends Base {
    inputScripts: CKBComponents.Script[]
    outputs: Output[]
    cells?: Map<LockHash, Cell[]>
  }
}

/**
 * @see https://github.com/nervosnetwork/ckb/blob/develop/util/jsonrpc-types/src/blockchain.rs
 */

declare namespace RPC {
  type ProposalShortId = CKBComponents.ProposalShortId
  type Number = CKBComponents.Number
  type UInt32 = CKBComponents.UInt32
  type Count = CKBComponents.Count
  type DAO = CKBComponents.DAO
  type Hash = CKBComponents.Hash
  type Hash256 = CKBComponents.Hash256
  type Version = CKBComponents.Version
  type Capacity = CKBComponents.Capacity
  type Witness = CKBComponents.Witness
  type Bytes = CKBComponents.Bytes
  type Index = CKBComponents.Index
  type Since = CKBComponents.Since
  type Timestamp = CKBComponents.Timestamp
  type BlockNumber = CKBComponents.BlockNumber
  type EpochInHeader = string
  type Difficulty = CKBComponents.Difficulty
  type Cycles = CKBComponents.Cycles
  type Size = CKBComponents.Size
  type RationalU256 = CKBComponents.RationalU256
  type ProposalWindow = CKBComponents.ProposalWindow
  type EpochNumberWithFraction = CKBComponents.EpochNumberWithFraction
  type JsonBytes = CKBComponents.JsonBytes
  type ScriptHashType = CKBComponents.ScriptHashType
  type DepType = 'code' | 'dep_group'
  interface Script {
    args: Bytes
    code_hash: Hash256
    hash_type: ScriptHashType
  }
  interface OutPoint {
    tx_hash: Hash256
    index: Index
  }
  interface CellInput {
    previous_output: OutPoint | null
    since: Since
  }
  interface CellOutput {
    capacity: Capacity
    lock: Script
    type?: Script | null
  }
  type Cell = CellOutput
  interface LiveCell {
    data?: {
      content: Hash
      hash: Hash256
    }
    output: CellOutput
  }
  interface CellDep {
    out_point: OutPoint | null
    dep_type: DepType
  }
  interface CellIncludingOutPoint {
    block_hash: Hash256
    capacity: Capacity
    lock: Script
    out_point: OutPoint | null
    cellbase: boolean
    output_data_len: string
  }
  interface RawTransaction {
    version: Version
    cell_deps: CellDep[]
    header_deps: Hash256[]
    inputs: CellInput[]
    outputs: CellOutput[]
    witnesses: Witness[]
    outputs_data: Bytes[]
  }
  interface Transaction extends RawTransaction {
    hash: Hash256
  }
  interface TransactionWithStatus {
    transaction: Transaction
    tx_status:
      | {
          block_hash: Hash256
          status: CKBComponents.TransactionStatus.Committed
        }
      | {
          block_hash: null
          status: CKBComponents.TransactionStatus.Pending | CKBComponents.TransactionStatus.Proposed
        }
  }
  interface TransactionPoint {
    block_number: BlockNumber
    index: Index
    tx_hash: Hash256
  }
  interface TransactionByLockHash {
    consumed_by: null | TransactionPoint
    created_by: TransactionPoint
  }
  type TransactionsByLockHash = TransactionByLockHash[]
  interface LiveCellByLockHash {
    cell_output: CellOutput
    created_by: TransactionPoint
    cellbase: boolean
    output_data_len: string
  }
  type LiveCellsByLockHash = LiveCellByLockHash[]
  interface Header {
    compact_target: Hash
    dao: DAO
    epoch: EpochInHeader
    hash: Hash256
    number: BlockNumber
    parent_hash: Hash256
    proposals_hash: Hash256
    nonce: CKBComponents.Nonce
    timestamp: Timestamp
    transactions_root: Hash256
    extra_hash: Hash256
    version: Version
  }
  interface UncleBlock {
    header: Header
    proposals: ProposalShortId[]
  }
  interface Block {
    header: Header
    uncles: UncleBlock[]
    transactions: Transaction[]
    proposals: ProposalShortId[]
    extension?: JsonBytes | null
  }
  interface AlertMessage {
    id: string
    priority: string
    notice_until: Timestamp
    message: string
  }
  interface BlockchainInfo {
    is_initial_block_download: boolean
    epoch: string
    difficulty: string
    median_time: string
    chain: string
    alerts: AlertMessage[]
  }
  interface LocalNodeInfo {
    active: boolean
    addresses: Record<'address' | 'score', string>[]
    connections: string
    node_id: string
    protocols: {
      id: string
      name: string
      support_versions: string[]
    }[]
    version: string
  }
  interface RemoteNodeInfo {
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
  interface PeersState {
    last_updated: string
    blocks_in_flight: string
    peer: string
  }
  interface TxPoolInfo {
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
  interface Epoch {
    compact_target: Hash
    length: string
    number: string
    start_number: string
  }
  interface LockHashIndexState {
    block_hash: Hash256
    block_number: BlockNumber
    lock_hash: Hash256
  }
  type LockHashIndexStates = LockHashIndexState[]
  interface BannedAddress {
    address: string
    ban_reason: string
    ban_until: Timestamp
    created_at: Timestamp
  }
  type BannedAddresses = BannedAddress[]
  interface CellbaseOutputCapacityDetails {
    primary: string
    proposal_reward: string
    secondary: string
    total: string
    tx_fee: string
  }
  interface FeeRate {
    fee_rate: string
  }
  type FeeRateStats = {
    mean: string
    median: string
  }
  interface CapacityByLockHash {
    block_number: BlockNumber
    capacity: Capacity
    cells_count: string
  }
  interface BlockEconomicState {
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
  interface SyncState {
    best_known_block_number: string
    best_known_block_timestamp: string
    fast_time: string
    ibd: boolean
    inflight_blocks_count: string
    low_time: string
    normal_time: string
    orphan_blocks_count: string
  }
  interface TransactionProof {
    block_hash: Hash
    proof: {
      indices: Number[]
      lemmas: Hash[]
    }
    witnesses_root: Hash
  }
  type TxPoolIds = Record<'pending' | 'proposed', Array<Hash256>>
  interface TxVerbosity {
    cycles: Cycles
    size: Size
    fee: Capacity
    ancestors_size: Size
    ancestors_cycles: Cycles
    ancestors_count: Count
  }
  type TxPoolVerbosity = Record<'pending' | 'proposed', Record<Hash256, TxVerbosity>>
  type RawTxPool = TxPoolIds | TxPoolVerbosity
  interface Consensus {
    id: string
    genesis_hash: Hash256
    hardfork_features: Array<{
      rfc: string
      epoch_number: string | null
    }>
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

type MultisigConfig = {
  r: number
  m: number
  n: number
  blake160s: string[]
}
declare function isMultisigConfig(config: any): config is MultisigConfig
type Signatures = Record<CKBComponents.Hash, CKBComponents.Bytes[]>
declare enum SignStatus {
  Signed = 'Signed',
  Unsigned = 'Unsigned',
  PartiallySigned = 'PartiallySigned',
}
declare const serializeMultisigConfig: (config: MultisigConfig) => string
declare const hashMultisig: (config: MultisigConfig) => string
declare const getMultisigStatus: (config: MultisigConfig, signatures?: CKBComponents.Bytes[]) => SignStatus

type SignatureProvider = string | ((message: string | Uint8Array) => string)
type TransactionHash$1 = string
declare function signWitnessGroup(
  sk: SignatureProvider,
  transactionHash: TransactionHash$1,
  witnessGroup: StructuredWitness[],
  multisigConfig?: MultisigConfig,
): StructuredWitness[]
declare function signWitnessGroup(
  sk: (message: string | Uint8Array, witness: StructuredWitness[]) => Promise<string>,
  transactionHash: TransactionHash$1,
  witnessGroup: StructuredWitness[],
  multisigConfig?: MultisigConfig,
): Promise<StructuredWitness[]>

type LockHash$1 = string
type TransactionHash = string
type CachedLock = {
  lock: CKBComponents.Script
}
type MultisigOption = {
  sk: SignatureProvider
  blake160: string
  config: MultisigConfig
  signatures: string[]
}
type SignWitnessesKey = SignatureProvider | Map<LockHash$1, SignatureProvider | MultisigOption>
interface SignWitnesses {
  (
    key: SignatureProvider,
  ): (params: { transactionHash: TransactionHash; witnesses: StructuredWitness[] }) => StructuredWitness[]
  (
    key: Map<LockHash$1, SignatureProvider | MultisigOption>,
  ): (params: {
    transactionHash: TransactionHash
    witnesses: StructuredWitness[]
    inputCells: CachedLock[]
    skipMissingKeys: boolean
  }) => StructuredWitness[]
  (
    key: SignWitnessesKey,
  ): (params: {
    transactionHash: TransactionHash
    witnesses: StructuredWitness[]
    inputCells?: CachedLock[]
    skipMissingKeys?: boolean
  }) => StructuredWitness[]
}
declare const isMap: <K = any, V = any>(val: any) => val is Map<K, V>
declare const signWitnesses: SignWitnesses

interface RpcProperties {
  [name: string]: Omit<CKBComponents.Method, 'name'>
}
interface Base {
  /**
   * @method getTipBlockNumber
   * @memberof DefaultRPC
   * @description rpc to get the number of blocks in the longest blockchain
   * @return {Promise<string>} block number
   */
  getTipBlockNumber: () => Promise<CKBComponents.BlockNumber>
  /**
   * @method getTipHeader
   * @memberof DefaultRPC
   * @description rpc to get the tip header of the longeest blockchain
   * @return {Promise<object>} block header
   */
  getTipHeader: () => Promise<CKBComponents.BlockHeader>
  /**
   * @method getCurrentEpoch
   * @memberof DefaultRPC
   * @description rpc to get the epoch info about the current epoch
   * @return {Promise<object>} epoch info, including block reward, difficulty, last_block_hash_in_previous_epoch,
   *                           length, number, remainder reward, start number
   */
  getCurrentEpoch: () => Promise<CKBComponents.Epoch>
  /**
   * @method getEpochByNumber
   * @memberof DefaultRPC
   * @description rpc to get the epoch info by its number
   * @return {Promise<object>} epoch info
   */
  getEpochByNumber: (epoch: string | bigint) => Promise<CKBComponents.Epoch>
  /**
   * @method getBlockHash
   * @memberof DefaultRPC
   * @description rpc to get the block hash by block number
   * @param {string} hash - block hash
   * @return {Promise<string>} block hash
   */
  getBlockHash: (number: CKBComponents.BlockNumber | bigint) => Promise<CKBComponents.Hash>
  /**
   * @method getBlock
   * @memberof DefaultRPC
   * @description rpc to get block by its hash
   * @param {string} hash - the block hash of the target block
   * @returns {Promise<object>} block object
   */
  getBlock: (hash: CKBComponents.Hash) => Promise<CKBComponents.Block>
  /**
   * @method getHeader
   * @memberof DefaultRPC
   * @description Returns the information about a block header by hash.
   * @params {Promise<string>} block hash
   */
  getHeader: (blockHash: CKBComponents.Hash) => Promise<CKBComponents.BlockHeader>
  /**
   * @method getHeaderByNumber
   * @memberof DefaultRPC
   * @description Returns the information about a block header by block number
   * @params {Promise<string>} block number
   */
  getHeaderByNumber: (blockNumber: CKBComponents.BlockNumber | bigint) => Promise<CKBComponents.BlockHeader>
  /**
   * @method getLiveCell
   * @memberof DefaultRPC
   * @description rpc to get a cell by outPoint, the meaning of outPoint could be found in ckb-types,
   *              please distinguish outPoint and cellOutPoint
   * @param {object} outPoint - cell's outPoint
   * @param {boolean} withData - set withData to true to return cell data and data hash if the cell is live
   * @return {Promise<object>} liveCellWithStatus
   */
  getLiveCell: (
    outPoint: CKBComponents.OutPoint,
    withData: boolean,
  ) => Promise<{
    cell: CKBComponents.LiveCell
    status: CKBComponents.CellStatus
  }>
  /**
   * @method getTransaction
   * @memberof DefaultRPC
   * @description rpc to get trasnaction wtih its status by its hash
   * @param {string} hash - the transaction hash of the target transaction
   * @return {Promise<object>} transaction object with transaction status
   */
  getTransaction: (hash: CKBComponents.Hash) => Promise<CKBComponents.TransactionWithStatus>
  /**
   * @method getCellbaseOutputCapacityDetails
   * @memberof DefaultRPC
   * @description Returns each component of the created CKB in this block's cellbase, which is issued to
   *              a block N - 1 - ProposalWindow.farthest, where this block's height is N.
   * @param {string} blockHash
   *
   * @deprecated will be removed from v0.41.0
   */
  getCellbaseOutputCapacityDetails: (
    blockHash: CKBComponents.Hash,
  ) => Promise<CKBComponents.CellbaseOutputCapacityDetails>
  /**
   * @method getBlockEconomicState
   * @memberof DefaultRPC
   * @description
   * @param {string} blockHash
   * @returns {Promise<BlockEconomicState>}
   */
  getBlockEconomicState: (blockHash: CKBComponents.Hash) => Promise<CKBComponents.BlockEconomicState>
  /**
   * @method getTransactionProof
   * @memberof DefaultRPC
   * @description request merkle proof that transactions are included in a block
   * @param {Array<string>} transactionHashes - transaction hashes, all transactions must be in the same block
   * @param {Promise<[string]>} blockHash - if specified, looks for transactions in the block with this hash
   */
  getTransactionProof: (
    transactionHashes: CKBComponents.Hash[],
    blockHash?: CKBComponents.Hash,
  ) => Promise<CKBComponents.TransactionProof>
  /**
   * @method verifyTransactionProof
   * @memberof DefaultRPC
   * @description verifies that a proof points to transactions in a block, returns transactions it commits to.
   * @param {object} transactionProof
   * @returns {Promise<Array<string>>} hash list of transactions committed in the block
   */
  verifyTransactionProof: (transactionProof: CKBComponents.TransactionProof) => Promise<CKBComponents.Hash[]>
  /**
   * @method getConsensus
   * @memberof DefaultRPC
   * @description return various consensus parameters.
   * @returns {Promise<object>} consensus parameters
   */
  getConsensus: () => Promise<CKBComponents.Consensus>
  /**
   * @method getBlockByNumber
   * @memberof DefaultRPC
   * @description rpc to get block by its number
   * @param {string} number - the block number of the target block
   * @returns {Promise<object>} block object
   */
  getBlockByNumber: (number: CKBComponents.BlockNumber | bigint) => Promise<CKBComponents.Block>
  /**
   * @method dryRunTransaction
   * @memberof DefaultRPC
   * @description dry run the transaction and return the execution cycles, this method will not check the transaction
   *              validaty, but only run the lock script and type script and then return the execution cycles.
   * @param {object} rawTrasnaction - the raw transaction whose cycles is going to be calculated
   * @return {Promise<object>} dry run result, including cycles the transaction used.
   */
  dryRunTransaction: (tx: CKBComponents.RawTransaction) => Promise<CKBComponents.RunDryResult>
  calculateDaoMaximumWithdraw: (
    outPoint: CKBComponents.OutPoint,
    withdrawBlockHash: CKBComponents.Hash256,
  ) => Promise<string>
  /**
   * @method localNodeInfo
   * @memberof DefaultRPC
   * @description rpc to get the local node information
   * @return {Promise<object>} node info, including addresses, is_outbound, node id, and version
   */
  localNodeInfo: () => Promise<CKBComponents.LocalNodeInfo>
  /**
   * @method getPeers
   * @memberof DefaultRPC
   * @description rpc to get connected peers info
   * @return {Promise<object[]>} peers' node info
   *
   * @deprecated will be removed from v0.41.0
   */
  getPeers: () => Promise<CKBComponents.RemoteNodeInfo[]>
  /**
   * @method getBannedAddresses
   * @memberof DefaultRPC
   * @description Returns all banned IPs/Subnets
   */
  getBannedAddresses: () => Promise<CKBComponents.BannedAddresses>
  /**
   * @method clearBannedAddresses
   * @memberof DefaultRPC
   * @description clear all banned IPs/Subnets
   * @returns <null>
   */
  clearBannedAddresses: () => Promise<null>
  /**
   * @method setBan
   * @memberof DefaultRPC
   * @description insert or delete an IP/Subnet from the banned list
   * @param {string} address, The IP/Subnet with an optional netmask (default is /32 = single IP)
   * @param {insert|delete} command, `insert` to insert an IP/Subnet to the list, `delete` to delete an IP/Subnet
   *                                 from the list
   * @param {string|null} ban_time, Time in milliseconds how long (or until when if [absolute] is set) the IP is banned,
   *                                optional parameter, null means using the default time of 24h
   * @param {[boolean]} absolute, If set, the `ban_time` must be an absolute timestamp in milliseconds since epoch,
   *                              optional parameter
   * @param {[string]} reason, Ban reason, optional parameter
   */
  setBan: (
    address: string,
    command: 'insert' | 'delete',
    banTime: string | null,
    absolute?: boolean,
    reason?: string,
  ) => Promise<null>
  /**
   * @method syncState
   * @memberof DefaultRPC
   * @description return sync state of this node
   */
  syncState: () => Promise<CKBComponents.SyncState>
  /**
   * @method setNetworkActive
   * @memberof DefaultRPC
   * @description disable/enable all p2p network activity
   * @param {boolean} state - true to enable networking, false to disable
   */
  setNetworkActive: (state: boolean) => Promise<null>
  /**
   * @method addNode
   * @memberof DefaultRPC
   * @description attempt to add a node to the peer list and try to connect
   * @param {string} peerId - the peer id of target node
   * @param {string} address - the address of target node
   * @returns {Promise<null>}
   */
  addNode: (peerId: string, address: string) => Promise<null>
  /**
   * @method removeNode
   * @memberof DefaultRPC
   * @description attempt to remove a node from the peer list and try to disconnect
   * @param {string} peerId - the peer id of the target node
   * @returns {Promise<null>}
   */
  removeNode: (peerId: string) => Promise<null>
  /**
   * @method pingPeers
   * @memberof DefaultRPC
   * @description request a ping sent to all connected peers to measure ping time
   * @returns {Promise<null>}
   */
  pingPeers: () => Promise<null>
  /**
   * @method sendTransaction
   * @memberof DefaultRPC
   * @description rpc to send a new transaction into transaction pool
   * @param {object} rawTransaction - a raw transaction includes cell deps, inputs, outputs, version, and witnesses,
   *                                  detailed info could be found in ckb-types
   * @param {string} [outputsValidator] - Validates the transaction outputs before entering the tx-pool,
   *                                  an optional string parameter (enum: default | passthrough ),
   *                                  null and passthrough mean skipping outputs validation
   * @return {Promise<string>} transaction hash
   */
  sendTransaction: (
    tx: CKBComponents.RawTransaction,
    outputsValidator?: CKBComponents.OutputsValidator,
  ) => Promise<CKBComponents.Hash>
  /**
   * @method txPoolInfo
   * @memberof DefaultRPC
   * @description rpc to get pool information
   * @return {Promise<object>} info of transaction pool, including last_txs_updated_at, number of orphan,
   *                           number of pending, number of proposed
   */
  txPoolInfo: () => Promise<CKBComponents.TxPoolInfo>
  /**
   * @method clearTxPool
   * @memberof DefaultRPC
   * @description remove all transactions from the tx pool
   * @return {Promise<null>}
   */
  clearTxPool: () => Promise<null>
  /**
   * @method getRawTxPool
   * @memberof DefaultRPC
   * @param {boolean | null} verbose - true for a json object, false for array of transaction ids, default=false
   * @description Returns all transaction ids in tx pool as a json array of string transaction ids.
   * @return {Promise<object>} CKBComponents.RawTxPool
   */
  getRawTxPool(): Promise<CKBComponents.TxPoolIds>
  getRawTxPool(verbose: true): Promise<CKBComponents.TxPoolVerbosity>
  getRawTxPool(verbose: false | null): Promise<CKBComponents.TxPoolIds>
  /**
   * @method getBlockchainInfo
   * @memberof DefaultRPC
   * @description rpc to get state info of the blockchain
   * @return {Promise<object>} blockchain info, including chain name, difficulty, epoch number,
   *                           is_initial_block_download, median time, warnings
   */
  getBlockchainInfo: () => Promise<CKBComponents.BlockchainInfo>
  getFeeRateStats: () => Promise<CKBComponents.FeeRateStats | null>
}
declare class Base {
  #private
  get rpcProperties(): RpcProperties
}

declare const toNumber: (number: RPC.BlockNumber) => CKBComponents.BlockNumber
declare const toHash: (hash: RPC.Hash256) => CKBComponents.Hash256
declare const toHeader: (header: RPC.Header) => CKBComponents.BlockHeader
declare const toScript: (script: RPC.Script) => CKBComponents.Script
declare const toInput: (input: RPC.CellInput) => CKBComponents.CellInput
declare const toOutput: (output: RPC.CellOutput) => CKBComponents.CellOutput
declare const toOutPoint: (outPoint: RPC.OutPoint | null) => CKBComponents.OutPoint | null
declare const toDepType: (type: RPC.DepType) => 'code' | 'depGroup'
declare const toCellDep: (cellDep: RPC.CellDep) => CKBComponents.CellDep
declare function toTransaction(tx: RPC.RawTransaction): CKBComponents.RawTransaction
declare function toTransaction(tx: RPC.Transaction): CKBComponents.Transaction
declare const toUncleBlock: (uncleBlock: RPC.UncleBlock) => CKBComponents.UncleBlock
declare const toBlock: (block: RPC.Block) => CKBComponents.Block
declare const toAlertMessage: (alertMessage: RPC.AlertMessage) => CKBComponents.AlertMessage
declare const toBlockchainInfo: (info: RPC.BlockchainInfo) => CKBComponents.BlockchainInfo
declare const toLocalNodeInfo: (info: RPC.LocalNodeInfo) => CKBComponents.LocalNodeInfo
declare const toRemoteNodeInfo: (info: RPC.RemoteNodeInfo) => CKBComponents.RemoteNodeInfo
declare const toTxPoolInfo: (info: RPC.TxPoolInfo) => CKBComponents.TxPoolInfo
declare const toPeers: (nodes: RPC.RemoteNodeInfo[]) => CKBComponents.RemoteNodeInfo[]
declare const toCell: (cell: RPC.Cell) => CKBComponents.Cell
declare const toLiveCell: (liveCell: RPC.LiveCell) => CKBComponents.LiveCell
declare const toLiveCellWithStatus: (cellWithStatus: { cell: RPC.LiveCell; status: string }) => {
  cell: CKBComponents.LiveCell
  status: string
}
declare const toCells: (cells: RPC.Cell[]) => CKBComponents.Cell[]
declare const toCellIncludingOutPoint: (cell: RPC.CellIncludingOutPoint) => {
  capacity: RPC.Capacity
  cellbase: boolean
  blockHash: string
  lock: CKBComponents.Script
  outPoint: CKBComponents.OutPoint | null
  outputDataLen: string
}
declare const toCellsIncludingOutPoint: (cells: RPC.CellIncludingOutPoint[]) => CKBComponents.CellIncludingOutPoint[]
declare const toTransactionWithStatus: (txWithStatus: RPC.TransactionWithStatus) => {
  transaction: CKBComponents.RawTransaction
  txStatus: {
    blockHash: string | null
    status: CKBComponents.TransactionStatus
  }
}
declare const toEpoch: (epoch: RPC.Epoch) => CKBComponents.Epoch
declare const toTransactionPoint: (transactionPoint: RPC.TransactionPoint) => CKBComponents.TransactionPoint
declare const toTransactionsByLockHash: (
  transactions: RPC.TransactionsByLockHash,
) => CKBComponents.TransactionsByLockHash
declare const toLiveCellsByLockHash: (cells: RPC.LiveCellsByLockHash) => CKBComponents.LiveCellsByLockHash
declare const toLockHashIndexState: (index: RPC.LockHashIndexState) => CKBComponents.LockHashIndexState
declare const toLockHashIndexStates: (states: RPC.LockHashIndexStates) => CKBComponents.LockHashIndexStates
declare const toBannedAddress: (bannedAddress: RPC.BannedAddress) => CKBComponents.BannedAddress
declare const toBannedAddresses: (bannedAddresses: RPC.BannedAddresses) => CKBComponents.BannedAddresses
declare const toCellbaseOutputCapacityDetails: (
  details: RPC.CellbaseOutputCapacityDetails,
) => CKBComponents.CellbaseOutputCapacityDetails
declare const toFeeRate: (feeRateObj: RPC.FeeRate) => CKBComponents.FeeRate
declare const toCapacityByLockHash: (capacityByLockHash: RPC.CapacityByLockHash) => CKBComponents.CapacityByLockHash
declare const toBlockEconomicState: (blockEconomicState: RPC.BlockEconomicState) => CKBComponents.BlockEconomicState
declare const toSyncState: (state: RPC.SyncState) => CKBComponents.SyncState
declare const toTransactionProof: (proof: RPC.TransactionProof) => CKBComponents.TransactionProof
declare const toConsensus: (consensus: RPC.Consensus) => CKBComponents.Consensus
declare const toRawTxPool: (rawTxPool: RPC.RawTxPool) => CKBComponents.RawTxPool

declare const resultFormatter_toAlertMessage: typeof toAlertMessage
declare const resultFormatter_toBannedAddress: typeof toBannedAddress
declare const resultFormatter_toBannedAddresses: typeof toBannedAddresses
declare const resultFormatter_toBlock: typeof toBlock
declare const resultFormatter_toBlockEconomicState: typeof toBlockEconomicState
declare const resultFormatter_toBlockchainInfo: typeof toBlockchainInfo
declare const resultFormatter_toCapacityByLockHash: typeof toCapacityByLockHash
declare const resultFormatter_toCell: typeof toCell
declare const resultFormatter_toCellDep: typeof toCellDep
declare const resultFormatter_toCellIncludingOutPoint: typeof toCellIncludingOutPoint
declare const resultFormatter_toCellbaseOutputCapacityDetails: typeof toCellbaseOutputCapacityDetails
declare const resultFormatter_toCells: typeof toCells
declare const resultFormatter_toCellsIncludingOutPoint: typeof toCellsIncludingOutPoint
declare const resultFormatter_toConsensus: typeof toConsensus
declare const resultFormatter_toDepType: typeof toDepType
declare const resultFormatter_toEpoch: typeof toEpoch
declare const resultFormatter_toFeeRate: typeof toFeeRate
declare const resultFormatter_toHash: typeof toHash
declare const resultFormatter_toHeader: typeof toHeader
declare const resultFormatter_toInput: typeof toInput
declare const resultFormatter_toLiveCell: typeof toLiveCell
declare const resultFormatter_toLiveCellWithStatus: typeof toLiveCellWithStatus
declare const resultFormatter_toLiveCellsByLockHash: typeof toLiveCellsByLockHash
declare const resultFormatter_toLocalNodeInfo: typeof toLocalNodeInfo
declare const resultFormatter_toLockHashIndexState: typeof toLockHashIndexState
declare const resultFormatter_toLockHashIndexStates: typeof toLockHashIndexStates
declare const resultFormatter_toNumber: typeof toNumber
declare const resultFormatter_toOutPoint: typeof toOutPoint
declare const resultFormatter_toOutput: typeof toOutput
declare const resultFormatter_toPeers: typeof toPeers
declare const resultFormatter_toRawTxPool: typeof toRawTxPool
declare const resultFormatter_toRemoteNodeInfo: typeof toRemoteNodeInfo
declare const resultFormatter_toScript: typeof toScript
declare const resultFormatter_toSyncState: typeof toSyncState
declare const resultFormatter_toTransaction: typeof toTransaction
declare const resultFormatter_toTransactionPoint: typeof toTransactionPoint
declare const resultFormatter_toTransactionProof: typeof toTransactionProof
declare const resultFormatter_toTransactionWithStatus: typeof toTransactionWithStatus
declare const resultFormatter_toTransactionsByLockHash: typeof toTransactionsByLockHash
declare const resultFormatter_toTxPoolInfo: typeof toTxPoolInfo
declare const resultFormatter_toUncleBlock: typeof toUncleBlock
declare namespace resultFormatter {
  export {
    resultFormatter_toAlertMessage as toAlertMessage,
    resultFormatter_toBannedAddress as toBannedAddress,
    resultFormatter_toBannedAddresses as toBannedAddresses,
    resultFormatter_toBlock as toBlock,
    resultFormatter_toBlockEconomicState as toBlockEconomicState,
    resultFormatter_toBlockchainInfo as toBlockchainInfo,
    resultFormatter_toCapacityByLockHash as toCapacityByLockHash,
    resultFormatter_toCell as toCell,
    resultFormatter_toCellDep as toCellDep,
    resultFormatter_toCellIncludingOutPoint as toCellIncludingOutPoint,
    resultFormatter_toCellbaseOutputCapacityDetails as toCellbaseOutputCapacityDetails,
    resultFormatter_toCells as toCells,
    resultFormatter_toCellsIncludingOutPoint as toCellsIncludingOutPoint,
    resultFormatter_toConsensus as toConsensus,
    resultFormatter_toDepType as toDepType,
    resultFormatter_toEpoch as toEpoch,
    resultFormatter_toFeeRate as toFeeRate,
    resultFormatter_toHash as toHash,
    resultFormatter_toHeader as toHeader,
    resultFormatter_toInput as toInput,
    resultFormatter_toLiveCell as toLiveCell,
    resultFormatter_toLiveCellWithStatus as toLiveCellWithStatus,
    resultFormatter_toLiveCellsByLockHash as toLiveCellsByLockHash,
    resultFormatter_toLocalNodeInfo as toLocalNodeInfo,
    resultFormatter_toLockHashIndexState as toLockHashIndexState,
    resultFormatter_toLockHashIndexStates as toLockHashIndexStates,
    resultFormatter_toNumber as toNumber,
    resultFormatter_toOutPoint as toOutPoint,
    resultFormatter_toOutput as toOutput,
    resultFormatter_toPeers as toPeers,
    resultFormatter_toRawTxPool as toRawTxPool,
    resultFormatter_toRemoteNodeInfo as toRemoteNodeInfo,
    resultFormatter_toScript as toScript,
    resultFormatter_toSyncState as toSyncState,
    resultFormatter_toTransaction as toTransaction,
    resultFormatter_toTransactionPoint as toTransactionPoint,
    resultFormatter_toTransactionProof as toTransactionProof,
    resultFormatter_toTransactionWithStatus as toTransactionWithStatus,
    resultFormatter_toTransactionsByLockHash as toTransactionsByLockHash,
    resultFormatter_toTxPoolInfo as toTxPoolInfo,
    resultFormatter_toUncleBlock as toUncleBlock,
  }
}

declare class Method {
  #private
  get name(): string
  constructor(node: CKBComponents.Node, options: CKBComponents.Method)
  call: (...params: (string | number | object)[]) => Promise<any>
  getPayload: (...params: (string | number | object)[]) => {
    id: number
    method: string
    params: any[]
    jsonrpc: string
  }
}

declare class BranchRPC extends Base {
  #private
  get node(): CKBComponents.Node
  get paramsFormatter(): {
    toOptional: (format?: Function) => (arg: any) => any
    toArray: (format?: (args: any) => any) => (arg: any) => any
    toHash: (hash: string) => RPC.Hash256
    toNumber: (number: CKBComponents.Number | bigint) => RPC.Number
    toScript: (script: CKBComponents.Script) => RPC.Script
    toOutPoint: (outPoint: CKBComponents.OutPoint | null) => RPC.OutPoint | null
    toInput: (input: CKBComponents.CellInput) => RPC.CellInput
    toOutput: (output: CKBComponents.CellOutput) => RPC.CellOutput
    toDepType: (type: CKBComponents.DepType) => 'code' | 'dep_group'
    toCellDep: (cellDep: CKBComponents.CellDep) => RPC.CellDep
    toRawTransaction: (transaction: CKBComponents.RawTransaction) => RPC.RawTransaction
    toPageNumber: (pageNo?: string | bigint) => string
    toPageSize: (pageSize?: string | bigint) => string
    toReverseOrder: (reverse?: boolean) => boolean
    toOutputsValidator: (outputsValidator: CKBComponents.OutputsValidator) => 'default' | 'passthrough' | undefined
    toBoolean: (value: boolean) => boolean
    toTransactionProof: (proof: CKBComponents.TransactionProof) => RPC.TransactionProof
  }
  get resultFormatter(): typeof resultFormatter
  constructor(url: string)
  setNode(node: CKBComponents.Node): CKBComponents.Node
  addMethod: (options: CKBComponents.Method) => void
  createBatchRequest: <N extends keyof Base, P extends (string | number | object)[], R = any[]>(
    params?: [method: N, ...rest: P][],
  ) => [method: N, ...rest: P][] & {
    add: (n: N, ...p: P) => [method: N, ...rest: P][]
    remove: (index: number) => [method: N, ...rest: P][]
    exec: () => Promise<R>
  }
}

declare enum AddressPrefix {
  Mainnet = 'ckb',
  Testnet = 'ckt',
}
declare enum AddressType {
  FullVersion = '0x00', // full version identifies the hash_type
  HashIdx = '0x01', // short version for locks with popular codehash
  DataCodeHash = '0x02', // full version with hash type 'Data', deprecated
  TypeCodeHash = '0x04',
}
declare enum Bech32Type {
  Bech32 = 'bech32',
  Bech32m = 'bech32m',
}
/**
 * @function scriptToAddress
 * @description The only way recommended to generated a full address of new version
 * @param {object} script
 * @param {booealn} isMainnet
 * @returns {string} address
 */
declare const scriptToAddress: (script: CKBComponents.Script, isMainnet?: boolean) => string
/**
 * 0x00 SECP256K1 + blake160
 * 0x01 SECP256k1 + multisig
 * 0x02 anyone_can_pay
 */
type CodeHashIndex = '0x00' | '0x01' | '0x02'
interface AddressOptions {
  prefix?: AddressPrefix
  type?: AddressType
  codeHashOrCodeHashIndex?: CodeHashIndex | CKBComponents.Hash256
}
/**
 * @function toAddressPayload
 * @description obsolete payload = type(01) | code hash index(00) | args(blake160-formatted pubkey)
 *             new payload = type(00) | code hash | hash type(00|01|02) | args
 * @see https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0021-ckb-address-format/0021-ckb-address-format.md
 * @param {string | Uint8Array} args, use as the identifier of an address, usually the public key hash is used.
 * @param {string} type, used to indicate which format is adopted to compose the address.
 * @param {string} codeHashOrCodeHashIndex, the referenced code hash or code hash index the address binds to,
 *                 default to be secp256k1 code hash/code hash index
 */
declare const toAddressPayload: (
  args: string | Uint8Array,
  type?: AddressType,
  codeHashOrCodeHashIndex?: CodeHashIndex | CKBComponents.Hash256,
  hashType?: CKBComponents.ScriptHashType,
) => Uint8Array
/**
 * @function bech32Address
 * @description generate the address by bech32 algorithm
 * @param args, used as the identifier of an address, usually the public key hash is used.
 * @param {[string]} prefix, the prefix precedes the address, default to be ckb.
 * @param {[string]} type, used to indicate which format is adopted to compose the address, default to be 0x01.
 * @param {[string]} codeHashOrCodeHashIndex, the referenced code hash or code hash index the address binds to,
 *                                            default to be 0x00.
 */
declare const bech32Address: (
  args: Uint8Array | string,
  { prefix, type, codeHashOrCodeHashIndex }?: AddressOptions,
) => string
/**
 * @deprecated
 * @name fullPayloadToAddress
 * @description deprecated method to generate the address with payload in full version format. Use scriptToAddress instead.
 * @param {string} args, used as the identifier of an address.
 * @param {[string]} prefix, the prefix precedes the address, default to be ckb.
 * @param {[string]} type, used to indicate which format the address conforms to, default to be 0x02,
 *                       with hash type of Data or with hash type of Type.
 * @param {string} codeHash, the code hash used in the full version payload.
 */
declare const fullPayloadToAddress: ({
  args,
  prefix,
  type,
  codeHash,
}: {
  args: string
  prefix?: AddressPrefix
  type?: AddressType.DataCodeHash | AddressType.TypeCodeHash
  codeHash: CKBComponents.Hash256
}) => string
declare const pubkeyToAddress: (pubkey: Uint8Array | string, options?: AddressOptions) => string
declare interface ParseAddress {
  (address: string): Uint8Array
  (address: string, encode: 'binary'): Uint8Array
  (address: string, encode: 'hex'): string
  (address: string, encode: 'binary' | 'hex'): Uint8Array | string
}
/**
 * @return addressPayload, consists of type | params | publicKeyHash
 *         e.g. 0x | 01 | 00 | e2fa82e70b062c8644b80ad7ecf6e015e5f352f6
 */
declare const parseAddress: ParseAddress
declare const addressToScript: (address: string) => CKBComponents.Script

declare const offsetSize = 4
declare const fullLengthSize = 4
declare const getOffsets: (elmLengths: number[]) => number[]
/**
 * @name serializeArray
 * @description The array is a fixed-size type: it has a fixed-size type and a fixed length.
 *              The size of an array is the size of inner type times the length.
 *              Serialize an array only need to serialize all items in it. No extra cost for array itself.
 */
declare const serializeArray: (array: string | Uint8Array) => string
/**
 * @name serializeStruct
 * @type Struct is a fixed-size type: all fields in struct is fixed-size,
 *              and it has a fixed quantity of fields.
 * @description The size of a struct is the sum of all fields' size.
 *              Serialize a struct only need to serialize all fields in it.
 *              No extra cost for struct itself.
 *              Fields in a struct are stored in the order they are declared.
 */
declare const serializeStruct: (struct: Map<string, string | Uint8Array>) => string
/**
 * @name serializeFixVec
 * @type FixVec, a fixed-size vector is a vector whose items have a fixed size
 * @tutorial There are two steps of serializing a serializeFixVec
 *           1. Serialize the length as a 32 bit unsigned integer in little-endian
 *           2. Serialize all items in it
 */
declare const serializeFixVec: (fixVec: string | (string | Uint8Array)[]) => string
/**
 * @name serializeDynVec
 * @type DynVec, a dynamic-size vector is a vector whose items have a dynamic size
 * @tutorial There are three steps of serializing a dynvec
 *           1. Serialize the full size in bytes as a 32 bit unsigned integer in little-endian
 *           2. Serialize all offset of the items as 32 bit unsigned integer in little-endian
 *           3. Serialize all items in it
 */
declare const serializeDynVec: (dynVec: (string | Uint8Array)[]) => string
/**
 * @name serializeTable
 * @type Table, the table is a dynamic-size type, It can be considered as a dynvec but the length is fixed.
 */
declare const serializeTable: (table: Map<string, string | Uint8Array>) => string
/**
 * @name serializeOption
 * @type Option is a dynamic-size type
 * @tutorial Serialize an option depends on whether it is empty or not
 *           1. if it's empty, there is zero bytes(the size is 0)
 *           2. if it's not empty, just serialize the inner item(the size is same as the inner item's size)
 */
declare const serializeOption: (innerItem?: string) => string

declare const serializeCodeHash: (codeHash: CKBComponents.Hash256) => string
declare const serializeHashType: (hashType: CKBComponents.ScriptHashType) => '0x00' | '0x01' | '0x02' | '0x04'
declare const serializeArgs: (args: string) => string
declare const serializeScript: (script: CKBComponents.Script) => string

declare const serializeVersion: (version: CKBComponents.Version) => string
declare const serializeOutPoint: (outPoint: CKBComponents.OutPoint | null) => string
declare const serializeDepType: (type: CKBComponents.DepType) => '0x00' | '0x01'
declare const serializeCellDep: (dep: CKBComponents.CellDep) => string
declare const serializeCellDeps: (cellDeps: CKBComponents.CellDep[]) => string
declare const serializeHeaderDeps: (deps: CKBComponents.Hash256[]) => string
declare const serializeInput: (input: CKBComponents.CellInput) => string
declare const serializeInputs: (inputs: CKBComponents.CellInput[]) => string
declare const serializeOutput: (output: CKBComponents.CellOutput) => string
declare const serializeOutputs: (outputs: CKBComponents.CellOutput[]) => string
declare const serializeOutputsData: (outputsData: CKBComponents.Hash[]) => string
declare const serializeWitnessArgs: (witnessArgs: CKBComponents.WitnessArgs) => string
declare const serializeWitnesses: (witnesses: CKBComponents.Witness[]) => string
declare const serializeRawTransaction: (
  rawTransaction: Pick<
    CKBComponents.RawTransaction,
    'version' | 'cellDeps' | 'headerDeps' | 'inputs' | 'outputs' | 'outputsData'
  >,
) => string
declare const serializeTransaction: (rawTransaction: CKBComponents.RawTransaction) => string

/**
 * Converts an uint16 into a hex string in little endian
 *
 * @memberof convertors
 * @param {string|bigint} uint16 The uint16 to convert
 * @returns {string} Returns a hex string
 */
declare const toUint16Le: (uint16: string | bigint) => string
/**
 * Converts an uint32 into a hex string in little endian
 *
 * @memberof convertors
 * @param {string|bigint} uint32 The uint32 to convert
 * @returns {string} Returns a hex string
 */
declare const toUint32Le: (uint32: string | bigint) => string
/**
 * Converts an uint64 into a hex string in little endian
 *
 * @memberof convertors
 * @param {string|bigint} uint64 The uint64 to convert
 * @returns {string} Returns a hex string
 */
declare const toUint64Le: (uint64: string | bigint) => string
declare const hexToBytes: (rawhex: string | number | bigint) => Uint8Array
/**
 * Converts a hex string in little endian into big endian
 *
 * @memberof convertors
 * @param {string} le16 The hex string to convert
 * @returns {string} Returns a big endian
 */
declare const toBigEndian: (leHex: string) => string
declare const bytesToHex: (bytes: Uint8Array) => string

interface EpochInfo {
  length: string
  index: string
  number: string
}
declare const serializeEpoch: ({ length, index, number }: EpochInfo) => string
declare const parseEpoch: (epoch: CKBComponents.EpochInHeader) => {
  length: string
  index: string
  number: string
}
/**
 * @memberof Utils
 * @function getWithdrawEpoch
 * @description Calculate the minimum epoch to withdraw the deposit by deposit epoch and withdrawing epoch
 * @param {string} depositEpoch Epoch when deposit happens
 * @param {string} withdrawingEpoch Epoch when withdrawing happens
 */
declare const getWithdrawEpoch: (depositEpoch: string, withdrawingEpoch: string) => string

/**
 * @name getTransactionSize
 * @description return the size of a transaction cost in a block, 4 bytes more than the serialized transaction.
 * @param {Object} transaction - Raw transaction
 * @returns {String} Virtual size of a transaction in a block
 */
declare const getTransactionSize: (transaction: CKBComponents.RawTransactionToSign) => number

declare class Blake2b {
  b: Uint8Array
  h: Uint32Array
  t: number
  c: number
  outlen: number
  constructor(outlen: number, key: Uint8Array | null, salt: Uint8Array | null, personal: Uint8Array | null)
  update: (input: Uint8Array) => this
  digest: (out: 'binary' | 'hex') => string | Uint8Array
  final: (out: 'binary' | 'hex') => string | Uint8Array
}
declare const blake2b: (
  outlen: number,
  key: Uint8Array | null,
  salt: Uint8Array | null,
  personal: Uint8Array | null,
  noAssert?: boolean,
) => Blake2b

declare interface Blake160 {
  (data: Uint8Array | string): Uint8Array
  (data: Uint8Array | string, encode: 'binary'): Uint8Array
  (data: Uint8Array | string, encode: 'hex'): string
  (data: Uint8Array | string, encode: 'binary' | 'hex'): Uint8Array | string
}
declare const blake160: Blake160

declare const scriptOccupied: (script: CKBComponents.Script) => number
declare const cellOccupied: (cell: CKBComponents.CellOutput) => number

/**
 * @summary System scripts are the smart contracts built and deployed by the CKB core team.
 *          System scripts complement the function of CKB in a flexible way.
 *          System scripts can provide
 *          -  core functions (e.g. secp256k1/blake160 and Nervos DAO),
 *          -  shared standard implementations (e.g. Simple UDT),
 *          -  or other auxiliary infrastructure components.
 * @see https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0024-ckb-system-script-list/0024-ckb-system-script-list.md
 */
interface SystemScript extends Omit<CKBComponents.Script, 'args'> {
  depType: CKBComponents.DepType
}
type OutPoints = Record<'mainnetOutPoint' | 'testnetOutPoint', CKBComponents.OutPoint>
/**
 * @memberof System Scripts
 * @typedef {Lock Script}
 * @name SECP256K1_BLAKE160
 * @description SECP256K1_BLAKE160 is the default lock script to verify CKB transaction signature
 */
declare const SECP256K1_BLAKE160: SystemScript & OutPoints
/**
 * @memberof System Scripts
 * @typedef {Lock Script}
 * @name SECP256K1_MULTISIG
 * @description SECP256K1_MULTISIG is a script which allows a group of users to sign a single transaction
 */
declare const SECP256K1_MULTISIG: SystemScript & OutPoints
/**
 * @memberof System Scripts
 * @typedef {Lock Script}
 * @name ANYONE_CAN_PAY
 * @description ANYONE_CAN_PAY allows a recipient to provide cell capacity in asset transfer
 */
declare const ANYONE_CAN_PAY_MAINNET: SystemScript & Pick<OutPoints, 'mainnetOutPoint'>
declare const ANYONE_CAN_PAY_TESTNET: SystemScript & Pick<OutPoints, 'testnetOutPoint'>

declare namespace Reconciliation {
  type Cell = {
    capacity: string
    outPoint: CKBComponents.OutPoint
  }
  interface ExtraInputsParams {
    tx: CKBComponents.RawTransactionToSign
    feeRate: string | bigint
    changeThreshold: string | bigint
    cells: Array<Cell>
    extraCount: number
  }
}
declare const extraInputs: (params: Reconciliation.ExtraInputsParams) => CKBComponents.RawTransactionToSign

/**
 * @function calculateTransactionFee
 * @description calculate the transaction fee by transaction size and fee rate
 * @param {string | bigint} transactionSize, the byte size of transaction
 * @param {string | bigint} feeRate, the fee rate with unit of shannons/KB
 * @returns {string} transactionFee
 */
declare const calculateTransactionFee: (transactionSize: string | bigint, feeRate: string | bigint) => string

/**
 * Encoded string 'ckb-default-hash'
 *
 * @constant
 * @type {bytes}
 */
declare const PERSONAL: Uint8Array
declare const EMPTY_WITNESS_ARGS: CKBComponents.WitnessArgs
declare const EMPTY_SECP_SIG: string

interface Options {
  compressed?: boolean
}
declare class ECPair {
  protected key: ec.KeyPair
  compressed: boolean
  constructor(sk: Uint8Array | string, { compressed }?: Options)
  get privateKey(): string
  get publicKey(): string
  getPrivateKey: (enc?: 'hex') => string
  getPublicKey: (enc: 'hex' | 'array') => string | number[]
  sign: (message: string | Uint8Array) => string
  verify: (message: string | Buffer, sig: string | Buffer) => boolean
  signRecoverable: (message: string | Uint8Array) => string
}

declare const assertToBeHexString: (value: string) => boolean
declare const assertToBeHexStringOrBigint: (value: string | bigint) => boolean

declare enum ErrorCode {
  ParameterInvalid = 101,
  ParameterRequired = 102,
  SignMessageFailed = 103,
  AddressInvalid = 104,
  ReconciliationFailed = 105,
}

declare class ParameterRequiredException extends Error {
  code: ErrorCode
  constructor(name: string)
}
declare class SignMessageException extends Error {
  code: ErrorCode
  constructor()
}

declare class HexStringException extends Error {
  code: ErrorCode
  constructor(hex: string)
}
declare class HexStringWithout0xException extends Error {
  code: ErrorCode
  constructor(hex: string)
}

declare class AddressPayloadException extends Error {
  code: ErrorCode
  type: 'short' | 'full' | undefined
  constructor(payload: Uint8Array, type?: 'short' | 'full')
}
declare class AddressException extends Error {
  code: ErrorCode
  type: 'short' | 'full' | undefined
  constructor(addr: string, stack: string, type?: 'short' | 'full')
}
declare class CodeHashException extends Error {
  code: ErrorCode
  constructor(codeHash: string)
}
declare class HashTypeException extends Error {
  code: ErrorCode
  constructor(hashType: string)
}
declare class AddressFormatTypeException extends Error {
  code: ErrorCode
  constructor(type: number)
}
declare class AddressFormatTypeAndEncodeMethodNotMatchException extends Error {
  code: ErrorCode
  constructor(type: number, bech32Type?: 'bech32' | 'bech32m' | 'unknown')
}

declare class OutLenTooSmallException extends Error {
  code: ErrorCode
  constructor(outlen: number, minLen: number)
}
declare class OutLenTooLargeException extends Error {
  code: ErrorCode
  constructor(outlen: number, maxLen: number)
}
declare class KeyLenTooSmallException extends Error {
  code: ErrorCode
  constructor(keyLen: number, minLen: number)
}
declare class KeyLenTooLargeException extends Error {
  code: ErrorCode
  constructor(keyLen: number, maxLen: number)
}
declare class OutTypeException extends TypeError {
  code: ErrorCode
  constructor()
}
declare class SaltTypeException extends TypeError {
  code: ErrorCode
  constructor()
}
declare class SaltLenException extends Error {
  code: ErrorCode
  constructor(saltLen: number, requiredLen: number)
}
declare class InputTypeException extends TypeError {
  code: ErrorCode
  constructor()
}
declare class KeyTypeException extends TypeError {
  code: ErrorCode
  constructor()
}
declare class PersonalTypeException extends TypeError {
  code: ErrorCode
  constructor()
}
declare class PersonalLenException extends Error {
  code: ErrorCode
  constructor(personalLen: number, requiredLen: number)
}

declare class PrivateKeyLenException extends Error {
  code: ErrorCode
  constructor()
}

declare class ReconciliationException extends Error {
  code: ErrorCode
  constructor()
}

declare const scriptToHash: (script: CKBComponents.Script) => string
declare const rawTransactionToHash: (rawTransaction: Omit<CKBComponents.RawTransaction, 'witnesses'>) => string
declare const privateKeyToPublicKey: (privateKey: string) => string
declare const privateKeyToAddress: (privateKey: string, options: AddressOptions) => string
declare const extractDAOData: (dao: CKBComponents.DAO) => {
  c: string
  ar: string
  s: string
  u: string
}
declare const calculateMaximumWithdraw: (
  outputCell: CKBComponents.CellOutput,
  outputDataCapacity: CKBComponents.Bytes,
  depositDAO: CKBComponents.DAO,
  withdrawDAO: CKBComponents.DAO,
) => string

declare const utils_ANYONE_CAN_PAY_MAINNET: typeof ANYONE_CAN_PAY_MAINNET
declare const utils_ANYONE_CAN_PAY_TESTNET: typeof ANYONE_CAN_PAY_TESTNET
type utils_AddressException = AddressException
declare const utils_AddressException: typeof AddressException
type utils_AddressFormatTypeAndEncodeMethodNotMatchException = AddressFormatTypeAndEncodeMethodNotMatchException
declare const utils_AddressFormatTypeAndEncodeMethodNotMatchException: typeof AddressFormatTypeAndEncodeMethodNotMatchException
type utils_AddressFormatTypeException = AddressFormatTypeException
declare const utils_AddressFormatTypeException: typeof AddressFormatTypeException
type utils_AddressOptions = AddressOptions
type utils_AddressPayloadException = AddressPayloadException
declare const utils_AddressPayloadException: typeof AddressPayloadException
type utils_AddressPrefix = AddressPrefix
declare const utils_AddressPrefix: typeof AddressPrefix
type utils_AddressType = AddressType
declare const utils_AddressType: typeof AddressType
type utils_Bech32Type = Bech32Type
declare const utils_Bech32Type: typeof Bech32Type
type utils_CodeHashException = CodeHashException
declare const utils_CodeHashException: typeof CodeHashException
type utils_CodeHashIndex = CodeHashIndex
type utils_ECPair = ECPair
declare const utils_ECPair: typeof ECPair
declare const utils_EMPTY_SECP_SIG: typeof EMPTY_SECP_SIG
declare const utils_EMPTY_WITNESS_ARGS: typeof EMPTY_WITNESS_ARGS
type utils_EpochInfo = EpochInfo
type utils_ErrorCode = ErrorCode
declare const utils_ErrorCode: typeof ErrorCode
type utils_HashTypeException = HashTypeException
declare const utils_HashTypeException: typeof HashTypeException
type utils_HexStringException = HexStringException
declare const utils_HexStringException: typeof HexStringException
type utils_HexStringWithout0xException = HexStringWithout0xException
declare const utils_HexStringWithout0xException: typeof HexStringWithout0xException
type utils_InputTypeException = InputTypeException
declare const utils_InputTypeException: typeof InputTypeException
declare const utils_JSBI: typeof JSBI
type utils_KeyLenTooLargeException = KeyLenTooLargeException
declare const utils_KeyLenTooLargeException: typeof KeyLenTooLargeException
type utils_KeyLenTooSmallException = KeyLenTooSmallException
declare const utils_KeyLenTooSmallException: typeof KeyLenTooSmallException
type utils_KeyTypeException = KeyTypeException
declare const utils_KeyTypeException: typeof KeyTypeException
type utils_Options = Options
type utils_OutLenTooLargeException = OutLenTooLargeException
declare const utils_OutLenTooLargeException: typeof OutLenTooLargeException
type utils_OutLenTooSmallException = OutLenTooSmallException
declare const utils_OutLenTooSmallException: typeof OutLenTooSmallException
type utils_OutTypeException = OutTypeException
declare const utils_OutTypeException: typeof OutTypeException
declare const utils_PERSONAL: typeof PERSONAL
type utils_ParameterRequiredException = ParameterRequiredException
declare const utils_ParameterRequiredException: typeof ParameterRequiredException
type utils_ParseAddress = ParseAddress
type utils_PersonalLenException = PersonalLenException
declare const utils_PersonalLenException: typeof PersonalLenException
type utils_PersonalTypeException = PersonalTypeException
declare const utils_PersonalTypeException: typeof PersonalTypeException
type utils_PrivateKeyLenException = PrivateKeyLenException
declare const utils_PrivateKeyLenException: typeof PrivateKeyLenException
type utils_ReconciliationException = ReconciliationException
declare const utils_ReconciliationException: typeof ReconciliationException
declare const utils_SECP256K1_BLAKE160: typeof SECP256K1_BLAKE160
declare const utils_SECP256K1_MULTISIG: typeof SECP256K1_MULTISIG
type utils_SaltLenException = SaltLenException
declare const utils_SaltLenException: typeof SaltLenException
type utils_SaltTypeException = SaltTypeException
declare const utils_SaltTypeException: typeof SaltTypeException
type utils_SignMessageException = SignMessageException
declare const utils_SignMessageException: typeof SignMessageException
declare const utils_addressToScript: typeof addressToScript
declare const utils_assertToBeHexString: typeof assertToBeHexString
declare const utils_assertToBeHexStringOrBigint: typeof assertToBeHexStringOrBigint
declare const utils_bech32: typeof bech32
declare const utils_bech32Address: typeof bech32Address
declare const utils_bech32m: typeof bech32m
declare const utils_blake160: typeof blake160
declare const utils_blake2b: typeof blake2b
declare const utils_bytesToHex: typeof bytesToHex
declare const utils_calculateMaximumWithdraw: typeof calculateMaximumWithdraw
declare const utils_calculateTransactionFee: typeof calculateTransactionFee
declare const utils_cellOccupied: typeof cellOccupied
declare const utils_extraInputs: typeof extraInputs
declare const utils_extractDAOData: typeof extractDAOData
declare const utils_fullLengthSize: typeof fullLengthSize
declare const utils_fullPayloadToAddress: typeof fullPayloadToAddress
declare const utils_getOffsets: typeof getOffsets
declare const utils_getTransactionSize: typeof getTransactionSize
declare const utils_getWithdrawEpoch: typeof getWithdrawEpoch
declare const utils_hexToBytes: typeof hexToBytes
declare const utils_offsetSize: typeof offsetSize
declare const utils_parseAddress: typeof parseAddress
declare const utils_parseEpoch: typeof parseEpoch
declare const utils_privateKeyToAddress: typeof privateKeyToAddress
declare const utils_privateKeyToPublicKey: typeof privateKeyToPublicKey
declare const utils_pubkeyToAddress: typeof pubkeyToAddress
declare const utils_rawTransactionToHash: typeof rawTransactionToHash
declare const utils_scriptOccupied: typeof scriptOccupied
declare const utils_scriptToAddress: typeof scriptToAddress
declare const utils_scriptToHash: typeof scriptToHash
declare const utils_serializeArgs: typeof serializeArgs
declare const utils_serializeArray: typeof serializeArray
declare const utils_serializeCellDep: typeof serializeCellDep
declare const utils_serializeCellDeps: typeof serializeCellDeps
declare const utils_serializeCodeHash: typeof serializeCodeHash
declare const utils_serializeDepType: typeof serializeDepType
declare const utils_serializeDynVec: typeof serializeDynVec
declare const utils_serializeEpoch: typeof serializeEpoch
declare const utils_serializeFixVec: typeof serializeFixVec
declare const utils_serializeHashType: typeof serializeHashType
declare const utils_serializeHeaderDeps: typeof serializeHeaderDeps
declare const utils_serializeInput: typeof serializeInput
declare const utils_serializeInputs: typeof serializeInputs
declare const utils_serializeOption: typeof serializeOption
declare const utils_serializeOutPoint: typeof serializeOutPoint
declare const utils_serializeOutput: typeof serializeOutput
declare const utils_serializeOutputs: typeof serializeOutputs
declare const utils_serializeOutputsData: typeof serializeOutputsData
declare const utils_serializeRawTransaction: typeof serializeRawTransaction
declare const utils_serializeScript: typeof serializeScript
declare const utils_serializeStruct: typeof serializeStruct
declare const utils_serializeTable: typeof serializeTable
declare const utils_serializeTransaction: typeof serializeTransaction
declare const utils_serializeVersion: typeof serializeVersion
declare const utils_serializeWitnessArgs: typeof serializeWitnessArgs
declare const utils_serializeWitnesses: typeof serializeWitnesses
declare const utils_toAddressPayload: typeof toAddressPayload
declare const utils_toBigEndian: typeof toBigEndian
declare const utils_toUint16Le: typeof toUint16Le
declare const utils_toUint32Le: typeof toUint32Le
declare const utils_toUint64Le: typeof toUint64Le
declare namespace utils {
  export {
    utils_ANYONE_CAN_PAY_MAINNET as ANYONE_CAN_PAY_MAINNET,
    utils_ANYONE_CAN_PAY_TESTNET as ANYONE_CAN_PAY_TESTNET,
    utils_AddressException as AddressException,
    utils_AddressFormatTypeAndEncodeMethodNotMatchException as AddressFormatTypeAndEncodeMethodNotMatchException,
    utils_AddressFormatTypeException as AddressFormatTypeException,
    type utils_AddressOptions as AddressOptions,
    utils_AddressPayloadException as AddressPayloadException,
    utils_AddressPrefix as AddressPrefix,
    utils_AddressType as AddressType,
    utils_Bech32Type as Bech32Type,
    utils_CodeHashException as CodeHashException,
    type utils_CodeHashIndex as CodeHashIndex,
    utils_ECPair as ECPair,
    utils_EMPTY_SECP_SIG as EMPTY_SECP_SIG,
    utils_EMPTY_WITNESS_ARGS as EMPTY_WITNESS_ARGS,
    type utils_EpochInfo as EpochInfo,
    utils_ErrorCode as ErrorCode,
    utils_HashTypeException as HashTypeException,
    utils_HexStringException as HexStringException,
    utils_HexStringWithout0xException as HexStringWithout0xException,
    utils_InputTypeException as InputTypeException,
    utils_JSBI as JSBI,
    utils_KeyLenTooLargeException as KeyLenTooLargeException,
    utils_KeyLenTooSmallException as KeyLenTooSmallException,
    utils_KeyTypeException as KeyTypeException,
    type utils_Options as Options,
    utils_OutLenTooLargeException as OutLenTooLargeException,
    utils_OutLenTooSmallException as OutLenTooSmallException,
    utils_OutTypeException as OutTypeException,
    utils_PERSONAL as PERSONAL,
    utils_ParameterRequiredException as ParameterRequiredException,
    type utils_ParseAddress as ParseAddress,
    utils_PersonalLenException as PersonalLenException,
    utils_PersonalTypeException as PersonalTypeException,
    utils_PrivateKeyLenException as PrivateKeyLenException,
    utils_ReconciliationException as ReconciliationException,
    utils_SECP256K1_BLAKE160 as SECP256K1_BLAKE160,
    utils_SECP256K1_MULTISIG as SECP256K1_MULTISIG,
    utils_SaltLenException as SaltLenException,
    utils_SaltTypeException as SaltTypeException,
    utils_SignMessageException as SignMessageException,
    utils_addressToScript as addressToScript,
    utils_assertToBeHexString as assertToBeHexString,
    utils_assertToBeHexStringOrBigint as assertToBeHexStringOrBigint,
    utils_bech32 as bech32,
    utils_bech32Address as bech32Address,
    utils_bech32m as bech32m,
    utils_blake160 as blake160,
    utils_blake2b as blake2b,
    utils_bytesToHex as bytesToHex,
    utils_calculateMaximumWithdraw as calculateMaximumWithdraw,
    utils_calculateTransactionFee as calculateTransactionFee,
    utils_cellOccupied as cellOccupied,
    utils_extraInputs as extraInputs,
    utils_extractDAOData as extractDAOData,
    utils_fullLengthSize as fullLengthSize,
    utils_fullPayloadToAddress as fullPayloadToAddress,
    utils_getOffsets as getOffsets,
    utils_getTransactionSize as getTransactionSize,
    utils_getWithdrawEpoch as getWithdrawEpoch,
    utils_hexToBytes as hexToBytes,
    utils_offsetSize as offsetSize,
    utils_parseAddress as parseAddress,
    utils_parseEpoch as parseEpoch,
    utils_privateKeyToAddress as privateKeyToAddress,
    utils_privateKeyToPublicKey as privateKeyToPublicKey,
    utils_pubkeyToAddress as pubkeyToAddress,
    utils_rawTransactionToHash as rawTransactionToHash,
    utils_scriptOccupied as scriptOccupied,
    utils_scriptToAddress as scriptToAddress,
    utils_scriptToHash as scriptToHash,
    utils_serializeArgs as serializeArgs,
    utils_serializeArray as serializeArray,
    utils_serializeCellDep as serializeCellDep,
    utils_serializeCellDeps as serializeCellDeps,
    utils_serializeCodeHash as serializeCodeHash,
    utils_serializeDepType as serializeDepType,
    utils_serializeDynVec as serializeDynVec,
    utils_serializeEpoch as serializeEpoch,
    utils_serializeFixVec as serializeFixVec,
    utils_serializeHashType as serializeHashType,
    utils_serializeHeaderDeps as serializeHeaderDeps,
    utils_serializeInput as serializeInput,
    utils_serializeInputs as serializeInputs,
    utils_serializeOption as serializeOption,
    utils_serializeOutPoint as serializeOutPoint,
    utils_serializeOutput as serializeOutput,
    utils_serializeOutputs as serializeOutputs,
    utils_serializeOutputsData as serializeOutputsData,
    utils_serializeRawTransaction as serializeRawTransaction,
    utils_serializeScript as serializeScript,
    utils_serializeStruct as serializeStruct,
    utils_serializeTable as serializeTable,
    utils_serializeTransaction as serializeTransaction,
    utils_serializeVersion as serializeVersion,
    utils_serializeWitnessArgs as serializeWitnessArgs,
    utils_serializeWitnesses as serializeWitnesses,
    utils_toAddressPayload as toAddressPayload,
    utils_toBigEndian as toBigEndian,
    utils_toUint16Le as toUint16Le,
    utils_toUint32Le as toUint32Le,
    utils_toUint64Le as toUint64Le,
  }
}

type Key = string
type Address = string
type LockHash = string
type Capacity = bigint | string
type URL = string
interface SimpleRawTransactionParams extends RawTransactionParams.Base {
  fromAddress: Address
  toAddress: Address
  capacity: Capacity
  cells?: RawTransactionParams.Cell[]
}
interface ComplexRawTransactionParams extends RawTransactionParams.Base {
  fromAddresses: Address[]
  receivePairs: {
    address: Address
    capacity: Capacity
    type?: CKBComponents.Script | null
  }[]
  cells: Map<LockHash, RawTransactionParams.Cell[]>
}
declare class Branch {
  #private
  cells: Map<LockHash, RawTransactionParams.Cell[]>
  rpc: BranchRPC
  utils: typeof utils
  private _node
  config: {
    secp256k1Dep?: DepCellInfo
    daoDep?: DepCellInfo
  }
  constructor(nodeUrl?: URL)
  setNode(node: URL | CKBComponents.Node): CKBComponents.Node
  get node(): CKBComponents.Node
  generateLockHash: (args: string, dep?: Omit<CKBComponents.Script, 'args'> | undefined) => string
  loadDeps: () => Promise<{
    secp256k1Dep?: DepCellInfo
    daoDep?: DepCellInfo
  }>
  /**
   * @memberof Core
   * @description The method used to load cells from lumos indexer as shown in the tutorial
   * @tutorial https://github.com/ckb-js/ckb-sdk-js/blob/develop/packages/ckb-sdk-core/examples/sendTransactionWithLumosCollector.js
   */
  loadCells: (
    params: LoadCellsParams.FromIndexer & {
      save?: boolean
    },
  ) => Promise<RawTransactionParams.Cell[]>
  signWitnesses: SignWitnesses
  signTransaction: (key: Key | Map<LockHash, Key>) => (
    transaction: CKBComponents.RawTransactionToSign,
    cells?: Array<{
      outPoint: CKBComponents.OutPoint
      lock: CKBComponents.Script
    }>,
  ) => {
    witnesses: string[]
    version: CKBComponents.Version
    cellDeps: CKBComponents.CellDep[]
    headerDeps: CKBComponents.Hash256[]
    inputs: CKBComponents.CellInput[]
    outputs: CKBComponents.CellOutput[]
    outputsData: CKBComponents.Bytes[]
  }
  /**
   * @description Generate a raw transaction object to sign
   * @param {object} txObject, 1-1 tx or m-n tx
   * @returns rawTxToSign
   * @example 1-1 tx
   *```
   *          {
   *            fromAddress:          Address, specify the address of inputs
   *            toAddress:            Address, specify the address included in outputs
   *            capacity:             Capacity, specify the value to transfer in this tx
   *
   *            cells?:               Array<RawTransactionParams.Cell>, provide
   *                                  live cells to generate input cells in this tx
   *
   *            fee?:                 Fee, specify the fee or fee reconciler
   *                                  along with this tx, fee reconciler allows
   *                                  fee calculation on the fly
   *
   *            safeMode:             boolean, specify whether to skip cell
   *                                  containing data or type script or not,
   *                                  default to be true
   *
   *            deps:                 DepCellInfo | Array<DepCellInfo>
   *                                  specify deps included in this tx, filling
   *                                  in the `cellDeps` field of a raw tx
   *
   *            capacityThreshold?:   Capacity, specify the minimal capacity of
   *                                  each outputs, default to be 6_100_000_000
   *                                  shannon(61 CKB) for a bare cell
   *
   *            changeThreshold?:     Capacity, specify the minimal capacity of
   *                                  the change cell, default to be 6_100_000_000
   *                                  shannon(61 CKB) for a bare cell, useful on
   *                                  sending a tx without change by setting it 0
   *
   *            changeLockScript?:    CKBComponents.Script, specify the change
   *                                  receiver of this tx, default to be the owner
   *                                  of the first input
   *
   *            witnesses?:           Array<CKBComponents.WitnessArgs | CKBComponents.Witness>
   *                                  specify the witness list of this tx
   *
   *            outputsData?:         Array<string>, specify the output data list
   *                                  of this tx
   *          }
   * ```
   * @example m-n tx
   * ```
   *          {
   *            fromAddresses:        Address[], specify the address of inputs
   *
   *            receivePairs:         Array<{
   *                                    address: Address;
   *                                    capacity: Capacity;
   *                                    type?: CKBComponents.Script | null
   *                                  }>
   *                                  specify address, capacity and type lock
   *                                  of outputs
   *
   *            cells:                Map<LockHash, RawTransactionParams.Cell[]>
   *                                  provide live cells to generate input cells
   *                                  in this tx
   *
   *            fee?:                 same as that in 1-1 tx
   *            safeMode:             same as that in 1-1 tx
   *            deps:                 same as that in 1-1 tx
   *            capacityThreshold?:   same as that in 1-1 tx
   *            changeThreshold?:     same as that in 1-1 tx
   *            changeLockScript?:    same as that in 1-1 tx
   *            witnesses?:           same as that in 1-1 tx
   *            outputsData?:         same as that in 1-1 tx
   *          }
   * ```
   */
  generateRawTransaction: ({
    fee,
    safeMode,
    deps,
    capacityThreshold,
    changeThreshold,
    witnesses,
    outputsData,
    ...params
  }: SimpleRawTransactionParams | ComplexRawTransactionParams) => CKBComponents.RawTransactionToSign
  /**
   * @memberof Core
   * @description Generate a transaction to deposit capacity
   * @tutorial https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md#deposit
   */
  generateDaoDepositTransaction: ({
    fromAddress,
    capacity,
    fee,
    cells,
  }: {
    fromAddress: Address
    capacity: Capacity
    fee: Capacity
    cells?: RawTransactionParams.Cell[]
  }) => CKBComponents.RawTransactionToSign
  /**
   * @memberof Core
   * @description Generate a transaction to start a withdraw
   * @tutorial https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md#withdraw-phase-1
   */
  generateDaoWithdrawStartTransaction: ({
    outPoint,
    fee,
    cells,
  }: {
    outPoint: CKBComponents.OutPoint
    fee: Capacity
    cells?: RawTransactionParams.Cell[]
  }) => Promise<CKBComponents.RawTransactionToSign>
  /**
   * @memberof Core
   * @description Generate a transaction to finish a withdraw
   * @tutorial https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md#withdraw-phase-2
   */
  generateDaoWithdrawTransaction: ({
    depositOutPoint,
    withdrawOutPoint,
    fee,
  }: {
    depositOutPoint: CKBComponents.OutPoint
    withdrawOutPoint: CKBComponents.OutPoint
    fee: Capacity
  }) => Promise<CKBComponents.RawTransactionToSign>
  calculateDaoMaximumWithdraw: (
    depositOutPoint: CKBComponents.OutPoint,
    withdraw: CKBComponents.Hash | CKBComponents.OutPoint,
  ) => Promise<string>
}

declare const loadCellsFromIndexer: ({
  CellCollector,
  indexer,
  lock,
  start,
  end,
}: LoadCellsParams.FromIndexer) => Promise<RawTransactionParams.Cell[]>

declare const getBigInts: ({ fee, capacityThreshold, changeThreshold }: { [key: string]: string | bigint }) => {
  targetFee: JSBI
  minCapacity: JSBI
  minChange: JSBI
  zeroBigInt: JSBI
}
declare const getKeyAndCellsPairs: (
  params:
    | Pick<RawTransactionParams.Simple, 'inputScript' | 'outputScript' | 'capacity' | 'cells'>
    | Pick<RawTransactionParams.Complex, 'inputScripts' | 'outputs' | 'cells'>,
) => {
  inputScripts: CKBComponents.Script[]
  outputs: RawTransactionParams.Output[]
  unspentCellsMap: Map<string, RawTransactionParams.Cell[]>
}
declare const getTargetOutputs: ({
  outputs,
  minCapacity,
}: {
  outputs: ReturnType<typeof getKeyAndCellsPairs>['outputs']
  minCapacity: JSBI
}) => {
  capacity: JSBI
  lock: CKBComponents.Script
  type?: CKBComponents.Script | null
}[]
declare const getInputs: ({
  inputScripts,
  safeMode,
  costCapacity,
  unspentCellsMap,
}: {
  inputScripts: CKBComponents.Script[]
  unspentCellsMap: ReturnType<typeof getKeyAndCellsPairs>['unspentCellsMap']
  safeMode: boolean
  costCapacity: JSBI
}) => {
  inputs: (CKBComponents.CellInput & {
    lockHash: string
  })[]
  sum: JSBI
}
declare const getLeftCells: ({
  usedCells,
  inputScripts,
  unspentCellsMap,
}: {
  inputScripts: CKBComponents.Script[]
  usedCells: CKBComponents.CellInput[]
  unspentCellsMap: ReturnType<typeof getKeyAndCellsPairs>['unspentCellsMap']
}) => Array<{
  capacity: string
  outPoint: CKBComponents.OutPoint
}>
declare const generateRawTransaction: ({
  fee,
  changeLockScript,
  safeMode,
  deps,
  capacityThreshold,
  changeThreshold,
  ...params
}: RawTransactionParams.Simple | RawTransactionParams.Complex) => CKBComponents.RawTransactionToSign

type Cell = {
  lock: CKBComponents.Script
}
declare const groupScripts: (inputCells: Cell[]) => Map<string, number[]>

export {
  ANYONE_CAN_PAY_MAINNET,
  ANYONE_CAN_PAY_TESTNET,
  AddressException,
  AddressFormatTypeAndEncodeMethodNotMatchException,
  AddressFormatTypeException,
  type AddressOptions,
  AddressPayloadException,
  AddressPrefix,
  AddressType,
  Bech32Type,
  Branch,
  BranchRPC,
  CKBComponents,
  CodeHashException,
  type CodeHashIndex,
  type DepCellInfo,
  ECPair,
  EMPTY_SECP_SIG,
  EMPTY_WITNESS_ARGS,
  type EpochInfo,
  ErrorCode,
  HashTypeException,
  HexStringException,
  HexStringWithout0xException,
  InputTypeException,
  KeyLenTooLargeException,
  KeyLenTooSmallException,
  KeyTypeException,
  LoadCellsParams,
  Method,
  type MultisigConfig,
  type MultisigOption,
  type Options,
  OutLenTooLargeException,
  OutLenTooSmallException,
  OutTypeException,
  PERSONAL,
  ParameterRequiredException,
  type ParseAddress,
  PersonalLenException,
  PersonalTypeException,
  PrivateKeyLenException,
  RPC,
  RawTransactionParams,
  ReconciliationException,
  SECP256K1_BLAKE160,
  SECP256K1_MULTISIG,
  SaltLenException,
  SaltTypeException,
  SignMessageException,
  SignStatus,
  type SignWitnesses,
  type SignatureProvider,
  type Signatures,
  type StructuredWitness,
  addressToScript,
  assertToBeHexString,
  assertToBeHexStringOrBigint,
  bech32Address,
  blake160,
  blake2b,
  bytesToHex,
  calculateMaximumWithdraw,
  calculateTransactionFee,
  cellOccupied,
  extraInputs,
  extractDAOData,
  fullLengthSize,
  fullPayloadToAddress,
  generateRawTransaction,
  getBigInts,
  getInputs,
  getKeyAndCellsPairs,
  getLeftCells,
  getMultisigStatus,
  getOffsets,
  getTargetOutputs,
  getTransactionSize,
  getWithdrawEpoch,
  groupScripts,
  hashMultisig,
  hexToBytes,
  isMap,
  isMultisigConfig,
  loadCellsFromIndexer,
  offsetSize,
  parseAddress,
  parseEpoch,
  privateKeyToAddress,
  privateKeyToPublicKey,
  pubkeyToAddress,
  rawTransactionToHash,
  scriptOccupied,
  scriptToAddress,
  scriptToHash,
  serializeArgs,
  serializeArray,
  serializeCellDep,
  serializeCellDeps,
  serializeCodeHash,
  serializeDepType,
  serializeDynVec,
  serializeEpoch,
  serializeFixVec,
  serializeHashType,
  serializeHeaderDeps,
  serializeInput,
  serializeInputs,
  serializeMultisigConfig,
  serializeOption,
  serializeOutPoint,
  serializeOutput,
  serializeOutputs,
  serializeOutputsData,
  serializeRawTransaction,
  serializeScript,
  serializeStruct,
  serializeTable,
  serializeTransaction,
  serializeVersion,
  serializeWitnessArgs,
  serializeWitnesses,
  signWitnessGroup,
  signWitnesses,
  toAddressPayload,
  toBigEndian,
  toUint16Le,
  toUint32Le,
  toUint64Le,
}
