import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllMenuForAssign,assignNewMenu,assignMenuCancel } from "../../store/features/menuSlice"
import { createErrorLog } from '../../store/features/logSlice'
import { toast } from 'react-toastify'

const AssignMenu = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [allMenu,setAllMenu]=useState([])
  const {menuGroupId}=useSelector((state)=>({...state.menu}))

  useEffect(()=>{
    fetchAllMenu()
  },[])

  const fetchAllMenu=()=>{
    dispatch(getAllMenuForAssign({menuGroupId}))
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setAllMenu(res.payload.data)
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
    document.querySelectorAll('.sidebar-menu-toggle').forEach(function (item) {
      item.addEventListener('click', (e)=> {      
        e.preventDefault()
        const parent = item.closest('.group')   
        if (parent.classList.contains('selected')) {
          parent.classList.remove('selected')
        } else {
          document.querySelectorAll('.sidebar-menu-toggle').forEach(function (i) {
            i.closest('.group').classList.remove('selected')
          })
          parent.classList.add('selected')
        }
      })
    })
  },[allMenu])

  const handleMenuAssignClose=(e)=>{
    if(e.target===e.currentTarget){
      dispatch(assignMenuCancel(null))
    }
  }

  const onCkeckboxChange=(e)=>{
    const objMenu={
      menuId:parseInt(e.target.name),
      menuGroupId:menuGroupId,
      isSelected:e.target.checked,
      addedBy:parseInt(localStorage.getItem('userId')),
    }
    dispatch(assignNewMenu({objMenu}))
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        toast.success(res.payload.data.responseMsg)
      }else if(res.payload.status==202){
        toast.error(res.payload.data.responseMsg)
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
  return (
    <div className="fixed top-0 left-0 w-full h-auto bg-black/20 z-50">
      <div className="min-h-screen flex justify-center items-center" onClick={handleMenuAssignClose}>
        <div className="relative bg-gray-900 w-[600px] h-auto rounded-md p-6 flex flex-col" >
          <ul>
            {allMenu.map((menu)=>(
              <li key={menu.id} className='mb-1 group'>
                <div className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 ${menu.children.length>0 && 'sidebar-menu-toggle'}`}>
                  <span className='text-sm'>{menu.title}</span>
                  {menu.children.length>0 && <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>}
                  {menu.children.length==0 && <input type="checkbox" name={menu.id} defaultChecked={menu.isParentSelected} onChange={onCkeckboxChange} className="ml-auto cursor-pointer" />}
                </div>
                {menu.children.length>0 && (
                  <ul className='pl-7 mt-2 hidden group-[.selected]:block'>
                    {menu.children.map((child)=>(
                      <li key={child.id} className="mb-4">
                        <div className="flex items-center pr-4">
                          <span                     
                            className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 child"
                          >
                            {child.title}
                          </span>
                          <input type="checkbox" name={child.id} defaultChecked={child.isSelected} onChange={onCkeckboxChange} className="ml-auto cursor-pointer" />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>           
      </div>
    </div>
  )
}

export default AssignMenu