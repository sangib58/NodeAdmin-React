import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom"
import Spinner from '../common/Spinner'
import { updateSingleMenuGroup,createSingleMenuGroup,getSingleMenuGroup,addEditMenuCancel,addEditMenuClose } from '../../store/features/menuSlice'
import { createErrorLog } from '../../store/features/logSlice'
import { toast } from 'react-toastify'

const AddEditMenuGroup = () => {
    const initialState={
        menuGroupID:null,
        menuGroupName:'',
        addedBy:'',
        lastUpdatedBy:''
    }
    const [menuGroupForm,setMenuGroupForm]=useState(initialState)
    const [menuGroupNameError,setMenuGroupNameError]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {isAddOpen,isEditOpen,editMenuId,loading}=useSelector((state)=>({...state.menu}))
    const {menuGroupID,menuGroupName}=menuGroupForm

    useEffect(()=>{
        if(isEditOpen){
            dispatch(getSingleMenuGroup({editMenuId}))
            .then((res)=>{
                const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
                res.payload.status!=200 && dispatch(createErrorLog({objError}))
                if(res.payload.status==200){
                    setMenuGroupForm(res.payload.data)
                }else if(res.payload.status==401){
                    navigate('/unauthorize')
                }else if(res.payload.status==403){
                    navigate('/forbidden')
                }else{
                    navigate('/unexpected')
                }
            })
        }     
    },[isEditOpen])

    const onInputChange=(e)=>{
        let { name,value } = e.target
        setMenuGroupForm({ ...menuGroupForm, [name]: value })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(menuGroupName.trim().length==0){
            setMenuGroupNameError('Name required')
        }else{
            if(isEditOpen){
                const objMenuGroup={
                    menuGroupID,
                    menuGroupName,
                    lastUpdatedBy:localStorage.getItem('userId')
                }
                dispatch(updateSingleMenuGroup({objMenuGroup}))
                .then((res)=>{
                    const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
                    res.payload.status!=200 && dispatch(createErrorLog({objError}))
                    if(res.payload.status==200){
                        toast.success(res.payload.data.responseMsg)
                        dispatch(addEditMenuClose(null))
                    }else if(res.payload.status==401){
                        navigate('/unauthorize')
                    }else if(res.payload.status==403){
                        navigate('/forbidden')
                    }else{
                        navigate('/unexpected')
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            }else if(isAddOpen){
                const objMenuGroup={               
                    menuGroupName,               
                    addedBy:localStorage.getItem('userId')
                }
                dispatch(createSingleMenuGroup({objMenuGroup}))
                .then((res)=>{
                    const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
                    res.payload.status!=200 && dispatch(createErrorLog({objError}))
                    if(res.payload.status==200){
                        toast.success(res.payload.data.responseMsg)
                        dispatch(addEditMenuClose(null))
                    }else if(res.payload.status==401){
                        navigate('/unauthorize')
                    }else if(res.payload.status==403){
                        navigate('/forbidden')
                    }else{
                        navigate('/unexpected')
                    }                
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        }
    }

    return (
        <>            
            <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-50">
                <div className="min-h-screen flex justify-center items-center" onClick={(e)=>{if(e.target==e.currentTarget){dispatch(addEditMenuCancel(null))}}}>
                    <div className="relative bg-gray-900 min-w-[400px] max-w-[900px] min-h-[250px] rounded-md p-6 flex flex-col text-white">
                        <div className="font-bold text-xl float-left">{isEditOpen?'Edit Menu Group':'Add Menu Group'}</div>
                        <form onSubmit={handleSubmit} className='py-6 md:space-y-6'>
                            <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6'>
                                <div className=''>
                                    <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Menu Group Name</label>
                                    <input type='text' autoComplete='off' name='menuGroupName' value={menuGroupName} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white focus:border-blue-600'/>
                                    {menuGroupNameError!='' && <p className='mt-2 text-sm text-red-500'>{menuGroupNameError}</p>}
                                </div>                                  
                            </div>                          
                            <div className="absolute bottom-3 right-5 space-x-2">
                                <button type="button" className="hover:bg-gray-600 rounded p-1 text-md font-bold" onClick={(e)=>{e.stopPropagation();dispatch(addEditMenuCancel(null))}}>Cancel</button>
                                <button type="submit" className="hover:bg-gray-600 rounded p-1 text-md font-bold">{isEditOpen?'Update':'Add'}</button>                              
                            </div>
                        </form>
                        
                    </div>           
                </div>
            </div>
            {loading && <Spinner/>}           
        </>
    )
}

export default AddEditMenuGroup