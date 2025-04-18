import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { signOut } from "../../store/features/authSlice"
import MetaTags from "../../components/common/MetaTags"

const Forbidden_403 = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(signOut())
  },[])
  return (
    <div className='container mx-auto flex flex-col py-12 px-2'>
      <MetaTags
        title={`${appInitialData.siteTitle} | 403`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <div className='text-6xl'>403-Forbidden</div>
      <div className='text-sm'>you don't have permission to access this resource.</div>
      <div className='mt-10 text-md'>Try going back by clicking <Link className="text-blue-700" to='/'>here</Link>.</div>
    </div>
  )
}

export default Forbidden_403