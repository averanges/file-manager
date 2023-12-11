import { FavoriteSVG, SettingsSVG, TrashSVG, UpdateSVG } from "../../../ui/svg/svg"
import { ISidebarButtons } from "./interfaces/ISidebarButtons"

export const SidebarButtonsArray1: ISidebarButtons[] = [
    {menuItem: 'Favorites', children: <FavoriteSVG/>, linkTo: '/favorites'},
    {menuItem: 'Updates', children: <UpdateSVG/>, linkTo: '/updates'}]

export const SidebarButtonsArray2: ISidebarButtons[] = [
    {menuItem: 'Settings', children: <SettingsSVG/>, linkTo: '/settings'}, 
    {menuItem: 'Recycle Bin', children: <TrashSVG/>, linkTo: '/recycle-bin'},
]
  