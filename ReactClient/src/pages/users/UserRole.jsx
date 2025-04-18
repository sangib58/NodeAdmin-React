import RoleTable from "../../components/users/RoleTable"
import MetaTags from '../../components/common/MetaTags'

const UserRole = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="pt-2 pb-24 px-2">
      <MetaTags
        title={`${appInitialData.siteTitle} | Roles`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <RoleTable/>
    </div>
  )
}

export default UserRole