import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutToggle,signOut,updateUserLog } from "../../store/features/authSlice";

const SignOut = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isSignOutOpen}=useSelector((state)=>({...state.auth}))

  const handleSignOut=(e)=>{
    e.stopPropagation()
    const logCode=localStorage.getItem('logCode')
    dispatch(updateUserLog({logCode}))
    dispatch(signOut()) 
    navigate('/')
  }
  
  return ( 
    <>
      {isSignOutOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-50">
          <div className="min-h-screen flex justify-center items-center">
            <div className="relative bg-gray-900 w-64 h-40 rounded-md p-6 flex flex-col text-white">
              <div className="font-bold text-xl">Want to leave?</div>
              <div className="text-sm text-gray-300 font-semibold mt-2">Press Signout to leave</div>
              <div className="absolute bottom-3 right-5 space-x-2">
                <button type="button" className="hover:bg-gray-600 rounded p-1 text-md font-bold" onClick={(e)=>{e.stopPropagation();dispatch(signOutToggle())}}>Stay Here</button>
                {/* <button type="button" className="hover:bg-gray-600 rounded p-1 text-md font-bold" onClick={(e)=>{e.stopPropagation(); dispatch(signOut());navigate('/') }}>Sign Out</button> */}
                <button type="button" className="hover:bg-gray-600 rounded p-1 text-md font-bold" onClick={handleSignOut}>Sign Out</button>
              </div>
            </div>           
          </div>
        </div>
      )}
    </>
    
  )
}

export default SignOut