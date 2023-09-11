import { createAsyncThunk } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { activateAlert } from 'reduxStore/slices/alert/AlertSlice'
import { getItem } from 'utils/localStorageController'

const study_id = getItem('_study_id')

export const getPredictionbyId = createAsyncThunk(
  'analyze/getPredictionById',
  (params, thunk) => {
    return (
      DataService.get(
        `/dq/predictions/${params.predictionId}?study_id=${study_id}`
      )
        .then(
          (response) => {
            const { data } = response
            if (
              params?.src === 'todo-list' &&
              data.data.feedback?.fb_review_flag == 1
            ) {
              params.history.push('/predictions')
            }
            return data.data
          },
        )
        // catch the thrown error in Dataservice
        .catch((error) => {
          console.error('Get Prediction By Id', error)
          if(error.includes(`'NoneType' object is not iterable`)){
            if(params?.src === 'todo-list'){
              params.history.push('/predictions')
            }else params.history.push('/prediction-history')
          }
           return {}
        })
    )
  }
)

export const postPredictionReview = createAsyncThunk(
  'analyze/postPredictionReview',
  (params, thunkAPI) => {
    return DataService.post(`/dq/predictions/review?study_id=${study_id}`, {
      ...params.api_body,
    })
      .then((response) => {
        const { data } = response
        params.closeModalCB()
        thunkAPI.dispatch(
          activateAlert({
            color: 'success',
            content: 'Your review has been saved',
          })
        )
        return data.data.feedback
      })
      .catch((error) => {
        thunkAPI.dispatch(
          activateAlert({
            color: 'danger',
            content: error,
          })
        )
        console.error('Posting prediction review error:', error)
        return {}
      })
  }
)

export const submitPredictionFeedback = createAsyncThunk(
  'analyze/submitPredictionFeedback',
  (params, thunkAPI) => {
    return DataService.post(`/dq/predictions/feedback?study_id=${study_id}`, {
      ...params.api_body,
    })
      .then((response) => {
        const { data } = response
        thunkAPI.dispatch(
          activateAlert({
            color: 'success',
            content: 'Your feedback has been saved',
          })
        )
        return data.data.feedback
      })
      .catch((error) => {
        thunkAPI.dispatch(
          activateAlert({
            color: 'danger',
            content: 'Feedback failed to save.',
          })
        )
        console.error('Posting prediction feedback error:', error)
        return {}
      })
  }
)

export const getSubcatList = createAsyncThunk(
  'analyze/getsubcatlist',
  async () => {
    try {
      const { data } = await DataService.get(
        `/accounts/ml-subcats/`
      )
      return data.data
    } catch (error) {
      console.error('Get subcat list :', error)
      return []
    }
  }
)