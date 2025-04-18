import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const fetchBrowsingHistory=createAsyncThunk(
    'log/fetchBrowsingHistory',
    async({userId})=>{
        try {
            const response=await API.get(`/api/Users/GetBrowseList/${userId}`)
            return response
        } catch (error) {
            return error
        }
    }
)
export const fetchAppError=createAsyncThunk(
    'log/fetchAppError',
    async()=>{
        try {
            const response=await API.get(`/api/Settings/GetErrorLogList`)
            return response
        } catch (error) {
            return error
        }
    }
)

export const createErrorLog=createAsyncThunk(
    'log/createErrorLog',
    async({objError})=>{
        try {
            const response=await API.post(`/api/Settings/CreateErrorLog`,objError)
            return response        
        } catch (error) {
            return error
        }
    }
)

export const logSlice = createSlice({
  name: 'log',
  initialState:{
    error:null,
    loading:false,
  },
  extraReducers:(builder)=>{
    //fetch browsing history
    builder.addCase(fetchBrowsingHistory.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(fetchBrowsingHistory.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(fetchBrowsingHistory.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //fetch app errors
    builder.addCase(fetchAppError.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(fetchAppError.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(fetchAppError.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //save app error
    builder.addCase(createErrorLog.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(createErrorLog.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(createErrorLog.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
  }
});

export default logSlice.reducer;