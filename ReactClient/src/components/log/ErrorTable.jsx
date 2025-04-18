import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Spinner from '../common/Spinner'
import { fetchAppError,createErrorLog } from '../../store/features/logSlice'

const ErrorTable = () => {
    const [appError,setAppError]=useState([])
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading}=useSelector((state)=>({...state.appLog}))
    
    useEffect(()=>{
        fetchErrorLog()
    },[])

	const fetchErrorLog=()=>{
		dispatch(fetchAppError())
		.then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                setAppError(res.payload.data)
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
    const recordsPerpage=10
    const numberOfPages=Math.ceil(appError.length / recordsPerpage)
    const lastIndex=recordsPerpage * currentPage
    const firstIndex=lastIndex - recordsPerpage
    const records=appError.slice(firstIndex,lastIndex)
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
                        Application Error Log 
                    </caption>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Date-Time</th>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Error Code</th>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Error Name</th>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>URL</th>
                            <th className='px-6 py-3 text-left text-xs font-bold text-gray-950 uppercase tracking-wider'>Message</th>                  
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {records.map((item,i)=>(
                            <tr key={i}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.dateAdded}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.status}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.statusText}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.url}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-950'>{item.message}</td>                       
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className=''>
                    <ul className='flex float-end gap-2'>
                        <li className='border border-gray-900 px-2'>
                            <a href="#" onClick={handlePreviousPage}>Prev</a>
                        </li>
                        {numbers.map((pageNumber,i)=>(
                            <li key={i} onClick={()=>handleChangePage(pageNumber)} className={`border border-gray-900 px-2 ${pageNumber==currentPage?'bg-gray-900 text-white':''}`}>
                                <a href="#">{pageNumber}</a>
                            </li>
                        ))}
                        <li className='border border-gray-900 px-2'>
                            <a href="#" onClick={handleNextPage}>Next</a>
                        </li>
                    </ul>
                </div>
            </div>
            {loading && <Spinner/>}
        </>
        
    )
}

export default ErrorTable