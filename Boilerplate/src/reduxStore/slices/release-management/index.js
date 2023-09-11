import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'


const initialState = {
  studyList: {
      data: [],
      paging: {
        "page_number": 1,
        "per_page": 10,
        "total_count": 0
      },
      sorting: {
        sort_field: '',
        sort_order: '',
      },
  },
  ruleList: {
    history: false,
    study_name: null,
    study_id: null,
    data: [],
    paging: {
        "page_number": 1,
        "per_page": 10,
        "total_count": 0
      },
    sorting: {
        sort_field: '',
        sort_order: '',
    },
  },
  releaseHistoryList: {
    data: [],
    paging: {
        "page_number": 1,
        "per_page": 10,
        "total_count": 0
      },
    sorting: {
        sort_field: '',
        sort_order: '',
    },
  },
  release:{
      rules_selected:[],
      selected_all: false,
      version: 0,
      comment: '',
      released: false,
  },

}

const ReleaseManagementSlice = createSlice({
  name: 'releaseManagement',
  initialState,
  reducers: {
    studyListForRelease: (state, action) => {
        state.studyList.data = action.payload.data.data
        state.studyList.paging = action.payload.data.paging
    },
    updateSortFieldStudyList(state, action) {
        state.studyList.sorting.sort_field = action.payload.sortField
        state.studyList.sorting.sort_order = action.payload.sortOrder
      },
    releaseHistoryList (state, action) {
        state.releaseHistoryList.data = action.payload.data.data
        state.releaseHistoryList.paging = action.payload.data.paging
    },
    updateSortFieldHistoryList(state, action) {
        state.releaseHistoryList.sorting.sort_field = action.payload.sortField
        state.releaseHistoryList.sorting.sort_order = action.payload.sortOrder
      },
    releaseHistoryReviewList(state, action){
        state.ruleList.data = action.payload.data
        state.ruleList.paging = action.payload.paging
    },
    updateSortFieldReviewList(state, action) {
        state.ruleList.sort_field = action.payload.sortField
        state.ruleList.sort_order = action.payload.sortOrder
      },
    cleanReviewPage(state) {
        state.ruleList = initialState.ruleList
    },
    masterCheckSelection(state, action){
        state.release.selected_all = action.payload.selected_all
        state.release.rules_selected = action.payload.rules_selected
        state.ruleList.data = action.payload.list
        
    },
    releaseRulesList(state, action){
        state.ruleList.data = action.payload.api_data
        state.ruleList.paging = action.payload.paging
    },
    updateComment (state, action) {
        state.release.comment = action.payload.comment
    },
    pushedTOPROD (state, action) {
        state.release.version = action.payload.version
        state.release.released = !state.release.released
        state.release.comment = ''
        state.release.rules_selected = []
        state.release.selected_all = false
    },
    clearSelectedRules(state, action){
        state.release.selected_all = false
        state.release.rules_selected = []
        state.ruleList.data = action.payload.list
    }
  },
})

export const { studyListForRelease, updateSortFieldStudyList, releaseHistoryList , updateSortFieldHistoryList, releaseHistoryReviewList, updateSortFieldReviewList, cleanReviewPage, releaseRulesList, masterCheckSelection,updateComment, pushedTOPROD, clearSelectedRules} = ReleaseManagementSlice.actions

export const getStudyListForRelease = (params) => async (dispatch) => {
    try {
        let searchParams = params?.searchParams ? `&search=${params.searchParams}` : ''
        let page = params?.page ? `&page=${params.page}` : ''
        let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
        let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
        let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''
    
      const { data } = await DataService.get(
        `/release-versions?status=pending${searchParams}${page}${per_page}${sortField}${sortOrder}`
      )
      dispatch(studyListForRelease({data}))
    } catch (error) {
      console.error('Get Study list for Release error:', error)
    }
}

  export const getReleaseHistoryList = (params) => async (dispatch) => {
    try {
        let searchParams = params?.searchParams ? `&search=${params.searchParams}` : ''
        let page = params?.page ? `&page=${params.page}` : ''
        let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
        let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
        let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''
    
      const { data } = await DataService.get(
        `/release-versions/history?${searchParams}${page}${per_page}${sortField}${sortOrder}`
      )
      dispatch(releaseHistoryList({data}))
    } catch (error) {
      console.error('Get Release History List error:', error)
    }
  }

  export const getReleaseHistoryReviewList = (params) => async (dispatch) => {
    try {
        let searchParams = params?.searchParams ? `&search=${params.searchParams}` : ''
        let page = params?.page ? `&page=${params.page}` : ''
        let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
        let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
        let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''
    
      const { data } = await DataService.get(
        `/release-versions/${params.id}?${searchParams}${page}${per_page}${sortField}${sortOrder}`
      )
      dispatch(releaseHistoryReviewList({data: data.data.edit_check_details ?? [], paging: data.paging}))
    } catch (error) {
      console.error('Get Release History Review List error:', error)
    }
  }
  
  export const getReleaseRuleList = (params) => async (dispatch) => {
    try {
        let searchParams = params?.searchParams ? `&search=${params.searchParams}` : ''
        let page = params?.page ? `&page=${params.page}` : ''
        let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
        let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
        let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''
    
      const { data } = await DataService.get(
        `/release-versions/study/${params.id}?status=pending${searchParams}${page}${per_page}${sortField}${sortOrder}`
      )
      let api_data = []
      if (params?.selected_all){
        api_data = data.data.map((row) => ({...row, selected: true}))
      }
      else if(params?.rules_selected){
        api_data = data.data.map((row) => ({...row, selected: row.ec_id in params.rules_selected}))
      }
      else{
        api_data = data.data.map((row) => ({...row, selected: false}))
      }
      

      dispatch(releaseRulesList({api_data, paging: data.paging}))
    } catch (error) {
      console.error('Get Release Rule List:', error)
    }
  }

  export const pushToPROD = (rules_selected,selected_all,id,ec_id, comment) => async (dispatch) => {
    try {
        if(selected_all){
            const { data } = await DataService.post(
                `/release-versions/`, {uat_study_id: id, description: comment, rule_ids: [], select_all:true}
              )
              if(data.data.version){
                dispatch(pushedTOPROD({version: data.data.release_id}))
              dispatch(
                  activateAlert({
                    content: `Release Version ${data.data.release_id} Pushed to PROD Successfully`,
                    color: 'success',
                  })
                )
              }
              
        }
        else if(rules_selected.length > 0){
            const { data } = await DataService.post(
                `/release-versions/`, {uat_study_id: id, description: comment, rule_ids: rules_selected}
              )
             
              if(data.data.version){
                
                dispatch(pushedTOPROD({version: data.data.release_id}))
                dispatch(
                  activateAlert({
                    content: `Release Version ${data.data.release_id} Pushed to PROD Successfully`,
                    color: 'success',
                  })
                )
              }
            
        }
        else{
            const { data } = await DataService.post(
                `/release-versions/`, {uat_study_id: id, description: comment, rule_ids: [ec_id]}
              )
              if(data.data.version){
                dispatch(pushedTOPROD({version: data.release_id}))
              dispatch(
                  activateAlert({
                    content: `Release Version ${data.data.release_id} Pushed to PROD Successfully`,
                    color: 'success',
                  })
                )
              }
        }
       
    }
    catch(error){
        console.error('Push to PROD error:', error)
        dispatch(
            activateAlert({
              content: 'Release error',
              color: 'danger',
            })
          )
    }
  }
export default ReleaseManagementSlice.reducer
