import { createSlice } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'
import { DataService } from 'config.axios'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'
import { getItem } from 'utils/localStorageController'

const study_id = getItem('_study_id')

const initialState = {
  api_data: [],
  row_ids: {},
  table_data: [],
  bool_checks: {
    check_if_edited: false,
    is_all_pass: false,
    is_running: false,
    result_count: 0,
    can_download_logs: false,
  },
  paging: {},
  sheet: {
    current_sheet: 1,
    total_sheet: 1,
  },
  load: {
    get_api_data: false,
    save_api_data: false,
    run_test_harness: false,
    logs_download: false,
  },
  last_execution_id: null,
}

const testHarnessSlice = createSlice({
  name: 'TestHarness',
  initialState,
  reducers: {
    getTestHarnessDataRequest: (state, action) => {
      state.load.get_api_data = true
    },
    getTestHarnessDataSuccess: (state, action) => {
      state.api_data = action.payload.api_data
      state.table_data = action.payload.table_data
      state.paging = action.payload.paging
      state.sheet.total_sheet = action.payload.total_sheet
      state.row_ids = action.payload.row_ids
      state.check_if_edited = false
      state.bool_checks.is_all_pass = action.payload.is_all_pass
      state.bool_checks.is_running = action.payload.is_running
      state.bool_checks.result_count = action.payload.result_count
      state.bool_checks.check_if_edited = false
      state.bool_checks.can_download_logs = action.payload.can_download_logs
      state.last_execution_id = action.payload.last_execution_id
      state.load.get_api_data = false
    },
    getTestHarnessDataFail: (state, action) => {
      state.load.get_api_data = false
    },
    updateTestHarnessData: (state, action) => {
      state.table_data = action.payload.table_data
      state.bool_checks.check_if_edited = true
    },
    saveTestHarnessDataRequest: (state, action) => {
      state.load.save_api_data = true
    },
    saveTestHarnessDataSuccess: (state, action) => {
      state.load.save_api_data = false
      state.bool_checks.check_if_edited = false
    },
    saveTestHarnessDataFail: (state, action) => {
      state.load.save_api_data = false
    },
    getTestStatus: (state, action) => {
      state.table_data = action.payload.table_data
      state.bool_checks.is_all_pass = action.payload.is_all_pass
      state.bool_checks.is_running = action.payload.is_running
      state.bool_checks.result_count = action.payload.result_count
      state.bool_checks.can_download_logs = action.payload.can_download_logs
      state.last_execution_id = action.payload.last_execution_id
    },
    runTestHarnessRequested: (state, action) => {
      state.load.run_test_harness = true
    },
    runTestHarnessDataSucess: (state, action) => {
      state.load.run_test_harness = false
    },
    runTestHarnessDataFail: (state, action) => {
      state.load.run_test_harness = false
    },
    clearRuleTestHarness: (state, action) => {
      state.api_data = []
      state.row_ids = {}
      state.table_data = []
      state.bool_checks = {
        check_if_edited: false,
        is_all_pass: false,
        is_running: false,
      }
      state.paging = {}
      state.sheet = {
        current_sheet: 1,
        total_sheet: 1,
      }
    },
    updateCurrentSheet: (state, action) => {
      state.sheet.current_sheet = action.payload.current_sheet
    },
    addSheet: (state, action) => {
      state.sheet.total_sheet = action.payload.total_sheet
    },
    clearRunDataEdit: (state, action) => {
      state.table_data = action.payload.table_data
      state.bool_checks = action.payload.bool_checks
    },

    downloadTestLogsRequest: (state, action) => {
      state.load.logs_download = true
    },
    downloadTestLogsSuccess: (state, action) => {
      state.load.logs_download = false
    },
    downloadTestLogsFail: (state, action) => {
      state.load.logs_download = false
    },
  },
})

export const {
  getTestHarnessDataRequest,
  getTestHarnessDataSuccess,
  getTestHarnessDataFail,
  updateTestHarnessData,
  saveTestHarnessDataRequest,
  saveTestHarnessDataSuccess,
  saveTestHarnessDataFail,
  updatesExpectedResult,
  getTestStatus,
  runTestHarnessDataFail,
  runTestHarnessRequested,
  runTestHarnessDataSucess,
  updateMoveToTesting,
  clearRuleTestHarness,
  updateCurrentSheet,
  addSheet,
  clearRunDataEdit,
  downloadTestLogsRequest,
  downloadTestLogsSuccess,
  downloadTestLogsFail,
} = testHarnessSlice.actions

export const getTestHarnessData =
  (EC_id, sheet, table_data_state, row_ids_state) => async (dispatch) => {
    try {
      dispatch(getTestHarnessDataRequest)
      const { data } = await DataService.get(
        `/edit-checks/test-harness/${EC_id}/test-data?page=${sheet.current_sheet}&per_page=10&study_id=${study_id}`
      )

      let api_data = data.data

      let row_ids = []

      let table_data = [
        { DOMAIN: 'Expected Output', COLUMN: '' },
        { DOMAIN: 'Actual Output', COLUMN: '' },
        { DOMAIN: 'Result', COLUMN: '' },
        { DOMAIN: 'Run Status', COLUMN: '' },
      ]

      let result_count = 0
      if (api_data.length === 0) {
        const { data } = await DataService.get(
          '/edit-checks/test-harness/' + EC_id + '/dataset'
        )
        let cols = data.data
        let x = 4
        for (let i = 0; i < cols.length; i++) {
          let domain = cols[i].domain
          cols[i].columns.forEach((col) => {
            if (table_data[x] === undefined) {
              table_data.push({})
            }
            table_data[x]['DOMAIN'] = domain

            table_data[x]['COLUMN'] = col
            x = x + 1
          })
        }
      } else {
        for (let i = 0; i < api_data.length; i++) {
          let test_dataset_name =
            'TEST DATA ' + (i + 1 + (sheet.current_sheet - 1) * 10)
          row_ids[test_dataset_name] = api_data[i].id

          let x = 4
          for (var domain in api_data[i].test_case_data) {
            for (var dataset in api_data[i].test_case_data[domain]) {
              if (table_data[x] === undefined) {
                table_data.push({})
              }

              table_data[x]['DOMAIN'] = domain

              table_data[x]['COLUMN'] = dataset
              table_data[x][test_dataset_name] =
                api_data[i].test_case_data[domain][dataset]
              x = x + 1
            }
          }

          table_data[0][test_dataset_name] = api_data[i].expected_result
            ? api_data[i].expected_result
            : ''
          table_data[1][test_dataset_name] = api_data[i].actual_result
            ? api_data[i].actual_result
            : ''
          table_data[2][test_dataset_name] = api_data[i].test_output
            ? api_data[i].test_output
            : ''
          if (
            table_data[2][test_dataset_name] === 'PASS' ||
            table_data[2][test_dataset_name] === 'FAIL'
          ) {
            result_count += 1
          }
          table_data[3][test_dataset_name] = api_data[i].run_status
            ? api_data[i].run_status
            : ''
        }
      }
      let total_count = data.paging.total_count
      let total_sheet =
        total_count === 0
          ? 1
          : total_count % 10 > 0
          ? parseInt(total_count / 10) + 1
          : parseInt(total_count / 10)
      if (total_sheet < sheet.total_sheet) {
        total_sheet = sheet.total_sheet
      }
      dispatch(
        getTestHarnessDataSuccess({
          api_data: api_data,
          table_data: table_data,
          paging: data.paging,
          total_sheet: total_sheet,
          row_ids: row_ids,
          is_all_pass: data.other_info.is_all_pass,
          is_running: data.other_info.is_running,
          can_download_logs:
            data.other_info.hasOwnProperty('last_execution_id'),
          last_execution_id: data.other_info.last_execution_id,
          result_count: result_count,
        })
      )
    } catch (error) {
      console.error('Get test harness data fail', error)
      dispatch(getTestHarnessDataFail())
    }
  }

export const saveTestHarnessData =
  (EC_id, table_data, api_data, row_ids, sheet) => async (dispatch) => {
    try {
      dispatch(saveTestHarnessDataRequest)
      let new_api_data = []
      let temp_row_ids = {}

      let row_id = 0

      for (let i = 4; i < table_data.length; i++) {
        let domain = table_data[i]['DOMAIN']
        let dataset = table_data[i]['COLUMN']
        for (var key in table_data[i]) {
          if (key !== 'DOMAIN' && key !== 'COLUMN') {
            if (key in temp_row_ids) {
              row_id = temp_row_ids[key]
            } else {
              row_id = new_api_data.length
              temp_row_ids[key] = row_id
            }
            if (row_id < new_api_data.length) {
              if (new_api_data[row_id].test_case_data[domain] === undefined) {
                new_api_data[row_id].test_case_data[domain] = {}
              }

              new_api_data[row_id].test_case_data[domain][dataset] =
                table_data[i][key]
            } else {
              new_api_data.push({})

              new_api_data[row_id].test_case_data = {}
              new_api_data[row_id].test_case_data[domain] = {}
              new_api_data[row_id].test_case_data[domain][dataset] =
                table_data[i][key]
            }
            if (row_ids[key]) {
              new_api_data[row_id].id = row_ids[key]
            }
            if (table_data[0][key]) {
              new_api_data[row_id].expected_result = table_data[0][key]
            }
          }
        }
      }

      let sending_data = { data: new_api_data }
      const { data } = await DataService.post(
        '/edit-checks/test-harness/' + EC_id + '/test-data/',
        sending_data
      )
      dispatch(saveTestHarnessDataSuccess)
      dispatch(
        activateAlert({
          color: 'success',
          content: 'Test Data Saved Succefully',
        })
      )
      dispatch(getTestHarnessData(EC_id, sheet, table_data, row_ids))
    } catch (error) {
      console.error('Save test harness data fail', error)
      dispatch(
        activateAlert({ color: 'danger', content: 'Test Data Save Failed!' })
      )
      dispatch(saveTestHarnessDataFail())
    }
  }
function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, milisec)
  })
}

export const getTestRunStatus =
  (EC_id, table_data_store, sheet) => async (dispatch) => {
    try {
      let is_running = true
      do {
        await waitforme(1000)

        let result_count = 0
        const { data } = await DataService.get(
          `/edit-checks/test-harness/${EC_id}/test-data?page=${sheet.current_sheet}&per_page=10&include_test_data=False&study_id=${study_id}`
        )
        let api_data = data.data

        let table_data = JSON.parse(JSON.stringify(table_data_store))
        for (let i = 0; i < api_data.length; i++) {
          let col_name = 'TEST DATA ' + (i + 1 + (sheet.current_sheet - 1) * 10)
          table_data[1][col_name] = api_data[i].actual_result
          table_data[2][col_name] = api_data[i].test_output
          table_data[3][col_name] = api_data[i].run_status
          if (
            api_data[i].test_output === 'PASS' ||
            api_data[i].test_output === 'FAIL'
          ) {
            result_count += 1
          }
        }
        is_running = data.other_info.is_running
        dispatch(
          getTestStatus({
            table_data: table_data,
            is_running: data.other_info.is_running,
            is_all_pass: data.other_info.is_all_pass,
            result_count: result_count,
            can_download_logs:
              data.other_info.hasOwnProperty('last_execution_id'),
            last_execution_id: data.other_info.last_execution_id,
          })
        )
      } while (is_running)
      dispatch(runTestHarnessDataSucess())
    } catch (error) {
      console.error('Run harness data fail', error)
      dispatch(runTestHarnessDataFail())
    }
  }

export const runTestHarnessData =
  (EC_id, table_data, sheet) => async (dispatch) => {
    try {
      dispatch(runTestHarnessRequested())
      const { data } = await DataService.put(
        `/edit-checks/test-harness/${EC_id}/run-test?study_id=${study_id}`
      )

      dispatch(getTestRunStatus(EC_id, table_data, sheet))
    } catch (error) {
      console.error('Run harness data fail', error)
      dispatch(runTestHarnessDataFail())
    }
  }

export const updateActiveSheet = (activeSheet) => {
  return (dispatch) => {
    dispatch(
      updateCurrentSheet({
        current_sheet: activeSheet,
      })
    )
  }
}
export const addNewSheet = (total_sheet) => {
  return (dispatch) => {
    dispatch(
      addSheet({
        total_sheet: total_sheet + 1,
      })
    )
  }
}
export const clearRunDataToEdit = (EC_id, table_data) => {
  return (dispatch) => {
    let table_data_state = JSON.parse(JSON.stringify(table_data))
    for (let i = 1; i < 3; i++) {
      for (let key in table_data_state[i]) {
        if (key !== 'DOMAIN' && key !== 'DATASET') {
          table_data_state[i][key] = ''
        }
      }
    }
    let bool_checks = {
      is_all_pass: false,
      is_running: false,
      check_if_edited: true,
    }
    dispatch(
      clearRunDataEdit({
        table_data: table_data_state,
        bool_checks: bool_checks,
      })
    )
  }
}

export const clearRuleTestGrid = () => {
  return (dispatch) => {
    dispatch(
      clearRuleTestHarness({
        state: initialState,
      })
    )
  }
}

export const downloadRuleTestHarnessLogs = (last_execution_id) => async (dispatch) => {
  try {
    dispatch(downloadTestLogsRequest())
    const { data } = await DataService.get(
      `/jobs/log-file/${last_execution_id}?rule_type=EDIT_CHECK`
    )
    dispatch(downloadTestLogsSuccess())
    window.open(data.data.download_file_path, '_blank')
  } catch (error) {
    console.error('Download Run test harness logs data fail', error)
    dispatch(downloadTestLogsFail())
    dispatch(
      activateAlert({ color: 'danger', content: 'Download RTH Logs failed!' })
    )
  }
}

export default testHarnessSlice.reducer
