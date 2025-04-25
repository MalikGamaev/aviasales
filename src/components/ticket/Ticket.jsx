import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import s from './Ticket.module.scss'

const Ticket = ({ data }) => {
  const elements = data.segments.map((ticket) => {
    const { date, destination, duration, origin, stops } = ticket
    const duringTime = new Date(date)

    const timeInMinute = (durations) => {
      const hours = String(Math.floor(durations / 60))
      const minutes = String(durations % 60)
      return `${hours}ч  ${minutes}м`
    }

    const formatDuration = timeInMinute(duration)

    const formatDate = (dates) =>
      `${String(dates.getHours()).padStart(2, '0')}:${String(dates.getMinutes()).padStart(2, '0')}`

    const timeArrived = new Date(duringTime.getTime() + duration * 60000)
    const timeFlying = `${formatDate(duringTime)} - ${formatDate(timeArrived)}`

    return (
      <div key={uuidv4()} className={s.ticket_wrap}>
        <div className={s.ticket_info}>
          <h2 className={s.ticket_info__title}>{`${origin} - ${destination}`}</h2>
          <span className={s.ticket_info__text}>{timeFlying}</span>
        </div>
        <div className={s.ticket_info}>
          <h2 className={s.ticket_info__title}>В ПУТИ</h2>
          <span className={s.ticket_info__text}>{formatDuration}</span>
        </div>
        <div className={s.ticket_info}>
          <h2 className={s.ticket_info__title}>
            {stops.length === 0 ? 'БЕЗ ПЕРЕСАДОК' : stops.length === 1 ? '1 ПЕРЕСАДКА' : `${stops.length} ПЕРЕСАДКИ`}
          </h2>
          <span className={s.ticket_info__text}>{stops.length > 0 ? stops.join(', ') : null}</span>
        </div>
      </div>
    )
  })

  return (
    <li className={s.ticket}>
      <header className={s.ticket_header}>
        {`${data.price} р`}
        <img width={110} height={36} src={`//pics.avs.io/99/36/${data.carrier}.png`} alt="Лого авиакомпаний" />
      </header>
      <section className={s.ticket_content}>{elements}</section>
    </li>
  )
}

export default Ticket
