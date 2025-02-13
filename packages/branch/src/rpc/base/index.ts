import { BranchComponents } from '../../types'
import chainRpc from './chain'
import experimentalRpc from './experimental'
import netRpc from './net'
import poolRpc from './pool'
import statsRpc from './stats'

export interface RpcProperties {
  [name: string]: Omit<BranchComponents.Method, 'name'>
}

export const rpcProperties: RpcProperties = {
  ...chainRpc,
  ...experimentalRpc,
  // skip minerRpc
  ...netRpc,
  ...poolRpc,
  ...statsRpc,
  // skip subscription
}

export interface Base {
  /* Chain */

  /**
   * @method getTipBlockNumber
   * @memberof DefaultRPC
   * @description rpc to get the number of blocks in the longest blockchain
   * @return {Promise<string>} block number
   */
  getTipBlockNumber: () => Promise<BranchComponents.BlockNumber>

  /**
   * @method getTipHeader
   * @memberof DefaultRPC
   * @description rpc to get the tip header of the longeest blockchain
   * @return {Promise<object>} block header
   */
  getTipHeader: () => Promise<BranchComponents.BlockHeader>

  /**
   * @method getCurrentEpoch
   * @memberof DefaultRPC
   * @description rpc to get the epoch info about the current epoch
   * @return {Promise<object>} epoch info, including block reward, difficulty, last_block_hash_in_previous_epoch,
   *                           length, number, remainder reward, start number
   */
  getCurrentEpoch: () => Promise<BranchComponents.Epoch>

  /**
   * @method getEpochByNumber
   * @memberof DefaultRPC
   * @description rpc to get the epoch info by its number
   * @return {Promise<object>} epoch info
   */
  getEpochByNumber: (epoch: string | bigint) => Promise<BranchComponents.Epoch>

  /**
   * @method getBlockHash
   * @memberof DefaultRPC
   * @description rpc to get the block hash by block number
   * @param {string} hash - block hash
   * @return {Promise<string>} block hash
   */
  getBlockHash: (number: BranchComponents.BlockNumber | bigint) => Promise<BranchComponents.Hash>

  /**
   * @method getBlock
   * @memberof DefaultRPC
   * @description rpc to get block by its hash
   * @param {string} hash - the block hash of the target block
   * @returns {Promise<object>} block object
   */
  getBlock: (hash: BranchComponents.Hash) => Promise<BranchComponents.Block>

  /**
   * @method getHeader
   * @memberof DefaultRPC
   * @description Returns the information about a block header by hash.
   * @params {Promise<string>} block hash
   */
  getHeader: (blockHash: BranchComponents.Hash) => Promise<BranchComponents.BlockHeader>

  /**
   * @method getHeaderByNumber
   * @memberof DefaultRPC
   * @description Returns the information about a block header by block number
   * @params {Promise<string>} block number
   */
  getHeaderByNumber: (blockNumber: BranchComponents.BlockNumber | bigint) => Promise<BranchComponents.BlockHeader>

  /**
   * @method getLiveCell
   * @memberof DefaultRPC
   * @description rpc to get a cell by outPoint, please distinguish outPoint and cellOutPoint
   * @param {object} outPoint - cell's outPoint
   * @param {boolean} withData - set withData to true to return cell data and data hash if the cell is live
   * @return {Promise<object>} liveCellWithStatus
   */
  getLiveCell: (
    outPoint: BranchComponents.OutPoint,
    withData: boolean,
  ) => Promise<{
    cell: BranchComponents.LiveCell
    status: BranchComponents.CellStatus
  }>

  /**
   * @method getTransaction
   * @memberof DefaultRPC
   * @description rpc to get trasnaction wtih its status by its hash
   * @param {string} hash - the transaction hash of the target transaction
   * @return {Promise<object>} transaction object with transaction status
   */
  getTransaction: (hash: BranchComponents.Hash) => Promise<BranchComponents.TransactionWithStatus>

  /**
   * @method getCellbaseOutputCapacityDetails
   * @memberof DefaultRPC
   * @description Returns each component of the created Branch chain in this block's cellbase, which is issued to
   *              a block N - 1 - ProposalWindow.farthest, where this block's height is N.
   * @param {string} blockHash
   *
   * @deprecated will be removed from v0.41.0
   */
  getCellbaseOutputCapacityDetails: (
    blockHash: BranchComponents.Hash,
  ) => Promise<BranchComponents.CellbaseOutputCapacityDetails>

  /**
   * @method getBlockEconomicState
   * @memberof DefaultRPC
   * @description
   * @param {string} blockHash
   * @returns {Promise<BlockEconomicState>}
   */
  getBlockEconomicState: (blockHash: BranchComponents.Hash) => Promise<BranchComponents.BlockEconomicState>

  /**
   * @method getTransactionProof
   * @memberof DefaultRPC
   * @description request merkle proof that transactions are included in a block
   * @param {Array<string>} transactionHashes - transaction hashes, all transactions must be in the same block
   * @param {Promise<[string]>} blockHash - if specified, looks for transactions in the block with this hash
   */
  getTransactionProof: (
    transactionHashes: BranchComponents.Hash[],
    blockHash?: BranchComponents.Hash,
  ) => Promise<BranchComponents.TransactionProof>

  /**
   * @method verifyTransactionProof
   * @memberof DefaultRPC
   * @description verifies that a proof points to transactions in a block, returns transactions it commits to.
   * @param {object} transactionProof
   * @returns {Promise<Array<string>>} hash list of transactions committed in the block
   */
  verifyTransactionProof: (transactionProof: BranchComponents.TransactionProof) => Promise<BranchComponents.Hash[]>

  /**
   * @method getConsensus
   * @memberof DefaultRPC
   * @description return various consensus parameters.
   * @returns {Promise<object>} consensus parameters
   */
  getConsensus: () => Promise<BranchComponents.Consensus>

  /**
   * @method getBlockByNumber
   * @memberof DefaultRPC
   * @description rpc to get block by its number
   * @param {string} number - the block number of the target block
   * @returns {Promise<object>} block object
   */
  getBlockByNumber: (number: BranchComponents.BlockNumber | bigint) => Promise<BranchComponents.Block>

  /* Experimental */

  /**
   * @method dryRunTransaction
   * @memberof DefaultRPC
   * @description dry run the transaction and return the execution cycles, this method will not check the transaction
   *              validaty, but only run the lock script and type script and then return the execution cycles.
   * @param {object} rawTrasnaction - the raw transaction whose cycles is going to be calculated
   * @return {Promise<object>} dry run result, including cycles the transaction used.
   */
  dryRunTransaction: (tx: BranchComponents.RawTransaction) => Promise<BranchComponents.RunDryResult>

  calculateDaoMaximumWithdraw: (
    outPoint: BranchComponents.OutPoint,
    withdrawBlockHash: BranchComponents.Hash256,
  ) => Promise<string>

  /* skip Miner */

  /* Net */

  /**
   * @method localNodeInfo
   * @memberof DefaultRPC
   * @description rpc to get the local node information
   * @return {Promise<object>} node info, including addresses, is_outbound, node id, and version
   */
  localNodeInfo: () => Promise<BranchComponents.LocalNodeInfo>

  /**
   * @method getPeers
   * @memberof DefaultRPC
   * @description rpc to get connected peers info
   * @return {Promise<object[]>} peers' node info
   *
   * @deprecated will be removed from v0.41.0
   */
  getPeers: () => Promise<BranchComponents.RemoteNodeInfo[]>

  /**
   * @method getBannedAddresses
   * @memberof DefaultRPC
   * @description Returns all banned IPs/Subnets
   */
  getBannedAddresses: () => Promise<BranchComponents.BannedAddresses>

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
  syncState: () => Promise<BranchComponents.SyncState>

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

  /* Pool */

  /**
   * @method sendTransaction
   * @memberof DefaultRPC
   * @description rpc to send a new transaction into transaction pool
   * @param {object} rawTransaction - a raw transaction includes cell deps, inputs, outputs, version, and witnesses
   * @param {string} [outputsValidator] - Validates the transaction outputs before entering the tx-pool,
   *                                  an optional string parameter (enum: default | passthrough ),
   *                                  null and passthrough mean skipping outputs validation
   * @return {Promise<string>} transaction hash
   */
  sendTransaction: (
    tx: BranchComponents.RawTransaction,
    outputsValidator?: BranchComponents.OutputsValidator,
  ) => Promise<BranchComponents.Hash>

  /**
   * @method txPoolInfo
   * @memberof DefaultRPC
   * @description rpc to get pool information
   * @return {Promise<object>} info of transaction pool, including last_txs_updated_at, number of orphan,
   *                           number of pending, number of proposed
   */
  txPoolInfo: () => Promise<BranchComponents.TxPoolInfo>

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
   * @return {Promise<object>} BranchComponents.RawTxPool
   */
  getRawTxPool(): Promise<BranchComponents.TxPoolIds>
  getRawTxPool(verbose: true): Promise<BranchComponents.TxPoolVerbosity>
  getRawTxPool(verbose: false | null): Promise<BranchComponents.TxPoolIds>

  /* Stats */

  /**
   * @method getBlockchainInfo
   * @memberof DefaultRPC
   * @description rpc to get state info of the blockchain
   * @return {Promise<object>} blockchain info, including chain name, difficulty, epoch number,
   *                           is_initial_block_download, median time, warnings
   */
  getBlockchainInfo: () => Promise<BranchComponents.BlockchainInfo>

  /* skip Subscription */

  getFeeRateStats: () => Promise<BranchComponents.FeeRateStats | null>
}

export class Base {
  #rpcProperties = rpcProperties

  get rpcProperties() {
    return this.#rpcProperties
  }
}

export default Base
