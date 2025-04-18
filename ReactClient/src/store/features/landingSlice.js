import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const createContact=createAsyncThunk(
    'landing/createContact',
    async({contactForm})=>{
        try {
            const response=await API.post('/api/Settings/CreateContacts',contactForm)
            return response        
        } catch (error) {
            return error
        }
    }
)
export const fetchContact=createAsyncThunk(
    'landing/fetchContact',
    async()=>{
        try {
            const response=await API.get(`/api/Settings/GetContacts`)
            return response
        } catch (error) {
            return error
        }
    }
)


export const landingSlice=createSlice({
    name:'landing',
    initialState:{
        isSidebarOpen:false,
        loading:false,
        error:null
    },
    reducers:{
        sidebarToggle:(state)=>{
            state.isSidebarOpen=!state.isSidebarOpen
        }
    },
    extraReducers:(builder)=>{
        //Create Contact
        builder.addCase(createContact.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(createContact.fulfilled,(state,action)=>{
            state.loading=false
        })
        builder.addCase(createContact.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        //Fetch Contact
        builder.addCase(fetchContact.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(fetchContact.fulfilled,(state,action)=>{
            state.loading=false
        })
        builder.addCase(fetchContact.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export const {sidebarToggle}=landingSlice.actions
export default landingSlice.reducer