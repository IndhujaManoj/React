import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { activateAlert } from '../alert/AlertSlice'

const initialState = {
  userList: {
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
      load: false,
      data_updated: false,
  },
  user_data:{
      first_name:'',
      last_name:'',
      email:'',
      role_name:'',
  },
  user_roles:[],

}

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    getUserListRequest(state){
      state.userList.load = true
    },
    getUserListSuccess(state, action){
      state.userList.data = action.payload.data.data
      state.userList.paging = action.payload.data.paging
      state.userList.load = false
    },
    getUserListFail(state){
      state.userList.data = []
      state.userList.paging = {
        "page_number": 1,
        "per_page": 10,
        "total_count": 0
      }
      state.userList.load = false
    },
    updateSortField(state, action){
      state.userList.sorting.sort_field = action.payload.sortField
      state.userList.sorting.sort_order = action.payload.sortOrder
    },
    updateUserList(state){
      state.userList.data_updated = !state.userList.data_updated
    },
    updateUserData(state,action){
      state.user_data[action.payload.key] = action.payload.value
    },
    editUserData(state, action){
      state.user_data = action.payload.user_data
    },
    cleanUserData(state, action){
      state.user_data = initialState.user_data
    },
    getUserRolesSuccess(state, action){
      state.user_roles = action.payload.data.data
    }
  },
})

export const  { getUserListRequest, getUserListSuccess, getUserListFail, updateSortField, updateUserList, updateUserData , editUserData, cleanUserData, getUserRolesSuccess} = userManagementSlice.actions

export const getUserList = (params) => async (dispatch) => {
    try {
      dispatch(getUserListRequest())
        let searchParams = params?.searchParams ? `&search=${params.searchParams}` : ''
        let page = params?.page ? `&page=${params.page}` : ''
        let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
        let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
        let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''

      const { data } = await DataService.get(
        `/auth/users?${searchParams}${page}${per_page}${sortField}${sortOrder}`
      )
      dispatch(getUserListSuccess({data}))
    } catch (error) {
      console.error('Get User List error:', error)
    }
}
export const getUserRoles = () => async (dispatch) => {
  try {
    
      
    const { data } = await DataService.get(
      `/auth/roles/`
    )
    dispatch(getUserRolesSuccess({data}))
  } catch (error) {
    console.error('Get User Role error:', error)
  }
}

export const inactiveUser = (id) => async (dispatch) => {
  try {
    const { data } = await DataService.delete(`/auth/users/${id}`)
    dispatch(updateUserList())
    dispatch(
      activateAlert({
        color: 'success',
        content: 'User Inactive successful', 
      })
    )
  } catch (error){
    dispatch(
      activateAlert({
        color: 'danger',
        content: 'User Inactive Failed!',
      })
    )
    console.error('Inactive user error', error)
  }

}

export const createUser = (user_data) => async(dispatch) => {
  try{
    // const api_data = {...user_data, password:"Saama@123"}
    const { data } = await DataService.post(`/auth/users/`, user_data)
    dispatch(
      activateAlert({
        color: 'success',
        content: 'User Added Successfully',
      })
    )
    dispatch(cleanUserData())
    dispatch(updateUserList())
    
  }
  catch(error){
    dispatch(
      activateAlert({
        color: 'danger',
        content: error,
      })
    )
    console.error('Add user error', error)
  }
}

export const updateUser = (user_data) => async(dispatch) => {
  try{
    
    const { data } = await DataService.put(`/auth/users/${user_data.id}`, user_data)
    dispatch(
      activateAlert({
        color: 'success',
        content: 'User Updated Successfully',
      })
    )
    dispatch(cleanUserData())
    dispatch(updateUserList())
    
  }
  catch(error){
    dispatch(
      activateAlert({
        color: 'danger',
        content: 'User Update Failed!',
      })
    )
    console.error('Update user error', error)
  }
}

  
export default userManagementSlice.reducer