'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { posNavItems } from '@/lib/pos-nav'

type POSShellProps = {
  title: string
  subtitle: string
  children: ReactNode
  rightPanel?: ReactNode
  topActions?: ReactNode
}

const quickNav = ['/menu', '/table-services', '/accounting', '/settings']

export function POSShell({ title, subtitle, children, rightPanel, topActions }: POSShellProps) {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const quickLinks = posNavItems.filter((item) => quickNav.includes(item.href))

  return (
    <div className="min-h-screen bg-dark text-cream">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-primary/20 bg-dark-lighter/70 p-4 lg:block">
          <Link href="/menu" className="mb-8 flex items-center gap-3">
            <img src="/Neon sign.webp" alt="Driftwoods" className="h-10 w-auto object-contain" />
            <div>
              <p className="text-xs text-cream/70">POS System</p>
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
                  className={`flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
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
          <header className="sticky top-0 z-20 border-b border-primary/20 bg-dark/95 px-3 py-3 backdrop-blur sm:px-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="truncate font-heading text-lg text-cream sm:text-xl">{title}</h1>
                <p className="text-xs text-cream/70 sm:text-sm">{subtitle}</p>
              </div>

              <button
                onClick={() => setMobileNavOpen((current) => !current)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-primary/30 bg-dark-lighter text-cream lg:hidden"
                aria-label="Toggle navigation"
              >
                {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {topActions ? <div className="mt-3">{topActions}</div> : null}
          </header>

          {mobileNavOpen ? (
            <div className="fixed inset-0 z-30 bg-black/45 lg:hidden" onClick={() => setMobileNavOpen(false)}>
              <div
                className="h-full w-[82%] max-w-[320px] bg-dark-lighter p-4"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-5 flex items-center gap-3">
                  <img src="/Neon sign.webp" alt="Driftwoods" className="h-9 w-auto object-contain" />
                  <p className="font-semibold tracking-wide">Driftwoods POS</p>
                </div>
                <nav className="space-y-2">
                  {posNavItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        className={`flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm ${
                          isActive ? 'bg-primary text-white' : 'text-cream/85 hover:bg-primary/10'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          ) : null}

          <main className={`grid gap-3 p-3 pb-24 sm:gap-4 sm:p-4 sm:pb-28 ${rightPanel ? '2xl:grid-cols-[1fr_320px]' : ''}`}>
            <section className="min-w-0">{children}</section>
            {rightPanel ? <aside className="min-w-0">{rightPanel}</aside> : null}
          </main>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-primary/20 bg-dark/95 p-2 backdrop-blur lg:hidden">
        <div className="grid grid-cols-4 gap-1">
          {quickLinks.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-12 flex-col items-center justify-center rounded-md text-[11px] ${
                  isActive ? 'bg-primary text-white' : 'text-cream/80'
                }`}
              >
                <item.icon className="mb-0.5 h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
