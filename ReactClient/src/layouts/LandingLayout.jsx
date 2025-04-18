import { useEffect, useState } from 'react'
import LandingPage from '../pages/singin/LandingPage'
import { signOut } from '../store/features/authSlice'
import { getAppSetting } from '../store/features/settingSlice'
import { useDispatch,useSelector } from "react-redux";
import Navbar from "../components/landing/Navbar"
import Sidebar from "../components/landing/Sidebar"
import Spinner from '../components/common/Spinner';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const LandingLayout = () => {
  const [initialData,setInitialData]=useState({})
  const dispatch=useDispatch()
  const {loading}=useSelector((state)=>state.setting)
  const homeUrl=window.location.origin+'/#home'
  const featureUrl=window.location.origin+'/#feature'
  const contactUrl=window.location.origin+'/#contact'

  useEffect(()=>{
    dispatch(signOut())
    fetchAllSettings()
  },[])

  const fetchAllSettings=()=>{
    dispatch(getAppSetting())
    .then((res)=>{
      if(res.payload.status==200){
        setInitialData(res.payload.data)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return (
    <>
      <Sidebar settings={{initialData,homeUrl,featureUrl,contactUrl}}/>
      <main className="z-30">
        <Navbar settings={{initialData,homeUrl,featureUrl,contactUrl}}/>       
        {<LandingPage settings={initialData}/>}    
        <ToastContainer/>
        {loading && <Spinner/>}
      </main>                
    </>
  )
}

export default LandingLayout