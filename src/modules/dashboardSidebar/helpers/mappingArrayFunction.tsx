import { ISidebarButtons } from "../consts/interfaces/ISidebarButtons"
import { SidebarButtons } from "../ui/sidebarButtons"

export const mappingArrayFunc = (arrayForMapping: ISidebarButtons[]) => {
    return arrayForMapping
    .map((el, idx) => 
    <SidebarButtons 
        key={idx} 
        menuItem={el.menuItem} 
        children={el.children}
        linkTo={el.linkTo}
    />)
}