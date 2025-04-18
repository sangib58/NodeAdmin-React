import { useState,useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ToastContainer } from "react-toastify"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getSingleUserByHash,updateUserPassword } from "../../store/features/userSlice"
import MetaTags from "../../components/common/MetaTags"
import favicon from '../../assets/vue-admin-logo.png'

const Forget_Password = () => {
    const initialState={
        userId:null,
        email:'',
        fullName:'',
    }
    const passwordState={       
        newPassword:'',
        confirmNewPassword:''
    }
    const initialErrorState={
        newPasswordError:'',
        confirmNewPasswordError:''
    }

    const [initialData,setInitialData]=useState(initialState)
    const [changePasswordForm,setChangePasswordForm]=useState(passwordState)
    const [errors,setErrors]=useState(initialErrorState)
    const {userId,fullName,email}=initialData
    const {newPassword,confirmNewPassword}=changePasswordForm
    const {newPasswordError,confirmNewPasswordError}=errors
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const params=useParams()

    useEffect(()=>{
        fetchUserInfo()
    },[])

    const fetchUserInfo=()=>{
        const hash=params.hash
        dispatch(getSingleUserByHash({hash}))
        .then((res)=>{
            if(res.payload.status==200){
                setInitialData(res.payload.data)
            }else{
                toast.error('You are not allowed to reset password!')
                navigate('/')
            }
        })
        .catch((error)=>{
            console.log(error)
            navigate('/')
        })
    }

    const onInputChange=(e)=>{
        let {name,value}=e.target 
        setChangePasswordForm({...changePasswordForm,[name]:value})
        if(e.target.name=='newPassword')changePasswordForm.newPassword=value
        else if(e.target.name=='confirmNewPassword')changePasswordForm.confirmNewPassword=value
        validatePassword()
    }

    const validatePassword=()=>{
        const newErrors={}
        if(changePasswordForm.newPassword.trim().length<=5){
            newErrors.newPassword='Length must be greater than or equal to 6 characters'
        }
        if(changePasswordForm.confirmNewPassword.trim().length<=5){
            newErrors.confirmNewPassword='Length must be greater than or equal to 6 characters'
        }
        
        setErrors({newPasswordError:newErrors.newPassword,confirmNewPasswordError:newErrors.confirmNewPassword})
        return newErrors
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const newErrors=validatePassword()
        if(Object.keys(newErrors).length==0){            
            if(newPassword !== confirmNewPassword){
                toast.error('New Password not matched with Confirm New Password!')
            }else{
                const objUser={
                    userId:userId,
                    password:newPassword
                }
                dispatch(updateUserPassword({objUser}))
                .then((res)=>{
                    if(res.payload.status==200){
                        setChangePasswordForm(passwordState)
                        toast.success(res.payload.data.responseMsg)
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
        <div className='container mx-auto flex flex-col py-12 px-2 max-w-[500px] space-y-6'>
            <MetaTags
                title='Forget Password'
                image={favicon}
            />
            <div className='flex flex-col items-center space-y-2'>
                <img src={favicon} onClick={()=>navigate('/')} className='size-12 cursor-pointer' alt="Site Logo"/>
                <p className='text-2xl font-bold'>Reset Password</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <div>{fullName}</div>
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div>{email}</div>
                </div>              
                <div className="w-full">
                    <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" value={newPassword} name='newPassword' onChange={onInputChange} className="w-full outline-none border-b border-gray-300 text-gray-600 text-md focus:border-blue-600" />
                    {newPasswordError!='' && <p className='mt-2 text-sm text-red-500'>{newPasswordError}</p>}
                </div>
                <div className="w-full">
                    <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" value={confirmNewPassword} name='confirmNewPassword' onChange={onInputChange} className="w-full outline-none border-b border-gray-300 text-gray-600 text-md focus:border-blue-600" />
                    {confirmNewPasswordError!='' && <p className='mt-2 text-sm text-red-500'>{confirmNewPasswordError}</p>}
                </div>
                <div><button type='submit' className='w-28 px-3 py-1.5 bg-gray-900 text-white font-bold rounded'>Reset</button></div>        
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Forget_Password