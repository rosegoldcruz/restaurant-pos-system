'use client'

import { useMemo, useState } from 'react'
import { POSShell } from '@/components/pos/pos-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Reservation = {
  id: number
  guest: string
  date: string
  time: string
  partySize: number
  phone: string
  status: 'Confirmed' | 'Pending' | 'Seated'
}

const initialReservations: Reservation[] = [
  { id: 1, guest: 'Jordan Ellis', date: '2026-02-19', time: '18:30', partySize: 4, phone: '(602) 555-9012', status: 'Confirmed' },
  { id: 2, guest: 'Avery Cole', date: '2026-02-19', time: '19:00', partySize: 2, phone: '(602) 555-2218', status: 'Pending' },
  { id: 3, guest: 'Sam Rivera', date: '2026-02-20', time: '11:30', partySize: 6, phone: '(480) 555-4470', status: 'Confirmed' },
]

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations)
  const [guest, setGuest] = useState('')
  const [date, setDate] = useState('2026-02-20')
  const [time, setTime] = useState('18:00')
  const [partySize, setPartySize] = useState('2')
  const [phone, setPhone] = useState('')
  const [filterDate, setFilterDate] = useState('2026-02-19')

  const visibleReservations = useMemo(() => {
    return reservations.filter((reservation) => reservation.date === filterDate)
  }, [reservations, filterDate])

  function addReservation(): void {
    if (!guest.trim() || !phone.trim()) return

    setReservations((current) => [
      {
        id: current.length + 1,
        guest: guest.trim(),
        date,
        time,
        partySize: Number.parseInt(partySize, 10) || 2,
        phone: phone.trim(),
        status: 'Pending',
      },
      ...current,
    ])

    setGuest('')
    setPhone('')
  }

  function cycleStatus(id: number): void {
    setReservations((current) =>
      current.map((reservation) => {
        if (reservation.id !== id) return reservation
        if (reservation.status === 'Pending') return { ...reservation, status: 'Confirmed' }
        if (reservation.status === 'Confirmed') return { ...reservation, status: 'Seated' }
        return { ...reservation, status: 'Pending' }
      }),
    )
  }

  return (
    <POSShell title="Reservations" subtitle="View, create, and manage reservations">
      <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <section className="space-y-3 rounded-lg border border-primary/30 bg-dark-lighter/40 p-4">
          <h2 className="text-lg font-semibold">Create Reservation</h2>
          <Input value={guest} onChange={(event) => setGuest(event.target.value)} placeholder="Guest name" />
          <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <Input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          <Input value={partySize} onChange={(event) => setPartySize(event.target.value)} placeholder="Party size" />
          <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" />
          <Button onClick={addReservation} className="w-full bg-primary text-white hover:bg-primary-dark">
            Save Reservation
          </Button>
        </section>

        <section className="space-y-3 rounded-lg border border-primary/30 bg-dark-lighter/40 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Reservation Book</h2>
            <Input className="w-[180px]" type="date" value={filterDate} onChange={(event) => setFilterDate(event.target.value)} />
          </div>

          <div className="space-y-2 md:hidden">
            {visibleReservations.map((reservation) => (
              <article key={reservation.id} className="rounded-md border border-primary/20 bg-dark/40 p-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="font-medium">{reservation.guest}</p>
                  <span className="rounded bg-primary/15 px-2 py-1 text-xs text-primary-light">{reservation.status}</span>
                </div>
                <p className="text-sm text-cream/70">
                  {reservation.date} at {reservation.time} • Party {reservation.partySize}
                </p>
                <p className="mb-2 text-sm text-cream/70">{reservation.phone}</p>
                <Button
                  variant="outline"
                  className="w-full border-primary/40 bg-dark-lighter/30 text-cream hover:bg-primary hover:text-white"
                  onClick={() => cycleStatus(reservation.id)}
                >
                  Next Status
                </Button>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-left text-cream/70">
                <tr>
                  <th className="py-2">Guest</th>
                  <th className="py-2">Time</th>
                  <th className="py-2">Party</th>
                  <th className="py-2">Phone</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-t border-primary/20">
                    <td className="py-2 font-medium">{reservation.guest}</td>
                    <td className="py-2">{reservation.time}</td>
                    <td className="py-2">{reservation.partySize}</td>
                    <td className="py-2">{reservation.phone}</td>
                    <td className="py-2">
                      <span className="rounded bg-primary/15 px-2 py-1 text-xs text-primary-light">{reservation.status}</span>
                    </td>
                    <td className="py-2">
                      <Button
                        variant="outline"
                        className="border-primary/40 bg-dark-lighter/30 text-cream hover:bg-primary hover:text-white"
                        onClick={() => cycleStatus(reservation.id)}
                      >
                        Next Status
                      </Button>
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
