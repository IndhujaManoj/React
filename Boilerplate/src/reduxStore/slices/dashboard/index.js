import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { getItem } from 'utils/localStorageController'
const study_id = getItem('_study_id')


const initialState = {
    agingChartData: [],
    confidenceChartData: {},
    domainChartData: {},
    refreshDates: {},
    predictionOverview: {}
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        refreshDatesRes: (state, action) => {
            state.refreshDates = action.payload.data.data[0]
        },
        predictionOverviewRes: (state, action) => {
            state.predictionOverview = action.payload.data.data
        },
        agingChartRes: (state, action) => {
            state.agingChartData = action.payload.data.data
        },
        domainChartRes: (state, action) => {
            state.domainChartData = action.payload.data.data
        },
        confidenceChartRes: (state, action) => {
            state.confidenceChartData = action.payload.data.data.confidence_score
        }
    }
})

export const {
    refreshDatesRes,
    predictionOverviewRes,
    agingChartRes,
    domainChartRes,
    confidenceChartRes
} = dashboardSlice.actions

    export const refreshDatesFn = () => async (dispatch) => {
        try {
            const  data  = await DataService.get(
                `/dq/refresh-dates?study_id=${study_id}`)
            dispatch(refreshDatesRes({data: data.data}))
        }
        catch (error) {
            console.log("refresh dates error", error)
        }
    }
    export const predictionOverviewFn = () => async (dispatch) => {
        try {
            const  data  = await DataService.get(
                `/dq/statistics?study_id=${study_id}`
            )
            dispatch(predictionOverviewRes({data: data.data}))
        }
        catch (error) {
            console.log("prediction overview error", error)
        }
    }
    export const agingChartFn = () => async (dispatch) => {
        try {
            const  data  = await DataService.get(
                `/dq/predictions/aging?study_id=${study_id}`
            )
            console.log(data)
            dispatch(agingChartRes({data: data.data}))
        }
        catch (error) {
            console.log("agingChart error", error)
        }
    }
    export const domainChartFn = () => async (dispatch) => {
        try {
            const  data  = await DataService.get(
                `/dq/predictions/domain?study_id=${study_id}`
            )
            dispatch(domainChartRes({data: data.data}))
        }
        catch (error) {
            console.log("domain chart error", error)
        }
    }
    export const confidenceChartFn = () =>  async (dispatch) => {
        try {
            const  data  = await DataService.get(
                `/dq/predictions/confidence?study_id=${study_id}`
            )
            dispatch(confidenceChartRes({data: data.data}))
        }
        catch (error) {
            console.log("confidence chart error", error)
        }
    }

export default dashboardSlice.reducer