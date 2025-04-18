import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom"
import Spinner from '../common/Spinner'
import { updateSingleUser,createSingleUser,getUserRole,getSingleUser,uploadImage,addEditCancel,addEditClose} from '../../store/features/userSlice'
import { createErrorLog } from '../../store/features/logSlice'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const AddEditUser = () => {
  const initialState={
    userId:null,
    userRoleId:'',
    password:'',
    email:'',
    mobile:'',
    dateOfBirth:'',
    fullName:'',
    imagePath:'',
  }
  const initialErrorState={
    userRoleIdError:'',
    passwordError:'',
    emailError:'',
    fullNameError:'',
  }
  const [userForm,setUserForm]=useState(initialState)
  const [errors,setErrors]=useState(initialErrorState)
  const [userRole,setUserRole]=useState([])
  const [inputDate,setInputDate]=useState(null)
  const [showImage,setShowImage]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isAddOpen,isEditOpen,editId,loading}=useSelector((state)=>({...state.user}))
  const {userId,userRoleId,password,email,mobile,dateOfBirth,fullName,imagePath}=userForm
  const {userRoleIdError,passwordError,emailError,fullNameError}=errors

  useEffect(()=>{
    dispatch(getUserRole())
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setUserRole(res.payload.data)
        isEditOpen && fetchSingleUser()
      }else if(res.payload.status==401){
        navigate('/unauthorize')
      }else if(res.payload.status==403){
        navigate('/forbidden')
      }else{
        navigate('/unexpected')
      }
    })     
  },[])

  const fetchSingleUser=()=>{
    dispatch(getSingleUser({editId}))
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setUserForm(res.payload.data)
        res.payload.data.dateOfBirth!=null && setInputDate(new Date(res.payload.data.dateOfBirth).toLocaleDateString('en-CA'))
        res.payload.data.imagePath!=null && setShowImage(process.env.APIURL+'/'+res.payload.data.imagePath)
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
    setUserForm({ ...userForm, [name]:value })
    if(e.target.name=='fullName')userForm.fullName=value
    else if(e.target.name=='userRoleId')userForm.userRoleId=value
    else if(e.target.name=='email')userForm.email=value
    else if(e.target.name=='password')userForm.password=value
    validateUser()
  }

  const validateUser=()=>{
    const newErrors={}
    if(userForm.fullName.trim().length<=3){
      newErrors.fullName='Minimum 4 character required'
    }
    if(userForm.userRoleId==='' || userForm.userRoleId=='Select Role'){
      newErrors.userRoleId='Role required'
    }
    if(userForm.email.trim().length==0){
      newErrors.email='Email is required'
    }else if(!/\S+@\S+\.\S+/.test(userForm.email.trim())){
      newErrors.email='Email must be valid'
    }
    if(userForm.password.trim().length<=5){
      newErrors.password='Minimum 6 character required'
    }
    
    setErrors({fullNameError:newErrors.fullName,userRoleIdError:newErrors.userRoleId,emailError:newErrors.email,passwordError:newErrors.password})
    return newErrors
  }

  const onProfileImageChange=(e)=>{
    let files=e.target.files
    let objFormData=new FormData()
    objFormData.append('image',files[0])
    dispatch(uploadImage({objFormData}))
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setUserForm({...userForm,imagePath:res.payload.data.dbPath})
      }else if(res.payload.status==401){
        navigate('/unauthorize')
      }else if(res.payload.status==403){
        navigate('/forbidden')
      }else{
        navigate('/unexpected')
      }     
    })
    
    let reader=new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload=(e)=>{
      setShowImage(e.target.result)
    }
  }

  const onInputDateChange=(date)=>{
    //setInputDate(date)
    setInputDate(date.toLocaleDateString('en-CA'))
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const newErrors=validateUser()
    if(Object.keys(newErrors).length==0){
      if(isEditOpen){
        const objUser={
          userId,
          userRoleId,       
          password,
          email,
          mobile,
          fullName,
          imagePath,
          dateOfBirth:inputDate,
          lastUpdatedBy:localStorage.getItem('userId')
        }
        dispatch(updateSingleUser({objUser}))
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
        const objUser={
          userRoleId,       
          password,
          email,
          mobile,
          fullName,
          imagePath,
          dateOfBirth:inputDate,
          addedBy:localStorage.getItem('userId')
        }
        dispatch(createSingleUser({objUser}))
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
          <div className="relative flex flex-col overflow-y-auto bg-gray-900 min-w-[400px] max-w-[900px] h-auto md:min-h-[500px] rounded-md p-6 text-white">
            <div className="font-bold text-xl float-left">{isEditOpen?'Edit User':'Add User'}</div>
            <form onSubmit={handleSubmit} className='py-6 md:space-y-6'>
              <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6'>
                <div className='w-full'>
                  <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Name</label>
                  <input type='text' autoComplete='off' name='fullName' value={fullName} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white focus:border-blue-600'/>
                  {fullNameError!='' && <p className='mt-2 text-sm text-red-500'>{fullNameError}</p>}
                </div>
                <div className='w-full'>
                  <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Role</label>
                  <select name='userRoleId' value={userRoleId} onChange={onInputChange} className='w-full text-black px-1 py-2.5 md:w-[225px] rounded focus:border-blue-600'>
                    <option>Select Role</option>
                    {userRole.map((item)=>(
                      <option key={item.userRoleId} value={item.userRoleId}>{item.roleName}</option>
                    ))}
                  </select>
                  {userRoleIdError!='' && <p className='mt-2 text-sm text-red-500'>{userRoleIdError}</p>}
                </div>
                <div className='w-full'>
                  <label className='block'>Mobile</label>
                  <input type='text' autoComplete='off' name='mobile' value={mobile} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white'/>
                </div>                                  
              </div>
              <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6'>
                <div className='w-full'>
                  <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Email</label>
                  <input type='text' autoComplete='off' name='email' value={email} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white focus:border-blue-600'/>
                  {emailError!='' && <p className='mt-2 text-sm text-red-500'>{emailError}</p>}
                </div>
                {isAddOpen && 
                <div className='w-full'>
                  <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Password</label>
                  <input type='password' name='password' value={password} onChange={onInputChange} className='w-full outline-none text-black px-1 py-2 rounded border border-white focus:border-blue-600'/>
                  {passwordError!='' && <p className='mt-2 text-sm text-red-500'>{passwordError}</p>}
                </div>}
                <div className='w-full'>
                  <label className='block'>Date of Birth</label>
                  <DatePicker 
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" 
                    dateFormat='yyyy-MM-dd' 
                    selected={inputDate} 
                    onChange={onInputDateChange} 
                    autoComplete='off'
                    className={`w-[360px] ${isAddOpen && 'md:w-full'} outline-none text-black px-1 py-2 rounded border border-white`}/>
                </div>
              </div>
              <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6'>             
                <div className='w-full'>
                  <label className='block'>Profile Picture</label>
                  <input type='file' accept='image/*' onChange={onProfileImageChange} className='w-full md:w-[225px] outline-none text-black px-1 py-2 rounded border border-white'/>
                </div>
                {showImage!=null && 
                <div className='w-full'>
                  <img src={showImage} className='size-28 rounded-full' />
                </div>}
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

export default AddEditUser