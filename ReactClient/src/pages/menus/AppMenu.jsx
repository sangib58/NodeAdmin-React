import MenuTable from "../../components/menus/MenuTable"
import MetaTags from "../../components/common/MetaTags"

const AppMenu = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="pt-2 pb-24 px-2">
      <MetaTags
        title={`${appInitialData.siteTitle} | All Menu`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <MenuTable/>
    </div>
  )
}

export default AppMenu