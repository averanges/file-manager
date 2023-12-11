import { ISidebarButtons } from "../consts/interfaces/ISidebarButtons"
import { Link } from "react-router-dom"

export const SidebarButtons = ({children, menuItem, linkTo}: ISidebarButtons) => {
    return (
        <Link to={linkTo} 
        className="flex items-center font-bold gap-2 hover:bg-[rgba(255,129,50,0.5)] hover:rounded-lg p-4">
            {children}
            {menuItem}
        </Link>
    )
}