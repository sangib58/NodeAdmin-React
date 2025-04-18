import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import AddEditMenu from './AddEditMenu'
import DeleteMenu from './DeleteMenu'
import Spinner from '../common/Spinner'
import { getAllMenu,deleteMenuOpen,editMenuOpen,addMenuOpen } from '../../store/features/menuSlice'
import { createErrorLog } from '../../store/features/logSlice'

const MenuTable = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [allMenu,setAllMenu]=useState([])
  const {isAddOpen,isEditOpen,isDeleteOpen,isReload,loading}=useSelector((state)=>({...state.menu}))

  useEffect(()=>{
    fetchMenu()
  },[])

  useEffect(()=>{
    if(isReload){
      fetchMenu()
    }
  },[isReload])

  const fetchMenu=()=>{
    dispatch(getAllMenu())
    .then((res)=>{
      //console.log(res)
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setAllMenu(res.payload.data.data)
      }else if(res.payload.status==401){
        navigate('/unauthorize')
      }else if(res.payload.status==403){
        navigate('/forbidden')
      }else{
        navigate('/unexpected')
      }   
    })
    .catch((error)=>{
      console.log('error',error)
    })
  }

  const [currentPage,setCurrentPage]=useState(1)
  const recordsPerpage=5
  const numberOfPages=Math.ceil(allMenu.length / recordsPerpage)
  const lastIndex=recordsPerpage * currentPage
  const firstIndex=lastIndex - recordsPerpage
  const records=allMenu.slice(firstIndex,lastIndex)
  const numbers=[...Array(numberOfPages+1).keys()].slice(1)

  const handlePreviousPage=()=>{
    if(currentPage!==1){
      setCurrentPage(currentPage-1)
    }
  }
  const handleNextPage=()=>{
    if(currentPage!==numberOfPages){
      setCurrentPage(currentPage+1)
    }
  }
  const handleChangePage=(pageNumber)=>{       
    setCurrentPage(pageNumber)         
  }

  return (
    <>
      <div className='flex justify-end'>
        <button type='button' className='px-3 py-2 my-2 bg-gray-900 text-white font-bold rounded' onClick={()=>dispatch(addMenuOpen(null))}>Add Menu</button>
      </div>
      <div className='overflow-x-scroll'>
        <table className='min-w-full divide-y divide-gray-700 border-b border-gray-700'>
            <caption className='caption-top text-lg pb-2 font-semibold'>
              Application Menu 
            </caption>
            <thead>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Menu Title</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>URL</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Is Sub Menu?</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Order No.</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Icon Class</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Parent</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {records.map((item,i)=>(
                <tr key={i}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.menuTitle}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.url}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.isSubMenu==1?"Yes":"No"}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.sortOrder}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.iconClass}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.parentMenuName==null?"Root":item.parentMenuName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>
                    <div className='flex space-x-2'>
                      <span className='cursor-pointer'><i className="ri-pencil-line" onClick={()=>dispatch(editMenuOpen(item.menuID))}></i></span>
                      <span className='cursor-pointer'><i className="ri-delete-bin-6-line" onClick={()=>dispatch(deleteMenuOpen(item.menuID))}></i></span>
                    </div>
                  </td>                         
                </tr>
              ))}
            </tbody>
        </table>
        <div className=''>
          <ul className='flex float-end gap-2 mt-4'>
            <li className='border border-gray-900 px-2 rounded'>
              <a href="#" onClick={handlePreviousPage}>Prev</a>
            </li>
            {numbers.map((pageNumber,i)=>(
              <li key={i} onClick={()=>handleChangePage(pageNumber)} className={`rounded border border-gray-900 px-2 ${pageNumber==currentPage?'bg-gray-900 text-white':''}`}>
                <a href="#">{pageNumber}</a>
              </li>
            ))}
            <li className='border border-gray-900 px-2 rounded'>
              <a href="#" onClick={handleNextPage}>Next</a>
            </li>
          </ul>
        </div>
      </div>
      {loading && <Spinner/>}
      {isDeleteOpen && <DeleteMenu/>}
      {(isAddOpen || isEditOpen) && <AddEditMenu/>}
    </>
      
  )
}

export default MenuTable