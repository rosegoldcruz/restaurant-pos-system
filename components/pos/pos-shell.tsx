'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Bell } from 'lucide-react'
import type { ReactNode } from 'react'
import { posNavItems } from '@/lib/pos-nav'
import { Input } from '@/components/ui/input'

type POSShellProps = {
  title: string
  subtitle: string
  children: ReactNode
  rightPanel?: ReactNode
  topActions?: ReactNode
}

export function POSShell({ title, subtitle, children, rightPanel, topActions }: POSShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-dark text-cream">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-primary/20 bg-dark-lighter/70 p-4 lg:border-b-0 lg:border-r">
          <Link href="/menu" className="mb-8 flex items-center gap-3">
            <img src="/Neon sign.webp" alt="Driftwoods" className="h-10 w-auto object-contain" />
            <div>
              <p className="text-sm text-cream/70">POS System</p>
              <p className="font-semibold tracking-wide">Driftwoods AZ</p>
            </div>
          </Link>

          <nav className="space-y-2">
            {posNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-primary text-white shadow-[0_0_0_1px_rgba(220,107,38,0.4)]'
                      : 'text-cream/80 hover:bg-primary/10 hover:text-cream'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="grid min-h-screen grid-rows-[auto_1fr]">
          <header className="border-b border-primary/20 bg-dark/95 px-4 py-3 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-heading text-xl text-cream">{title}</h1>
                <p className="text-sm text-cream/70">{subtitle}</p>
              </div>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="relative min-w-[220px] flex-1 sm:flex-initial">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
                  <Input placeholder="Search" className="pl-9" />
                </div>
                {topActions}
                <button className="rounded-md border border-primary/30 bg-dark-lighter p-2 text-cream hover:border-primary">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <main className={`grid gap-4 p-4 ${rightPanel ? 'xl:grid-cols-[1fr_340px]' : ''}`}>
            <section>{children}</section>
            {rightPanel ? <aside>{rightPanel}</aside> : null}
          </main>
        </div>
      </div>
    </div>
  )
}
