import { Link,useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import MetaTags from "../../components/common/MetaTags"
import { createErrorLog } from "../../store/features/logSlice"
import { signOut } from "../../store/features/authSlice"
import { useEffect } from "react"

const NotFound_404 = () => {
  const location=useLocation()
  const dispatch=useDispatch()
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))

  useEffect(()=>{
    const objError={status:404,statusText:'Not Found',url:window.location.origin+location.pathname,message:'This resource not exists',addedBy:localStorage.getItem('userId')}
    dispatch(createErrorLog({objError}))
    dispatch(signOut())
  },[])
  
  return (
    <div className='container mx-auto flex flex-col py-12 px-2'>
      <MetaTags
        title={`${appInitialData.siteTitle} | 404`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <div className='text-5xl'>404-Page not found</div>
      <div className='text-sm'>The page you are trying to get, never existed in this reality,or has migrated to a parallel universe.</div>
      <div className='mt-10 text-md'>Try going back by clicking <Link className="text-blue-700" to='/'>here</Link>.</div>
    </div>
  )
}

export default NotFound_404