export type TransactionType = 'deposit' | 'withdraw'
export type TransactionFilterType = 'all' | 'deposit' | 'withdraw'

export interface Transaction {
  userId: string
  type: TransactionType
  amount: number
  balance: number
  displayText: string
  date: string
}
