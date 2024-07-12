import { BranchComponents } from '../types'
import { scriptToHash } from '../utils'

type LockHash = string
type Index = number
type Cell = { lock: BranchComponents.Script }

export const groupScripts = (inputCells: Cell[]) => {
  const groups = new Map<LockHash, Index[]>()
  inputCells.forEach((cell, i) => {
    const lockHash = scriptToHash(cell.lock)
    const group = groups.get(lockHash) || []
    groups.set(lockHash, [...group, i])
  })
  return groups
}
