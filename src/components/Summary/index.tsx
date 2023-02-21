import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { valueFormatter } from '../../utils/formatter'
import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === 'income') {
        accumulator.income += transaction.value
        accumulator.total += transaction.value
      } else {
        accumulator.outcome += transaction.value
        accumulator.total -= transaction.value
      }

      return accumulator
    },
    { income: 0, outcome: 0, total: 0 },
  )

  const isSummaryTotalIsPositive = summary.total > 0

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{valueFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{valueFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant={isSummaryTotalIsPositive ? 'green' : 'red'}>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{valueFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
