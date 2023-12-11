import { RouterProvider } from "react-router-dom"
import { router } from "./config/PrivateRouting"


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App