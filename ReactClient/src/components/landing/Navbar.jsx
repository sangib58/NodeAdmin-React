import logo from '../../assets/vue-admin-logo.png'
import {useNavigate} from "react-router-dom"
import {useDispatch} from 'react-redux'
import {sidebarToggle} from '../../store/features/landingSlice'

const Navbar = ({settings}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  return (
    <nav className="sticky top-0 flex justify-between items-center bg-light-gray shadow-xl shadow-gray-400 py-[8px] px-4">
      <div>
        <img className="size-12" src={settings.initialData.logoPath==''?logo:process.env.APIURL+'/'+settings.initialData.logoPath} alt="Site Logo" />
      </div>
      <div className="hidden md:flex space-x-2">
        <a className="font-semibold text-gray-700 hover:bg-gray-200 px-3 py-[5px] text-md rounded-md" href={settings.homeUrl}>Home</a>
        <a className="font-semibold text-gray-700 hover:bg-gray-200 px-3 py-[5px] text-md rounded-md" href={settings.featureUrl}>Features</a>
        <a className="font-semibold text-gray-700 hover:bg-gray-200 px-3 py-[5px] text-md rounded-md" href={settings.contactUrl}>Contact</a>
      </div>
      <div>
        <button onClick={()=>navigate('/signin')} className="hidden md:block border px-[16px] py-[5px] border-gray-500 text-gray-900 hover:bg-gray-200 text-md font-semibold rounded-md">Sign In</button>
        <button onClick={()=>dispatch(sidebarToggle())} type='button' className='md:hidden text-2xl text-gray-700'><i className='ri-menu-fold-fill'></i></button>
      </div>
    </nav>
  )
}

export default Navbar