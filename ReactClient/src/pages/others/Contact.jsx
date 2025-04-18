import ContactTable from "../../components/others/ContactTable"
import MetaTags from "../../components/common/MetaTags"

const Contact = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="pt-8 pb-24 px-2">
      <MetaTags
        title={`${appInitialData.siteTitle} | Contact`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <ContactTable/>
    </div>
  )
}

export default Contact