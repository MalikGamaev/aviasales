import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  checkbox: {
    all: false,
    noTransfers: false,
    oneTransfers: false,
    twoTransfers: false,
    threeTransfers: false,
  },
}

const filtersReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleCheck: (state, action) => {
      if (action.payload.name === 'all') {
        state.checkbox.all = action.payload.check
        state.checkbox.noTransfers = action.payload.check
        state.checkbox.oneTransfers = action.payload.check
        state.checkbox.twoTransfers = action.payload.check
        state.checkbox.threeTransfers = action.payload.check
      } else {
        if (action.payload.name === 'no') state.checkbox.noTransfers = action.payload.check
        if (action.payload.name === 'one') state.checkbox.oneTransfers = action.payload.check
        if (action.payload.name === 'two') state.checkbox.twoTransfers = action.payload.check
        if (action.payload.name === 'three') state.checkbox.threeTransfers = action.payload.check
        state.checkbox.all =
          state.checkbox.noTransfers &&
          state.checkbox.oneTransfers &&
          state.checkbox.twoTransfers &&
          state.checkbox.threeTransfers
      }
    },
  },
})

export const { toggleCheck } = filtersReducer.actions
export default filtersReducer.reducer
