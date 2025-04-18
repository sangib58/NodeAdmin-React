import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Spinner from '../common/Spinner'
import { deleteSingleMenuGroup,deleteMenuCancel,deleteMenuClose } from '../../store/features/menuSlice'
import { createErrorLog } from '../../store/features/logSlice'
import { toast } from 'react-toastify'

const DeleteMenuGroup = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {deleteMenuId,loading}=useSelector((state)=>({...state.menu}))

  const deleteConfirm=(e)=>{
    e.stopPropagation()
    dispatch(deleteSingleMenuGroup({deleteMenuId}))
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        toast.error(res.payload.data.responseMsg)
        dispatch(deleteMenuClose(null))
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
    <>   
      <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-50">
        <div className="min-h-screen flex justify-center items-center" onClick={(e)=>{if(e.target==e.currentTarget){dispatch(deleteMenuCancel(null))}}}>
          <div className="relative bg-gray-900 w-[400px] h-40 rounded-md p-6 flex flex-col text-white">
            <div className="font-bold text-xl">Are you sure to delete this menu group?</div>
            <div className="text-sm text-gray-300 font-semibold mt-2">Press delete to proceed</div>
            <div className="absolute bottom-3 right-5 space-x-2">
              <button type="button" className="hover:bg-gray-600 rounded p-1 text-md font-bold" onClick={(e)=>{e.stopPropagation();dispatch(deleteMenuCancel(null))}}>Cancel</button>
              <button type="button" className="hover:bg-gray-600 rounded p-1 text-md font-bold" onClick={deleteConfirm}>Delete</button>
            </div>
          </div>           
        </div>
      </div>
      {loading && <Spinner/>}    
    </>
  )
}

export default DeleteMenuGroup