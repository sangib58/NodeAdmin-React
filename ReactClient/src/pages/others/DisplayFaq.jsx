import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/common/Spinner'
import { fetchFaq } from '../../store/features/faqSlice'
import { createErrorLog } from '../../store/features/logSlice'

const DisplayFaq = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [faq,setFaq]=useState([])
  const {loading}=useSelector((state)=>({...state.faq}))

  useEffect(()=>{
    getFaq()
  },[])

  const getFaq=()=>{
    dispatch(fetchFaq())
    .then((res)=>{
      const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
      res.payload.status!=200 && dispatch(createErrorLog({objError}))
      if(res.payload.status==200){
        setFaq(res.payload.data)
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
    document.querySelectorAll('.faq-dropdown-toggle').forEach(function(item){
      //console.log(item)
      item.addEventListener('click', (e)=> {      
        e.preventDefault()
        const parent = item.closest('.group')   
        if (parent.classList.contains('selected')) {
          parent.classList.remove('selected')
        } else {
          document.querySelectorAll('.faq-dropdown-toggle').forEach(function (i) {
            i.closest('.group').classList.remove('selected')
          })
          parent.classList.add('selected')
        }
      })
    })
  },[faq])

  
  return (
    <>
      <div className='px-2 py-2'>
        {faq.map((item,i)=>(
          <div key={i} className='group py-1'>
            <div className={`flex items-center py-4 px-2 border border-gray-300 rounded-md shadow-md cursor-pointer faq-dropdown-toggle`}>
              <span className='text-md font-semibold'>{item.title}</span><i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
            </div>
            <div className={`hidden group-[.selected]:block px-2 py-1`}>
              <span className='text-md'>{item.description}</span>
            </div>
          </div>
        ))}
      </div>
      {loading && <Spinner/>}
    </>     
  )
}

export default DisplayFaq