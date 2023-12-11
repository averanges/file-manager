import { useState } from "react"
import avatar from "../../../assets/avatar.png"
import { BellSVG, DownArrowSVG, MagicSVG, SearchSVG } from "../../../ui/svg/svg"
import { HeaderButton } from "../ui/headerButtons"

const DashboardHeader = () => {
  const [openUserWindow, setOpenUserWindow] = useState(false)
  return ( 
    <div className="h-32 flex justify-center items-center bg-slate-50 rounded-t-full">
        <div className="w-8/12 h-3/6 gap-12 flex">
          <div className="h-full w-8/12 rounded-full shadow-md relative">
              <input type="text" className="h-full w-full rounded-full outline-none pl-10 active:shadow-amber-200 duration-500" 
                placeholder="Search your document"/>
            <div className="absolute top-0 translate-y-5 left-3">
               <SearchSVG/>,
            </div>
          </div>
              <HeaderButton children={<MagicSVG/>}/>
              <HeaderButton children={<BellSVG/>}/>
            <div className="flex items-center gap-4 relative" onClick={() => setOpenUserWindow(prevOpen => !prevOpen)}>
              <HeaderButton children={<img src={avatar} alt="avatar"/>}/>
              <DownArrowSVG/>
              <div className={`${openUserWindow ? "scale-y-100" : "scale-y-0  "} absolute w-[150%] h-40 
              bg-white border-[1px] border-slate-100 shadow-xl -bottom-44 -left-10 transform origin-top
               duration-500`}>

              </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader