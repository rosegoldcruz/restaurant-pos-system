'use client'

import { useMemo, useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { POSShell } from '@/components/pos/pos-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency, posMenuCategories, posMenuItems } from '@/lib/menu-data'

type CartLine = {
  itemId: string
  quantity: number
}

function getDisplayPrice(minCents: number | null, maxCents: number | null, fallback: string): string {
  if (minCents === null) return fallback
  if (maxCents !== null) return `${formatCurrency(minCents)}-${formatCurrency(maxCents)}`
  return formatCurrency(minCents)
}

export default function MenuPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [cart, setCart] = useState<CartLine[]>([])

  const filteredItems = useMemo(() => {
    const text = search.trim().toLowerCase()
    return posMenuItems.filter((item) => {
      const matchesCategory = category === 'all' || item.categoryId === category
      const matchesSearch =
        !text ||
        item.name.toLowerCase().includes(text) ||
        item.description.toLowerCase().includes(text) ||
        item.tags.some((tag) => tag.includes(text))
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  const cartEntries = useMemo(() => {
    return cart
      .map((line) => {
        const item = posMenuItems.find((menuItem) => menuItem.id === line.itemId)
        if (!item) return null
        const unitCents = item.priceCents ?? 0
        return {
          ...line,
          item,
          lineTotal: unitCents * line.quantity,
        }
      })
      .filter(Boolean) as Array<{ itemId: string; quantity: number; item: (typeof posMenuItems)[number]; lineTotal: number }>
  }, [cart])

  const subtotal = cartEntries.reduce((sum, entry) => sum + entry.lineTotal, 0)
  const tax = Math.round(subtotal * 0.0825)
  const total = subtotal + tax

  function addToCart(itemId: string): void {
    setCart((current) => {
      const existing = current.find((line) => line.itemId === itemId)
      if (existing) {
        return current.map((line) => (line.itemId === itemId ? { ...line, quantity: line.quantity + 1 } : line))
      }
      return [...current, { itemId, quantity: 1 }]
    })
  }

  function adjustQuantity(itemId: string, delta: number): void {
    setCart((current) =>
      current
        .map((line) => (line.itemId === itemId ? { ...line, quantity: Math.max(0, line.quantity + delta) } : line))
        .filter((line) => line.quantity > 0),
    )
  }

  return (
    <POSShell
      title="Menu"
      subtitle="Driftwoods AZ menu synced from source repository"
      rightPanel={
        <div className="rounded-lg border border-primary/30 bg-dark-lighter/60 p-4">
          <h2 className="mb-3 text-lg font-semibold">Current Check</h2>
          {cartEntries.length === 0 ? (
            <p className="text-sm text-cream/70">Add menu items to start an order.</p>
          ) : (
            <div className="space-y-3">
              {cartEntries.map((entry) => (
                <div key={entry.itemId} className="rounded-md border border-primary/20 bg-dark/40 p-3">
                  <p className="text-sm font-medium">{entry.item.name}</p>
                  <p className="text-xs text-cream/70">{getDisplayPrice(entry.item.priceCents, entry.item.maxPriceCents, entry.item.priceLabel)}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjustQuantity(entry.itemId, -1)}
                        className="rounded border border-primary/30 p-1 hover:bg-primary/10"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-6 text-center text-sm">{entry.quantity}</span>
                      <button
                        onClick={() => adjustQuantity(entry.itemId, 1)}
                        className="rounded border border-primary/30 p-1 hover:bg-primary/10"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold">{formatCurrency(entry.lineTotal)}</span>
                  </div>
                </div>
              ))}
              <div className="space-y-1 border-t border-primary/20 pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream/70">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/70">AZ Tax 8.25%</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              <Button className="w-full bg-primary text-white hover:bg-primary-dark">Send to Kitchen</Button>
            </div>
          )}
        </div>
      }
      topActions={
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search menu items"
          className="min-w-[200px]"
        />
      }
    >
      <div className="space-y-4">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory('all')}
            className={`rounded-md border px-3 py-2 text-sm ${
              category === 'all' ? 'border-primary bg-primary text-white' : 'border-primary/30 bg-dark-lighter/30 hover:bg-primary/10'
            }`}
          >
            All ({posMenuItems.length})
          </button>
          {posMenuCategories.map((menuCategory) => (
            <button
              key={menuCategory.id}
              onClick={() => setCategory(menuCategory.id)}
              className={`rounded-md border px-3 py-2 text-sm whitespace-nowrap ${
                category === menuCategory.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-primary/30 bg-dark-lighter/30 hover:bg-primary/10'
              }`}
            >
              {menuCategory.name} ({menuCategory.itemCount})
            </button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {filteredItems.map((item) => (
            <article key={item.id} className="menu-card rounded-lg border border-primary/20 bg-dark-lighter/40 p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-tight text-cream">{item.name}</h3>
                <span className="rounded bg-primary/20 px-2 py-1 text-xs text-primary-light">{item.categoryName}</span>
              </div>
              <p className="mb-3 line-clamp-3 text-sm text-cream/75">{item.description || 'No description provided.'}</p>
              {item.modifiers.length > 0 ? (
                <p className="mb-3 text-xs text-accent">Modifiers: {item.modifiers.join(' | ')}</p>
              ) : null}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary-light">
                    {getDisplayPrice(item.priceCents, item.maxPriceCents, item.priceLabel)}
                  </p>
                  {item.tags.length > 0 ? <p className="text-xs text-cream/60">{item.tags.join(', ')}</p> : null}
                </div>
                <Button onClick={() => addToCart(item.id)} className="bg-primary text-white hover:bg-primary-dark">
                  Add
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </POSShell>
  )
}
