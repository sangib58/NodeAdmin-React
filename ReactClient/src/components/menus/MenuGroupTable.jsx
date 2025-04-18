import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import AddEditMenuGroup from './AddEditMenuGroup'
import DeleteMenuGroup from './DeleteMenuGroup'
import Spinner from '../common/Spinner'
import AssignMenu from './AssignMenu'

import { getMenuGroup,deleteMenuOpen,editMenuOpen,addMenuOpen,assignMenuOpen } from '../../store/features/menuSlice'
import { createErrorLog } from '../../store/features/logSlice'

const MenuGroupTable = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [allMenuGroup,setAllMenuGroup]=useState([])
  const {isAddOpen,isEditOpen,isDeleteOpen,isMenuAssignOpen,isReload,loading}=useSelector((state)=>({...state.menu}))

  useEffect(()=>{
    fetchMenuGroup()
  },[])

  useEffect(()=>{
    if(isReload){
      fetchMenuGroup()
    }
  },[isReload])

  const fetchMenuGroup=()=>{
    dispatch(getMenuGroup())
    .then((res)=>{
      //console.log(res.payload.data.data)
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setAllMenuGroup(res.payload.data.data)
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

  const [currentPage,setCurrentPage]=useState(1)
  const recordsPerpage=5
  const numberOfPages=Math.ceil(allMenuGroup.length / recordsPerpage)
  const lastIndex=recordsPerpage * currentPage
  const firstIndex=lastIndex - recordsPerpage
  const records=allMenuGroup.slice(firstIndex,lastIndex)
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
        <button type='button' className='px-3 py-2 my-2 bg-gray-900 text-white font-bold rounded' onClick={()=>dispatch(addMenuOpen(null))}>Add Menu Group</button>
      </div>
      <div className='overflow-x-scroll'>
        <table className='min-w-full divide-y divide-gray-700 border-b border-gray-700'>
            <caption className='caption-top text-lg pb-2 font-semibold'>
              Application Menu Group 
            </caption>
            <thead>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Menu Title</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {records.map((item,i)=>(
                <tr key={i}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.menuGroupName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>
                    <div className='flex space-x-2'>
                      <span className='cursor-pointer'><i className="ri-pencil-line" onClick={()=>dispatch(editMenuOpen(item.menuGroupId))}></i></span>
                      <span className='cursor-pointer'><i className="ri-delete-bin-6-line" onClick={()=>dispatch(deleteMenuOpen(item.menuGroupId))}></i></span>
                      <span className='cursor-pointer'><i className="ri-menu-line" onClick={()=>dispatch(assignMenuOpen(item.menuGroupId))}></i></span>
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
      {isDeleteOpen && <DeleteMenuGroup/>}
      {(isAddOpen || isEditOpen) && <AddEditMenuGroup/>}
      {isMenuAssignOpen && <AssignMenu/>}
    </>
  )
}

export default MenuGroupTable