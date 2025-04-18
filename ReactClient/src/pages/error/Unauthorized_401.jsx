import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { signOut } from "../../store/features/authSlice"
import MetaTags from "../../components/common/MetaTags"

const Unauthorized_401 = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(signOut())
  },[])

  return (
    <div className='container mx-auto flex flex-col py-12 px-2'>
      <MetaTags
        title={`${appInitialData.siteTitle} | 401`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <div className='text-3xl md:text-6xl'>401-Unauthorized</div>
      <div className='text-sm'>Your current token has expired.You need to sign in again.</div>
      <div className='mt-10 text-md'>Try going back by clicking <Link className="text-blue-700" to='/'>here</Link>.</div>
    </div>
  )
}

export default Unauthorized_401