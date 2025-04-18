import MenuGroupTable from "../../components/menus/MenuGroupTable"
import MetaTags from "../../components/common/MetaTags"

const MenuGroup = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="pt-2 pb-24 px-2">
      <MetaTags
        title={`${appInitialData.siteTitle} | Menu Group`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <MenuGroupTable/>
    </div>
  )
}

export default MenuGroup