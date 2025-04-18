import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../api';

export const login=createAsyncThunk(
    'auth/login',
    async({signInForm})=>{
        try {
            const response=await API.post('/api/Users/GetLoginInfo',signInForm)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const register=createAsyncThunk(
    'auth/register',
    async({objRegister})=>{
        try {
            const response=await API.post('/api/Users/StudentRegistration',objRegister)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const createUserLog=createAsyncThunk(
    'auth/createUserLog',
    async({objLogHistory})=>{
        try {
            const response=await API.post('/api/Users/CreateLoginHistory',objLogHistory)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const updateUserLog=createAsyncThunk(
    'auth/updateUserLog',
    async({logCode})=>{
        try {
            const response=await API.patch(`/api/Users/UpdateLoginHistory/${logCode}`,)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const getUserIp=createAsyncThunk(
    'auth/getUserIp',
    async()=>{
        try {
            const response=await axios.get('https://api.ipify.org?format=json')
            return response        
        } catch (error) {
            return error
        }
    }
)
export const getUserLog=createAsyncThunk(
    'auth/getUserLog',
    async({userIp})=>{
        try {
            const response=await axios.get('https://ipapi.co/'+userIp+'/json/')
            return response        
        } catch (error) {
            return error
        }
    }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    user:null,
    error:null,
    loading:false,
    isSignOutOpen:false,
    isScreenLockOpen:false,
    isRegistrationOpen:false
  },
  reducers:{
    signOut:(state)=>{
        state.user=null
        state.error=null
        state.loading=false
        state.isSignOutOpen=false
        state.isRegistrationOpen=false
        localStorage.clear()
    },
    signOutToggle:(state)=>{
        state.isSignOutOpen=!state.isSignOutOpen
    },
    screenLockToggle:(state)=>{
        state.isScreenLockOpen=!state.isScreenLockOpen
    },
    registrationOpenToggle:(state)=>{
        state.isRegistrationOpen=!state.isRegistrationOpen
    }
  },
  extraReducers:(builder)=>{
    //login
    builder.addCase(login.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(login.fulfilled,(state,action)=>{
        state.loading=false
        state.user=action.payload.data
        if(action.payload.status==200){
            localStorage.setItem('userId',state.user.obj.userId)
            localStorage.setItem('userRoleId',state.user.obj.userRoleId)
            localStorage.setItem('profile',JSON.stringify({...state.user}))
        }
    })
    builder.addCase(login.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //register
    builder.addCase(register.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(register.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(register.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //Insert User Log
    builder.addCase(createUserLog.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(createUserLog.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(createUserLog.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //Update User Log
    builder.addCase(updateUserLog.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(updateUserLog.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(updateUserLog.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })

    //User IP
    builder.addCase(getUserIp.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(getUserIp.fulfilled,(state,action)=>{
        state.loading=false
        //console.log('fulfilled',action.payload)
    })
    builder.addCase(getUserIp.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
        //console.log('rejected',action.payload)
    })

    //User IP
    builder.addCase(getUserLog.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(getUserLog.fulfilled,(state,action)=>{
        state.loading=false
        //console.log('fulfilled',action.payload)
    })
    builder.addCase(getUserLog.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
        //console.log('rejected',action.payload)
    })
  }
});

export const {signOut,signOutToggle,screenLockToggle,registrationOpenToggle}=authSlice.actions
export default authSlice.reducer;