import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom"
import Spinner from '../common/Spinner'
import { updateSingleRole,createSingleRole,getMenuGroup,getSingleRole,addEditCancel,addEditClose} from '../../store/features/userSlice'
import { createErrorLog } from '../../store/features/logSlice'
import { toast } from 'react-toastify'

const AddEditRole = () => {
  const initialState={
    userRoleId:null,
    roleName:'',
    roleDesc:'',
    menuGroupId:''
  }
  const initialErrorState={
    roleNameError:'',
    menuGroupIdError:''
  }
  const [roleForm,setRoleForm]=useState(initialState)
  const [errors,setErrors]=useState(initialErrorState)
  const [menuGroupDropdown,setMenuGroupDropDown]=useState([])
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isAddOpen,isEditOpen,editId,loading}=useSelector((state)=>({...state.user}))
  const {userRoleId,roleName,roleDesc,menuGroupId}=roleForm
  const {roleNameError,menuGroupIdError}=errors

  useEffect(()=>{
    dispatch(getMenuGroup())
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setMenuGroupDropDown(res.payload.data.data)
        isEditOpen && fetchSingleUserRole()
      }
    })     
  },[])

  const fetchSingleUserRole=()=>{
    dispatch(getSingleRole({editId}))
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setRoleForm(res.payload.data)
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
    let { name,value } = e.target
    setRoleForm({ ...roleForm, [name]:value })
    if(e.target.name=='roleName')roleForm.roleName=value
    else if(e.target.name=='menuGroupId')roleForm.menuGroupId=value
    validateRole()
  }

  const validateRole=()=>{
    const newErrors={}
    if(roleForm.roleName.trim().length<=3){
      newErrors.roleName='Minimum 4 character required'
    }
    if(roleForm.menuGroupId==='' || roleForm.menuGroupId=='Select Menu Group'){
      newErrors.menuGroupId='Menu Group required'
    }
    setErrors({roleNameError:newErrors.roleName,menuGroupIdError:newErrors.menuGroupId})
    return newErrors
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const newErrors=validateRole()
    if(Object.keys(newErrors).length==0){
      if(isEditOpen){
        const objRole={
          userRoleId,
          roleName,
          roleDesc,
          menuGroupId,
          lastUpdatedBy:localStorage.getItem('userId')
        }
        dispatch(updateSingleRole({objRole}))
        .then((res)=>{
          const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
          res.payload.status!=200 && dispatch(createErrorLog({objError}))
          if(res.payload.status==200){
            toast.success(res.payload.data.responseMsg)
            dispatch(addEditClose(null))
          }else if(res.payload.status==202){
            toast.error(res.payload.data.responseMsg)
            dispatch(addEditCancel(null))
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
        const objRole={
          roleName,
          roleDesc,
          menuGroupId,
          addedBy:localStorage.getItem('userId')
        }
        dispatch(createSingleRole({objRole}))
        .then((res)=>{
          const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
          res.payload.status!=200 && dispatch(createErrorLog({objError}))
          if(res.payload.status==200){
            toast.success(res.payload.data.responseMsg)
            dispatch(addEditClose(null))
          }else if(res.payload.status==202){
            toast.error(res.payload.data.responseMsg)
            dispatch(addEditCancel(null))
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
        <div className="min-h-screen flex justify-center items-center" onClick={(e)=>{if(e.target==e.currentTarget){dispatch(addEditCancel(null))}}}>
          <div className="relative bg-gray-900 min-w-[400px] max-w-[900px] min-h-[450px] md:min-h-[300px] rounded-md p-6 flex flex-col text-white">
              <div className="font-bold text-xl float-left">{isEditOpen?'Edit Role':'Add Role'}</div>
              <form onSubmit={handleSubmit} className='py-6 md:space-y-6'>
                  <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6'>
                      <div className='w-full'>
                          <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Name</label>
                          <input type='text' autoComplete='off' name='roleName' value={roleName} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white focus:border-blue-600'/>
                          {roleNameError!='' && <p className='mt-2 text-sm text-red-500'>{roleNameError}</p>}
                      </div>
                      <div className='w-full'>
                          <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Parent</label>
                          <select name='menuGroupId' value={menuGroupId} onChange={onInputChange} className='w-full text-black px-1 py-2.5 md:w-[225px] rounded'>
                              <option>Select Menu Group</option>
                              {menuGroupDropdown.map((item)=>(
                                  <option key={item.menuGroupId} value={item.menuGroupId}>{item.menuGroupName}</option>
                              ))}
                          </select>
                          {menuGroupIdError!='' && <p className='mt-2 text-sm text-red-500'>{menuGroupIdError}</p>}
                      </div>
                      <div className='w-full'>
                          <label className='block'>Description</label>
                          <input type='text' autoComplete='off' name='roleDesc' value={roleDesc} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white'/>
                      </div>                                  
                  </div>                 
                  <div className="absolute bottom-3 right-5 space-x-2">
                      <button type="button" className="hover:bg-gray-600 rounded p-1 text-md font-bold" onClick={(e)=>{e.stopPropagation();dispatch(addEditCancel(null))}}>Cancel</button>
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

export default AddEditRole