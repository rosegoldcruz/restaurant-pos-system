'use client'

import { useMemo, useState } from 'react'
import { POSShell } from '@/components/pos/pos-shell'
import { formatCurrency } from '@/lib/menu-data'

const transactions = [
  { date: '2026-02-19', type: 'Dine-In', amountCents: 124550 },
  { date: '2026-02-19', type: 'Delivery', amountCents: 35940 },
  { date: '2026-02-18', type: 'Dine-In', amountCents: 118320 },
  { date: '2026-02-18', type: 'Delivery', amountCents: 29280 },
  { date: '2026-02-17', type: 'Reservations', amountCents: 45210 },
]

export default function AccountingPage() {
  const [selectedDate, setSelectedDate] = useState('2026-02-19')

  const dayTransactions = useMemo(() => {
    return transactions.filter((transaction) => transaction.date === selectedDate)
  }, [selectedDate])

  const totalRevenue = dayTransactions.reduce((sum, transaction) => sum + transaction.amountCents, 0)
  const deliveryRevenue = dayTransactions
    .filter((transaction) => transaction.type === 'Delivery')
    .reduce((sum, transaction) => sum + transaction.amountCents, 0)
  const dineInRevenue = dayTransactions
    .filter((transaction) => transaction.type === 'Dine-In')
    .reduce((sum, transaction) => sum + transaction.amountCents, 0)
  const laborEstimate = Math.round(totalRevenue * 0.28)

  return (
    <POSShell title="Accounting" subtitle="Sales reports and financial summaries">
      <div className="space-y-4">
        <div className="flex justify-end">
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="rounded-md border border-primary/30 bg-dark-lighter px-3 py-2"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-primary/25 bg-dark-lighter/40 p-4">
            <p className="text-sm text-cream/70">Total Revenue</p>
            <p className="text-2xl font-semibold text-primary-light">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="rounded-lg border border-primary/25 bg-dark-lighter/40 p-4">
            <p className="text-sm text-cream/70">Dine-In</p>
            <p className="text-2xl font-semibold text-primary-light">{formatCurrency(dineInRevenue)}</p>
          </div>
          <div className="rounded-lg border border-primary/25 bg-dark-lighter/40 p-4">
            <p className="text-sm text-cream/70">Delivery</p>
            <p className="text-2xl font-semibold text-primary-light">{formatCurrency(deliveryRevenue)}</p>
          </div>
          <div className="rounded-lg border border-primary/25 bg-dark-lighter/40 p-4">
            <p className="text-sm text-cream/70">Labor Target (28%)</p>
            <p className="text-2xl font-semibold text-primary-light">{formatCurrency(laborEstimate)}</p>
          </div>
        </div>

        <div className="rounded-lg border border-primary/30 bg-dark-lighter/40 p-4">
          <h2 className="mb-3 text-lg font-semibold">Revenue Log</h2>
          <table className="w-full min-w-[460px] text-sm">
            <thead className="text-left text-cream/70">
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Channel</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {dayTransactions.map((transaction, index) => (
                <tr key={`${transaction.type}-${index}`} className="border-t border-primary/20">
                  <td className="py-2">{transaction.date}</td>
                  <td className="py-2">{transaction.type}</td>
                  <td className="py-2 text-primary-light">{formatCurrency(transaction.amountCents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </POSShell>
  )
}
