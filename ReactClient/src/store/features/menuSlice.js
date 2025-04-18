import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getSidebar=createAsyncThunk(
  'menu/getSidebar',
  async({roleId})=>{
    try {
      const response=await API.get(`/api/Menu/GetSidebarMenu/${roleId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getAllMenu=createAsyncThunk(
  'menu/getAllMenu',
  async()=>{
    try {
      const response=await API.get(`/api/Menu/GetMenuList`)
      return response        
    } catch (error) {
      //console.log('slice error',error)
      return error
    }
  }
)
export const getParentMenu=createAsyncThunk(
  'menu/getParentMenu',
  async()=>{
    try {
      const response=await API.get(`/api/Menu/GetParentMenuList`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getSingleMenu=createAsyncThunk(
  'menu/getSingleMenu',
  async({editMenuId})=>{
    try {
      const response=await API.get(`/api/Menu/GetSingleMenu/${editMenuId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const deleteSingleMenu=createAsyncThunk(
  'menu/deleteSingleMenu',
  async({deleteMenuId})=>{
    try {
      const response=await API.delete(`/api/Menu/DeleteSingleMenu/${deleteMenuId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const createSingleMenu=createAsyncThunk(
  'menu/createSingleMenu',
  async({objMenu})=>{
    try {
      const response=await API.post(`/api/Menu/CreateMenu`,objMenu)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const updateSingleMenu=createAsyncThunk(
  'menu/updateSingleMenu',
  async({objMenu})=>{
    try {
      const response=await API.patch(`/api/Menu/UpdateMenu`,objMenu)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getMenuGroup=createAsyncThunk(
  'menu/getMenuGroup',
  async()=>{
    try {
      const response=await API.get(`/api/Menu/GetMenuGroupList`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getSingleMenuGroup=createAsyncThunk(
  'menu/getSingleMenuGroup',
  async({editMenuId})=>{
    try {
      const response=await API.get(`/api/Menu/GetSingleMenuGroup/${editMenuId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const deleteSingleMenuGroup=createAsyncThunk(
  'menu/deleteSingleMenuGroup',
  async({deleteMenuId})=>{
    try {
      const response=await API.delete(`/api/Menu/DeleteSingleMenuGroup/${deleteMenuId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const createSingleMenuGroup=createAsyncThunk(
  'menu/createSingleMenuGroup',
  async({objMenuGroup})=>{
    try {
      const response=await API.post(`/api/Menu/CreateMenuGroup`,objMenuGroup)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const updateSingleMenuGroup=createAsyncThunk(
  'menu/updateSingleMenuGroup',
  async({objMenuGroup})=>{
    try {
      const response=await API.patch(`/api/Menu/UpdateMenuGroup`,objMenuGroup)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const getAllMenuForAssign=createAsyncThunk(
  'menu/getAllMenuForAssign',
  async({menuGroupId})=>{
    try {
      const response=await API.get(`/api/Menu/GetAllMenu/${menuGroupId}`)
      return response        
    } catch (error) {
      return error
    }
  }
)
export const assignNewMenu=createAsyncThunk(
  'menu/assignNewMenu',
  async({objMenu})=>{
    try {
      const response=await API.post(`/api/Menu/MenuAssign`,objMenu)
      return response        
    } catch (error) {
      return error
    }
  }
)

export const menuSlice = createSlice({
  name: 'menu',
  initialState:{
    sidebarMenu:null,
    menus:null,
    error:null,
    loading:false,
    isAddOpen:false,
    editMenuId:null,
    isEditOpen:false,  
    deleteMenuId:null,
    isDeleteOpen:false,
    menuGroupId:null,
    isMenuAssignOpen:false,
    isReload:false
  },

  reducers: {
    //menu add open
    addMenuOpen:(state,action)=>{
      state.isAddOpen=true
      state.isReload=false
    },
    //menu edit open
    editMenuOpen:(state,action)=>{
      state.isEditOpen=true
      state.isReload=false
      state.editMenuId=action.payload
    },
    //menu add/edit cancel
    addEditMenuCancel:(state,action)=>{
      state.isEditOpen=false
      state.isAddOpen=false
      state.editMenuId=action.payload
    },
    //menu add/edit save
    addEditMenuClose:(state,action)=>{
      state.isEditOpen=false
      state.isAddOpen=false
      state.isReload=true
      state.editMenuId=action.payload
    },
    //menu delete cancel
    deleteMenuCancel:(state,action)=>{
      state.isDeleteOpen=false
      state.deleteMenuId=action.payload
    },
    //menu delete open
    deleteMenuOpen:(state,action)=>{
      state.isDeleteOpen=true
      state.isReload=false
      state.deleteMenuId=action.payload
    },
    //menu delete save
    deleteMenuClose:(state,action)=>{
      state.isDeleteOpen=false
      state.isReload=true
      state.deleteMenuId=action.payload
    },
    //menu assign open
    assignMenuOpen:(state,action)=>{
      state.isMenuAssignOpen=true
      state.menuGroupId=action.payload
    },
    //menu assign cancel
    assignMenuCancel:(state,action)=>{
      state.isMenuAssignOpen=false
      state.menuGroupId=action.payload
    },
  },

  extraReducers:(builder)=>{
    //get Sidebar
    builder.addCase(getSidebar.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getSidebar.fulfilled,(state,action)=>{
      state.loading=false
      state.sidebarMenu=action.payload.data
    })
    builder.addCase(getSidebar.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //get All Menu
    builder.addCase(getAllMenu.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getAllMenu.fulfilled,(state,action)=>{
      state.loading=false
      state.menus=action.payload.data
    })
    builder.addCase(getAllMenu.rejected,(state,action)=>{
      //console.log('action.payload',action.payload)
      state.loading=false
      state.error=action.payload
    })

    //get Parent Menu
    builder.addCase(getParentMenu.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getParentMenu.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getParentMenu.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //get Single Menu
    builder.addCase(getSingleMenu.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getSingleMenu.fulfilled,(state,action)=>{
      state.loading=false
      state.isEditOpen=true
    })
    builder.addCase(getSingleMenu.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //delete Single Menu
    builder.addCase(deleteSingleMenu.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(deleteSingleMenu.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(deleteSingleMenu.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //create Single Menu
    builder.addCase(createSingleMenu.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(createSingleMenu.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(createSingleMenu.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //update Single Menu
    builder.addCase(updateSingleMenu.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateSingleMenu.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateSingleMenu.rejected,(state,action)=>{
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

    //get Single Menu Group
    builder.addCase(getSingleMenuGroup.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getSingleMenuGroup.fulfilled,(state,action)=>{
      state.loading=false
      state.isEditOpen=true
    })
    builder.addCase(getSingleMenuGroup.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //delete Single Menu Group
    builder.addCase(deleteSingleMenuGroup.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(deleteSingleMenuGroup.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(deleteSingleMenuGroup.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //create Single Menu Group
    builder.addCase(createSingleMenuGroup.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(createSingleMenuGroup.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(createSingleMenuGroup.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //update Single Menu Group
    builder.addCase(updateSingleMenuGroup.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(updateSingleMenuGroup.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(updateSingleMenuGroup.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //get all app menu for assign
    builder.addCase(getAllMenuForAssign.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(getAllMenuForAssign.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(getAllMenuForAssign.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

    //assign a new menu to a menu-group
    builder.addCase(assignNewMenu.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(assignNewMenu.fulfilled,(state,action)=>{
      state.loading=false
    })
    builder.addCase(assignNewMenu.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
});

export const { addMenuOpen,addEditMenuCancel,editMenuOpen,
  addEditMenuClose,deleteMenuCancel,deleteMenuOpen,deleteMenuClose,assignMenuOpen,assignMenuCancel } = menuSlice.actions;

export default menuSlice.reducer;