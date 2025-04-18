import ErrorTable from "../../components/log/ErrorTable"
import MetaTags from "../../components/common/MetaTags"

const ErrorLog = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className="pt-8 pb-24 px-2">
      <MetaTags
        title={`${appInitialData.siteTitle} | Error Log`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />
      <ErrorTable/>
    </div>
  )
}

export default ErrorLog