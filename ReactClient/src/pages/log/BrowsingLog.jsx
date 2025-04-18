import BrowseTable from "../../components/log/BrowseTable"
import MetaTags from "../../components/common/MetaTags"

const BrowsingLog = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="pt-8 pb-24 px-2">
      <MetaTags
        title={`${appInitialData.siteTitle} | History`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <BrowseTable/>
    </div>
  )
}

export default BrowsingLog
