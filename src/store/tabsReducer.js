import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sortTabs: 'cheapest',
}

const tabsReducer = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    toggleTabs: (state, action) => {
      state.sortTabs = action.payload
    },
  },
})

export const { toggleTabs } = tabsReducer.actions
export default tabsReducer.reducer
