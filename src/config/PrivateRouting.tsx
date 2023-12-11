import { createBrowserRouter } from "react-router-dom"
import DashboardPage from "../pages/dashBoardPage/components/DashboardPage"
import FolderPage from "../pages/folderPage/components/FolderPage"
import DashboardLayout from "../DashboardLayout"
import FavoritesPage from "../pages/favorites/components/FavoritesPage"
import UpdatesPage from "../pages/updatesPage/components/UpdatesPage"
import SettingsPage from "../pages/settingsPage/components/SettingsPage"
import RecycleBinPage from "../pages/recicleBynPage/components/RecycleBinPage"
import CategoryPage from "../pages/categoryPage/components/CategoryPage"
import MainPage from "../MainPage"
import SignupPage from "../pages/signupPage/components/SignupPage"
import LoginPage from "../pages/loginPage/components/LoginPage"
import AllFoldersPage from "../pages/allFoldersPage/components/AllFoldersPage"

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
      path: '/all-folders',
      element: <DashboardLayout children={<AllFoldersPage/>}/>
    },
    {
      path: '/updates',
      element: <DashboardLayout children={<UpdatesPage/>}/>
    },
    {
      path: '/settings',
      element: <DashboardLayout children={<SettingsPage/>}/>
    },
    {
      path: '/recycle-bin',
      element: <DashboardLayout children={<RecycleBinPage/>}/>
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
  