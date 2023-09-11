import { createSlice } from '@reduxjs/toolkit'

const initialiState = {
  isAlertActive: false,
  content: '',
  type: '',
  alertTitle: '',
  alertContent: '',
}

const alertSlice = createSlice({
  name: 'AlertSlice',
  initialState: initialiState,
  reducers: {
    activateAlert(state, action) {
      const { content, color = 'success', title = '' } = action.payload
      state.isAlertActive = true
      state.content = content
      state.type = color
      state.alertTitle = title
    },
    deactivateAlert(state) {
      state.isAlertActive = false
      state.type = ''
      state.content = ''
    },
  },
})

export const { activateAlert, deactivateAlert } = alertSlice.actions
export default alertSlice.reducer
