import { combineReducers } from '@reduxjs/toolkit'
import PredictionReducer from './PredictionListSlice'
import AnalyzeReducer from './AnalyzeSlice'
import PredictionHistoryReducer from './PredictionHistorySlice'

export default combineReducers({
  prediction: PredictionReducer,
  analyze: AnalyzeReducer,
  history: PredictionHistoryReducer,
})
