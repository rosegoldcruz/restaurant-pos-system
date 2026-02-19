'use client'

import { useState } from 'react'
import { POSShell } from '@/components/pos/pos-shell'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/menu-data'

type DeliveryStatus = 'Queued' | 'Preparing' | 'Out for Delivery' | 'Completed'

type DeliveryOrder = {
  id: string
  guest: string
  address: string
  amountCents: number
  status: DeliveryStatus
  driver: string
}

const drivers = ['Unassigned', 'Liam', 'Sophia', 'Ethan', 'Olivia']

const initialOrders: DeliveryOrder[] = [
  { id: 'D-101', guest: 'Taylor West', address: '801 E Thunderbird Rd', amountCents: 4830, status: 'Queued', driver: 'Unassigned' },
  { id: 'D-102', guest: 'Reese Dunn', address: '1128 W Hatcher Rd', amountCents: 6720, status: 'Preparing', driver: 'Liam' },
  { id: 'D-103', guest: 'Casey Kerr', address: '598 E Cinnabar Ave', amountCents: 5590, status: 'Out for Delivery', driver: 'Sophia' },
]

export default function DeliveryPage() {
  const [orders, setOrders] = useState(initialOrders)

  function updateDriver(id: string, driver: string): void {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, driver } : order)))
  }

  function advanceStatus(id: string): void {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order
        if (order.status === 'Queued') return { ...order, status: 'Preparing' }
        if (order.status === 'Preparing') return { ...order, status: 'Out for Delivery' }
        if (order.status === 'Out for Delivery') return { ...order, status: 'Completed' }
        return { ...order, status: 'Queued' }
      }),
    )
  }

  return (
    <POSShell title="Delivery" subtitle="Dispatch board and driver assignment">
      <div className="rounded-lg border border-primary/30 bg-dark-lighter/40 p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[740px] text-sm">
            <thead className="text-left text-cream/70">
              <tr>
                <th className="py-2">Order</th>
                <th className="py-2">Guest</th>
                <th className="py-2">Address</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Driver</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-primary/20">
                  <td className="py-2 font-medium">{order.id}</td>
                  <td className="py-2">{order.guest}</td>
                  <td className="py-2">{order.address}</td>
                  <td className="py-2 text-primary-light">{formatCurrency(order.amountCents)}</td>
                  <td className="py-2">
                    <select
                      value={order.driver}
                      onChange={(event) => updateDriver(order.id, event.target.value)}
                      className="rounded-md border border-primary/30 bg-dark-lighter px-2 py-1 text-sm"
                    >
                      {drivers.map((driver) => (
                        <option key={driver} value={driver}>
                          {driver}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2">
                    <span className="rounded bg-primary/15 px-2 py-1 text-xs text-primary-light">{order.status}</span>
                  </td>
                  <td className="py-2">
                    <Button
                      variant="outline"
                      onClick={() => advanceStatus(order.id)}
                      className="border-primary/40 bg-dark-lighter/30 text-cream hover:bg-primary hover:text-white"
                    >
                      Advance
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </POSShell>
  )
}
