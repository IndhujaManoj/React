import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { getItem } from 'utils/localStorageController'
import exportFromJSON from 'export-from-json'
import Papa from 'papaparse'
import moment from 'moment'

const study_id = getItem('_study_id')

const initialState = {
  status: '',
  error: '',
  isLoading: '',
  predictionList: {
    pendingList: {
      data: [],
      pagination: {
        current_page: 1,
        records_per_page: 10,
      },
      sorting: {
        sort_field: 'prediction_date',
        sort_order: 'desc',
      },
    },
    onHoldList: {
      data: [],
      pagination: {
        current_page: 1,
        records_per_page: 10,
      },
      sorting: {
        sort_field: 'act_review_dts',
        sort_order: 'desc',
      },
      
    },
    filter: {
      predictionFromDate: '',
      predictionToDate: '',
      predictionDate: [],
      countryFilterValue: [],
      siteFilterValue: [],
      subjectFilterValue: [],
      visitFilterValue: [],
      formFilterValue: [],
      subcategoryFilterValue: [],
      confidenceFilterValue: [],
    },
  },
  predictionExport: {
    load: false,
  },
  predictionCounts: {
    pending: undefined,
    on_hold: undefined,
  },
  predictionFilters: {
    country: [],
    subjectid: [],
    visitnam: [],
    category: [],
    formname: [],
  },
}

const PredictionsSlice = createSlice({
  name: 'PredictionsSlice',
  initialState: initialState,
  reducers: {
    setPredictionList(state, action) {
      const { res, current_page, records_per_page, status } = action.payload
      if (res.status) {
        if (res.status == 'success') {
          state.status = 'success'
          state.error = ''
          state.isLoading = false
          state.predictionList[
            status === 'pending' ? 'pendingList' : 'onHoldList'
          ]['data'] = res.data.rows
          state.predictionList[
            status === 'pending' ? 'pendingList' : 'onHoldList'
          ]['pagination']['current_page'] = current_page
          state.predictionList[
            status === 'pending' ? 'pendingList' : 'onHoldList'
          ]['pagination']['records_per_page'] = records_per_page
        }
      }
    },
    setPredictionCount(state, action) {
      const data = action.payload.res
      if (data.status) {
        if (data.status == 'success') {
          state.predictionCounts[action.payload.status] = data.data.count
        }
      }
    },
    setPredictionFilters(state, action) {
      const data = action.payload
      if (data.status) {
        if (data.status == 'success') {
          state.predictionFilters = data.data
        }
      }
    },
    updatePredictionsSortField(state, action) {
      state.predictionList[
        action.payload.activeTab === 'pending' ? 'pendingList' : 'onHoldList'
      ]['sorting']['sort_field'] = action.payload.sortField
      state.predictionList[
        action.payload.activeTab === 'pending' ? 'pendingList' : 'onHoldList'
      ]['sorting']['sort_order'] = action.payload.sortOrder
    },
    setLoading(state) {
      state.isLoading = true
      state.error = ''
      state.status = ''
    },
    setErrorPredictionListError(state, action) {
      const { err, status } = action.payload
      state.isLoading = false
      state.error = err
      state.status = 'error'
      state.predictionList[status === 'pending' ? 'pendingList' : 'onHoldList'][
        'data'
      ] = []
      state.predictionList[status === 'pending' ? 'pendingList' : 'onHoldList'][
        'pagination'
      ]['current_page'] = 1
    },
    unsetLoading(state) {
      state.isLoading = false
      state.error = ''
      state.status = ''
    },
    setExportPredictionLoading(state, action) {
      state.predictionExport.load = action.payload
    },
    updateFilterValue(state, action){
      state.predictionList.filter[action.payload.name] = action.payload.value
    },
    resetFilterValues(state, action){
      state.predictionList.filter = initialState.predictionList.filter
    }
  },
})

export const {
  setPredictionList,
  setLoading,
  setErrorPredictionListError,
  unsetLoading,
  setPredictionCount,
  updatePredictionsSortField,
  setPredictionFilters,
  setExportPredictionLoading,
  updateFilterValue,
  resetFilterValues
} = PredictionsSlice.actions
export default PredictionsSlice.reducer

export const fetchPredictionList = (params) => async (dispatch) => {
  let searchParams = params?.search ? `&search=${params.search}` : ''
  let page = params?.page ? `&page=${params.page}` : ''
  let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
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
    params.visit.map((val) => (filterQueryString += `&visitnam=${val.value}`))
  }
  if (params?.form) {
    params.form.map((val) => (filterQueryString += `&formname=${val.value}`))
  }
  if (params?.subcategory) {
    params.subcategory.map(
      (val) => (filterQueryString += `&sub_category=${val.value}`)
    )
  }
  if (params?.confidence) {
    params.confidence.map(
      (val) => (filterQueryString += `&confidence-score=${val.value}`)
    )
  }
  if (params?.predictionFromDate) {
    filterQueryString += `&from=${params.predictionFromDate}&to=${params.predictionToDate}`
  }

  dispatch(setLoading())

  DataService.get(
    `/dq/predictions/list?status=${params.status}${per_page}${sortField}${sortOrder}${page}${filterQueryString}${searchParams}&study_id=${study_id}`
  )
    .then((res) => {
      dispatch(
        setPredictionList({
          status: params.status,
          res: res.data,
          records_per_page: params.per_page,
          current_page: params.page,
        })
      )
    })
    .catch((err) => {
      dispatch(setErrorPredictionListError({ err, status: params.status }))
      console.error('Get Prediction List error:', err)
    })
}

export const fetchPredictionsCounts = (params) => async (dispatch) => {
  const states = ['pending', 'on-hold']
  const callTwice = params?.callTwice ?? false
  let searchParams = params?.search ? `&search=${params.search}` : ''
  let page = params?.page ? `&page=${params.page}` : ''
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
    params.visit.map((val) => (filterQueryString += `&visitnam=${val.value}`))
  }
  if (params?.form) {
    params.form.map((val) => (filterQueryString += `&formname=${val.value}`))
  }
  if (params?.subcategory) {
    params.subcategory.map(
      (val) => (filterQueryString += `&sub_category=${val.value}`)
    )
  }
  if (params?.confidence) {
    params.confidence.map(
      (val) => (filterQueryString += `&confidence-score=${val.value}`)
    )
  }
  if (params?.predictionFromDate) {
    filterQueryString += `&from=${params.predictionFromDate}&to=${params.predictionToDate}`
  }

  callTwice
    ? states.map((status) => {
        DataService.get(
          `/dq/predictions/count?status=${status}${sortField}${sortOrder}${page}${filterQueryString}${searchParams}&study_id=${study_id}`
        )
          .then((res) => {
            dispatch(setPredictionCount({ status: status, res: res.data }))
          })
          .catch((err) => {
            console.error('Get Predictions Count error: ', err)
          })
      })
    : DataService.get(
        `/dq/predictions/count?status=${params.status}${sortField}${sortOrder}${page}${filterQueryString}${searchParams}&study_id=${study_id}`
      )
        .then((res) => {
          dispatch(setPredictionCount({ status: params.status, res: res.data }))
        })
        .catch((err) => {
          console.error('Get Predictions Count error: ', err)
        })
}

export const fetchPredictionFilters = () => async (dispatch) => {
  DataService.get(`/dq/predictions/filter?study_id=${study_id}`)
    .then((res) => {
      dispatch(setPredictionFilters(res.data))
    })
    .catch((err) => {
      console.error('Get Prediction Filters error:', err)
    })
}

export const exportPredictions = (params) => async (dispatch) => {
  let page = params?.page ? `&page=${params.page}` : ''
  let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
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
    params.visit.map((val) => (filterQueryString += `&visitnam=${val.value}`))
  }
  if (params?.form) {
    params.form.map((val) => (filterQueryString += `&formname=${val.value}`))
  }
  if (params?.subcategory) {
    params.subcategory.map(
      (val) => (filterQueryString += `&sub_category=${val.value}`)
    )
  }
  if (params?.confidence) {
    params.confidence.map(
      (val) => (filterQueryString += `&confidence-score=${val.value}`)
    )
  }
  if (params?.predictionFromDate) {
    filterQueryString += `&from=${params.predictionFromDate}&to=${params.predictionToDate}`
  }
  dispatch(setExportPredictionLoading(true))
  DataService.get(
    `/dq/predictions/export?status=${params.status}${page}${per_page}&study_id=${study_id}${sortField}${sortOrder}${filterQueryString}`
  )
    .then((response) => {
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
      const fileName = `sdq_predictions_log_${study_id}_${moment().format(
        'DD-MM-YYYY-HH-mm-ss'
      )}`
      exportFromJSON({ data, fileName, exportType: exportFromJSON.types.csv })
      dispatch(setExportPredictionLoading(false))
    })
    .catch((error) => {
      dispatch(setExportPredictionLoading(false))
      console.error('Prediction Todo list export error:', error)
    })
}
