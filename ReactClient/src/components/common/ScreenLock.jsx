import { useState } from "react"
import sampleProfileImg from '../../assets/sample-profile-img.png'
import { screenLockToggle,login } from "../../store/features/authSlice"
import { useSelector,useDispatch } from "react-redux"
import { toast } from 'react-toastify'

const ScreenLock = () => {
    const dispatch=useDispatch()
    const [inputPassword,setInputPassword]=useState('')
    const {isScreenLockOpen}=useSelector((state)=>({...state.auth}))
    const userProfileInfo=JSON.parse(localStorage.getItem('profile'))
    const profileImage=userProfileInfo.obj.imagePath!=null?process.env.APIURL+'/'+userProfileInfo.obj.imagePath:sampleProfileImg
    const onInputChange=(e)=>{
        setInputPassword(e.target.value)
    }

    const handleUserLock=()=>{
        const signInForm={
            email:userProfileInfo.obj.email,
            password:inputPassword
        }
        dispatch(login({signInForm}))
        .then((res)=>{
            if(res.payload.status==200){
                dispatch(screenLockToggle())
            }
            else if(res.payload.status==202){
                toast.error(res.payload.data.responseMsg)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    } 
    return (
        <>
            {isScreenLockOpen &&
                <div className='fixed left-0 top-0 w-full h-full bg-black/90 z-50'>
                    <div className="min-h-screen flex flex-col space-y-2 items-center justify-center">
                        <img src={profileImage} className="size-16 rounded-full"/>
                        <input type="password" onChange={onInputChange} placeholder="Type Password" className="bg-black/90 border border-white py-2 px-3 text-md text-white placeholder-white rounded-md" />
                        <button onClick={handleUserLock}><i className="ri-door-open-line text-2xl text-white"></i></button>
                    </div>
                </div>
            }
        </>
    )
}

export default ScreenLock