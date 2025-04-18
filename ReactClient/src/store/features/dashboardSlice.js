import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import API from '../api';

export const getUserStatus=createAsyncThunk(
    'dashboard/getUserStatus',
    async()=>{
        try {
            const response=await API.get(`/api/Users/UserStatus`)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const getDateWiseLogin=createAsyncThunk(
    'dashboard/getDateWiseLogin',
    async({userId})=>{
        try {
            const response=await API.get(`/api/Users/GetLogInSummaryByDate/${userId}`)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const getMonthWiseLogIn=createAsyncThunk(
    'dashboard/getMonthWiseLogIn',
    async({userId})=>{
        try {
            const response=await API.get(`/api/Users/GetLogInSummaryByMonth/${userId}`)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const getYearWiseLogIn=createAsyncThunk(
    'dashboard/getYearWiseLogIn',
    async({userId})=>{
        try {
            const response=await API.get(`/api/Users/GetLogInSummaryByYear/${userId}`)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const getBrowserCount=createAsyncThunk(
    'dashboard/getBrowserCount',
    async({userId})=>{
        try {
            const response=await API.get(`/api/Users/GetBrowserCount/${userId}`)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const getRoleWiseUser=createAsyncThunk(
    'dashboard/getRoleWiseUser',
    async()=>{
        try {
            const response=await API.get(`/api/Users/GetRoleWiseUser`)
            return response        
        } catch (error) {
            return error
        }
    }
)

export const sliceName = createSlice({
  name: 'dashboard',
  initialState:{
    error:null,
    loading:false,
  },
  extraReducers:(builder)=>{
    //get date wise login
    builder.addCase(getUserStatus.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(getUserStatus.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(getUserStatus.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //get date wise login
    builder.addCase(getDateWiseLogin.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(getDateWiseLogin.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(getDateWiseLogin.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //get month count
    builder.addCase(getMonthWiseLogIn.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(getMonthWiseLogIn.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(getMonthWiseLogIn.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //get month count
    builder.addCase(getYearWiseLogIn.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(getYearWiseLogIn.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(getYearWiseLogIn.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //get month count
    builder.addCase(getBrowserCount.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(getBrowserCount.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(getBrowserCount.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //get month count
    builder.addCase(getRoleWiseUser.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(getRoleWiseUser.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(getRoleWiseUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
  }
});

export default sliceName.reducer;