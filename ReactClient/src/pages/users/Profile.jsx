import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { getSingleUser,uploadImage,updateUserProfile } from '../../store/features/userSlice'
import Spinner from '../../components/common/Spinner'
import MetaTags from '../../components/common/MetaTags'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const Profile = () => {
  const initialState={
    email:'',
    mobile:'',
    dateOfBirth:'',
    fullName:'',
    imagePath:'',
  }
  const initialErrorState={
    emailError:'',
    fullNameError:''
  }
  const [profileForm,setProfileForm]=useState(initialState)
  const [errors,setErrors]=useState(initialErrorState)
  const [inputDate,setInputDate]=useState(null)
  const [showImage,setShowImage]=useState('')
  const {fullName,email,mobile,imagePath}=profileForm
  const {emailError,fullNameError}=errors
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading}=useSelector((state)=>({...state.user}))
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))

  useEffect(()=>{
    fetchSingleUser()
  },[])

  const fetchSingleUser=()=>{
    let editId=localStorage.getItem('userId')
    dispatch(getSingleUser({editId}))
    .then((res)=>{
      if(res.payload.status==200){
        setProfileForm(res.payload.data)
        res.payload.data.dateOfBirth!=null && setInputDate(new Date(res.payload.data.dateOfBirth).toLocaleDateString('en-CA'))
        res.payload.data.imagePath!=null && setShowImage(process.env.APIURL+'/'+res.payload.data.imagePath)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const onInputChange=(e)=>{
    let {name,value}=e.target 
    setProfileForm({...profileForm,[name]:value})
    if(e.target.name=='fullName')profileForm.fullName=value
    else if(e.target.name=='email')profileForm.email=value
    validateProfile()
  }

  const validateProfile=()=>{
    const newErrors={}
    if(profileForm.fullName.trim().length<=3){
      newErrors.fullName='Length must be greater than or equal to 4 characters'
    }
    if(profileForm.email.trim().length==0){
      newErrors.email='Email is required'
    }else if(!/\S+@\S+\.\S+/.test(profileForm.email.trim())){
      newErrors.email='Email must be valid'
    }
    setErrors({fullNameError:newErrors.fullName,emailError:newErrors.email})
    return newErrors
  }

  const onInputDateChange=(date)=>{
    setInputDate(date.toLocaleDateString('en-CA'))
  }

  const onProfileImageChange=(e)=>{
    let files=e.target.files
    let objFormData=new FormData()
    objFormData.append('image',files[0])
    dispatch(uploadImage({objFormData}))
    .then((res)=>{
      //console.log(res.payload.data.dbPath)
      if(res.payload.status==200){
        setProfileForm({...profileForm,imagePath:res.payload.data.dbPath})
      }     
    })
    let reader=new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload=(e)=>{
      setShowImage(e.target.result)
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const newErrors=validateProfile()
    if(Object.keys(newErrors).length==0){
      const objUser={
        userId:localStorage.getItem('userId'),
        email,
        mobile,
        fullName,
        imagePath,
        dateOfBirth:inputDate,
        lastUpdatedBy:localStorage.getItem('userId')
      }
      dispatch(updateUserProfile({objUser}))
      .then((res)=>{
        if(res.payload.status==200){
          toast.success(res.payload.data.responseMsg)
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

  return (
    <>
      <div className='px-2 py-4'>
        <MetaTags
          title={`${appInitialData.siteTitle} | Profile`}
          image={process.env.APIURL+'/'+appInitialData.faviconPath}
        />
        <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
          <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4'>
            <div className='w-full'>
              <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700">Name</label>
              <input autoComplete='off' type="text" value={fullName} name='fullName' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full focus:border-blue-600"/>
              {fullNameError!='' && <p className='mt-2 text-sm text-red-500'>{fullNameError}</p>}
            </div>
            <div className='w-full'>
              <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700">Email</label>
              <input autoComplete='off' type="text" value={email} name='email' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full focus:border-blue-600"/>
              {emailError!='' && <p className='mt-2 text-sm text-red-500'>{emailError}</p>}
            </div>
          </div>  
          <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4'>
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input autoComplete='off' type="text" value={mobile} name='mobile' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
            </div>
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700">Date of Birth </label>
              <DatePicker
                disabledKeyboardNavigation
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" 
                autoComplete='off' 
                dateFormat='yyyy-MM-dd' 
                selected={inputDate} 
                onChange={onInputDateChange} 
                className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"
              />
            </div>
          </div>
          <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4'>
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700">Profile Picture </label>
              <input type='file' accept='image/*' onChange={onProfileImageChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'/>
            </div>
            {showImage!='' && 
            <div className='w-full'>
              <img src={showImage} className='size-28 rounded-full' />
            </div>} 
          </div>  
          <div className='pb-10'>
            <button type='submit' className='px-4 py-1.5 bg-gray-900 text-white font-bold rounded'>Change</button>
          </div>             
        </form>    
      </div>
      {loading && <Spinner/>}
    </>
  )
}

export default Profile