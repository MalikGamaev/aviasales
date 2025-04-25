import { configureStore } from '@reduxjs/toolkit'

import filtersReducer from './filtersReducer'
import tabsReducer from './tabsReducer'
import ticketsReducer from './ticketReducer'

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tabs: tabsReducer,
    ticket: ticketsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
