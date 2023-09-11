import { combineReducers } from '@reduxjs/toolkit'
import EditCheckSlice from './EditCheckSlice'
import RuleDataSlice from './RuleDataSlice'

export default combineReducers({
  ruledata: RuleDataSlice,
  editcheck: EditCheckSlice,
})
