import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import moment from 'moment'

const initialState = {
  status: '',
  error: '',
  isLoading: '',
  auditLogList: [],
  sortingOrder: 'desc',
  pageNo: 1,
  rowCount: 10,
  totalCount: 0,
  sortBy: 'event_time',
  entityChanged: 'EditCheck',
  auditLogFilters: {
    whatChanged: [],
    user: [],
  },
  entityList: [],
  userList: [],
}

const AuditLogSlice = createSlice({
  name: 'AuditLogSlice',
  initialState: initialState,
  reducers: {
    setAuditLogList(state, action) {
      const { res } = action.payload
      if (res.status) {
        if (res.status == 'success') {
          let tempAuditLogList = res.data.map((item) => {
            return {
              id: item?.id,
              event_time: moment(item?.event_time).format(
                'DD-MMM-YYYY HH:mm:ss'
              ),
              entity_changed: item.entity_changed,
              action: item?.action,
              performed_by: item?.performed_by,
              current_value: item.current_values
                ? JSON.stringify(item.current_values)
                : '--',
              previous_value: item.previous_values
                ? JSON.stringify(item.previous_values)
                : '--',
            }
          })
          state.status = 'success'
          state.error = ''
          state.isLoading = false
          state.auditLogList = tempAuditLogList
          state.pageNo = res.paging.page_number
          state.rowCount = res.paging.per_page
          state.totalCount = res.paging.total_count
        }
      }
    },
    setEntityList(state, action) {
      const { res } = action.payload
      if (res.status) {
        if (res.status == 'success') {
          state.status = 'success'
          state.entityList = res.data
        }
      }
    },
    setUserList(state, action) {
      const { res } = action.payload
      if (res.status) {
        if (res.status == 'success') {
          state.status = 'success'
          state.userList = res.data
        }
      }
    },
    updateAuditLogSortField(state, action) {
      state.sortBy = action.payload.sortField
      state.sortingOrder = action.payload.sortOrder
    },
    setLoading(state) {
      state.isLoading = true
      state.error = ''
      state.status = ''
      state.auditLogList = []
    },
    setError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.status = 'error'
      state.auditLogList = []
    },
    unsetLoading(state) {
      state.isLoading = false
      state.error = ''
      state.status = ''
    },
  },
})

export const getAuditLogList =
  (entityChanged, sortOrder, pageNo, rowCount, sortBy, performedBy) =>
  async (dispatch) => {
    dispatch(setLoading())

    let url = `/audit-logs/?entity_changed=${entityChanged}&order=${sortOrder}&page=${pageNo}&per_page=${rowCount}&sort_by=${sortBy}`
    if (performedBy) {
      url += `&performed_by=${performedBy}`
    }

    DataService.get(url)
      .then((res) => {
        dispatch(
          setAuditLogList({
            res: res.data,
          })
        )
      })
      .catch((err) => {
        dispatch(setError(err))
        console.error('GET audit log list error:', err)
      })
  }

export const getEntityList = () => async (dispatch) => {
  dispatch(setLoading())

  DataService.get(`/audit-logs/filters/entities`)
    .then((res) => {
      dispatch(
        setEntityList({
          res: res.data,
        })
      )
    })
    .catch((err) => {
      dispatch(setError(err))
      console.error('GET entity list error:', err)
    })
}

export const getUserList = () => async (dispatch) => {
  dispatch(setLoading())

  DataService.get(`/auth/users`)
    .then((res) => {
      dispatch(
        setUserList({
          res: res.data,
        })
      )
    })
    .catch((err) => {
      dispatch(setError(err))
      console.error('GET user list error:', err)
    })
}

export const {
  setAuditLogList,
  setLoading,
  setError,
  unsetLoading,
  updateAuditLogSortField,
  setEntityList,
  setUserList,
} = AuditLogSlice.actions
export default AuditLogSlice.reducer
