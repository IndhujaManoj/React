import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import userReducer from './slices/user/UserSlice'
import editCheckReducer from './slices/edit-checks/index'
import alertReducer from './slices/alert/AlertSlice'
import userManagement from './slices/userManagement/UserManagementSlice'
import studyRegistration from './slices/study-registration/StudyRegistrationSlice'
import testHarness from './slices/test-harness/TestHarnessSlice'
import functionsReducer from './slices/functions/FunctionSlice'
import queryLogReducer from './slices/querylog/QueryLogSlice'
import studyReducer from './slices/study/'
import predictionsReducer from './slices/predictions/index'
import auditLogReducer from './slices/audit-log/AuditLogSlice'
import jobsReducer from './slices/jobs/'
import accessTokenReducer from './slices/access-token/'
import MLConfigurationReducer from './slices/MLConfiguration/MLConfiguration'
import instanceReducer from './slices/instance'
import auditLogReducerNew from './slices/audit-log/index'
import releaseManagementReducer from './slices/release-management'
import StudyUserPermissionReducer from './slices/study-user-permission/StudyUserPermission'
import dashboardReducer from "./slices/dashboard/index"
import accountReducer from "./slices/accounts/index"
// Root Reducer
export default (history) =>
  combineReducers({
    user: userReducer,
    alert: alertReducer,
    editChecks: editCheckReducer,
    funcs: functionsReducer,
    queryLog: queryLogReducer,
    userManagement: userManagement,
    studyRegistration: studyRegistration,
    testHarness: testHarness,
    predictions: predictionsReducer,
    auditLog: auditLogReducer,
    study: studyReducer,
    router: connectRouter(history),
    jobs: jobsReducer,
    accessToken: accessTokenReducer,
    mlsubcat: MLConfigurationReducer,
    instance: instanceReducer,
    auditLogNew: auditLogReducerNew,
    releaseManagement: releaseManagementReducer,
    studyUserPermission: StudyUserPermissionReducer,
    dashboard : dashboardReducer,
    account : accountReducer
  })

export const resetEnhancer = (rootReducer) => (state, action) => {
  if (action.type !== 'user/userLogout') return rootReducer(state, action)

  const resetState = rootReducer(undefined, {})
  resetState.router = state.router
  return resetState
}
