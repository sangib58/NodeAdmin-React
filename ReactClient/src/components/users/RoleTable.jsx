import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddEditRole from './AddEditRole'
import DeleteRole from './DeleteRole'
import Spinner from '../common/Spinner'
import { getUserRole,deleteOpen,editOpen,addOpen } from '../../store/features/userSlice'
import { createErrorLog } from '../../store/features/logSlice'

const RoleTable = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [allRole,setAllRole]=useState([])
  const {isAddOpen,isEditOpen,isDeleteOpen,isReload,loading}=useSelector((state)=>({...state.user}))

  useEffect(()=>{
    fetchRole()
  },[])

  useEffect(()=>{
    if(isReload){
      fetchRole()
    }
  },[isReload])

  const fetchRole=()=>{
    dispatch(getUserRole())
    .then((res)=>{
      //console.log(res)
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setAllRole(res.payload.data)
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
  const numberOfPages=Math.ceil(allRole.length / recordsPerpage)
  const lastIndex=recordsPerpage * currentPage
  const firstIndex=lastIndex - recordsPerpage
  const records=allRole.slice(firstIndex,lastIndex)
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
        <button type='button' className='px-3 py-2 my-2 bg-gray-900 text-white font-bold rounded' onClick={()=>dispatch(addOpen(null))}>Add User Role</button>
      </div>
      <div className='overflow-x-scroll'>
        <table className='min-w-full divide-y divide-gray-700 border-b border-gray-700'>
            <caption className='caption-top text-lg pb-2 font-semibold'>
              User Role 
            </caption>
            <thead>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Description</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Menu Group</th>
                <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {records.map((item,i)=>(
                <tr key={i}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.roleName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.roleDesc}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.menuGroupName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>
                    <div className='flex space-x-2'>
                      <span className='cursor-pointer'><i className="ri-pencil-line" onClick={()=>dispatch(editOpen(item.userRoleId))}></i></span>
                      <span className='cursor-pointer'><i className="ri-delete-bin-6-line" onClick={()=>dispatch(deleteOpen(item.userRoleId))}></i></span>
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
      {isDeleteOpen && <DeleteRole/>}
      {(isAddOpen || isEditOpen) && <AddEditRole/>}
    </>
  )
}

export default RoleTable