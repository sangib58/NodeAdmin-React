import UserStatus from "../../components/dashboard/UserStatus"
import LoginChart from "../../components/dashboard/LoginChart"
import MonthChart from "../../components/dashboard/MonthChart"
import YearChart from "../../components/dashboard/YearChart"
import BrowseChart from "../../components/dashboard/BrowseChart"
import RoleChart from "../../components/dashboard/RoleChart"
import MetaTags from "../../components/common/MetaTags"

const Dashboard = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="space-y-6 pt-4 pb-24">
      <MetaTags
        title={`${appInitialData.siteTitle} | Dashboard`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      {localStorage.getItem('userRoleId')==1 && <UserStatus/>}
      <div className="space-y-24">
        <LoginChart/>
        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-12 md:space-y-0">
          <RoleChart/>
          <BrowseChart/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-12 md:space-y-0 pb-2">
          <MonthChart/>
          <YearChart/>
        </div>
      </div>      
    </div>
  )
}

export default Dashboard