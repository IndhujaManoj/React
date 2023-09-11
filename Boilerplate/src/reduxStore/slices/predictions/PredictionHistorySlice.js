import { createSlice } from '@reduxjs/toolkit'
import {
  getPredictionHistoryCount,
  getPredictionHistoryList,
  exportPredictionHistory,
} from './services/history-thunk'

const initialState = {
  list: {
    data: [],
    load: false,
    pagination: {
      current_page: 1,
      records_per_page: 10,
      total_records: 0,
      pages: 0,
    },
    sorting: {
      sort_field: 'review_date',
      sort_order: 'desc',
    },
  },
  export: {
    load: false,
  },
}

const PredictionHistorySlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    updatePredictionHistorySortField(state, action) {
      state.sort_field = action.payload.sortField
      state.sort_order = action.payload.sortOrder
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPredictionHistoryCount.fulfilled, (state, action) => {
        state.list.pagination.total_records = action.payload.count
        state.list.pagination.pages = action.payload.pages
      })
      .addCase(getPredictionHistoryCount.rejected, (state, action) => {
        state.list.pagination.total_records = 0
        state.list.pagination.pages = 0
      })

      .addCase(getPredictionHistoryList.fulfilled, (state, action) => {
        state.list.data = action.payload.data
        state.list.pagination.current_page = action.payload.page
        state.list.pagination.records_per_page = action.payload.per_page
      })
      .addCase(getPredictionHistoryList.rejected, (state, action) => {
        state.list.data = []
        state.list.pagination.current_page = 1
      })

      .addCase(exportPredictionHistory.pending, (state) => {
        state.export.load = true
      })
      .addCase(exportPredictionHistory.fulfilled, (state) => {
        state.export.load = false
      })
      .addCase(exportPredictionHistory.rejected, (state) => {
        state.export.load = false
      })
  },
})

export default PredictionHistorySlice.reducer
export const { updatePredictionHistorySortField } =
  PredictionHistorySlice.actions
