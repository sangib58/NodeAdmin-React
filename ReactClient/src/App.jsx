import { RouterProvider } from "react-router-dom"
import { appRouter } from "./router/appRouter"
import { HelmetProvider } from "react-helmet-async"

const App = () => {
  return (
    <HelmetProvider>
      <RouterProvider router={appRouter}/>
    </HelmetProvider> 
  )
}

export default App