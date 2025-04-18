import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useEffect,useState } from 'react'
import Spinner from '../common/Spinner'
import { updateSingleFaq,createSingleFaq,fetchSingleFaq,addEditCancel,addEditClose} from '../../store/features/faqSlice'
import { createErrorLog } from '../../store/features/logSlice'
import { toast } from 'react-toastify'

const AddEditFaq = () => {
  const initialState={
    faqId:null,
    title:'',
    description:'',
  }
  const initialErrorState={
    titleError:'',
    descriptionError:'',
  }
  const [faqForm,setFaqForm]=useState(initialState)
  const [errors,setErrors]=useState(initialErrorState)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isAddOpen,isEditOpen,editId,loading}=useSelector((state)=>({...state.faq}))
  const {faqId,title,description}=faqForm
  const {titleError,descriptionError}=errors

  useEffect(()=>{
    isEditOpen && 
    dispatch(fetchSingleFaq({editId}))
    .then((res)=>{
      if(res.payload.status==200){
        setFaqForm(res.payload.data)
      }else if(res.payload.status==401){
        navigate('/unauthorize')
      }else if(res.payload.status==403){
        navigate('/forbidden')
      }else{
        navigate('/unexpected')
      }
    })     
  },[isEditOpen])

  const onInputChange=(e)=>{
    let { name,value } = e.target
    setFaqForm({ ...faqForm, [name]:value })
    if(e.target.name=='title')faqForm.title=value
    else if(e.target.name=='description')faqForm.description=value
    validateFaq()
  }

  const validateFaq=()=>{
    const newErrors={}
    if(faqForm.title.trim().length<=9){
      newErrors.title='Minimum 10 character required'
    }
    if(faqForm.description.trim().length<=20){
      newErrors.description='Minimum 20 character required'
    }
    setErrors({titleError:newErrors.title,descriptionError:newErrors.description})
    return newErrors
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const newErrors=validateFaq()
    if(Object.keys(newErrors).length==0){
      if(isEditOpen){
        const objFaq={
          faqId,
          title,
          description,
          lastUpdatedBy:localStorage.getItem('userId')
        }
        dispatch(updateSingleFaq({objFaq}))
        .then((res)=>{
          const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
          res.payload.status!=200 && dispatch(createErrorLog({objError}))
          if(res.payload.status==200){
            toast.success(res.payload.data.responseMsg)
            dispatch(addEditClose(null))
          }else if(res.payload.status==202){
            toast.error(res.payload.data.responseMsg)
            dispatch(addEditCancel(null))
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
      }else if(isAddOpen){
        const objFaq={
          title,
          description,
          addedBy:localStorage.getItem('userId')
        }
        dispatch(createSingleFaq({objFaq}))
        .then((res)=>{
          const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
          res.payload.status!=200 && dispatch(createErrorLog({objError}))
          if(res.payload.status==200){
            toast.success(res.payload.data.responseMsg)
            dispatch(addEditClose(null))
          }else if(res.payload.status==202){
            toast.error(res.payload.data.responseMsg)
            dispatch(addEditCancel(null))
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
    }
    
  }
  return (
    <>            
      <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-50">
        <div className="min-h-screen flex justify-center items-center" onClick={(e)=>{if(e.target==e.currentTarget){dispatch(addEditCancel(null))}}}>
          <div className="relative bg-gray-900 min-w-[400px] md:w-[800px] min-h-[350px] rounded-md p-6 flex flex-col text-white">
              <div className="font-bold text-xl float-left">{isEditOpen?'Edit Faq':'Add Faq'}</div>
              <form onSubmit={handleSubmit} className='py-6 md:space-y-6'>
                  <div className='flex flex-col space-y-4'>
                      <div className=''>
                        <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Title</label>
                        <input type='text' autoComplete='off' name='title' value={title} onChange={onInputChange} className='outline-none text-black px-1 py-2 rounded border border-white w-full focus:border-blue-600'/>
                        {titleError!='' && <p className='mt-2 text-sm text-red-500'>{titleError}</p>}
                      </div>
                      <div className=''>
                        <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Description</label>
                        <textarea name='description' value={description} onChange={onInputChange} className='outline-none text-black px-1 py-2 rounded border border-white w-full focus:border-blue-600'></textarea>
                        {descriptionError!='' && <p className='mt-2 text-sm text-red-500'>{descriptionError}</p>}
                      </div>                                  
                  </div>                 
                  <div className="absolute bottom-3 right-5 space-x-2">
                    <button type="button" className="hover:bg-gray-600 rounded p-1 text-md font-bold" onClick={(e)=>{e.stopPropagation();dispatch(addEditCancel(null))}}>Cancel</button>
                    <button type="submit" className="hover:bg-gray-600 rounded p-1 text-md font-bold">{isEditOpen?'Update':'Add'}</button>                              
                  </div>
              </form>
              
          </div>           
        </div>
      </div>
      {loading && <Spinner/>}           
    </>       
  )
}

export default AddEditFaq