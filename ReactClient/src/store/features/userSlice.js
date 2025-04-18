import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getAllUser=createAsyncThunk(
  'user/getAllUser',
  async()=>{
    try {
      const response=await API.get(`/api/Users/GetUserList`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getSingleUser=createAsyncThunk(
  'user/getSingleUser',
  async({editId})=>{
    try {
      const response=await API.get(`/api/Users/GetSingleUser/${editId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getSingleUserByHash=createAsyncThunk(
  'user/getSingleUserByHash',
  async({hash})=>{
    try {
      const response=await API.get(`/api/Users/GetSingleUserByHash/${hash}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const deleteSingleUser=createAsyncThunk(
  'user/deleteSingleUser',
  async({deleteId})=>{
    try {
      const response=await API.delete(`/api/Users/DeleteSingleUser/${deleteId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const createSingleUser=createAsyncThunk(
  'user/createSingleUser',
  async({objUser})=>{
    try {
      const response=await API.post(`/api/Users/CreateUser`,objUser)
      return response        
    } catch (error) {
      console.log(error)
      return error
    }
  }
)
export const updateSingleUser=createAsyncThunk(
  'user/updateSingleUser',
  async({objUser})=>{
    try {
      const response=await API.patch(`/api/Users/UpdateUser`,objUser)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const uploadImage=createAsyncThunk(
  'user/uploadImage',
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
export const getUserRole=createAsyncThunk(
  'user/getUserRole',
  async()=>{
    try {
      const response=await API.get(`/api/Users/GetUserRoleList`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getMenuGroup=createAsyncThunk(
  'user/getMenuGroup',
  async()=>{
    try {
      const response=await API.get(`/api/Menu/GetMenuGroupList`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getSingleRole=createAsyncThunk(
  'user/getSingleRole',
  async({editId})=>{
    try {
      const response=await API.get(`/api/Users/GetSingleRole/${editId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const deleteSingleRole=createAsyncThunk(
  'user/deleteSingleRole',
  async({deleteId})=>{
    try {
      const response=await API.delete(`/api/Users/DeleteSingleRole/${deleteId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const createSingleRole=createAsyncThunk(
  'user/createSingleRole',
  async({objRole})=>{
    try {
      const response=await API.post(`/api/Users/CreateUserRole`,objRole)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const updateSingleRole=createAsyncThunk(
  'user/updateSingleRole',
  async({objRole})=>{
    try {
      const response=await API.patch(`/api/Users/UpdateUserRole`,objRole)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const updateUserPassword=createAsyncThunk(
  'user/updateUserPassword',
  async({objUser})=>{
    try {
      const response=await API.patch(`/api/Users/ChangeUserPassword`,objUser)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const updateUserProfile=createAsyncThunk(
  'user/updateUserProfile',
  async({objUser})=>{
    try {
      const response=await API.patch(`/api/Users/UpdateUserProfile`,objUser)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getUserNotification=createAsyncThunk(
  'user/getUserNotification',
  async({userId})=>{
    try {
      const response=await API.get(`/api/Users/GetNotificationList/${userId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getUserInfoToSendEmail=createAsyncThunk(
  'user/getUserInfoToSendEmail',
  async({forgetPasswordEmail})=>{
    try {
      const response=await API.get(`/api/Users/GetUserInfoForForgetPassword/${forgetPasswordEmail}`)
      return response        
    } catch (error) {
      return error
    }
  }
)

export const userSlice=createSlice({
  name:'user',
  initialState:{
    error:null,
    loading:false,
    editId:null,
    isEditOpen:false,  
    deleteId:null,
    isDeleteOpen:false,
    isAddOpen:false,
    isReload:false,
    isPersonalizeOpen:false,
    isNotificationOpen:false
  },
  reducers: {
    //toggle personalize menus
    togglePersonalize:(state,action)=>{
      state.isPersonalizeOpen=!state.isPersonalizeOpen
      state.isNotificationOpen=false
    },
    //toggle notification
    toggleNotification:(state,action)=>{
      state.isNotificationOpen=!state.isNotificationOpen
      state.isPersonalizeOpen=false
    },
    //close notification and personalize menu
    closeNotificationAndPersonalizeMenu:(state,action)=>{
      state.isNotificationOpen=false
      state.isPersonalizeOpen=false
    },
    //add open
    addOpen:(state,action)=>{
      state.isAddOpen=true
      state.isReload=false
    },
    //edit open
    editOpen:(state,action)=>{
      state.isEditOpen=true
      state.isReload=false
      state.editId=action.payload
    },
    //add/edit cancel
    addEditCancel:(state,action)=>{
      state.isEditOpen=false
      state.isAddOpen=false
      state.editId=action.payload
    },
    //add/edit save
    addEditClose:(state,action)=>{
      state.isEditOpen=false
      state.isAddOpen=false
      state.isReload=true
      state.editId=action.payload
    },
    //delete cancel
    deleteCancel:(state,action)=>{
      state.isDeleteOpen=false
      state.deleteId=action.payload
    },
    //delete open
    deleteOpen:(state,action)=>{
      state.isDeleteOpen=true
      state.isReload=false
      state.deleteId=action.payload
    },
    //delete save
    deleteClose:(state,action)=>{
      state.isDeleteOpen=false
      state.isReload=true
      state.deleteId=action.payload
    }
  },
  extraReducers:(builder)=>{
    //get User Role
    builder.addCase(getUserRole.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getUserRole.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getUserRole.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //get MenuGroup
    builder.addCase(getMenuGroup.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getMenuGroup.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getMenuGroup.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //get Single Role
    builder.addCase(getSingleRole.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getSingleRole.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getSingleRole.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //delete Single Role
    builder.addCase(deleteSingleRole.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(deleteSingleRole.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(deleteSingleRole.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //create Single Role
    builder.addCase(createSingleRole.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(createSingleRole.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(createSingleRole.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Update Single Role
    builder.addCase(updateSingleRole.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateSingleRole.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateSingleRole.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //get Single User
    builder.addCase(getSingleUser.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getSingleUser.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getSingleUser.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //get Single User By Hash
    builder.addCase(getSingleUserByHash.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getSingleUserByHash.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getSingleUserByHash.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //get Single User
    builder.addCase(getAllUser.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getAllUser.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getAllUser.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //delete Single User
    builder.addCase(deleteSingleUser.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(deleteSingleUser.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(deleteSingleUser.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //create Single User
    builder.addCase(createSingleUser.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(createSingleUser.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(createSingleUser.rejected,(state,action)=>{
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
    
    //Update Single User
    builder.addCase(updateSingleUser.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateSingleUser.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateSingleUser.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Update User Password
    builder.addCase(updateUserPassword.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateUserPassword.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateUserPassword.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //Update User Profile
    builder.addCase(updateUserProfile.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateUserProfile.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateUserProfile.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })    

    //Get User Notification List
    builder.addCase(getUserNotification.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getUserNotification.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getUserNotification.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })    
    //Get User Info
    builder.addCase(getUserInfoToSendEmail.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getUserInfoToSendEmail.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getUserInfoToSendEmail.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })    
  }
})

export const {togglePersonalize,toggleNotification,closeNotificationAndPersonalizeMenu,
  addOpen,editOpen,addEditCancel,addEditClose,deleteCancel,deleteOpen,deleteClose}=userSlice.actions
export default userSlice.reducer