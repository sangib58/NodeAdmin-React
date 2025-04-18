import { useState,useEffect } from 'react'
import sampleProfileImg from '../../assets/sample-profile-img.png'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { getSidebar } from '../../store/features/menuSlice'
import { createErrorLog } from '../../store/features/logSlice'

const Sidebar = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [sidebarItems,setSidebarItems]=useState([])

  const userProfileInfo=JSON.parse(localStorage.getItem('profile'))
  const profileImage=userProfileInfo.obj.imagePath!=null?process.env.APIURL+'/'+userProfileInfo.obj.imagePath:sampleProfileImg

  useEffect(()=>{
    fetchSidebar()
  },[])

  const fetchSidebar=()=>{
    let roleId=localStorage.getItem('userRoleId')
    dispatch(getSidebar({roleId}))
    .then((res)=>{
      //console.log(res)
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setSidebarItems(res.payload.data)
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
  useEffect(()=>{
    document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (item) {
      //console.log(item)
      item.addEventListener('click', (e)=> {      
        e.preventDefault()
        const parent = item.closest('.group')   
        if (parent.classList.contains('selected')) {
            parent.classList.remove('selected')
        } else {
            document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (i) {
              i.closest('.group').classList.remove('selected')
            })
            parent.classList.add('selected')
        }
      })
    })
  },[sidebarItems])

  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-40 transition-transform sidebar-menu">
        <div href="#" className="flex items-center pb-4 border-b border-b-gray-800">
          <img
            src={profileImage}
            alt="Profile Image"
            className="size-12 rounded-full object-cover"
          />
          <div className='flex flex-col ml-3'>
            <span className="text-sm font-bold text-white">{userProfileInfo.obj.fullName}</span>
            <span className='text-xs font-semibold text-white'>{userProfileInfo.obj.roleName}</span>
          </div>         
        </div>
        <ul className='mt-4'>
          {sidebarItems.map((menu)=>(
            <li key={menu.id} className={`mb-1 group ${menu.isActive ? 'active':''}`}>
              <NavLink to={menu.route!=''?menu.route:''} className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 ${menu.childItems.length>0 && 'sidebar-dropdown-toggle'} ${menu.childItems.length==0 && 'parent'}`}>
                <i className={`${menu.icon} mr-3 text-lg`}></i>
                <span className='text-sm'>{menu.title}</span>
                {menu.childItems.length>0 && <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>}
              </NavLink>
              {menu.childItems.length>0 && (
                <ul className='pl-7 mt-2 hidden group-[.selected]:block'>
                  {menu.childItems.map((child)=>(
                    <li key={child.id} className="mb-4">
                      <NavLink 
                        to={child.route}                     
                        className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 child"
                      >
                        {child.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-30 md:hidden sidebar-overlay"></div>
    </>
  );
}

export default Sidebar