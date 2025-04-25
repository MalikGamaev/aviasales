import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  searchId: '',
  tickets: [],
  stop: true,
  loading: true,
  amount: 5,
}

export const fetchSearchIdThunk = createAsyncThunk('ticket/fetchSearchIdThunk', async () => {
  try {
    const response = await axios.get('https://aviasales-test-api.kata.academy/search')
    return response.data.searchId
  } catch (error) {
    throw new Error(error)
  }
})

export const fetchTicketsThunk = createAsyncThunk('ticket/fetchTicketsThunk', async (searchId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    return response.data
  } catch (error) {
    throw rejectWithValue({
      message: error.message,
      statusCode: error.status ? error.status : null,
    })
  }
})

const ticketReducer = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    defaultAmount: (state) => {
      state.amount = 5
    },
    addFiveAmount: (state) => {
      state.amount += 5
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchIdThunk.fulfilled, (state, action) => {
        state.searchId = action.payload
        state.stop = false
      })
      .addCase(fetchSearchIdThunk.rejected, (state, action) => {
        state.loading = false
        console.error(action.error.message)
      })
      .addCase(fetchTicketsThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTicketsThunk.fulfilled, (state, action) => {
        if (action.payload.stop) state.loading = false
        state.tickets = [...state.tickets, ...action.payload.tickets]
        state.stop = action.payload.stop
      })
      .addCase(fetchTicketsThunk.rejected, (state, action) => {
        if (action.payload.statusCode !== 500) state.loading = false
        console.error(action.payload.message)
      })
  },
})

export const { defaultAmount, addFiveAmount } = ticketReducer.actions
export default ticketReducer.reducer
