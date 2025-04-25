import { Button, Spin } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { addFiveAmount } from '../../store/ticketReducer'
import Ticket from '../ticket/Ticket'

import s from './TicketList.module.scss'

const TicketList = () => {
  const dispatch = useDispatch()
  const { amount, loading } = useSelector((state) => state.ticket)
  const [...allTickets] = useSelector((state) => state.ticket.tickets)
  const { sortTabs } = useSelector((state) => state.tabs)
  const { checkbox } = useSelector((state) => state.filters)

  const ticketsFilters = (checkboxs, tickets) => {
    const { all, noTransfers, oneTransfers, twoTransfers, threeTransfers } = checkboxs
    let newTickets = []

    const filteredTickets = (ticket, stops) => {
      return ticket.filter((t) => t.segments[0].stops.length === stops || t.segments[1].stops.length === stops)
    }
    if (!all && !noTransfers && !oneTransfers && !twoTransfers && !threeTransfers) return newTickets
    if (all) return tickets
    if (noTransfers) {
      newTickets = [...newTickets, ...filteredTickets(tickets, 0)]
    }
    if (oneTransfers) {
      newTickets = [...newTickets, ...filteredTickets(tickets, 1)]
    }
    if (twoTransfers) {
      newTickets = [...newTickets, ...filteredTickets(tickets, 2)]
    }
    if (threeTransfers) {
      newTickets = [...newTickets, ...filteredTickets(tickets, 3)]
    }
    return newTickets
  }

  const ticketTabs = (tickets, tabsName) => {
    if (tickets.length === 0) return []
    if (tabsName === 'cheapest') {
      return tickets.sort((a, b) => a.price - b.price)
    }
    if (tabsName === 'fastest') {
      return tickets.sort((a, b) => {
        return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      })
    }
    return tickets.sort((a, b) => {
      return (
        a.price +
        a.segments[0].duration +
        a.segments[1].duration -
        (b.price + b.segments[0].duration + b.segments[1].duration)
      )
    })
  }

  const tickets = ticketTabs(ticketsFilters(checkbox, allTickets), sortTabs).slice(0, amount)

  const onChangeAmount = () => {
    dispatch(addFiveAmount())
  }

  return (
    <ul className={s.ticket_list}>
      {tickets.length ? (
        <>
          {loading && <Spin style={{ justifySelf: 'center' }} />}
          {tickets.map((d) => (
            <Ticket key={uuidv4()} data={d} />
          ))}
          <Button
            onClick={onChangeAmount}
            style={{
              marginBottom: '50px',
              background: '#2196F3',
              height: '50px',
            }}
            type="primary"
          >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
          </Button>
        </>
      ) : (
        <span>По заданным параметрам ничего не нашлось! </span>
      )}
    </ul>
  )
}

export default TicketList
