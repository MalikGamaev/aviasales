import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSearchIdThunk, fetchTicketsThunk } from '../../store/ticketReducer'
import Header from '../header/Header'
import TicketFilters from '../ticket-filters/TicketFilters'
import TicketList from '../ticket-list/TicketList'
import TicketTabs from '../ticket-tabs/TicketTabs'

import styles from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()

  const { stop, searchId } = useSelector((state) => state.ticket)

  useEffect(() => {
    if (stop) return

    const timerId = setInterval(() => {
      dispatch(fetchTicketsThunk(searchId))
    }, 1000)

    return () => clearInterval(timerId)
  }, [searchId, stop, dispatch])

  useEffect(() => {
    dispatch(fetchSearchIdThunk())
  }, [])

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <TicketFilters />
        <div className={styles.content}>
          <TicketTabs />
          <TicketList />
        </div>
      </main>
    </div>
  )
}

export default App
