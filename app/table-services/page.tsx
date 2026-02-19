'use client'

import { useMemo, useState } from 'react'
import { POSShell } from '@/components/pos/pos-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/menu-data'

type TableStatus = 'Open' | 'Seated' | 'Needs Service' | 'Closing'

type TableRecord = {
  id: number
  server: string
  guests: number
  status: TableStatus
  openCheckCents: number
}

const seedTables: TableRecord[] = [
  { id: 1, server: 'Mila', guests: 2, status: 'Open', openCheckCents: 0 },
  { id: 2, server: 'Aiden', guests: 4, status: 'Seated', openCheckCents: 7860 },
  { id: 3, server: 'Mila', guests: 3, status: 'Needs Service', openCheckCents: 11240 },
  { id: 4, server: 'Noah', guests: 5, status: 'Closing', openCheckCents: 14510 },
  { id: 5, server: 'Noah', guests: 0, status: 'Open', openCheckCents: 0 },
  { id: 6, server: 'Aiden', guests: 2, status: 'Seated', openCheckCents: 6320 },
]

const statusStyles: Record<TableStatus, string> = {
  Open: 'border-accent/50 bg-accent/10 text-accent',
  Seated: 'border-primary/50 bg-primary/10 text-primary-light',
  'Needs Service': 'border-red-400/50 bg-red-400/10 text-red-300',
  Closing: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300',
}

export default function TableServicesPage() {
  const [tables, setTables] = useState(seedTables)
  const [selectedTableId, setSelectedTableId] = useState<number>(2)
  const [note, setNote] = useState('Refill waters and stage entrees together.')

  const selectedTable = useMemo(() => tables.find((table) => table.id === selectedTableId) ?? tables[0], [tables, selectedTableId])

  function updateTableStatus(id: number, status: TableStatus): void {
    setTables((current) => current.map((table) => (table.id === id ? { ...table, status } : table)))
  }

  function closeCheck(id: number): void {
    setTables((current) => current.map((table) => (table.id === id ? { ...table, status: 'Open', guests: 0, openCheckCents: 0 } : table)))
  }

  return (
    <POSShell title="Table Services" subtitle="Order flow, table status, and check handling">
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-primary/30 bg-dark-lighter/40 p-4">
          <h2 className="mb-3 text-lg font-semibold">Dining Room Map</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTableId(table.id)}
                className={`rounded-md border p-3 text-left transition ${
                  table.id === selectedTableId ? 'border-primary bg-primary/10' : 'border-primary/20 hover:border-primary/40'
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold">Table {table.id}</p>
                  <span className={`rounded px-2 py-0.5 text-xs ${statusStyles[table.status]}`}>{table.status}</span>
                </div>
                <p className="text-sm text-cream/70">Server: {table.server}</p>
                <p className="text-sm text-cream/70">Guests: {table.guests}</p>
                <p className="mt-1 text-sm text-primary-light">Open check: {formatCurrency(table.openCheckCents)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-primary/30 bg-dark-lighter/40 p-4">
          <h2 className="text-lg font-semibold">Table {selectedTable.id} Actions</h2>
          <div className="space-y-2">
            <p className="text-sm text-cream/70">Status</p>
            <div className="grid grid-cols-2 gap-2">
              {(['Open', 'Seated', 'Needs Service', 'Closing'] as TableStatus[]).map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  onClick={() => updateTableStatus(selectedTable.id, status)}
                  className={`border-primary/40 ${selectedTable.status === status ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-dark-lighter/30 text-cream'}`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-cream/70">Server Note</p>
            <Input value={note} onChange={(event) => setNote(event.target.value)} />
          </div>

          <div className="rounded-md border border-primary/20 bg-dark/40 p-3">
            <p className="text-sm text-cream/70">Current check</p>
            <p className="text-xl font-semibold text-primary-light">{formatCurrency(selectedTable.openCheckCents)}</p>
          </div>

          <Button
            className="w-full bg-primary text-white hover:bg-primary-dark"
            onClick={() => closeCheck(selectedTable.id)}
            disabled={selectedTable.openCheckCents === 0}
          >
            Close Check
          </Button>
        </div>
      </div>
    </POSShell>
  )
}
