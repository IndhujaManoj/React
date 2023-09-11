import { createSlice } from '@reduxjs/toolkit'
import { DataService } from 'config.axios'

const initialState = {
  whiteLabelData: {
    isLoading:true,
    isActive:false,  
    account_logo: '',
    account_fav_icon: '',
  },
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setWhiteLabel: (state, action) => {
        if(action.payload.account_logo && action.payload.account_logo != ''){
            state.whiteLabelData.isActive = true;
            document.getElementById("fav_icon").href= action.payload.account_fav_icon;
        }else{
            state.whiteLabelData.isActive = false;
            document.getElementById("fav_icon").href= process.env.PUBLIC_URL + 'favicon.png';
        }
        state.whiteLabelData.isLoading = false;
        state.whiteLabelData.account_logo = action.payload.account_logo;
        state.whiteLabelData.account_fav_icon = action.payload.account_fav_icon;

    },
  },
})

export const {
    setWhiteLabel,
} = accountSlice.actions

export const getWhiteLabelData = () => async (dispatch) => {
  try {
    const { data } = await DataService.get(`/accounts/meta/`)
    dispatch(setWhiteLabel(data))
  } catch (error) {
    console.error('getAllTokens error', error)
  }
}

export default accountSlice.reducer
