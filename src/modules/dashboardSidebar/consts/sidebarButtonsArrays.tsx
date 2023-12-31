import DashboardPage from "../../../pages/dashBoardPage/components/DashboardPage"
import { FavoriteSVG, HomeSVG, SettingsSVG, TrashSVG, UpdateSVG } from "../../../ui/svg/svg"
import { ISidebarButtons } from "./interfaces/ISidebarButtons"

export const SidebarButtonsArray1: ISidebarButtons[] = [
    {menuItem: 'Dashboard', children: <HomeSVG size={4}/>, linkTo: '/'},
    {menuItem: 'Favorites', children: <FavoriteSVG/>, linkTo: '/favorites'},
    {menuItem: 'Updates', children: <UpdateSVG/>, linkTo: '/updates'}]
