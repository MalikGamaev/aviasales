import { Radio } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleTabs } from '../../store/tabsReducer'
import { defaultAmount } from '../../store/ticketReducer'

import s from './TicketTabs.module.scss'

const TicketTabs = () => {
  const tabs = [
    { label: 'САМЫЙ ДЕШЕВЫЙ', value: 'cheapest' },
    { label: 'САМЫЙ БЫСТРЫЙ', value: 'fastest' },
    { label: 'ОПТИМАЛЬНЫЙ', value: 'optimal' },
  ]

  const dispatch = useDispatch()
  const sortValue = useSelector((state) => state.tabs.sortTabs)

  const onChangeTabs = (e) => {
    dispatch(defaultAmount())
    dispatch(toggleTabs(e.target.value))
  }

  return (
    <div className={s.ticket_tabs}>
      <Radio.Group
        onChange={onChangeTabs}
        className={s.tabs_items}
        options={tabs}
        block
        value={sortValue}
        defaultValue="cheapest"
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  )
}

export default TicketTabs
