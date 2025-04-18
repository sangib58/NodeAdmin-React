import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { closeNotificationAndPersonalizeMenu } from "../store/features/userSlice";
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from "../components/common/Sidebar"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import SignOut from "../components/common/SignOut"
import ScreenLock from "../components/common/ScreenLock";



const RootLayout = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    const sidebarMenu=document.querySelector('.sidebar-menu')
    const sidebarOverlay=document.querySelector('.sidebar-overlay')
    const main=document.querySelector('.main')
    const sidebarToggle=document.querySelector('.sidebar-toggle')

    if(window.innerWidth < 768) {
      main.classList.toggle('active')
      sidebarOverlay.classList.toggle('hidden')
      sidebarMenu.classList.toggle('-translate-x-full')
    }
    sidebarToggle.addEventListener('click', (e)=> {
      e.preventDefault()
      main.classList.toggle('active')
      sidebarOverlay.classList.toggle('hidden')
      sidebarMenu.classList.toggle('-translate-x-full')
    })
    sidebarOverlay.addEventListener('click', (e)=> {
      e.preventDefault()
      main.classList.toggle('active')
      sidebarOverlay.classList.toggle('hidden')
      sidebarMenu.classList.toggle('-translate-x-full')
    })
  },[])

  const handleMenus=()=>{
    dispatch(closeNotificationAndPersonalizeMenu())
  }

  return (
    <div onClick={handleMenus}>
      <Sidebar/>
      <main className="relative w-full md:w-[calc(100%-256px)] md:ml-64 transition-all min-h-screen main">
        <Navbar/>       
        <Outlet/>
        <Footer/>
        <ToastContainer/>
        <SignOut/>
        <ScreenLock/>
      </main>      
    </div>
  )
}

export default RootLayout