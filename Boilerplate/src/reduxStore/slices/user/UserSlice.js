import { createSlice } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'
import { DataService } from 'config.axios'
import { setItem, getItem } from 'utils/localStorageController'
import { getInstanceList , updateInstanceID} from '../instance'
import {getStudyList, setStudyID, setModalState} from '../study/index'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'
import { getWhiteLabelData } from 'reduxStore/slices/accounts/index'
import { UIPermission } from 'utils/uiPermission'
import { global_permissions } from "variables/UserGlobalPermission"

const initialState = {
  signIn: {
    userName: '',
    email: '',
    password: '',
    id: null,
    status: 0,
    role: '',
    errorMsg: '',
    load: false,
    CDHError: false,
    pageLoad: false,
    showDefaultLayout: false,
    instance_permissions: {
      api_fetched: false,
      permissions: [],
    },

    global_permissions: global_permissions,
    study_permission: {},
    active_permissions: [],
    user_ui_permission:[],
  },
}

const userSlice = createSlice({
  
  name: 'user',
  initialState,
  reducers: {
    loginInputChange: (state, action) => {
      const { name, value } = action.payload
      state.signIn[name] = value
    },
    updateUserSession: (state, action) => {
      state.signIn.role = action.payload.role
      state.signIn.id = action.payload.id
      state.signIn.status = action.payload.status
    },
    userLoginRequest: (state, action) => {
      state.signIn.load = true
      state.signIn.pageLoad = true
    },
    userLoginSuccess: (state, action) => {
     
      state.signIn.load = false
      state.signIn.status = action.payload.status
    },
    userLoginFail: (state, action) => {
      state.signIn.errorMsg = action.payload.error_msg
      state.signIn.status = action.payload.status
      state.signIn.load = false
      state.signIn.pageLoad = false
    },
    userLogout: (state, action) => {
      state.signIn.errorMsg = action.payload.error_msg
    },
    userCDHError: (state, action) => {
      state.signIn.CDHError = action.payload
    },
    fetchPermissions: (state, action) => {
      state.signIn.id = action.payload.id
      state.signIn.userName = action.payload.name
      state.signIn.instance_permissions.permissions =
        action.payload.instance_permissions
      state.signIn.instance_permissions.api_fetched = true
      state.signIn.active_permissions = action.payload.active_permissions
      state.signIn.study_permission = action.payload.study_permissions
      state.signIn.role = action.payload.role
    },
    pageLoadSuccess: (state, action) => {
      state.signIn.user_ui_permission = action.payload.ui_permission
      state.signIn.pageLoad = action.payload.pageLoad
      state.signIn.showDefaultLayout = action.payload.showDefaultLayout
    },
    pageLoadError: (state) => {
      state.signIn.pageLoad = false
    }
  },
})

export const {
  updateUserSession,
  loginInputChange,
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userCDHError,
  fetchPermissions,
  pageLoadSuccess,
} = userSlice.actions

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest())
    const { data } = await DataService.post('/auth/login/', {
      email,
      password,
    })
    setItem('_token', data.data._jwt_token)
    dispatch(
      userLoginSuccess({
        status: 1,
      })
    )
    
    dispatch(pageLoad())
  } catch (error) {
    console.error('User login error', error)
    let error_text = typeof error === 'string' ? error.startsWith('INTERNAL SERVER ERROR: ') ? error.replace('INTERNAL SERVER ERROR: ','') : error : 'Incorrect username or password'
    
    dispatch(
      activateAlert({
        content: error_text,
        color: 'danger',
      })
    )
    dispatch(userLoginFail({ error_msg: error, status: -1 }))
    
  }
}

export const pageLoad = () => async (dispatch) => {
  try {
    const response = await dispatch(fetchUserMeta())
    const whiteLabelResponse = await dispatch(getWhiteLabelData())
    const { instance_permissions, study_permissions, role } = response

    //get instance and study details from cache
    let instance_id = getItem('instance_id')
    let instance_name = getItem('instance_name')
    let study_id = getItem('_study_id')
    let study_name = getItem('study_id')
    let instance_update = false

    // if instance is undefined or user does not have access to instance in cache
    if (instance_id === undefined || !(instance_id in instance_permissions)) {
      const instances = await dispatch(getInstanceList())
      instance_id = instances?.data[0]?.id
      instance_name = instances?.data[0]?.name
      instance_update = true
    }

    dispatch(
      updateInstanceID({ instanceId: instance_id, instanceName: instance_name })
    )

    // if study is undefined or user does not have access to study in cache or instance has been updated now
    if (role !== 'MODEL_MANAGER' && role !== 'ACCOUNT_ADMIN') {
      if (
        study_id === undefined ||
        !(study_id in study_permissions) ||
        instance_update
      ) {
        dispatch(setStudyID({ study_id: '', id: '' }))
        const study = await dispatch(getStudyList({ instance_id: instance_id }))
        dispatch(setModalState(true))
      } else {
        dispatch(setStudyID({ study_id: study_name, id: study_id }))
      }
    }

    //store the user ui permission for this particualar instance
    const permissions = UIPermission(role, instance_permissions, instance_id)

    dispatch(
      pageLoadSuccess({
        ui_permission: permissions,
        pageLoad: false,
        showDefaultLayout: true,
      })
    )
  } catch (error) {
    console.error('error - Page Load ', error)
  }
}

export const fetchUserMeta = () => async (dispatch) => {
  try {
    const { data: roleData } = await DataService.get('/auth/user/meta')
    const { instance_permissions, study_permissions, id, first_name, last_name, role } = roleData.data
    if (getItem['crr_role'] === undefined){
      setItem('crr_role', role)
      setItem('user_id', id.toString())
      setItem('user_name', first_name + ' ' + last_name)
    }
    
    const permissions = {}
    instance_permissions.forEach((permission) => permissions[permission.instance_id] = permission.access)
    dispatch(
      fetchPermissions({
        instance_permissions: permissions,
        study_permissions,
        id,
        name: first_name + last_name,
        role
      })
    )
    return {instance_permissions: permissions, study_permissions, role: role}
  } catch (error) {
    console.error('User Permission Fetch Error', error)
  }
}

export const loginByToken = (token) => async (dispatch) => {
  DataService.post(`/auth/icc-token/`, { token })
    .then((res) => {
      dispatch(
        activateAlert({
          content: 'Login successfully',
          color: 'success',
        })
      )
      setItem('_token', res.data.data._jwt_token)
      dispatch(push('/'))
      dispatch(
        userLoginSuccess({
          status: 1,
        })
      )
      dispatch(pageLoad())
    })
    .catch((err) => {
      dispatch(userCDHError(true))
    })
}

export const activateUser = (password, invite_key) => async (dispatch) => {
  try {
    const {data} = await DataService.post(`/auth/users/activate/?invite_key=${invite_key}`, {password})
    
    window.location.href = '/'
    dispatch(
      activateAlert({
        content: 'User Activated successfully',
        color: 'success',
      }),
      
    )
  }
  catch (error) {
    console.error('User Activate Failed', error)
    dispatch(
      activateAlert({
        content: 'User Activated Failed',
        color: 'danger',
      }),
      
    )
  }
}

export const logoutUser = (error_msg) => {
  const instance_id = getItem('instance_id')
  const instance_name = getItem('instance_name')
  const study_id = getItem('study_id')
  const _study_id = getItem('_study_id')
  localStorage.clear()
  setItem('instance_name', instance_name)
  setItem('instance_id', instance_id.toString())
  setItem('study_id', study_id)
  setItem('_study_id',_study_id)
 

  return (dispatch) => {
  
    dispatch(userLogout(error_msg))
    dispatch(push('/'))
    window.location.reload()

  }
}

export default userSlice.reducer
