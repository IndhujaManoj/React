import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'
import { DataService } from 'config.axios'
import { updateWorkflow, getDqConfigStatus } from './services/editCheckthunk'
import { updateDqConfig } from './EditCheckSlice'
import { getItem } from 'utils/localStorageController'

const study_id = getItem('_study_id')

export const getEditCheckById = createAsyncThunk(
  'ruledata/getEditCheckById',
  async (params, thunkAPI) => {
    const studyId = params?.studyId ? params.studyId : study_id
    try {
      const { data } = await DataService.get(
        `/edit-checks/${params.id}?study_id=${studyId}`
      )
      if (params?.callDqConfig) {
        thunkAPI.dispatch(
          getDqConfigStatus({
            rowId: data.data.sec_id,
            study_id: studyId
          })
        )
        thunkAPI.dispatch(
          updateDqConfig({
            key: 'preconformance_item_name',
            value: data.data.query_target,
          })
        )
      }
      return data.data
    } catch (error) {
      const router = thunkAPI.getState().router
      if (
        router.location.pathname.includes('/edit-checks/code') &&
        error.includes(`'NoneType' object is not iterable`)
      ) {
        params.history.goBack()
      }
      console.error('Get Edit Check with ID error:', error)
      return {}
    }
  }
)

export const createRuleData = createAsyncThunk(
  'ruledata/createrule',
  async (params, thunkAPI) => {
    try {
      const { data } = await DataService.post(
        `/edit-checks?study_id=${study_id}`,
        params.api_body
      )
      thunkAPI.dispatch(
        activateAlert({
          color: 'success',
          content: data.message,
        })
      )
      if (params.send_for_development) {
        await thunkAPI.dispatch(
          updateWorkflow({
            api_body: {
              status: 'DEVELOPMENT',
              comments: '',
            },
            id: data.data.id,
            content: data.data.message,
            action: '',
          })
        )
      }
      if (params?.path) params.history.push(params.path)
      return data.data.id
    } catch (error) {
      console.error('Create Rule data error:', error)
      thunkAPI.dispatch(activateAlert({ color: 'danger', content: error }))
      return null
    }
  }
)

export const updateRuleDataForm = createAsyncThunk(
  'ruledata/updaterule',
  async (params, thunkAPI) => {
    try {
      const new_api_body = {}
      new_api_body.id = params.api_body?.id
      new_api_body.name = params.api_body?.name
      new_api_body.source_data_format = params.api_body?.source_data_format
      new_api_body.severity = params.api_body?.severity
      new_api_body.processing_level = params.api_body?.processing_level
      new_api_body.description = params.api_body?.description
      new_api_body.query_text = params.api_body?.query_text
      new_api_body.query_target = params.api_body?.query_target
      new_api_body.dataset = params.api_body?.dataset
      new_api_body.dynamic_panel_config = params.api_body?.dynamic_panel_config
      const { data } = await DataService.put(
        `/edit-checks/${params.api_body?.id}?study_id=${study_id}`,
        new_api_body
      )
      if (!params.send_for_development) {
        thunkAPI.dispatch(
          activateAlert({
            color: 'success',
            content: data.message,
          })
        )
      }
      if (params?.send_for_development) {
        await thunkAPI.dispatch(
          updateWorkflow({
            api_body: {
              status: 'DEVELOPMENT',
              comments: '',
            },
            id: data.data.id,
            content: data.data.message,
            action: '',
          })
        )
      }
      if (params?.path) params.history.push(params.path)
      return data.data?.id
    } catch (error) {
      console.error('Update rule data form error:', error)
      thunkAPI.dispatch(activateAlert({ color: 'danger', content: error }))
      return null
    }
  }
)

export const getECDomains = createAsyncThunk(
  'ruledata/getdomain',
  async (params, thunkAPI) => {
    try {
      const { data } = await DataService.get(
        `/studies/domains?study_id=${study_id}`
      )
      if (params?.callDomainCols) {
        data.data.forEach(async (domain) => {
          await thunkAPI.dispatch(getECDomainCols({ domain: domain.name }))
        })
      }
      return data.data
    } catch (error) {
      console.error('Get EC domain error', error)
      return []
    }
  }
)

export const getECDomainCols = createAsyncThunk(
  'ruledata/getdomaincols',
  async (params, thunkAPI) => {
    try {
      const { domain } = params

      const { data } = await DataService.get(
        `/studies/domains/${domain}/variables?study_id=${study_id}`
      )
      let cols = data.data.map(function (el) {
        return el.name
      })
      let cols_data = cols.map((col) => ({ label: col, value: col }))
      return { domain, cols: cols_data }
    } catch (error) {
      console.error('Get Edit Check domain columns error:', error)
      return []
    }
  }
)

export const getFormsAndVisits = createAsyncThunk(
  "ruledata/getFormsAndVisits",
  async() => {
    try{
      const {data} = await DataService.get(`/dq/predictions/filter?study_id=${study_id}&task=edit_check`)
      return data.data;
    }
    catch (error) {
      console.error('Get forms and visits error', error)
      return []
    }
  }
)

const initialState = {
  editcheck: {},
  ruleData: {
    name: '',
    source_data_format: 'Preconformance',
    severity: 'Error',
    processing_level: 'Record',
    description: '',
    query_text: '',
    query_target: null,
    dataset: {
      primary: {
        domain: '',
        columns: [],
        form_name:[],
        visit_name:[],
      },
      relational: [{ 
        domain: '',
        columns: [] ,
        form_name:[],
        visit_name:[],
      }],
    },
    dynamic_panel_config: []
  },

  // from the api
  dataset_data: {
    domains: [],
    domain_cols: {},
  },
  form_visit_data:{
    forms:[],
    visits:[],
  },
  ruleDataLoader: false,
}

const ruleDataSlice = createSlice({
  name: 'ruledata',
  initialState,
  reducers: {
    clearRuleData(state) {
      state.ruleData = initialState.ruleData
    },
    updateRuleData(state, action) {
      const { key, value } = action.payload
      state.ruleData[key] = value
    },

    updatePrimaryDataset(state, action) {
      const { key, value } = action.payload
      let colData = []
      if (key === 'columns' || key === 'form_name' || key === 'visit_name') {
        colData = value.map((col) => col.value)
        state.ruleData.dataset.primary[key] = colData
      } else state.ruleData.dataset.primary[key] = value
    },

    updateRelationalDataset(state, action) {
      let { index, key, value } = action.payload
      index = Number(index)
      let colData = []
      if (key === 'columns' || key === 'form_name' || key === 'visit_name') {
        colData = value.map((col) => col.value)
        state.ruleData.dataset.relational[index][key] = colData
      } else state.ruleData.dataset.relational[index]['domain'] = value
    },
    addNewRelationalDataset(state, action) {
      const newObj = { domain: '', columns: [], form_name:[], visit_name:[] }
      state.ruleData.dataset.relational.push(newObj)
    },
    removeRelationalDataset(state, action) {
      let { index } = action.payload
      index = Number(index)
      state.ruleData.dataset.relational.splice(index, 1)
    },
    updateDynamicPanelConfig(state, action) {
      state.ruleData.dynamic_panel_config = action.payload
    }
  },
  extraReducers: {
    [getEditCheckById.pending]: (state, action) => {
      state.ruleDataLoader = true
    },
    [getEditCheckById.fulfilled]: (state, action) => {
      state.ruleDataLoader = false
      state.editcheck = action.payload
      state.ruleData = { ...state.ruleData, ...action.payload }
    },

    [createRuleData.pending]: (state, action) => {
      state.ruleDataLoader = true
    },
    [createRuleData.fulfilled]: (state, action) => {
      state.ruleDataLoader = false
      state.ruleData.id = action.payload
    },
    [createRuleData.rejected]: (state, action) => {
      state.ruleDataLoader = false
    },
    [updateRuleDataForm.pending]: (state, action) => {
      state.ruleDataLoader = false
    },
    [updateRuleDataForm.fulfilled]: (state, action) => {
      state.ruleDataLoader = false
      state.ruleData.id = action.payload
    },
    [updateRuleDataForm.rejected]: (state, action) => {
      state.ruleDataLoader = false
    },
    [getECDomains.fulfilled]: (state, action) => {
      state.dataset_data.domains = action.payload
    },
    [getECDomainCols.fulfilled]: (state, action) => {
      const { domain, cols } = action.payload
      state.dataset_data.domain_cols = {
        ...state.dataset_data.domain_cols,
        [domain]: cols,
      }
    },
    [getFormsAndVisits.fulfilled]:(state,action) => {
      const {formname,visitnam} = action.payload
      state.form_visit_data = {
        forms:formname,
        visits:visitnam,
      }
    }
  },
})

export const {
  clearRuleData,
  updateRuleData,
  updatePrimaryDataset,
  updateRelationalDataset,
  addNewRelationalDataset,
  removeRelationalDataset,
  updateDynamicPanelConfig
} = ruleDataSlice.actions
export default ruleDataSlice.reducer
