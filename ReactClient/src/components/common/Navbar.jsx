import { useEffect,useState } from "react";
import { Link } from "react-router-dom"
import { signOutToggle,screenLockToggle,updateUserLog } from "../../store/features/authSlice"
import { togglePersonalize,toggleNotification,getUserNotification } from "../../store/features/userSlice"
import { createErrorLog } from '../../store/features/logSlice'
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
  const {isPersonalizeOpen,isNotificationOpen}=useSelector((state)=>({...state.user}))
  const [notification,setNotification]=useState({})
  const dispatch=useDispatch()
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))

  useEffect(()=>{
    fetchNotification()
  },[])

  const fetchNotification=()=>{
    let userId=localStorage.getItem('userId')
    dispatch(getUserNotification({userId}))
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setNotification(res.payload.data)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const handlePersonalize=(e)=>{
    e.stopPropagation()
    dispatch(togglePersonalize())
  }
  const handleNotification=(e)=>{
    e.stopPropagation()
    dispatch(toggleNotification())
  }
  const handleSignOut=()=>{
    const logCode=localStorage.getItem('logCode')
    dispatch(updateUserLog({logCode}))
    dispatch(signOutToggle())
  }

  return (
    <>
      <nav className='sticky flex items-center justify-between py-2 px-2 bg-white shadow-lg shadow-black/20 top-0 left-0 z-30'>
        <button type="button" className="text-xl text-gray-950 sidebar-toggle">
          <i className="ri-menu-line text-xl"></i>
        </button>
        <div className="flex space-x-8 text-xl">
          <button onClick={()=>dispatch(screenLockToggle())} className="hover:bg-ultra-light-gray rounded-md px-2 py-1 mb-1"><i className="ri-lock-password-fill"></i></button>
          <div className="flex flex-col" onClick={handleNotification}>
            <button className="hover:bg-ultra-light-gray px-2 py-1 rounded-md"><i className="ri-notification-3-fill"></i><span className="absolute top-1 right-[210px] text-white bg-blue-600 text-sm font-semibold px-[6px] py-1 rounded-full">{notification.recordsTotal}</span></button>
            {isNotificationOpen && notification.recordsTotal>0 &&
            <div className="absolute top-11 right-0 bg-white shadow-2xl rounded-md shadow-black/70 overflow-y-scroll max-h-64 space-y-1 py-2 px-2">
              {notification.data.map((item,i)=>(
                <div className="text-gray-700 font-medium text-lg odd:bg-white even:bg-slate-50" key={i}><i className="ri-arrow-right-fill"></i> LogIn Time: {item.logInTime} IP: {item.ip} Browser: {item.browser} Platform: {item.platform}</div>
              ))}
            </div>
            }
          </div>         
                                       
          <div className="flex flex-col space-y-0">
            <button className="hover:bg-ultra-light-gray focus:bg-ultra-light-gray p-1 rounded-md" onClick={handlePersonalize}><i className="ri-arrow-down-s-line pr-1"></i><span className="text-[15px] font-semibold">Personalize</span></button>
            {isPersonalizeOpen && 
            <div className="absolute flex rounded-md shadow-md shadow-black/20 bg-white w-[120px] flex-col space-y-2 top-12 right-18 pb-[2px] font-semibold text-sm">
              <Link className="hover:bg-ultra-light-gray hover:rounded-md py-2 text-center" to="/change-password" onClick={handlePersonalize}>Password</Link>
              <Link className="hover:bg-ultra-light-gray hover:rounded-md py-2 text-center" to="/profile" onClick={handlePersonalize}>Profile</Link>             
              {localStorage.getItem('userRoleId')!=1 && appInitialData.allowFaq==true && <Link className="hover:bg-ultra-light-gray hover:rounded-md py-2 text-center" to="/display-faq">Faq</Link>}             
            </div>
            }
          </div>
          
          <button onClick={handleSignOut} className="hover:bg-ultra-light-gray px-2 py-1 rounded-md">
            <i className="ri-login-box-line text-2xl"></i>
          </button>
        </div>     
      </nav>    
    </>  
  )
}

export default Navbar