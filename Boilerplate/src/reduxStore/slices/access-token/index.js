import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'

const initialState = {
  newTokenReqData: {
    name: '',
    description: '',
    expire_at: '',
    modules: [],
  },
  editTokenReqData: {
    id: null,
    name: '',
    description: '',
    modules: [],
  },
  allTokens: [],
  modules: [],
  token: null,
}

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { data } = action.payload
      state.allTokens = data
    },
    updateNewTokenData: (state, action) => {
      state.newTokenReqData = action.payload
    },
    setEditTokenReqData: (state, action) => {
      state.editTokenReqData = action.payload
    },
    setModules: (state, action) => {
      const { data } = action.payload
      state.modules = data
    },
    setGeneratedToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const {
  setTokens,
  updateNewTokenData,
  setModules,
  setGeneratedToken,
  setEditTokenReqData,
} = accessTokenSlice.actions

export const getAllTokens = () => async (dispatch) => {
  try {
    const { data } = await DataService.get(`/auth/access-token/`)
    dispatch(setTokens(data))
  } catch (error) {
    console.error('getAllTokens error', error)
  }
}

export const newTokenRequest = (reqData) => async (dispatch) => {
  DataService.post(`/auth/access-token/`, reqData)
    .then((res) => {
      dispatch(setGeneratedToken(res.data.data.access_token))
      dispatch(getAllTokens())
      dispatch(
        updateNewTokenData({
          name: '',
          description: '',
          expire_at: '',
          modules: [],
        })
      )
      dispatch(
        activateAlert({
          content: 'Generated Access token successfully',
          color: 'success',
        })
      )
    })
    .catch((err) => {
      dispatch(
        activateAlert({
          content: err,
          color: 'danger',
        })
      )
    })
}

export const editTokenRequest = (reqData) => async (dispatch) => {
  DataService.put(`/auth/access-token/${reqData.id}`, reqData)
    .then((res) => {
      dispatch(getAllTokens())
      dispatch(
        setEditTokenReqData({
          id: null,
          name: '',
          description: '',
          modules: [],
        })
      )
      dispatch(
        activateAlert({
          content: 'Updated Access token details successfully',
          color: 'success',
        })
      )
    })
    .catch((err) => {
      dispatch(
        activateAlert({
          content: err,
          color: 'danger',
        })
      )
    })
}

export const getModules = () => async (dispatch) => {
  try {
    const { data } = await DataService.get(`/auth/module-config/`)
    dispatch(setModules(data))
  } catch (error) {
    console.error('getModules error', error)
  }
}

export const deleteToken = (tokenId) => async (dispatch) => {
  DataService.delete(`/auth/access-token/${tokenId}`)
    .then((res) => {
      dispatch(getAllTokens())
      dispatch(
        activateAlert({
          content: 'Deleted Access token successfully',
          color: 'success',
        })
      )
    })
    .catch((err) => {
      dispatch(
        activateAlert({
          content: err,
          color: 'success',
        })
      )
      console.log(err)
    })
}

export default accessTokenSlice.reducer
