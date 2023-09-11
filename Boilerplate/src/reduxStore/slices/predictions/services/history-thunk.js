import { createAsyncThunk } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { getItem } from 'utils/localStorageController'
import exportFromJSON from 'export-from-json'
import Papa from 'papaparse'
import moment from 'moment'

const study_id = getItem('_study_id')

export const getPredictionHistoryCount = createAsyncThunk(
  'history/getPredictionHistoryCount',
  async (params, thunkAPI) => {
    const records_per_page = params.per_page
    const search = params?.search ? `&search=${params?.search}` : ''

    let filterQueryString = ''

    if (params?.country) {
      params.country.map(
        (val) => (filterQueryString += `&country=${val.value}`)
      )
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
    try {
      const { data } = await DataService.get(
        `/dq/predictions/history/count?per_page=${records_per_page}${search}${filterQueryString}&study_id=${study_id}`
      )
      return data.data
    } catch (error) {
      console.error('Get prediction history count error:', error)
      return {}
    }
  }
)

export const getPredictionHistoryList = createAsyncThunk(
  'history/getPredictionHistoryList',
  async (params, thunkAPI) => {
    const records_per_page = params.per_page
    const search = params?.search ? `&search=${params?.search}` : ''
    let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
    let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''

    let filterQueryString = ''

    if (params?.country) {
      params.country.map(
        (val) => (filterQueryString += `&country=${val.value}`)
      )
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

    try {
      const { data } = await DataService.get(
        `/dq/predictions/history/list?per_page=${records_per_page}&page=${params.page}${search}${sortField}${sortOrder}${filterQueryString}&study_id=${study_id}`
      )
      return { data: data.data.rows, page: params.page, per_page: records_per_page }
    } catch (error) {
      console.error('Get prediction history list error:', error)
      return {}
    }
  }
)

export const exportPredictionHistory = createAsyncThunk(
  'history/exportPredictionHistory',
  async (params, _) => {
    let records_per_page = params?.per_page
      ? `&per_page=${params.per_page}`
      : ''
    let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
    let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''

    let filterQueryString = ''

    if (params?.country) {
      params.country.map(
        (val) => (filterQueryString += `&country=${val.value}`)
      )
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

    try {
      const response = await DataService.get(
        `/dq/predictions/history/export?page=${params.page}${records_per_page}${sortField}${sortOrder}${filterQueryString}&study_id=${study_id}`
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
      const fileName = `sdq_prediction_history_log_${study_id}_${moment().format(
        'DD-MM-YYYY-HH-mm-ss'
      )}`
      exportFromJSON({
        data,
        fileName,
        exportType: exportFromJSON.types.csv,
      })
      return {}
    } catch (error) {
      console.error('Prediction History export error:', error)
      return {}
    }
  }
)
