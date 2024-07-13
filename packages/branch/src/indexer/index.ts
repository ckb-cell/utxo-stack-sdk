import axios from 'axios'
import { IndexerSearchKey, IndexerCapacity, IndexerCell } from '../types'
import { toSnakeCase, toCamelCase } from '../utils'

export class CellIndexer {
  private ckbIndexerUrl: string

  constructor(ckbIndexerUrl: string) {
    this.ckbIndexerUrl = ckbIndexerUrl
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
        url: this.ckbIndexerUrl,
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

  async getCells(searchKey: IndexerSearchKey, limit = 10): Promise<IndexerCell[]> {
    const payload = {
      id: Math.floor(Math.random() * 100000),
      jsonrpc: '2.0',
      method: 'get_cells',
      params: [toSnakeCase(searchKey), 'asc', `0x${limit.toString(16)}`],
    }
    const body = JSON.stringify(payload, null, '  ')
    const response = (
      await axios({
        method: 'post',
        url: this.ckbIndexerUrl,
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
        throw new Error('The response of get_cells indexer RPC  is invalid')
      }
      return indexerCells
    }
  }
}
