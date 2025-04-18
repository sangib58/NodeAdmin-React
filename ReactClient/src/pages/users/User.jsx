import UserTable from "../../components/users/UserTable"
import MetaTags from '../../components/common/MetaTags'

const User = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="pt-2 pb-24 px-2">
      <MetaTags
        title={`${appInitialData.siteTitle} | Users`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <UserTable/>
    </div>
  )
}

export default User