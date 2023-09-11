import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'
import { getItem, setItem } from 'utils/localStorageController'

const initialState = {
  study: {
    list: [],
    paging: {
      page_number: 1,
      per_page: 10,
      total_count: 0,
    },
    sorting: {
      sort_field: '',
      sort_order: '',
    },
    modalState: !getItem('study_id') ? true : false,
    activeStudyID: getItem('study_id'),
    filter: {
      filterValues: {
        therapeutic_area: [],
        indication: [],
        project: [],
        phase: [],
        status: [],
      },
      filterOptions: {},
    },
  },
}

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    activeStudyList: (state, action) => {
      let { data, paging } = action.payload
      state.study.list = data
      state.study.paging = paging

      let isStudyExist = data.some(
        (e) => state.study.activeStudyID === e.study_id
      )
      if (state.study.activeStudyID && !isStudyExist) {
        state.study.activeStudyID = null
        state.study.modalState = true
      }
    },
    setStudyID: (state, action) => {
      const { study_id, id } = action.payload
      state.study.activeStudyID = study_id
      setItem('study_id', study_id)
      setItem('_study_id', id.toString())
      
      
    },
    handleFavouriteStudy: (state, action)=> {
      
      const {studyId} = action.payload
      const selectedStudy =  state.study.list.find(data => data.id == studyId)
      selectedStudy.is_favorite = !selectedStudy.is_favorite
    },
    setModalState: (state, action) => {
      state.study.modalState = action.payload
    },
    updateSortField(state, action) {
      state.study.sorting.sort_field = action.payload.sortField
      state.study.sorting.sort_order = action.payload.sortOrder
    },
    setFilterOptionValues(state, action) {
      state.study.filter.filterOptions = action.payload
    },
    handleFilterChange(state, action) {
      state.study.filter.filterValues[action.payload.name] =
        action.payload.value
    },
    resetFilterValues(state, action) {
      state.study.filter.filterValues = initialState.study.filter.filterValues
    },
  },
})

export const {
  activeStudyList,
  setStudyID,
  updateSortField,
  setModalState,
  handleFilterChange,
  resetFilterValues,
  setFilterOptionValues,
  handleFavouriteStudy
} = studySlice.actions

export const getStudyList =
  (params = undefined) =>
  async (dispatch) => {
    try {
      const instanceId =
        params && params?.instance_id !== 0
          ? params.instance_id
          : getItem('instance_id')
      let searchParams = params?.searchParams
        ? `&search_term=${params.searchParams}`
        : ''
      let page = params?.page ? `&page=${params.page}` : ''
      let per_page = params?.per_page ? `&per_page=${params.per_page}` : ''
      let sortField = params?.sortField ? `&sort_by=${params.sortField}` : ''
      let sortOrder = params?.sortOrder ? `&order=${params.sortOrder}` : ''
      let filterParams = ''

      if (params?.filter) {
        Object.keys(params?.filter).map(
          (filterKey) =>
            params.filter[filterKey].length > 0 &&
            params.filter[filterKey].map(
              (filterValue) =>
                (filterParams += `&${filterKey}=${filterValue.value}`)
            )
        )
      }

      const { data } = await DataService.get(
        `/studies?instance_id=${instanceId}${searchParams}${page}${per_page}${sortField}${sortOrder}${filterParams}`
      )
      data.data = data.data.sort((a, b) => Number(b.is_favorite) - Number(a.is_favorite),);
      dispatch(activeStudyList(data))
    } catch (error) {
      console.error('Get Study list error:', error)
    }
  }

export const getFilterValues = (instanceId) => async (dispatch) => {
  try {
    const { data } = await DataService.get(`/studies/filter?instance_id=${instanceId}`)
    dispatch(setFilterOptionValues(data.data))
  } catch (error) {
    console.error('Get study registration filter error', error)
  }
}

export const makeStudyFavorite = (params) => async (dispatch) => {
  try {
    const { data } = await DataService.put(
      `/studies/favorite/${params.id}?is_favorite=${params.favorite_value}`
    )
    dispatch(handleFavouriteStudy({ studyId: data.data.study_id }))
    dispatch(getStudyList())
  } catch (error) {
    console.error('Make study favorite error', error)
  }
}

export default studySlice.reducer
