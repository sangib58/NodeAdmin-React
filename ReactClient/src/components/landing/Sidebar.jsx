import { useSelector,useDispatch } from 'react-redux'
import { sidebarToggle } from '../../store/features/landingSlice'
import { useNavigate } from 'react-router-dom';

const Sidebar = ({settings}) => {
    const isSidebarOpen=useSelector((state)=>state.landing.isSidebarOpen)
    const dispatch=useDispatch()
    const navigate=useNavigate() 
    return (
        <>
            {isSidebarOpen && (
                <>
                    <div className='z-50 fixed flex flex-col top-0 left-0 w-64 h-full bg-dark-black transition-transform'>
                        <div className='border-b border-gray-400 py-[17.5px]'>
                            <span className='text-white text-xl font-bold pl-6'>{settings.initialData.siteTitle}</span>
                        </div>
                        <div className='border-b border-gray-400 py-[17.5px]'>
                            <ul className='items-center'>
                                <li className='pl-6 py-3 cursor-pointer hover:bg-gray-500'>
                                    <a href={settings.homeUrl}>
                                        <i className='ri-home-2-line mr-6 text-xl text-white'></i>
                                        <span className='text-white font-semibold text-sm'>Home</span>
                                    </a>                                  
                                </li>
                                <li className='pl-6 py-3 cursor-pointer hover:bg-gray-500'>
                                    <a href={settings.featureUrl}>
                                        <i className='ri-history-line mr-6 text-xl text-white'></i>
                                        <span className='text-white font-semibold text-sm'>Feature</span>
                                    </a>                                   
                                </li>
                                <li className='pl-6 py-3 cursor-pointer hover:bg-gray-500'>
                                    <a href={settings.contactUrl}>
                                        <i className="ri-contacts-book-2-line mr-6 text-xl text-white"></i>
                                        <span className='text-white font-semibold text-sm'>Contact</span>
                                    </a>                                   
                                </li>                               
                            </ul>
                        </div>
                        <div onClick={()=>navigate('/signin')} className='pl-6 py-3 mt-2 cursor-pointer hover:bg-gray-500'>
                            <i className="ri-login-box-line mr-6 text-xl text-white"></i>
                            <span className='text-white font-semibold text-sm'>Sign In</span>
                        </div>
                    </div>
                    <div onClick={()=>dispatch(sidebarToggle())} className='z-40 fixed top-0 left-0 w-full h-full bg-black/60'></div>
                </>               
            )}
        </>       
    )
}

export default Sidebar