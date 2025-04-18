import FaqTable from "../../components/others/FaqTable"
import MetaTags from "../../components/common/MetaTags"

const Faq = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="pt-2 pb-24 px-2">
      <MetaTags
        title={`${appInitialData.siteTitle} | FAQ`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <FaqTable/>
    </div>
  )
}

export default Faq