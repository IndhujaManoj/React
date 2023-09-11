import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import {
  activateAlert,
  deactivateAlert,
} from 'reduxStore/slices/alert/AlertSlice'

const initialState = {
  newJobReqData: {
    study_id: null,
    job_type: 'DATA_INGESTION_AND_RULE_EXECUTION',
    rrule_string: null,
  },
  allJobs: {
    data: [],
    pagination: {
      current_page: 1,
      records_per_page: 10,
      total_records: 0,
      pages: 0,
    },
    sorting:{
      sort_field:'',
      sort_order:''
    },
    data_load: false,
  },
  jobHistoryById: {
    data: [],
    pagination: {
      current_page: 1,
      records_per_page: 10,
      total_records: 0,
      pages: 0,
    },
    sorting:{
      sort_field:'',
      sort_order:''
    }
  },
  jobRunById: {
    data: [],
    pagination: {
      current_page: 1,
      records_per_page: 10,
      total_records: 0,
      pages: 0,
    },
    sorting:{
      sort_field:'',
      sort_order:''
    },
    job_exception_string:'',
  },
  bulk_update: false,
  study_data:[],

}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setNewJobReqData: (state, action) => {
      state.newJobReqData = action.payload
    },
    setDefaultNewJobReqData: (state) => {
      state.newJobReqData = {
        study_id: null,
        job_type: 'DATA_INGESTION_AND_RULE_EXECUTION',
        rrule_string: null,
      }
    },

    setJobHistoryById: (state, action) => {
      const { data, paging } = action.payload
      console.log('action.payload', action.payload)
      state.jobHistoryById.data = data
      state.jobHistoryById.pagination.current_page = paging?.page_number ?? 1
      state.jobHistoryById.pagination.records_per_page = paging?.per_page ?? 10
      state.jobHistoryById.pagination.total_records = paging?.total_count ?? 0
      state.jobHistoryById.pagination.pages = Math.ceil(
        paging?.total_count / paging?.per_page
      ) ?? 0
    },
    setJobs: (state, action) => {
      const { data, paging } = action.payload
      console.log('action.payload', action.payload)
      state.allJobs.data = data
      state.allJobs.pagination.current_page = paging.page_number
      state.allJobs.pagination.records_per_page = paging.per_page
      state.allJobs.pagination.total_records = paging.total_count
      state.allJobs.pagination.pages = Math.ceil(
        paging['total_count'] / paging['per_page']
      )
    },
    setJobRunById: (state, action) => {
      const { data, paging = {} } = action.payload
      console.log('action.payload', action.payload)
      state.jobRunById.data = data
      state.jobRunById.pagination.current_page = paging.page_number ?? 1 
      state.jobRunById.pagination.records_per_page = paging.per_page ?? 10
      state.jobRunById.pagination.total_records = paging.total_count ?? 0
      state.jobRunById.pagination.pages = Math.ceil(
        paging['total_count'] / paging['per_page']
      )
    },
    getJobsFail: (state, action) => {
      state.allJobs.data = []
      state.allJobs.pagination.total_records = 0
      state.allJobs.pagination.pages = 0
    },
    getJobHistoryByIdFail: (state, action) => {
      state.jobHistoryById.data = []
      state.jobHistoryById.pagination.total_records = 0
      state.jobHistoryById.pagination.pages = 0
    },
    getJobRunByIdFail: (state, action) => {
      state.jobRunById.data = []
      state.jobRunById.pagination.total_records = 0
      state.jobRunById.pagination.pages = 0
    },
    bulkUpdateJobStatusSuccess(state, action) {
      state.bulk_update = action.payload.bulk_update
    },
    updateJobSort(state, action){
      state.allJobs.sorting.sort_field = action.payload.sort_field
      state.allJobs.sorting.sort_order = action.payload.sort_order
    },

    updateJobHistorySort(state, action){
      state.jobHistoryById.sorting.sort_field = action.payload.sort_field
      state.jobHistoryById.sorting.sort_order = action.payload.sort_order
    },
    updateJobRunSort(state, action){
      state.jobRunById.sorting.sort_field = action.payload.sort_field
      state.jobRunById.sorting.sort_order = action.payload.sort_order
    },
    updateStudyData (state, action){
      state.study_data = action.payload.data.data
    },
    loadAllJobsAPI (state){
      state.allJobs.data_load = !state.allJobs.data_load
    },
    updateJobEceptionString(state, action){
      state.jobRunById.job_exception_string = action.payload.string
    }

  },
})

export const {
  setDefaultNewJobReqData,
  setNewJobReqData,
  setJobs,
  setJobHistoryById,
  setJobRunById,
  bulkUpdateJobStatusSuccess,
  getJobsFail,
  getJobHistoryByIdFail,
  getJobRunByIdFail,
  updateJobHistorySort,
  updateJobRunSort,
  updateJobSort,
  updateStudyData,
  loadAllJobsAPI,
  updateJobEceptionString
} = jobsSlice.actions

export const newJob = (data) => (dispatch) => {
  DataService.post(`/jobs/`, data)
    .then((res) => {
      dispatch(setDefaultNewJobReqData())
      dispatch(loadAllJobsAPI())
      dispatch(
        activateAlert({
          content: 'Job created successfully',
          color: 'success',
        })
      )
    })
    .catch((err) => {
      console.error(err)
      dispatch(
        activateAlert({
          content: typeof err === 'string' ? err : 'Create Job Failed',
          color: 'danger',
        })
      )
    })
}

export const getAllJobs = (params) => async (dispatch) => {
  let instanceId = params && params?.instance_id  ? `instance_id=${params.instance_id}` : ''
  let page = params?.page ? `&page=${params.page}` : ''
  let sizePerPage = params?.sizePerPage ? `&per_page=${params.sizePerPage}` : ''
  let searchParams = params?.search ? `&job_id=${params.search}` : ''
  let sort_by = params?.sortField ? `&sort_by=${params.sortField}` : ''
  let sort_order = params?.sortOrder ? `&order=${params.sortOrder}` : ''
  try {
    const { data } = await DataService.get(
      `/jobs?${instanceId}${page}${sizePerPage}${searchParams}${sort_by}${sort_order}`
    )
    dispatch(setJobs(data))
    const activeJobCount = data.data.filter(
      (data) => data.is_active === true
    ).length
    const inActiveJobCount = data.data.filter(
      (data) => data.is_active === false
    ).length

    dispatch(
      bulkUpdateJobStatusSuccess({
        bulk_update:
          activeJobCount === data.data.length
            ? true
            : inActiveJobCount === data.data.length
            ? false
            : false,
      })
    )
  } catch (error) {
    console.error('Get jobs error:', error)
    dispatch(getJobsFail())
    
  }
}

export const getJobHistoryById = (params) => async (dispatch) => {
  let jobId = params?.id ?? ''
  let page = params?.page ? `?page=${params.page}` : ''
  let sizePerPage = params?.sizePerPage ? `&limit=${params.sizePerPage}` : ''
  let fromDate = params?.fromdate ? `&from_date=${params.fromdate}` : ''
  let toDate = params?.todate ? `&to_date=${params.todate}` : ''
  let sort_by = params?.sortField ? `&sort_by=${params.sortField}` : ''
  let sort_order = params?.sortOrder ? `&order=${params.sortOrder}` : ''
  
  try {
    const { data } = await DataService.get(
      `/jobs/${jobId}/history${page}${sizePerPage}${fromDate}${toDate}${sort_by}${sort_order}`
    )
    dispatch(setJobHistoryById(data))
  } catch (error) {
    console.error('Get job history error:', error)
    dispatch(getJobHistoryByIdFail())
  
  }
}

export const getJobRunById = (params) => async (dispatch) => {
  let jobId = params?.id ?? ''
  let page = params?.page ? `?page=${params.page}` : ''
  let sizePerPage = params?.sizePerPage ? `&limit=${params.sizePerPage}` : ''
  let type = params?.type ? `&rule_type=${params.type}` : ''
  let searchParams = params?.search ? `&name=${params.search}` : ''
  let sort_by = params?.sortField ? `&sort_by=${params.sortField}` : ''
  let sort_order = params?.sortOrder ? `&order=${params.sortOrder}` : ''
  try {
    const { data } = await DataService.get(
      `/jobs/job-run/${jobId}${page}${sizePerPage}${type}${searchParams}${sort_by}${sort_order}`
    )
    dispatch(setJobRunById(data))
  } catch (error) {
    console.error('Get job run error:', error)
    dispatch(getJobRunByIdFail())
    
  }
}

export const updateBulkJobStatus = (is_active) => async (dispatch) => {
  DataService.put(`/jobs/all/status/`, {
    is_active,
  })
    .then((res) => {
      dispatch(loadAllJobsAPI())
      dispatch(
        activateAlert({
          content: 'Updated Job status successfully',
          color: 'success',
        })
      )
      dispatch(bulkUpdateJobStatusSuccess({ bulk_update: is_active }))
    })
    .catch((err) => {
      console.error(err)
      dispatch(
        activateAlert({
          content: typeof err === 'string' ? err : 'Job Status Update Failed',
          color: 'danger',
        })
      )
    })
}

export const updateJobStatus = (jobId, study_id, is_active) => async (dispatch) => {
  DataService.put(`/jobs/${jobId}?study_id=${study_id}`, {
    is_active,
  })
    .then((res) => {
      dispatch(loadAllJobsAPI())
      dispatch(
        activateAlert({
          content: 'Updated Job status successfully',
          color: 'success',
        })
      )
      
    })
    .catch((err) => {
      console.error(err)
      dispatch(
        activateAlert({
          content: typeof err === 'string' ? err : 'Job Status Update Failed',
          color: 'danger',
        })
      )
    })
}

export const updateJobTime = (jobId, study_id, reqData) => async (dispatch) => {
  DataService.put(`/jobs/${jobId}?study_id=${study_id}`, reqData)
    .then((res) => {
      dispatch(loadAllJobsAPI())
      dispatch(
        activateAlert({
          content: 'Updated Schedule time successfully',
          color: 'success',
        })
      )
    })
    .catch((err) => {
      console.error(err)
      dispatch(
        activateAlert({
          content: typeof err === 'string' ? err : 'Schedule Time Update Failed',
          color: 'danger',
        })
      )
    })
}

export const deleteJob = (jobId, is_active) => async (dispatch) => {
  DataService.delete(`/jobs/${jobId}`, {
    is_active,
  })
    .then((res) => {
      dispatch(loadAllJobsAPI())
      dispatch(
        activateAlert({
          content: 'Job deleted successfully',
          color: 'success',
        })
      )
    })
    .catch((err) => {
      console.error(err)
      dispatch(
        activateAlert({
          content: typeof err === 'string' ? err : 'Job Delete Failed',
          color: 'danger',
        })
      )
    })
}

export const DownloadLogFile = (job_run_id, rule_type) => async (dispatch) => {
  try{
    const { data } = await DataService.get(`/jobs/log-file/${job_run_id}?rule_type=${rule_type}`)
    console.log(data,'apo data')
    window.open(data?.data?.download_file_path, '_blank')
  }
  catch(error){
    console.error(error)
  }
} 

export const GetExceptionString = (job_run_id, rule_type) => async (dispatch) => {
  try{
    const { data } = await DataService.get(`/jobs/exception/${job_run_id}?rule_type=${rule_type}`)
    console.log(data,'data')
    dispatch(updateJobEceptionString({string: data?.data?.exception}))
    
  }
  catch(error){
    console.error(error)
  }
} 

export const GetUnassignedStudies = (instance_id) => async (dispatch) => {
  try{
    console.log('unassigned studies')
    const {data} = await DataService.get(`/jobs/studies/unassigned?page=1&per_page=200&instance_id=${instance_id}`)
    dispatch(updateStudyData({data}))
  }
  catch(error){
    console.error(error)
  }
}

export default jobsSlice.reducer
