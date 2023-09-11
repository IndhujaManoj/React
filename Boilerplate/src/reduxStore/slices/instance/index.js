import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { getItem, setItem } from 'utils/localStorageController'
import { getStudyList } from '../study'

const role = getItem('crr_role')

const initialState = {
  instance: {
    list: [],
    activeInstanceID: getItem('instance_id'),
    activeInstanceName: getItem('instance_name'),
    load: false,
  },
}

const instanceSlice = createSlice({
  name: 'instance',
  initialState,
  reducers: {
    activeInstanceList: (state, action) => {
      let { data } = action.payload
      state.instance.list = data
    },
    updateInstanceID: (state, action) => {
      const { instanceName, instanceId } = action.payload
      state.instance.activeInstanceID = instanceId
      state.instance.activeInstanceName = instanceName
      setItem('instance_name', instanceName)
      setItem('instance_id', instanceId.toString())
    },
    setLoading: (state, action) => {
      state.instance.load = action.payload
    },
  },
})

export const { activeInstanceList, updateInstanceID, setLoading } =
  instanceSlice.actions

export const getInstanceList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let filterParam = `?filter_by=${role}`
    const { data } = await DataService.get(`/instances/${filterParam}`)

    dispatch(activeInstanceList(data))
    dispatch(setLoading(false))
    return { data: data.data }
  } catch (error) {
    dispatch(setLoading(false))
    console.error('Get Instance list error:', error)
  }
}

export const getInstanceListStudyManagement =
  (params = undefined) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const { data } = await DataService.get(`/instances/`)

      dispatch(activeInstanceList(data))

      // for study management active tab handling
      if (params && params?.instance_id) {
        if (data?.data?.find((e) => e.id === params?.instance_id)) {
          dispatch(getStudyList(params))
        } else {
          dispatch(getStudyList({ ...params, instance_id: data?.data[0]?.id }))
        }
      }
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      console.error('Get Instance list error:', error)
    }
  }

export default instanceSlice.reducer