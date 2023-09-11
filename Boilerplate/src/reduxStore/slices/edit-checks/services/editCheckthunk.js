import { createAsyncThunk } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { getItem } from 'utils/localStorageController'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'
import { pollingTestRun } from '../EditCheckSlice'

const study_id = getItem('_study_id')
const role = getItem('crr_role')

export const getEditCheckByStatus = createAsyncThunk(
  'editchecks/getEditCheckByStatus',
  async (params, thunkAPI) => {
    let editCheckType = params?.type ? `/${params.type}` : ''
    let searchParams = params?.search ? `&search=${params.search}` : ''
    let page = params?.page ? `&page=${params.page}` : ''
    let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
    let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
    let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''
    let studyId = params?.studyId ? params?.studyId : study_id
    let thunkAPIState = thunkAPI.getState();
    let userRole = thunkAPIState.user.signIn.role;

    try {
      let api_data = []
      const { data } = await DataService.get(
        `/edit-checks${editCheckType}?status=${params.status}${searchParams}${page}${per_page}${sortField}${sortOrder}&study_id=${studyId}`
      )
      if ( (userRole === 'TESTER' && params.type === 'assigned') || (userRole === 'DATA_MANAGER' && params.status === 'PENDING_APPROVAL')) {
        
      if (params?.selected_all){
        api_data = data.data.map((editCheck) => ({...editCheck, selected: true}))
      }
      else if(params?.rules_selected){
        api_data = data.data.map((row) => ({...row, selected: row.id in params.rules_selected}))
      }
      else{
        api_data = data.data.map((row) => ({...row, selected: false}))
      }
        thunkAPI.dispatch(
          getEditCheckRunStatus(
            api_data.map((eachEditCheck) => eachEditCheck.id).join(',')
          )
        )
        return {data: api_data, paging: data.paging}
      }
      return data
    } catch (error) {
      console.error('Get EC by Status Error:', error)
      return {}
    }
  }
)

export const getEditCheckCount = createAsyncThunk(
  'editchecks/getEditCheckCount',
  async () => {
    try {
      const { data } = await DataService.get(
        `/edit-checks/count?study_id=${study_id}`
      )
      return data
    } catch (error) {
      console.error('Get EC Count error:', error)
      return []
    }
  }
)

export const getEditCheckWithFilter = createAsyncThunk(
  'editchecks/getEditCheckWithFilter',
  async (params, thunkAPI) => {
    let page = params?.page ? `&page=${params.page}` : ''
    let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
    let searchParams = params?.search ? `&search=${params.search}` : ''
    let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
    let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''

    try {
      const { data } = await DataService.get(
        `/edit-checks/status/${params.inAction}?worked_for=${params.forAction}${searchParams}${page}${per_page}${sortField}${sortOrder}&study_id=${study_id}`
      )
      let api_data = data.data.map((row) => ({...row, selected: false}))
      thunkAPI.dispatch(
        getEditCheckRunStatus(
          api_data.map((eachEditCheck) => eachEditCheck.id).join(',')
        )
      )
      return data
    } catch (error) {
      console.error('Get Edit Checks with Filter error:', error)
      return {}
    }
  }
)

export const updateWorkflow = createAsyncThunk(
  'editchecks/updateworkflow',
  async (params, thunkAPI) => {
    let action = params?.action ? `/${params.action}` : ''
    try {
      const { data } = await DataService.put(
        `/edit-checks/${params.id}/workflow${action}?study_id=${study_id}`,
        params.api_body
      )
      thunkAPI.dispatch(
        activateAlert({ color: 'success', content: params.content ?? data.message })
      )
      if (params?.path) {
        params.history.push(params.path)
      }
    } catch (error) {
      console.error('Update workflow error:', error)
      thunkAPI.dispatch(
        activateAlert({
          color: 'danger',
          content:
            error.length < 20
              ? error
              : `${error.split(' ').slice(0, 7).join(' ')}...`,
        })
      )
    }
  }
)

export const deleteEditCheck = createAsyncThunk(
  'editchecks/deleteEditCheck',
  async (id, thunkAPI) => {
    try {
      const { data } = await DataService.delete(
        `/edit-checks/${id}?study_id=${study_id}`
      )
      thunkAPI.dispatch(
        activateAlert({
          color: 'success',
          content: data.message,
        })
      )
    } catch (error) {
      console.error('Delete EditCheck error:', error)
      thunkAPI.dispatch(
        activateAlert({
          color: 'danger',
          content:
            error.length < 20
              ? error
              : `${error.split(' ').slice(0, 7).join(' ')}...`,
        })
      )
    }
  }
)

export const saveCodeScript = createAsyncThunk(
  'editchecks/savecodescript',
  async (params, thunkAPI) => {
    const codeData = new FormData()
    codeData.append('source_code', params.code)
    try {
      const { data } = await DataService.post(
        `/edit-checks/${params.id}/script?study_id=${study_id}`,
        codeData,
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      )
      
      if (params?.status === 'TESTING') {
        thunkAPI.dispatch(
          updateWorkflow({
            api_body: {
              status: 'TESTING',
              comments: '',
            },
            id: params.id,
            action: '',
            path: `/edit-checks/assigned?activetab=2`,
            history: params.history,
          })
        )
      }

    } catch (error) {
      console.error('Save script error: ', error)
    }
  }
)

export const getEditCheckRunStatus = createAsyncThunk(
  'editchecks/getEditCheckRunStatus',
  async (params, thunkAPI) => {
    try {
      const { data } = await DataService.get(
        `/edit-checks/run/status?study_id=${study_id}&edit_check_ids=${params}`
      )
      return data.data
    } catch (error) {
      console.error('Get EditCheck Run Status: ', error)
    }
  }
)

export const triggerEditCheckRun = createAsyncThunk(
  'editchecks/triggerEditCheckRun',
  async (params, thunkAPI) => {
    try {
      const { data } = await DataService.put(
        `/edit-checks/run?study_id=${study_id}`,
        {
          edit_check_ids: params?.select_all ? [] : params.editCheckids,
          ...(params?.select_all && { select_all: params.select_all }),
        }
      )

      thunkAPI.dispatch(pollingTestRun(params.editCheckids.join(',')))
    } catch (error) {
      console.error('Trigger Edit Check api error', error)
    }
  }
)

export const getTestLogData = createAsyncThunk(
  'editchecks/getTestLogData',
  async (params, thunkAPI) => {
    try {
      const { data } = await DataService.get(
        `/edit-checks/run/test_results/${params.edit_check_id}?study_id=${study_id}`
      )
      return {logdata:data.data,from: params.from ? params.from : ""}
    } catch (error) {
      console.error('Get EditCheck Run Status: ', error)
    }
  }
)

export const getTestSummaryData = createAsyncThunk(
  'editchecks/getTestSummaryData',
  async (params, thunkAPI) => {
    try {
      const { data } = await DataService.get(
        `/edit-checks/run/test_summary/${params.edit_check_id}?study_id=${study_id}`
      )
      return data.data
    } catch (error) {
      console.error('Get EditCheck Run Status: ', error)
    }
  }
)


export const addtestSummary = createAsyncThunk(
  'editchecks/addtestSummary',
  async (params, thunkAPI) => {
    const codeData = new FormData()
    codeData.append('source_code', params.code)
    try {
      const { data } = await DataService.post(
        `/edit-checks/run/test_summary?study_id=${study_id}`,
        params
      )
      thunkAPI.dispatch(
        activateAlert({
          color: 'success',
          content: 'Rule Code Script saved successfully!',
        })
      )
    } catch (error) {
      console.error('Save script error: ', error)
    }
  }
)

export const getDqConfigStatus = createAsyncThunk(
  'editchecks/getDqConfigStatus',
  async (params, thunkAPI) => {
    try {
      const studyId = params?.study_id ? params.study_id : study_id
      const { data } = await DataService.get(
        `/edit-checks/dq-config/${params.rowId}?study_id=${studyId}`
      )
      return {data: data.data, study_edit_check_id: params.rowId}
    } catch (error) {
      console.error('Get DQ config status error: ', error)
    }
  }
)

export const handleSubmitDqConfig = createAsyncThunk(
  'editchecks/handleSubmitDqConfig',
  async (params, thunkAPI) => {
    try {
      const rowId = params?.rowId ? `/${params.rowId}` : ''
      const { data } = await DataService[params.method](
        `edit-checks/dq-config${rowId}?study_id=${params.study_id}`,
        params.api_body
      )
      thunkAPI.dispatch(
        activateAlert({
          color: 'success',
          content: 'DQ config saved.',
        }))
      return data.data
    } catch (error) {
      console.error('Submit DQ config error:', error)
      thunkAPI.dispatch(
        activateAlert({
          color: 'danger',
          content: 'DQ config save Failed.',
        }))
      return {}
    }
  }
)