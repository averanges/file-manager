import { useState } from "react"
import { SidebarButtonsArray1, SidebarButtonsArray2 } from "../consts/sidebarButtonsArrays"
import { FolderSVG, LogoSVG, LogoutSVG, RightArrowSVG} from "../../../ui/svg/svg"
import { mappingArrayFunc } from "../helpers/mappingArrayFunction"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../../config/firebaseConfig"
import { RootState } from "../../../store/store/store"
import { useSelector } from "react-redux"
import FolderMenuItem from "./FolderMenuItem"

const DashboardSidebar = () => {
  const [openSubFolder, setOpenSubFolder] = useState(true)
  const allFolders = useSelector((state: RootState) => state.management.allFolders)
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await auth.signOut().then(() => navigate('/main'))
    } catch (error) {
      console.log(error)
    }
  }
  const renderFolders = (folders) => {
    return Object.keys(folders).map((folderName) =>{ 
      const currentSubFolders = folders[folderName]
      const currentFolderLength = Object.keys(currentSubFolders).length
      return (
        <div key={folderName} className="flex flex-col gap-2">
          <FolderMenuItem currentFolderLength={currentFolderLength} folderName={folderName} currentSubFolders={currentSubFolders} renderFolders={renderFolders}/>
        </div>
    )})
  }
  return (
    <div className="bg-slate-900 w-[17%] text-white text-2xl flex flex-col items-center justify-between py-8 cursor-pointer">
        <div className="flex gap-20 flex-col">
            <Link to="/" className="flex items-center gap-2"> 
                <LogoSVG/>
                <h2>K-Cloud.io</h2>
            </Link>
            <div className="flex flex-col gap-2 text-white text-sm font-semibold">
              <div className="flex items-center hover:bg-[rgba(255,129,50,0.5)] hover:rounded-lg p-4 relative"
               onClick={() => setOpenSubFolder(prev => !prev)}>
                <div className='absolute left-1'>
                  <RightArrowSVG/> 
                </div>
                <FolderSVG size="5"/>
                <Link to='/'>My Files</Link>
              </div>
              <div className="ml-5 flex flex-col gap-2">
                {openSubFolder ? renderFolders(allFolders) : null}
              </div>
              {mappingArrayFunc(SidebarButtonsArray1)}
            </div>
        </div>
        <div className="flex flex-col gap-5 text-sm">
            {mappingArrayFunc(SidebarButtonsArray2)}
            <div className="flex items-center gap-3 font-bold hover:bg-[rgba(255,129,50,0.5)] hover:rounded-lg p-4">
              <LogoutSVG/>
              <p onClick={handleLogout}>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default DashboardSidebar