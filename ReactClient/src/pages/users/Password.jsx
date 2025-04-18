import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { updateUserPassword } from '../../store/features/userSlice'
import MetaTags from '../../components/common/MetaTags'

const Password = () => {
    const initialState={
        newPassword:'',
        confirmNewPassword:''
    }
    const initialErrorState={
        newPasswordError:'',
        confirmNewPasswordError:''
    }
    const [changePasswordForm,setChangePasswordForm]=useState(initialState)
    const [errors,setErrors]=useState(initialErrorState)
    const {newPassword,confirmNewPassword}=changePasswordForm
    const {newPasswordError,confirmNewPasswordError}=errors
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const appInitialData=JSON.parse(localStorage.getItem('appSettings'))

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
            if(newPassword !==confirmNewPassword){
                toast.error('Password not matched with Confirm New Password!')
            }else{
                const objUser={
                    userId:localStorage.getItem('userId'),
                    password:newPassword
                }
                dispatch(updateUserPassword({objUser}))
                .then((res)=>{
                    if(res.payload.status==200){
                        toast.success(res.payload.data.responseMsg)
                        setChangePasswordForm(initialState)
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
        <div className='px-2 py-4'>
            <MetaTags
                title={`${appInitialData.siteTitle} | Change Password`}
                image={process.env.APIURL+'/'+appInitialData.faviconPath}
            />
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                    <div className='w-full'>
                        <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" value={newPassword} name='newPassword' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full focus:border-blue-600"/>
                        {newPasswordError!='' && <p className='mt-2 text-sm text-red-500'>{newPasswordError}</p>}
                    </div>
                    <div className='w-full'>
                        <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" value={confirmNewPassword} name='confirmNewPassword' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full focus:border-blue-600"/>
                        {confirmNewPasswordError!='' && <p className='mt-2 text-sm text-red-500'>{confirmNewPasswordError}</p>}
                    </div>
                </div>  
                <button type='submit' className='w-28 px-4 py-1.5 bg-gray-900 text-white font-bold rounded'>Change</button>             
            </form>
        </div>
    )
}

export default Password