import { Helmet } from "react-helmet-async"

const MetaTags = ({title='React Admin',description='An admin template build with react client with .net core api',image=''}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <link rel="icon" type="image/svg+xml" href={image} />
    </Helmet>
  )
}

export default MetaTags