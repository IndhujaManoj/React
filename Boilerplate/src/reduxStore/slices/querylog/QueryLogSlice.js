import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { getItem } from 'utils/localStorageController'
import exportFromJSON from 'export-from-json'
import Papa from 'papaparse'
import moment from 'moment'

const study_id = getItem('_study_id')

const initialState = {
  logs: {
    list: {
      data: [],
      load: false,
      edc_download: {
        prediction_id: '',
        processing: false,
      },
      pagination: {
        current_page: 1,
        records_per_page: 10,
        total_records: 0,
        pages: 0,
      },
      sort_field: '',
      sort_order: '',
    },
    export: {
      load: false,
    },
  },
  filters: {
    queryLogFilters: {
      country: [],
      site_id: [],
      subject_id: [],
      visit_nm: [],
      form_nm: [],
      question: [],
      fb_rev_uid: [],
      status: []
    },
  },
  chart: {
    statistics: {
      logs_by_date: [],
      logs_by_status: [],
    },
  },
}

const QueryLogSlice = createSlice({
  name: 'QueryLogSlice',
  initialState: initialState,
  reducers: {
    updateQueryLogSortField(state, action) {
      state.logs.sort_field = action.payload.sortField
      state.logs.sort_order = action.payload.sortOrder
    },
    getQueryLogListSuccess(state, action) {
      state.logs.list.data = action.payload.data
      state.logs.list.pagination.current_page = action.payload.page
      state.logs.list.pagination.total_records = action.payload.count
    },
    getQueryLogListFail(state, action) {
      state.logs.list.data = []
      state.logs.list.pagination.current_page = 1
    },
    exportQueryLogRequest(state) {
      state.logs.export.load = true
    },
    exportQueryLogSuccess(state, action) {
      state.logs.export.load = false
    },
    exportQueryLogFail(state) {
      state.logs.export.load = false
    },
    exportQueryLogByIdRequest(state) {
      state.logs.export.load = true
    },
    exportQueryLogByIdSuccess(state, action) {
      state.logs.export.load = false
    },
    exportQueryLogByIdFail(state) {
      state.logs.export.load = false
    },
    setQueryLogStatistics(state, action) {
      const data = action.payload
      if (data.status) {
        if (data.status == 'success') {
          state.chart.statistics = data.data
        }
      }
    },
    setPredictionFilters(state, action) {
      const data = action.payload
      if (data.status) {
        if (data.status == 'success') {
          state.filters.queryLogFilters = data.data
        }
      }
    },
  },
})

export default QueryLogSlice.reducer

export const {
  updateQueryLogSortField,
  getQueryLogListSuccess,
  getQueryLogListFail,
  exportQueryLogRequest,
  exportQueryLogSuccess,
  exportQueryLogFail,
  exportQueryLogByIdRequest,
  exportQueryLogByIdSuccess,
  exportQueryLogByIdFail,
  setPredictionFilters,
  setQueryLogStatistics,
} = QueryLogSlice.actions

export const getQueryLogList = (params) => async (dispatch) => {
  const records_per_page = params.per_page
  const search = params?.search ? `&search=${params?.search}` : ''
  let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
  let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''
  let filterQueryString = ''

  if (params?.country) {
    params.country.map((val) => (filterQueryString += `&country=${val.value}`))
  }
  if (params?.site) {
    params.site.map((val) => (filterQueryString += `&siteid=${val.value}`))
  }
  if (params?.subjectId) {
    params.subjectId.map(
      (val) => (filterQueryString += `&subjectid=${val.value}`)
    )
  }
  if (params?.visit) {
    params.visit.map((val) => (filterQueryString += `&visit_nm=${val.value}`))
  }
  if (params?.form) {
    params.form.map((val) => (filterQueryString += `&form_nm=${val.value}`))
  }
  if (params?.subcategory) {
    params.subcategory.map(
      (val) => (filterQueryString += `&question=${val.value}`)
    )
  }
  if (params?.reviewer) {
    params.reviewer.map(
      (val) => (filterQueryString += `&fb_rev_uid=${val.value}`)
    )
  }
  if (params?.successFlag) {
    params.successFlag.map(
      (val) =>
        (filterQueryString += `&status=${
          val.value === 'FAILED' ? 'ERROR' : val.value
        }`)
    )
  }
  try {
    const { data } = await DataService.get(
      `/dq/outbound/logs?per_page=${records_per_page}&page=${params.page}${search}${sortField}${sortOrder}${filterQueryString}&study_id=${study_id}`
    )
    dispatch(
      getQueryLogListSuccess({
        data: data.data.rows,
        page: params.page,
        count: data.data.count,
      })
    )
  } catch (error) {
    console.error('Get query log list error:', error)
    dispatch(getQueryLogListFail())
  }
}

export const exportQueryLog = (params) => async (dispatch) => {
  let records_per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
  let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
  let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''

  let filterQueryString = ''

  if (params?.country) {
    params.country.map((val) => (filterQueryString += `&country=${val.value}`))
  }
  if (params?.site) {
    params.site.map((val) => (filterQueryString += `&site_id=${val.value}`))
  }
  if (params?.subjectId) {
    params.subjectId.map(
      (val) => (filterQueryString += `&subject_id=${val.value}`)
    )
  }
  if (params?.visit) {
    params.visit.map((val) => (filterQueryString += `&visit_nm=${val.value}`))
  }
  if (params?.form) {
    params.form.map((val) => (filterQueryString += `&form_nm=${val.value}`))
  }
  if (params?.subcategory) {
    params.subcategory.map(
      (val) => (filterQueryString += `&question=${val.value}`)
    )
  }
  if (params?.reviewer) {
    params.reviewer.map(
      (val) => (filterQueryString += `&fb_rev_uid=${val.value}`)
    )
  }
  if (params?.successFlag) {
    params.successFlag.map(
      (val) =>
        (filterQueryString += `&status=${
          val.value === 'FAILED' ? 'ERROR' : val.value
        }`)
    )
  }

  try {
    dispatch(exportQueryLogRequest())
    const response = await DataService.get(
      `/dq/outbound/logs/export?page=${params.page}${records_per_page}${sortField}${sortOrder}${filterQueryString}&study_id=${study_id}`
    )
    const parse_data = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true,
    })
    const data =
      parse_data['data'].length > 0
        ? parse_data['data']
        : [
            Object.assign(
              {},
              ...parse_data['meta']['fields'].map((key) => ({ [key]: '' }))
            ),
          ]
    const fileName = `sdq_query_log_${study_id}_${moment().format(
      'DD-MM-YYYY-HH-mm-ss'
    )}`
    exportFromJSON({
      data,
      fileName,
      exportType: exportFromJSON.types.csv,
    })
    dispatch(exportQueryLogSuccess())
  } catch (error) {
    console.error('Query Log export error:', error)
    dispatch(exportQueryLogFail())
  }
}

export const exportQueryLogById = (params) => async (dispatch) => {
  try {
    const timeZome = 'Asia/Calcutta'
    dispatch(exportQueryLogByIdRequest())
    const response = await DataService.get(
      `/dq/outbound/logs/${params.id}/export?tz=${timeZome}&study_id=${study_id}`
    )
    const parse_data = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true,
    })
    const data =
      parse_data['data'].length > 0
        ? parse_data['data']
        : [
            Object.assign(
              {},
              ...parse_data['meta']['fields'].map((key) => ({ [key]: '' }))
            ),
          ]
    const fileName = `sdq_query_log_${study_id}_${params.id}_${moment().format(
      'DD-MM-YYYY-HH-mm-ss'
    )}`
    exportFromJSON({
      data,
      fileName,
      exportType: exportFromJSON.types.csv,
    })
    dispatch(exportQueryLogByIdSuccess())
  } catch (error) {
    console.error('Query Log export error:', error)
    dispatch(exportQueryLogByIdFail())
  }
}

export const fetchQueryLogFilters = () => async (dispatch) => {
  DataService.get(`/dq/outbound/logs/filters?study_id=${study_id}`)
    .then((res) => {
      dispatch(setPredictionFilters(res.data))
    })
    .catch((err) => {
      console.error('Get Query Filters error:', err)
    })
}

export const fetchQueryLogStatistics = () => async (dispatch) => {
  DataService.get(`/dq/outbound/logs/statistics?study_id=${study_id}`)
    .then((res) => {
      dispatch(setQueryLogStatistics(res.data))
    })
    .catch((err) => {
      console.error('Get Query Filters error:', err)
    })
}
