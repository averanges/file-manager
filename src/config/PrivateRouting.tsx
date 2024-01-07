import { createBrowserRouter } from "react-router-dom"
import DashboardPage from "../pages/dashBoardPage/components/DashboardPage"
import FolderPage from "../pages/folderPage/components/FolderPage"
import DashboardLayout from "../DashboardLayout"
import FavoritesPage from "../pages/favorites/components/FavoritesPage"
import UpdatesPage from "../pages/updatesPage/components/UpdatesPage"
import CategoryPage from "../pages/categoryPage/components/CategoryPage"
import MainPage from "../MainPage"
import SignupPage from "../pages/signupPage/components/SignupPage"
import LoginPage from "../pages/loginPage/components/LoginPage"

export const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardLayout children={<DashboardPage/>}/>
    },
    {
      path: '/main',
      element: <MainPage/>
    },
    {
      path: '/auth/signup',
      element: <SignupPage/>
    },
    {
      path: '/auth/login',
      element: <LoginPage/>
    },
    {
      path: '/favorites',
      element: <DashboardLayout children={<FavoritesPage/>}/>
    },
    {
      path: '/updates',
      element: <DashboardLayout children={<UpdatesPage/>}/>
    },
    {
      path: '/dashboard/category/:id',
      element: <DashboardLayout children={<CategoryPage/>}/>
    },
    {
      path: '/dashboard/folder/:id',
      element: <DashboardLayout children={<FolderPage/>}/>
    }
  ])
  