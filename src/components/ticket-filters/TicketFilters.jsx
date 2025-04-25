import { Checkbox } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleCheck } from '../../store/filtersReducer'
import { defaultAmount } from '../../store/ticketReducer'

import styles from './TicketFilters.module.scss'

const TicketFilters = () => {
  const dispatch = useDispatch()
  const { all, noTransfers, oneTransfers, twoTransfers, threeTransfers } = useSelector(
    (state) => state.filters.checkbox,
  )

  const onChangeCheck = (e, checkName) => {
    dispatch(defaultAmount())
    dispatch(
      toggleCheck({
        check: e.target.checked,
        name: checkName,
      }),
    )
  }

  return (
    <div className={styles.ticket_filters}>
      <h2 className={styles.ticket_filters__title}>Количество пересадок</h2>
      <ul className={styles.ticket_filters__items}>
        <li className={styles.ticket_filters__item}>
          <Checkbox onChange={(e) => onChangeCheck(e, 'all')} checked={all} />
          Все
        </li>
        <li className={styles.ticket_filters__item}>
          <Checkbox onChange={(e) => onChangeCheck(e, 'no')} checked={noTransfers} />
          Без пересадок
        </li>
        <li className={styles.ticket_filters__item}>
          <Checkbox onChange={(e) => onChangeCheck(e, 'one')} checked={oneTransfers} />1 пересадка
        </li>
        <li className={styles.ticket_filters__item}>
          <Checkbox onChange={(e) => onChangeCheck(e, 'two')} checked={twoTransfers} />2 пересадки
        </li>
        <li className={styles.ticket_filters__item}>
          <Checkbox onChange={(e) => onChangeCheck(e, 'three')} checked={threeTransfers} />3 пересадки
        </li>
      </ul>
    </div>
  )
}

export default TicketFilters
