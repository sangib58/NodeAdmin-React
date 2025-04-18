import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom"
import { updateSingleMenu,createSingleMenu,getParentMenu,getSingleMenu,addEditMenuCancel,addEditMenuClose, } from '../../store/features/menuSlice'
import { createErrorLog } from '../../store/features/logSlice'
import Spinner from '../common/Spinner'
import { toast } from 'react-toastify'

const AddEditMenu = () => {
    const initialState={
        menuID:null,
        parentID:'',
        menuTitle:'',
        url:'',
        isSubMenu:0,
        sortOrder:0,
        iconClass:'',
        isActive:false,
        addedBy:'',
        lastUpdatedBy:''
    }
    const initialErrorState={
        parentIDError:'',
        menuTitleError:''
    }
    const [menuForm,setMenuForm]=useState(initialState)
    const [errors,setErrors]=useState(initialErrorState)
    const [parentMenuDropdown,setParentMenuDropDown]=useState([])
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {isAddOpen,isEditOpen,editMenuId,loading}=useSelector((state)=>({...state.menu}))
    const {menuID,parentID,menuTitle,url,sortOrder,iconClass,isActive}=menuForm
    const {parentIDError,menuTitleError}=errors

    useEffect(()=>{
        dispatch(getParentMenu())
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                setParentMenuDropDown(res.payload.data)
                isEditOpen && fetchSingleMenu()
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }
        })     
    },[])

    const fetchSingleMenu=()=>{
        dispatch(getSingleMenu({editMenuId}))
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                setMenuForm(res.payload.data)
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

    const onInputChange=(e)=>{
        let { name,value,checked } = e.target
        setMenuForm({ ...menuForm, [name]: e.target.name=='isActive'?checked:value })
        if(e.target.name=='menuTitle')menuForm.menuTitle=value
        else if(e.target.name=='parentID')menuForm.parentID=value
        validateMenu()
    }

    const validateMenu=()=>{
        const newErrors={}       
        if(menuForm.menuTitle.trim().length<=3){
            newErrors.menuTitle='Minimum 4 character required'
        }
        if(menuForm.parentID==='' || menuForm.parentID=='Select Parent Menu'){
            newErrors.parentID='Parent required'
        }
        setErrors({menuTitleError:newErrors.menuTitle,parentIDError:newErrors.parentID})
        return newErrors
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const newErrors=validateMenu()
        if(Object.keys(newErrors).length==0){
            if(isEditOpen){
                const objMenu={
                    menuID,
                    parentID,
                    menuTitle,
                    url,
                    isActive:parentID>0?false:isActive,
                    isSubMenu:url.trim().length>0?0:1,
                    sortOrder:parentID>0?0:sortOrder,
                    iconClass:parentID>0?'':iconClass,
                    lastUpdatedBy:localStorage.getItem('userId')
                }
                dispatch(updateSingleMenu({objMenu}))
                .then((res)=>{
                    const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
                    res.payload.status!=200 && dispatch(createErrorLog({objError}))
                    if(res.payload.status==200){
                        toast.success(res.payload.data.responseMsg)
                        dispatch(addEditMenuClose(null))
                    }else if(res.payload.status==202){
                        toast.error(res.payload.data.responseMsg)
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
                const objMenu={
                    parentID,
                    menuTitle,
                    url,
                    isActive:parentID>0?false:isActive,
                    isSubMenu:url.trim().length>0?0:1,
                    sortOrder:parentID>0?0:sortOrder,
                    iconClass:parentID>0?'':iconClass,
                    addedBy:localStorage.getItem('userId')
                }
                dispatch(createSingleMenu({objMenu}))
                .then((res)=>{
                    const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
                    res.payload.status!=200 && dispatch(createErrorLog({objError}))
                    if(res.payload.status==200){
                        toast.success(res.payload.data.responseMsg)
                        dispatch(addEditMenuClose(null))
                    }else if(res.payload.status==202){
                        toast.error(res.payload.data.responseMsg)
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
                    <div className="relative flex flex-col bg-gray-900 min-w-[400px] max-w-[900px] min-h-[500px] md:min-h-[400px] rounded-md p-6 text-white">
                        <div className="font-bold text-xl float-left">{isEditOpen?'Edit Menu':'Add Menu'}</div>
                        <form onSubmit={handleSubmit} className='py-6 md:space-y-6'>
                            <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6'>
                                <div className=''>
                                    <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Menu Title</label>
                                    <input type='text' autoComplete='off' name='menuTitle' value={menuTitle} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white focus:border-blue-600'/>
                                    {menuTitleError!='' && <p className='mt-2 text-sm text-red-500'>{menuTitleError}</p>}
                                </div>
                                <div className=''>
                                    <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Parent</label>
                                    <select name='parentID' value={parentID} onChange={onInputChange} className='w-full md:w-[225px] text-black px-1 py-2.5 rounded focus:border-blue-600'>
                                        <option>Select Parent Menu</option>
                                        {parentMenuDropdown.map((item)=>(
                                            <option key={item.id} value={item.id}>{item.text}</option>
                                        ))}
                                    </select>
                                    {parentIDError!='' && <p className='mt-2 text-sm text-red-500'>{parentIDError}</p>}
                                </div>
                                <div className=''>
                                    <label className='block'>URL</label>
                                    <input type='text' autoComplete='off' name='url' value={url} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white'/>
                                </div>                                  
                            </div>
                            {parentID==0 && (
                                <div className='flex flex-col mt-3 md:mt-1 space-y-4 md:space-y-0 md:flex-row md:space-x-6'>
                                    <div className=''>
                                        <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Order No.</label>
                                        <input type='number' autoComplete='off' name='sortOrder' value={sortOrder} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white'/>
                                    </div>
                                    <div className=''>
                                        <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Icon</label>
                                        <input type='text' autoComplete='off' name='iconClass' value={iconClass} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white'/>
                                    </div>
                                    <div className=''>
                                        <label className='block'>Is Active?</label>
                                        <input type='checkbox' name='isActive' checked={isActive} onChange={onInputChange} className='ring-1 size-4'/>
                                    </div>
                                </div>
                            )}
                            
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

export default AddEditMenu