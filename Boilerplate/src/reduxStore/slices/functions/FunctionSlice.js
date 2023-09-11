import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { activateAlert } from '../alert/AlertSlice'
import { getItem } from 'utils/localStorageController'

const study_id = getItem('_study_id')

const initialState = {
  functionByStatus: {
    load: false,
    data: [],
    count: [],
    searchText: '',
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
  functionData: {
    name: '',
    description: '',
  },
  load: {
    updateWorkflow: false,
    getFunctionById: false,
    updateFunctionPropertiesLoad: false,
  },
}

const FunctionSlice = createSlice({
  name: 'functions',
  initialState,
  reducers: {
    getFunctionByStatusRequest(state, action) {
      state.functionByStatus.load = action.payload
    },
    getFunctionByStatusSuccess(state, action) {
      state.functionByStatus.load = false
      state.functionByStatus.data = action.payload.data
      state.functionByStatus.pagination.current_page =
        action.payload.paging['page_number']
      state.functionByStatus.pagination.total_records =
        action.payload.paging['total_count']
      state.functionByStatus.pagination.records_per_page =
        action.payload.paging['per_page']
      state.functionByStatus.pagination.pages = Math.ceil(
        action.payload.paging['total_count'] / action.payload.paging['per_page']
      )
    },
    getFunctionByStatusFail(state, action) {
      state.functionByStatus.load = false
      state.functionByStatus.data = []
    },
    updateSearchText(state, action) {
      state.functionByStatus.searchText = action.payload
    },
    updateSortField(state, action) {
      state.functionByStatus.sorting.sort_field = action.payload.sortField
      state.functionByStatus.sorting.sort_order = action.payload.sortOrder
    },
    clearFuncData(state) {
      state.functionData = { name: '', description: '' }
    },
    getFunctionCountSuccess(state, action) {
      state.functionByStatus.count = action.payload.data
    },
    getFunctionCountFail(state) {
      state.functionByStatus.count = []
    },
    updateworkflow(state) {
      state.load.updateWorkflow = !state.load.updateWorkflow
    },
    updateFunctionProperties(state) {
      state.load.updateFunctionPropertiesLoad =
        !state.load.updateFunctionPropertiesLoad
    },
    updateFuncData(state, action) {
      state.functionData[action.payload.key] = action.payload.value
    },
    getFuncByIDRequest(state) {
      state.load.getFunctionById = true
    },
    getFuncByIDSuccess(state, action) {
      state.load.getFunctionById = false
      state.functionData = { ...state.functionData, ...action.payload.data }
    },
    getFuncByIDFail(state) {
      state.load.getFunctionById = false
    },
  },
})

export const {
  getFunctionByStatusRequest,
  getFunctionByStatusSuccess,
  getFunctionByStatusFail,
  clearFuncData,
  updateSearchText,
  updateSortField,
  getFunctionCountSuccess,
  getFunctionCountFail,
  updateworkflow,
  updateFunctionProperties,
  updateFuncData,
  getFuncByIDRequest,
  getFuncByIDSuccess,
  getFuncByIDFail,
} = FunctionSlice.actions

export default FunctionSlice.reducer

export const getFunctionByStatus = (params) => async (dispatch) => {
  let searchParams = params?.search ? `&search=${params.search}` : ''
  let page = params?.page ? `&page=${params.page}` : ''
  let sizePerPage = params?.sizePerPage ? `&per_page=${params.sizePerPage}` : ''
  let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
  let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''

  try {
    dispatch(getFunctionByStatusRequest(true))
    const { data } = await DataService.get(
      `/edit-checks/functions${params?.type ? `/${params?.type}` : ''}?status=${
        params.status
      }&study_id=${study_id}${searchParams}${page}${sizePerPage}${sortField}${sortOrder}`
    )
    dispatch(
      getFunctionByStatusSuccess({
        data: data.data,
        paging: data.paging,
      })
    )
  } catch (error) {
    console.error('Get Functions by status error', error)
    dispatch(getFunctionByStatusFail())
  }
}

export const updateFunctionWorkflow = (params) => async (dispatch) => {
  try {
    let api_params = { status: params.status, comments: params.comment }
    let action = params?.action ? '/assign' : ''
    const { data } = await DataService.put(
      `/edit-checks/functions/${params.id}/workflow${action}?study_id=${study_id}`,
      api_params
    )
    dispatch(updateworkflow())
    dispatch(activateAlert({ color: 'success', content: data.message }))
    if (params?.path) {
      params.history.push(params.path)
    }
  } catch (error) {
    console.error('Update Function workflow error:', error)
    dispatch(activateAlert({ color: 'danger', content: error }))
  }
}

export const getFunctionCount = () => async (dispatch) => {
  try {
    const { data } = await DataService.get(
      `/edit-checks/functions/workflow/count?study_id=${study_id}`
    )
    dispatch(
      getFunctionCountSuccess({
        data: data.data,
      })
    )
  } catch (error) {
    console.error('Get Functions Count error', error)
    dispatch(getFunctionCountFail())
  }
}

export const deleteFunction = (id) => async (dispatch) => {
  try {
    const { data } = await DataService.delete(
      `/edit-checks/functions/${id}/delete?study_id=${study_id}`
    )

    dispatch(
      activateAlert({
        color: 'success',
        content: 'Function Deleted Successfully',
      })
    )
    dispatch(updateworkflow())
  } catch (error) {
    console.error('Delete Function Error:', error)
    dispatch(activateAlert({ color: 'danger', content: error }))
  }
}

export const saveCodeScript = (params) => async (dispatch) => {
  const codeData = new FormData()
  codeData.append('source_code', params.code)

  try {
    const { data } = await DataService.post(
      `/edit-checks/functions/${params.id}/save?study_id=${study_id}`,
      codeData,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    )
    if (params.action === 'save') {
      if (params?.content) {
        dispatch(activateAlert({ color: 'success', content: data.message }))
      }
      if (params?.history) {
        params.history.goBack()
      }
    } else if (params.action === 'approve') {
      dispatch(
        updateFunctionWorkflow({
          id: params.id,
          comment: '',
          status: 'PENDING_APPROVAL',
          content: 'Function Sent for approval',
          path: '/edit-checks/functions/new?activetab=2',
          history: params.history,
        })
      )
    }
  } catch (error) {
    console.error('Save Function Code script error: ', error)
    dispatch(activateAlert({ color: 'danger', content: error }))
  }
}

export const createFunctionData = (params, history) => async (dispatch) => {
  try {
    const { data } = await DataService.post(
      `/edit-checks/functions?study_id=${study_id}`,
      params
    )
    history.push(`/edit-checks/functions/code?id=${data.data.id}&edit=true`)
  } catch (error) {
    console.error('Create New Function Fail:', error)
    dispatch(activateAlert({ color: 'danger', content: error }))
  }
}

export const getFuncByID = (id) => async (dispatch) => {
  try {
    dispatch(getFuncByIDRequest())
    const { data } = await DataService.get(
      `/edit-checks/functions/${id}?study_id=${study_id}`
    )
    dispatch(
      getFuncByIDSuccess({
        data: data.data,
      })
    )
  } catch (error) {
    console.error('Get Function by id error:', error)
    dispatch(getFuncByIDFail())
  }
}

export const updateFunctionDataForm = (params) => async (dispatch) => {
  try {
    await DataService.put(
      `/edit-checks/functions/${params.id}?study_id=${study_id}`,
      params.api_body
    )
    dispatch(updateFunctionProperties())
    dispatch(
      activateAlert({
        color: 'success',
        content: 'Function updated successfully',
      })
    )
  } catch (error) {
    console.error('Updating Function Properties error:', error)
    dispatch(activateAlert({ color: 'danger', content: error }))
  }
}
