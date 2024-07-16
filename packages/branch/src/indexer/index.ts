import axios from 'axios'
import { IndexerSearchKey, IndexerCapacity, IndexerCell, IndexerConfig, IndexerTransaction } from '../types'
import { toSnakeCase, toCamelCase } from '../utils'

export class CellIndexer {
  private indexerUrl: string

  constructor(indexerUrl: string) {
    this.indexerUrl = indexerUrl
  }

  async getCellsCapacity(searchKey: IndexerSearchKey): Promise<IndexerCapacity> {
    const payload = {
      id: Math.floor(Math.random() * 100000),
      jsonrpc: '2.0',
      method: 'get_cells_capacity',
      params: [toSnakeCase(searchKey)],
    }
    const body = JSON.stringify(payload, null, '  ')
    const response = (
      await axios({
        method: 'post',
        url: this.indexerUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 20000,
        data: body,
      })
    ).data
    if (response.error) {
      console.error(response.error)
      throw new Error('get_cells_capacity indexer RPC error')
    } else {
      const indexerCapacity = toCamelCase<IndexerCapacity>(response.result)
      if (indexerCapacity === undefined) {
        throw new Error('The response of get_cells_capacity indexer RPC  is invalid')
      }
      return indexerCapacity
    }
  }

  async getCells(searchKey: IndexerSearchKey, config?: IndexerConfig): Promise<IndexerCell[]> {
    const order = config?.order ?? 'asc'
    const limit = `0x${(config?.limit ?? 100).toString(16)}`
    const payload = {
      id: Math.floor(Math.random() * 100000),
      jsonrpc: '2.0',
      method: 'get_cells',
      params: [toSnakeCase(searchKey), order, limit, config?.afterCursor],
    }
    const body = JSON.stringify(payload, null, '  ')
    const response = (
      await axios({
        method: 'post',
        url: this.indexerUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 20000,
        data: body,
      })
    ).data
    if (response.error) {
      console.error(response.error)
      throw new Error('get_cells indexer RPC error')
    } else {
      const indexerCells = toCamelCase<IndexerCell[]>(response.result.objects)
      if (indexerCells === undefined) {
        throw new Error('The response of get_cells indexer RPC is invalid')
      }
      return indexerCells
    }
  }

  async getTransactions(searchKey: IndexerSearchKey, config?: IndexerConfig): Promise<IndexerTransaction[]> {
    const order = config?.order ?? 'asc'
    const limit = `0x${(config?.limit ?? 100).toString(16)}`
    const payload = {
      id: Math.floor(Math.random() * 100000),
      jsonrpc: '2.0',
      method: 'get_transactions',
      params: [toSnakeCase(searchKey), order, limit, config?.afterCursor],
    }
    const body = JSON.stringify(payload, null, '  ')
    const response = (
      await axios({
        method: 'post',
        url: this.indexerUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 20000,
        data: body,
      })
    ).data
    if (response.error) {
      console.error(response.error)
      throw new Error('get_transactions indexer RPC error')
    } else {
      const indexerTxs = toCamelCase<IndexerTransaction[]>(response.result.objects)
      if (indexerTxs === undefined) {
        throw new Error('The response of get_transactions indexer RPC is invalid')
      }
      return indexerTxs
    }
  }
}
