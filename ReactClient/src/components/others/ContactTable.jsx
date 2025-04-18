import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Spinner from '../common/Spinner'
import { fetchContact } from '../../store/features/landingSlice'
import { createErrorLog } from '../../store/features/logSlice'

const ContactTable = () => {
    const [contact,setContact]=useState([])
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading}=useSelector((state)=>({...state.landing}))
    
    useEffect(()=>{
        fetchMessages()
    },[])

	const fetchMessages=()=>{
		dispatch(fetchContact())
		.then((res)=>{	
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))		
            if(res.payload.status==200){
                setContact(res.payload.data)
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
    const numberOfPages=Math.ceil(contact.length / recordsPerpage)
    const lastIndex=recordsPerpage * currentPage
    const firstIndex=lastIndex - recordsPerpage
    const records=contact.slice(firstIndex,lastIndex)
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
            <div className='overflow-x-scroll'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <caption className='caption-top text-lg pb-2 font-semibold'>
                        Contact Messages 
                    </caption>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Message</th>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Date Added</th>                                     
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {records.map((item,i)=>(
                            <tr key={i}>                            
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.email}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.message}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.dateAdded}</td>                       
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className=''>
                    <ul className='flex float-end gap-2'>
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
        </>
        
    )     
}

export default ContactTable