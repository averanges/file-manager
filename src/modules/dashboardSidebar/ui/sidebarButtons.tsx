import { ISidebarButtons } from "../consts/interfaces/ISidebarButtons"
import { Link } from "react-router-dom"

export const SidebarButtons = ({children, menuItem, linkTo}: ISidebarButtons) => {
    return (
        <Link to={linkTo} 
        className="flex items-center font-bold gap-2 bg-[rgba(255,129,50,0.04)] hover:rounded-lg p-4">
            <div className="flex gap-2 ml-4">
                {children}
                {menuItem}
            </div>
        </Link>
    )
}