import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import API from "../api";

export const fetchFaq=createAsyncThunk(
    'faq/fetchFaq',
    async()=>{
        try {
            const response=await API.get(`/api/Settings/GetFaqList`)
            return response
        } catch (error) {
            return error
        }
    }
)
export const fetchSingleFaq=createAsyncThunk(
    'faq/fetchSingleFaq',
    async({editId})=>{
        try {
            const response=await API.get(`/api/Settings/GetSingleFaq/${editId}`)
            return response
        } catch (error) {
            return error
        }
    }
)
export const deleteSingleFaq=createAsyncThunk(
    'faq/deleteSingleFaq',
    async({deleteId})=>{
        try {
            const response=await API.delete(`/api/Settings/DeleteFaq/${deleteId}`)
            return response
        } catch (error) {
            return error
        }
    }
)
export const createSingleFaq=createAsyncThunk(
    'faq/createSingleFaq',
    async({objFaq})=>{
      try {
        const response=await API.post(`/api/Settings/CreateFaq`,objFaq)
        return response        
      } catch (error) {
        return error
      }
    }
  )
  export const updateSingleFaq=createAsyncThunk(
    'faq/updateSingleFaq',
    async({objFaq})=>{
      try {
        const response=await API.patch(`/api/Settings/UpdateFaq`,objFaq)
        return response        
      } catch (error) {
        return error
      }
    }
  )

export const faqSlice = createSlice({
  name: 'faq',
  initialState:{
    error:null,
    loading:false,
    editId:null,
    isEditOpen:false,  
    deleteId:null,
    isDeleteOpen:false,
    isAddOpen:false,
    isReload:false
  },
  reducers: {
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
    //get faq
    builder.addCase(fetchFaq.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(fetchFaq.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(fetchFaq.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    //get Single Faq
    builder.addCase(fetchSingleFaq.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(fetchSingleFaq.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(fetchSingleFaq.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    //delete Single Faq
    builder.addCase(deleteSingleFaq.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(deleteSingleFaq.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(deleteSingleFaq.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    //create Single Faq
    builder.addCase(createSingleFaq.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(createSingleFaq.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(createSingleFaq.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    //update Single Faq
    builder.addCase(updateSingleFaq.pending,(state,action)=>{
        state.loading=true
    })
    builder.addCase(updateSingleFaq.fulfilled,(state,action)=>{
        state.loading=false
    })
    builder.addCase(updateSingleFaq.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
  }
});

export const { addOpen,editOpen,addEditCancel,addEditClose,deleteCancel,deleteOpen,deleteClose } = faqSlice.actions;

export default faqSlice.reducer;