import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItem } from '../../../utils/localStorageController'
import { DataService } from 'config.axios'
import { activateAlert } from '../alert/AlertSlice'

const initialState = {
  api: {
    get_study_ml_table: false,
    get_ml_subcat: false,
    get_ml_suggestion: false,
    updateData: false,
  },
  study_ml_subcat: {
    data: [],
    paging: {},
    sorting: {
      sort_field: 'name',
      sort_order: 'asc',
    },
    search: '',
    filterValue: {
      typeFilterValue: [],
      statusFilterValue: [],
    },
    filterOptions: {
      type: [],
      status: ['active', 'inactive'],
    },
  },
  pre_conf: {
    data: {
      subcat: '',
      preconf_item_name: '',
      form_ref_name: '',
      section_ref_name: '',
      edc_item_name: '',
      last_run_dt: '',
      comment: '',
    },
    suggestion: {},
    ml_subcat_list: [],
  },
  bulk_update: 'inactive',
}
const MLConfigurationSlice = createSlice({
  name: 'MLSubcatSlice',
  initialState: initialState,
  reducers: {
    getStudyMLRequest(state, action) {
      state.api.get_study_ml_table = true
      state.study_ml_subcat.data = []
      state.study_ml_subcat.paging = {}
    },
    getStudyMLSuccess(state, action) {
      if (action.payload.data.every((mlModel) => mlModel.status === 'active')) {
        state.bulk_update = 'active'
      }
      if (
        action.payload.data.every((mlModel) => mlModel.status === 'inactive')
      ) {
        state.bulk_update = 'inactive'
      }

      state.api.get_study_ml_table = false
      state.study_ml_subcat.data = action.payload.data
      state.study_ml_subcat.paging = action.payload.paging
    },
    getStudyMLFail(state, action) {
      state.api.get_study_ml_table = false
      state.study_ml_subcat.data = []
      state.study_ml_subcat.paging = {}
    },
    updateSortData(state, action) {
      state.study_ml_subcat.sorting.sort_field = action.payload.sort_field
      state.study_ml_subcat.sorting.sort_order = action.payload.sort_order
    },
    updateValueChange(state, action) {
      state.pre_conf.data[action.payload.label] = action.payload.value
    },
    getMLRequest(state, action) {
      state.api.get_ml_subcat = true
      state.pre_conf.ml_subcat_list = []
    },
    getMLSuccess(state, action) {
      state.api.get_ml_subcat = false
      state.pre_conf.ml_subcat_list = action.payload.data
    },
    getMLFail(state, action) {
      state.api.get_ml_subcat = false
      state.pre_conf.ml_subcat_list = []
    },
    getSuggestionRequest(state, action) {
      state.api.get_ml_suggestion = true
    },
    getSuggestionSuccess(state, action) {
      state.api.get_ml_suggestion = false
      state.pre_conf.suggestion[action.payload.modal_id] = action.payload.data
    },
    getSuggestionFail(state, action) {
      state.api.get_ml_suggestion = false
    },
    cleanPreConfData(state) {
      state.pre_conf.data = {
        subcat: '',
        preconf_item_name: '',
        form_ref_name: '',
        section_ref_name: '',
        edc_item_name: '',
        last_run_dt: '',
        comment: '',
      }
    },
    getStudyModalSuccess(state, action) {
      state.pre_conf.data = action.payload.data
    },
    updateStatusSuccess(state) {
      state.api.updateData = !state.api.updateData
    },
    saveStudyMLSubcatSucess(state) {
      state.api.updateData = !state.api.updateData
    },
    bulkUpdateStatusSuccess(state, action) {
      state.bulk_update = action.payload.bulk_update
      state.api.updateData = !state.api.updateData
    },
    getFilterValueSuccess(state, action) {
      state.study_ml_subcat.filterOptions.type = action.payload.data
    },
  },
})

export const {
  getStudyMLRequest,
  getStudyMLSuccess,
  getStudyMLFail,
  updateSortData,
  updateValueChange,
  getMLRequest,
  getMLSuccess,
  getMLFail,
  getSuggestionRequest,
  getSuggestionSuccess,
  getSuggestionFail,
  cleanPreConfData,
  getStudyModalSuccess,
  updateStatusSuccess,
  saveStudyMLSubcatSucess,
  bulkUpdateStatusSuccess,
  getFilterValueSuccess,
} = MLConfigurationSlice.actions
export default MLConfigurationSlice.reducer

export const getStudyMLSubcats = (params) => async (dispatch) => {
  try {
    dispatch(getStudyMLRequest)
    let per_page = params.per_page ? `&per_page=${params.per_page}` : ''
    let page_number = params.page_number ? `&page=${params.page_number}` : ''
    let sort_field = params.sortField ? `&sort_by=${params.sortField}` : ''
    let sort_order = params.sortOrder ? `&order=${params.sortOrder}` : ''
    let search = params.search ? `&search=${params.search}` : ''
    let filterQueeryString = ''
    if (params?.typeFilterValue) {
      params.typeFilterValue.map(
        (val) => (filterQueeryString += `&type=${val.value}`)
      )
    }
    if (params?.statusFilterValue) {
      params.statusFilterValue.map(
        (val) => (filterQueeryString += `&status=${val.value}`)
      )
    }

    const { data } = await DataService.get(
      `/ml-models/mapped?study_id=${params.Study_id}${per_page}${page_number}${sort_field}${sort_order}${search}${filterQueeryString}`
    )
    dispatch(
      getStudyMLSuccess({
        data: data.data,
        paging: data.paging,
      })
    )
  } catch (error) {
    console.error('Get study ML Subcat error ', error)
    dispatch(getStudyMLFail())
  }
}

export const updateSortField = (sort_field, order) => {
  return (dispatch) => {
    dispatch(
      updateSortData({
        sort_field: sort_field,
        sort_order: order,
      })
    )
  }
}

export const updateSubcatData = (label, value) => {
  return (dispatch) => {
    dispatch(
      updateValueChange({
        label: label,
        value: value,
      })
    )
  }
}

export const getMLSubcats = (Study_id) => async (dispatch) => {
  try {
    dispatch(getMLRequest)

    const { data } = await DataService.get(
      `/ml-models/unmapped?study_id=${Study_id}`
    )
    dispatch(
      getMLSuccess({
        data: data.data,
      })
    )
  } catch (error) {
    console.error('Get ML Subcat error ', error)
    dispatch(getMLFail())
  }
}

export const get_suggestion = (modal_id) => async (dispatch) => {
  try {
    dispatch(getSuggestionRequest)

    const { data } = await DataService.get(
      `/ml-models/fields/suggestions?ml_model_id=${modal_id}`
    )

    dispatch(
      getSuggestionSuccess({
        data: data.data,
        modal_id: modal_id,
      })
    )
  } catch (error) {
    console.error('Get ML Subcat Suggestion error ', error)
    dispatch(getSuggestionFail())
  }
}

export const savestudyModalData =
  (study_modal_id, col_data, study_id) => async (dispatch) => {
    try {
      let json_data = JSON.parse(JSON.stringify(col_data))
      let content = 'ML Model Saved Successfully'
      json_data.ml_model_id = json_data.subcat.value
      delete json_data.subcat
      json_data.study_id = study_id
      json_data.status = 'active'

      const { data } = await DataService.post(
        `/ml-models/study?study_id=${study_id}`,
        [json_data]
      )

      dispatch(saveStudyMLSubcatSucess())
      dispatch(
        activateAlert({
          color: 'success',
          content: content,
        })
      )

      dispatch(cleanPreConfData())
    } catch (error) {
      console.error('Save ML Subcat Error ', error)
      dispatch(
        activateAlert({
          color: 'danger',
          content: 'ML Model Save failed',
        })
      )
    }
  }

export const updatestudyModalData =
  (study_modal_id, col_data, study_id) => async (dispatch) => {
    try {
      let json_data = JSON.parse(JSON.stringify(col_data))
      let content = 'ML Model Updated Successfully'
      json_data.ml_model_id = json_data.subcat.value
      delete json_data.subcat
      json_data.study_id = study_id
      json_data.status = 'active'

      const { data } = await DataService.put(
        `/ml-models/study/${study_modal_id}?study_id=${study_id}`,
        json_data
      )

      dispatch(saveStudyMLSubcatSucess())
      dispatch(
        activateAlert({
          color: 'success',
          content: content,
        })
      )

      dispatch(cleanPreConfData())
    } catch (error) {
      console.error('Save ML Subcat Error ', error)
      dispatch(
        activateAlert({
          color: 'danger',
          content: 'ML Model Save failed',
        })
      )
    }
  }

export const getStudyModal = (study_modal_id) => async (dispatch) => {
  try {
    const { data } = await DataService.get(`/ml-models/study/${study_modal_id}`)

    let json_data = JSON.parse(JSON.stringify(data.data))
    json_data.subcat = { value: json_data.ml_model_id }
    let ml_model_id = json_data.ml_model_id

    dispatch(
      getStudyModalSuccess({
        data: json_data,
      })
    )
    dispatch(get_suggestion(ml_model_id))
  } catch (error) {
    console.error('Get ML Subcat  error ', error)
  }
}

export const updateStatus =
  (study_id, study_modal_id, status) => async (dispatch) => {
    try {
      const json_data = {
        status: status,
        study_ml_models_id: [study_modal_id],
      }
      const { data } = await DataService.put(
        `ml-models/status?study_id=${study_id}`,
        json_data
      )

      dispatch(updateStatusSuccess())
    } catch (error) {
      console.error('Update status error ', error)
    }
  }

export const updateBulkStatus = (study_id, status) => async (dispatch) => {
  try {
    const json_data = {
      status: status,
    }
    const { data } = await DataService.put(
      `ml-models/status?study_id=${study_id}`,
      json_data
    )

    dispatch(bulkUpdateStatusSuccess({ bulk_update: status }))
  } catch (error) {
    console.error('Update status error ', error)
  }
}

export const getFilterValues = () => async (dispatch) => {
  try {
    const { data } = await DataService.get(`/ml-models/filters`)

    dispatch(
      getFilterValueSuccess({
        data: data.data.type,
      })
    )
  } catch (error) {
    console.error('Get ML Subcat Filter Value error ', error)
  }
}
