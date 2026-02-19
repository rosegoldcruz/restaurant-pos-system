'use client'

import { useState } from 'react'
import { POSShell } from '@/components/pos/pos-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Role = {
  name: string
  canEditMenu: boolean
  canVoidChecks: boolean
  canViewAccounting: boolean
}

type RolePermission = Exclude<keyof Role, 'name'>

const initialRoles: Role[] = [
  { name: 'Manager', canEditMenu: true, canVoidChecks: true, canViewAccounting: true },
  { name: 'Server', canEditMenu: false, canVoidChecks: false, canViewAccounting: false },
  { name: 'Host', canEditMenu: false, canVoidChecks: false, canViewAccounting: false },
]

export default function SettingsPage() {
  const [roles, setRoles] = useState(initialRoles)
  const [syncSource, setSyncSource] = useState('/home/driftwoods-rebuild')
  const [autoSync, setAutoSync] = useState(true)
  const [taxRate, setTaxRate] = useState('8.25')

  function toggleRole(roleName: string, key: RolePermission): void {
    setRoles((current) =>
      current.map((role) => {
        if (role.name !== roleName) return role
        return { ...role, [key]: !role[key] }
      }),
    )
  }

  return (
    <POSShell title="Settings" subtitle="System preferences, roles, and menu sync">
      <div className="space-y-4">
        <section className="rounded-lg border border-primary/30 bg-dark-lighter/40 p-4">
          <h2 className="mb-3 text-lg font-semibold">Menu Sync</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-1 text-sm text-cream/70">Source Repository Path</p>
              <Input value={syncSource} onChange={(event) => setSyncSource(event.target.value)} />
            </div>
            <div>
              <p className="mb-1 text-sm text-cream/70">Sales Tax %</p>
              <Input value={taxRate} onChange={(event) => setTaxRate(event.target.value)} />
            </div>
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoSync}
              onChange={() => setAutoSync((current) => !current)}
              className="h-4 w-4 rounded border-primary/50 bg-dark-lighter"
            />
            Enable automatic menu sync on deployment
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="bg-primary text-white hover:bg-primary-dark">Save Settings</Button>
            <Button variant="outline" className="border-primary/40 bg-dark-lighter/30 text-cream hover:bg-primary hover:text-white">
              Run Sync Validation
            </Button>
          </div>
        </section>

        <section className="rounded-lg border border-primary/30 bg-dark-lighter/40 p-4">
          <h2 className="mb-3 text-lg font-semibold">User Roles</h2>
          <div className="space-y-2 md:hidden">
            {roles.map((role) => (
              <article key={role.name} className="rounded-md border border-primary/20 bg-dark/40 p-3">
                <p className="mb-2 font-medium">{role.name}</p>
                <label className="mb-2 flex items-center justify-between text-sm">
                  Edit Menu
                  <input type="checkbox" checked={role.canEditMenu} onChange={() => toggleRole(role.name, 'canEditMenu')} />
                </label>
                <label className="mb-2 flex items-center justify-between text-sm">
                  Void Checks
                  <input type="checkbox" checked={role.canVoidChecks} onChange={() => toggleRole(role.name, 'canVoidChecks')} />
                </label>
                <label className="flex items-center justify-between text-sm">
                  View Accounting
                  <input type="checkbox" checked={role.canViewAccounting} onChange={() => toggleRole(role.name, 'canViewAccounting')} />
                </label>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-left text-cream/70">
                <tr>
                  <th className="py-2">Role</th>
                  <th className="py-2">Edit Menu</th>
                  <th className="py-2">Void Checks</th>
                  <th className="py-2">View Accounting</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.name} className="border-t border-primary/20">
                    <td className="py-2 font-medium">{role.name}</td>
                    <td className="py-2">
                      <input type="checkbox" checked={role.canEditMenu} onChange={() => toggleRole(role.name, 'canEditMenu')} />
                    </td>
                    <td className="py-2">
                      <input type="checkbox" checked={role.canVoidChecks} onChange={() => toggleRole(role.name, 'canVoidChecks')} />
                    </td>
                    <td className="py-2">
                      <input
                        type="checkbox"
                        checked={role.canViewAccounting}
                        onChange={() => toggleRole(role.name, 'canViewAccounting')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </POSShell>
  )
}
