import { createSlice } from '@reduxjs/toolkit'
import {
  getEditCheckByStatus,
  getEditCheckCount,
  getEditCheckWithFilter,
  updateWorkflow,
  deleteEditCheck,
  getEditCheckRunStatus,
  getTestLogData,
  getTestSummaryData,
  getDqConfigStatus,
  handleSubmitDqConfig,
} from './services/editCheckthunk'
import moment from 'moment'

const initialState = {
  editChecksByStatus: {
    load: false,
    data: [],
    count: [],
    pagination: {
      current_page: 1,
      records_per_page: 10,
      total_records: 0,
      pages: 0,
    },
    sorting: {
      sort_field: '',
      sort_order: '',
    },
  },
  editChecksTestLog: {
    load: false,
    data: [],
    pagination: {
      current_page: 1,
      records_per_page: 10,
      total_records: 0,
      pages: 0,
    },
    sorting: {
      sort_field: '',
      sort_order: '',
    },
  },
  editChecksTestSummary: {
    load: false,
    data: []
  },
  editChecksTestSummaryTableData: {
    load: false,
    data: [],
  },

  dqConfig: {
    study_edit_check_id: null,
    preconformance_item_name: '',
    target_dataset_refname: '',
    target_section_refname: '',
    target_item_refname: '',
    last_run_date: '',
    comment: '',
    load: false,
  },
  updateWorkFlowLoad: false,
}

const editCheckSlice = createSlice({
  name: 'editchecks',
  initialState,
  reducers: {
    updateSortField(state, action) {
      state.editChecksByStatus.sorting.sort_field = action.payload.sortField
      state.editChecksByStatus.sorting.sort_order = action.payload.sortOrder
    },
    updateEditCheckData(state, action) {
      state.editChecksByStatus.data = action.payload?.data
    },
    updateDqConfig(state, action) {
      state.dqConfig[action.payload.key] = action.payload.value
    },
    resetDQConfig(state, action) {
      state.dqConfig = Object.keys(action.payload).length === 0 ? initialState.dqConfig : action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEditCheckByStatus.pending, (state, action) => {
        state.editChecksByStatus.load = true
      })
      .addCase(getEditCheckByStatus.fulfilled, (state, action) => {
        const { data = [], paging = {} } = action.payload
        state.editChecksByStatus.load = false
        state.editChecksByStatus.data = data
        state.editChecksByStatus.pagination.current_page = paging['page_number']
        state.editChecksByStatus.pagination.records_per_page =
          paging['per_page']
        state.editChecksByStatus.pagination.total_records =
          paging['total_count']
        state.editChecksByStatus.pagination.pages = Math.ceil(
          paging['total_count'] / paging['per_page']
        )
      })
      .addCase(getEditCheckByStatus.rejected, (state, action) => {
        state.editChecksByStatus.data = []
        state.editChecksByStatus.load = false
        state.editChecksByStatus.pagination.total_records = 0
        state.editChecksByStatus.pagination.pages = 0
      })

      .addCase(getEditCheckCount.fulfilled, (state, action) => {
        const { data = [] } = action.payload
        state.editChecksByStatus.count = data
      })
      .addCase(getEditCheckCount.rejected, (state, action) => {
        state.editChecksByStatus.count = []
      })

      .addCase(getEditCheckWithFilter.pending, (state, action) => {
        state.editChecksByStatus.load = true
      })
      .addCase(getEditCheckWithFilter.fulfilled, (state, action) => {
        const { data = [], paging = {} } = action.payload
        state.editChecksByStatus.load = false
        state.editChecksByStatus.data = data
        state.editChecksByStatus.pagination.current_page = paging['page_number']
        state.editChecksByStatus.pagination.records_per_page =
          paging['per_page']
        state.editChecksByStatus.pagination.total_records =
          paging['total_count']
        state.editChecksByStatus.pagination.pages = Math.ceil(
          paging['total_count'] / paging['per_page']
        )
      })
      .addCase(getEditCheckWithFilter.rejected, (state, action) => {
        state.editChecksByStatus.data = []
        state.editChecksByStatus.load = false
        state.editChecksByStatus.pagination.total_records = 0
        state.editChecksByStatus.pagination.pages = 0
      })

      .addCase(updateWorkflow.fulfilled, (state, action) => {
        state.updateWorkFlowLoad = !state.updateWorkFlowLoad
      })

      .addCase(deleteEditCheck.fulfilled, (state, action) => {
        state.updateWorkFlowLoad = !state.updateWorkFlowLoad
      })

      .addCase(getEditCheckRunStatus.pending, (state, action) => {
        state.editChecksByStatus.load = true
      })
      .addCase(getEditCheckRunStatus.fulfilled, (state, action) => {
        state.editChecksByStatus.load = false
        if (action.payload) {
          state.editChecksByStatus.data?.map((editCheckData) =>
            action.payload.map((runData) => {
              if (runData.ec_id === editCheckData.id) {
                editCheckData.run_status = runData.status
                editCheckData.job_run_id = runData.job_run_id
                editCheckData.ec_exc_log_id = runData.ec_exc_log_id
              }
            })
          )
        }
      })
      .addCase(getEditCheckRunStatus.rejected, (state, action) => {
        state.editChecksByStatus.load = false
      })
      .addCase(getTestLogData.pending, (state, action) => {
        state.editChecksTestLog.load = true
      })
      .addCase(getTestLogData.fulfilled, (state, action) => {
        if (action.payload.from == 'TEST_SUMMARY') {
          state.editChecksTestSummaryTableData.data = action.payload.logdata
        } else {
          state.editChecksTestLog.data = action.payload.logdata
        }
        //
      })
      .addCase(getTestLogData.rejected, (state, action) => {
        state.editChecksTestLog.data = []
      })
      .addCase(getTestSummaryData.pending, (state, action) => {
        state.editChecksTestSummary.load = true
      })
      .addCase(getTestSummaryData.fulfilled, (state, action) => {
        state.editChecksTestSummary.data = action.payload
      })
      .addCase(getTestSummaryData.rejected, (state, action) => {
        state.editChecksTestSummary.data = []
      })
      .addCase(getDqConfigStatus.fulfilled, (state, action) => {
        state.dqConfig = {
          ...state.dqConfig,
          ...action.payload.data,
          study_edit_check_id: action.payload.study_edit_check_id,
          last_run_date: action.payload.data?.last_run_date
            ? moment(action.payload.data?.last_run_date).format('YYYY-MM-DD')
            : '',
        }
      })

      .addCase(handleSubmitDqConfig.pending, (state, action) => {
        state.dqConfig.load = true
      })
      .addCase(handleSubmitDqConfig.fulfilled, (state, action) => {
        state.dqConfig = { ...state.dqConfig, ...action.payload, load: false }
      })
      .addCase(handleSubmitDqConfig.rejected, (state, action) => {
        state.dqConfig = { ...state.dqConfig, ...action.payload, load: false }
      })
  },
})

export const {
  updateSortField,
  updateEditCheckData,
  updateDqConfig,
  resetDQConfig,
} = editCheckSlice.actions
export default editCheckSlice.reducer

function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, milisec)
  })
}

export const pollingTestRun = (editCheckIds) => async (dispatch) => {
  try {
    let is_running = true
    let timeCount = 0
    do {
      dispatch(getEditCheckRunStatus(editCheckIds))
      await waitforme(15000)
      timeCount = timeCount + 1
      if (timeCount === 20) is_running = false
    } while (is_running)
  } catch (error) {
    console.error('polling test run error', error)
  }
}