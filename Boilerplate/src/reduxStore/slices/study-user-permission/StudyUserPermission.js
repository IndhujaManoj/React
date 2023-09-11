import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'

const initialState = {
    userList: {
        data: [],
        paging: {
          "page_number": 1,
          "per_page": 10,
          "total_count": 0,
          "pages":0,
        },
        sorting: {
          sort_field: '',
          sort_order: '',
        },
    },

    addUserData:{
        roles:[],
        users:[],
    },
    userAction: false,
    
  
  }

  const StudyUserPermissionSlice = createSlice({
    name: 'studyUserPermission',
    initialState,
    reducers: {
        studyUserList(state, action)  {
            state.userList.data = action.payload.data.data
            state.userList.paging = action.payload.data.paging
            state.userList.paging.pages = action.payload.pages
        },
        updateSortField(state, action) {
            state.userList.sorting.sort_field = action.payload.sortField
            state.userList.sorting.sort_order = action.payload.sortOrder
        },
        updateRoles(state, action){
            state.addUserData.roles = action.payload.data.data
        },
        updateUsers(state, action){
            state.addUserData.users = action.payload.data.data
        },
        updateUserActionSuccess(state){
            state.userAction = !state.userAction
        }
      
    },
  })

  export const {
    studyUserList,
    updateSortField,
    updateRoles,
    updateUsers,
    updateUserActionSuccess
  } = StudyUserPermissionSlice.actions

  export const getStudyUserList = (params) => async (dispatch) => {
    try {
        let searchParams = params?.searchParams ? `&search_term=${params.searchParams}` : ''
        let page = params?.page ? `&page=${params.page}` : ''
        let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
        let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
        let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''
        dispatch(getStudyRolesList(params?.study_id))
      const { data } = await DataService.get(
        `/studies/${params?.study_id}/access?${searchParams}${page}${per_page}${sortField}${sortOrder}`
      )
      const pages = Math.ceil(data.paging.total_count / data.paging.per_page)
      dispatch(studyUserList({data, pages}))
    } catch (error) {
      console.error('Get Study User list error :', error)
    }
}

export const getStudyRolesList = (Study_ID) => async (dispatch) => {
    try {
    
      const { data } = await DataService.get(
        `/studies/roles/?study_id=${Study_ID}`
      )
      dispatch(updateRoles({data}))
    } catch (error) {
      console.error('Get Study list for Release error:', error)
    }
}
export const getStudyUserByRolesList = (role, Study_id) => async (dispatch) => {
    try {
    
      const { data } = await DataService.get(
        `/studies/${Study_id}/access/?type=new&role_name=${role}`
      )
      dispatch(updateUsers({data}))
    } catch (error) {
      console.error('Get Study list for Release error:', error)
    }
}

export const StudyUserFormSubmit = (userForm, Study_ID) => async (dispatch) => {
    try{
        
        const api_data = userForm.users.map((user) => {return {user_id: user.id, access_type: userForm.access}})
        const { data } = await DataService.put(
            `/studies/${Study_ID}/access/` ,
            api_data
        )
        dispatch(updateUserActionSuccess())
        dispatch(
          activateAlert({
            content: `User Permission Updated Successfully`,
            color: 'success',
          })
        )
    }
    catch(error){
        console.error('Save Study User Form error', error)
    }
}

export const DeleteUserPermission = (user_id, Study_ID) => async (dispatch) => {
  try{
      
     
      const { data } = await DataService.delete(
          `/studies/${Study_ID}/access/?user_id=${user_id}` ,
         
      )
      dispatch(updateUserActionSuccess())
      dispatch(
        activateAlert({
          content: `User Permission Deleted Successfully`,
          color: 'success',
        })
      )
  }
  catch(error){
      console.error('Save Study User Form error', error)
  }
}






  export default StudyUserPermissionSlice.reducer
