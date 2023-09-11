import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'

const initialState = {
  hub_admin_study_list: [],
  study_data: {
    study_id: '',
    description: '',
    project: '',
    therapeutic_area: '',
    indication: '',
    phase: '',
    status: '',
    edc_url: '',
    deep_link_url: '',
    is_dq_enabled: false,
    is_ml_enabled: false,
    instance_id: 0,
  },
  study_load: false,
  unmapped_studies: [],
}

const StudyRegistrationSlice = createSlice({
  name: 'StudySlice',
  initialState: initialState,
  reducers: {
    updateStudyData(state, action) {
      state.study_data[action.payload.key] = action.payload.value
    },
    setStudyLoad(state) {
      state.study_load = !state.study_load
    },
    cleanStudyModal(state) {
      state.study_data = initialState.study_data
    },
    setStudyData(state, action) {
      state.study_data = action.payload.study_data
    },
    saveUnmappedStudies(state, action) {
      state.unmapped_studies = action.payload.data.data
    },
    setHubAdminStudies(state, action) {
      state.hub_admin_study_list = action.payload
    },
    populateStudyData(state, action) {
      const { study_id } = action.payload
      const currentStudyData = state.hub_admin_study_list.find(
        (study) => study.study_id == study_id
      )
      state.study_data.study_id = study_id
      state.study_data.therapeutic_area = currentStudyData.therapeutic_area
      state.study_data.description = currentStudyData?.description ?? ''
      state.study_data.indication = currentStudyData.indication
      state.study_data.project = currentStudyData.project
      state.study_data.phase = currentStudyData.phase
      state.study_data.status = currentStudyData.status
    },
  },
})

export const registerStudy = (studyData) => async (dispatch) => {
  try {
    await DataService.post(
      `/studies?instance_id=${studyData.instance_id}`,
      studyData
    )
    dispatch(setStudyLoad())
    dispatch(
      activateAlert({
        content: `Study Registered Successfully`,
        color: 'success',
      })
    )
  } catch (error) {
    dispatch(
      activateAlert({
        content: `Study Register Error`,
        color: 'danger',
      })
    )
    console.error('Register new study error:', error)
  }
}

export const updateStudy = (studyData, study_id) => async (dispatch) => {
  try {
    await DataService.put(`/studies/${study_id}`, studyData)
    dispatch(setStudyLoad())
    dispatch(
      activateAlert({
        content: `Study Updated Successfully`,
        color: 'success',
      })
    )
  } catch (error) {
    dispatch(
      activateAlert({
        content: `Study Update Error`,
        color: 'danger',
      })
    )
    console.error('Update study error:', error)
  }
}

export const getUnmappedStudies = (id) => async (dispatch) => {
  try {
    const { data } = await DataService.get(`/studies/instances/${id}/unmapped/`)
    dispatch(saveUnmappedStudies({ data }))
  } catch (err) {
    console.log(err)
  }
}

export const getHubAdminStudies = (params) => async (dispatch) => {
  try {
    const { data } = await DataService.get(
      `/studies/hub-admin?instance_id=${params.instance_id}`
    )
    dispatch(setHubAdminStudies(data.data))
  } catch (error) {
    console.error('Get Hub admin studies error:', error)
  }
}

export const {
  updateStudyData,
  setStudyLoad,
  cleanStudyModal,
  setStudyData,
  saveUnmappedStudies,
  setHubAdminStudies,
  populateStudyData,
} = StudyRegistrationSlice.actions
export default StudyRegistrationSlice.reducer
