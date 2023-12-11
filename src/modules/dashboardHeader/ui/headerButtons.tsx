import {ReactNode} from "react"


export type TypeHeaderIcon = {
    children: ReactNode
    }


export const HeaderButton = ({children}: TypeHeaderIcon) => {
    return (
        <button className="h-full w-16 bg-white rounded-full shadow-md hover:shadow-amber-200 duration-500 hover:scale-110 flex justify-center items-center overflow-hidden">
            {children}
        </button>
    )
}