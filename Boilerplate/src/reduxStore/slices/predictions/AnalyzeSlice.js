import { createSlice } from '@reduxjs/toolkit'
import {
  getPredictionbyId,
  submitPredictionFeedback,
  getSubcatList,
  postPredictionReview,
} from './services/analyzeThunk'

const initialState = {
  predictionSummary: {
    load: false,
  },
  predictionFeedbackCorrection: {
    discrepancy_correction: {},
    subcategory_correction: '',
    query_text_correction: '',
    comment: '',
    load: false
  },
  subcatList: {
    data: [],
    load: false,
  },
}

const AnalyzeSlice = createSlice({
  name: 'analyze',
  initialState,
  reducers: {
    updateFeedback(state, action) {
      state.predictionFeedbackCorrection[action.payload.key] =
        action.payload.value
    },
    triggerFeedbackCorrection(state) {
      if (Object.keys(state.predictionSummary?.feedback).length === 0) {
        // if feedback is empty
        state.predictionFeedbackCorrection.discrepancy_correction = {
          value: state.predictionSummary.prediction.discrepancy_presence,
          label: state.predictionSummary.prediction.discrepancy_presence
            ? 'Yes'
            : 'No',
        }
        state.predictionFeedbackCorrection.subcategory_correction = state.predictionSummary.prediction.sub_category
        state.predictionFeedbackCorrection.query_text_correction =
          state.predictionSummary.prediction.query_text
      } else {
        state.predictionFeedbackCorrection.discrepancy_correction = {
          value: state.predictionSummary.feedback.fb_disc_flag,
          label: state.predictionSummary.feedback.fb_disc_flag ? 'Yes' : 'No',
        }
        state.predictionFeedbackCorrection.subcategory_correction = state.predictionSummary.feedback.fb_subcat_corr
        state.predictionFeedbackCorrection.query_text_correction =
          state.predictionSummary.feedback.fb_qrytxt_corr
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPredictionbyId.pending, (state, action) => {
        state.predictionSummary.load = true
      })
      .addCase(getPredictionbyId.fulfilled, (state, action) => {
        state.predictionSummary = { ...action.payload, load: false }
        state.predictionFeedbackCorrection.comment = action.payload.feedback?.fb_review_comment ?? ''
      })
      .addCase(getPredictionbyId.rejected, (state, action) => {
        state.predictionSummary = { ...action.payload, load: false }
        state.predictionFeedbackCorrection.comment = ''
      })

      .addCase(submitPredictionFeedback.pending, (state, action) => {
        state.predictionSummary.load = true
        state.predictionFeedbackCorrection.load = true
      })
      .addCase(submitPredictionFeedback.fulfilled, (state, action) => {
        state.predictionSummary = {
          ...state.predictionSummary,
          feedback: action.payload ? action.payload : state.predictionSummary.feedback,
          load: false,
        }
        state.predictionFeedbackCorrection.load = false
      })
      .addCase(submitPredictionFeedback.rejected, (state, action) => {
        state.predictionSummary = { ...state.predictionSummary, load: false }
        state.predictionFeedbackCorrection.load = false
      })

      .addCase(getSubcatList.pending, (state, action) => {
        state.subcatList.load = true
      })
      .addCase(getSubcatList.fulfilled, (state, action) => {
        state.subcatList.load = false
        state.subcatList.data = action.payload
      })
      .addCase(getSubcatList.rejected, (state, action) => {
        state.subcatList.load = false
        state.subcatList.data = action.payload
      })

      .addCase(postPredictionReview.pending, (state, action) => {
        state.predictionSummary.load = true
      })
      .addCase(postPredictionReview.fulfilled, (state, action) => {
        state.predictionSummary = {
          ...state.predictionSummary,
          feedback: action.payload ? action.payload : state.predictionSummary.feedback,
          load: false,
        }
      })
      .addCase(postPredictionReview.rejected, (state) => {
        state.predictionSummary = {
          ...state.predictionSummary,
          load: false,
        }
      })
  },
})

export const { updateFeedback, triggerFeedbackCorrection } =
  AnalyzeSlice.actions

export default AnalyzeSlice.reducer
