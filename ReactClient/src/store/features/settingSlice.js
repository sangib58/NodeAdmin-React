import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getAppSetting=createAsyncThunk(
  'settings/getAppSetting',
  async()=>{
    try {
      const response=await API.get(`/api/Settings/GetSiteSettings`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const uploadLogo=createAsyncThunk(
  'settings/uploadLogo',
  async({objFormData})=>{
    try {
      const response=await API.post(`/api/Settings/UploadLogo`,objFormData)
      return response        
    } catch (error) {
      console.log(error)
      return error
    }
  }
)
export const uploadFavicon=createAsyncThunk(
  'settings/uploadFavicon',
  async({objFormData})=>{
    try {
      const response=await API.post(`/api/Settings/UploadFavicon`,objFormData)
      return response        
    } catch (error) {
      console.log(error)
      return error
    }
  }
)
export const uploadImage=createAsyncThunk(
  'settings/uploadImage',
  async({objFormData})=>{
    try {
      const response=await API.post(`/api/Users/Upload`,objFormData)
      return response        
    } catch (error) {
      console.log(error)
      return error
    }
  }
)
export const updateGeneralSettings=createAsyncThunk(
  'settings/updateGeneralSettings',
  async({objGeneralSettings})=>{
    try {
      const response=await API.patch(`/api/Settings/UpdateGeneralSetting`,objGeneralSettings)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const updateEmailSettings=createAsyncThunk(
  'settings/updateEmailSettings',
  async({objEmailSettings})=>{
    try {
      const response=await API.patch(`/api/Settings/UpdateEmailSetting`,objEmailSettings)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const updateEmailText=createAsyncThunk(
  'settings/updateEmailText',
  async({objEmailText})=>{
    try {
      const response=await API.patch(`/api/Settings/UpdateEmailTextSetting`,objEmailText)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const updateLandingText=createAsyncThunk(
  'settings/updateLandingText',
  async({objEmailText})=>{
    try {
      const response=await API.patch(`/api/Settings/UpdateLandingSetting`,objEmailText)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const passwordEmailSent=createAsyncThunk(
  'settings/passwordEmailSent',
  async({objEmail})=>{
    try {
      const response=await API.post(`/api/Settings/SendPasswordMail`,objEmail)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const welcomeEmailSent=createAsyncThunk(
  'settings/welcomeEmailSent',
  async({objEmail})=>{
    try {
      const response=await API.post(`/api/Settings/SendWelcomeMail`,objEmail)
      return response        
    } catch (error) {
      return error
    }
  }
)

export const sliceName = createSlice({
  name: 'settings',
  initialState:{
    error:null,
    loading:false,
  },
  extraReducers:(builder)=>{
    //get App Settings
    builder.addCase(getAppSetting.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getAppSetting.fulfilled,(state,action)=>{
      state.loading=false
      localStorage.setItem('appSettings',JSON.stringify({...action.payload.data}))
    })
    builder.addCase(getAppSetting.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Upload Logo
    builder.addCase(uploadLogo.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(uploadLogo.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(uploadLogo.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Upload Favicon
    builder.addCase(uploadFavicon.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(uploadFavicon.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(uploadFavicon.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Upload Image
    builder.addCase(uploadImage.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(uploadImage.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(uploadImage.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Update General Settings
    builder.addCase(updateGeneralSettings.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateGeneralSettings.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateGeneralSettings.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Update Email Settings
    builder.addCase(updateEmailSettings.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateEmailSettings.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateEmailSettings.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Update Email Text
    builder.addCase(updateEmailText.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateEmailText.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateEmailText.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Update Landing Text
    builder.addCase(updateLandingText.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateLandingText.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateLandingText.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Password Email
    builder.addCase(passwordEmailSent.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(passwordEmailSent.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(passwordEmailSent.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Welcome Email
    builder.addCase(welcomeEmailSent.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(welcomeEmailSent.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(welcomeEmailSent.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
});

export default sliceName.reducer;