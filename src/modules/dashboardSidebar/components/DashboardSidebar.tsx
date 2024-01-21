import { useState } from "react"
import { SidebarButtonsArray1 } from "../consts/sidebarButtonsArrays"
import { DownArrowSVG, FolderSVG, LogoSVG, LogoutSVG, RightArrowSVG, SettingsSVG} from "../../../ui/svg/svg"
import { mappingArrayFunc } from "../helpers/mappingArrayFunction"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../../config/firebaseConfig"
import { RootState } from "../../../store/store/store"
import { useSelector } from "react-redux"
import FolderMenuItem from "./FolderMenuItem"
import { useAppDispatch } from "../../../store/store/storeHooks"
import { handleUserSettingsModal } from "../../../store/slices/uiSlices"

export const handleLogout = async (navigate: any) => {
  try {
    await auth.signOut().then(() => navigate('/main'))
  } catch (error) {
    console.log(error)
  }
}

export interface IFolders {
  [key: string]: IFolders;
}

const DashboardSidebar = () => {
  const [openSubFolder, setOpenSubFolder] = useState(true)
  const allFolders = useSelector((state: RootState) => state.management.allFolders)
  const mainFolderLength = Object.keys(allFolders).length

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const renderFolders = (folders: IFolders, parentPath = "") => {
    return Object.keys(folders).map((folderName: string) =>{ 
      const currentSubFolders = folders[folderName]
      const currentFolderLength = Object.keys(currentSubFolders).length

      const fullPath = parentPath + encodeURIComponent("/" + folderName)
      return (
        <div key={folderName} className="flex flex-col gap-2 w-full">
          <FolderMenuItem currentFolderLength={currentFolderLength} folderName={folderName} currentSubFolders={currentSubFolders} 
          renderFolders={renderFolders} fullPath={fullPath}/>
        </div>
    )})
  }

  const toggleOpenSubFolders = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenSubFolder(prev => !prev);
}
  return (
    <div className="bg-slate-900 sm:min-w-[150px] lg:w-[17%] h-full text-white text-2xl flex
    flex-col items-center justify-between py-8 cursor-pointer overflow-x-hidden">
        <div className="flex gap-20 flex-col w-full">
            <Link to="/" className="flex items-center gap-2 translate-x-[25%]"> 
                <LogoSVG/>
                <h2>K-Cloud.io</h2>
            </Link>
            <div className="flex flex-col gap-2 text-white text-sm font-semibold">
              <Link to='/dashboard/folder/My Files'
              className="flex items-center hover:rounded-lg p-4 relative bg-[rgba(255,129,50,0.04)]">
                <div className="flex items-center ml-2 relative">
                {
                  mainFolderLength > 0 && !openSubFolder ?  
                      (<div className='absolute -left-3' onClick={(e) => toggleOpenSubFolders(e)}>
                          <RightArrowSVG/>
                      </div>)
                  : mainFolderLength > 0 && openSubFolder ?
                      (<div className='absolute -left-3 text-white' onClick={(e) => toggleOpenSubFolders(e)}>
                          <DownArrowSVG size={4}/>
                      </div>)
                  : null
                }
                  <FolderSVG size="5"/>
                  <p>My Files</p>
                </div>
              </Link>
              <div className="flex flex-col gap-2 w-full max-h-96 relative overflow-y-auto overflow-x-hidden">
                {openSubFolder ? renderFolders(allFolders) : null}
              </div>
              {mappingArrayFunc(SidebarButtonsArray1)}
            </div>
        </div>
        <div className="flex flex-col gap-3 text-sm w-full">
            <div onClick={() => dispatch(handleUserSettingsModal({open: true, subTabType: 'basic'}))}
            className="flex items-center font-bold gap-2 bg-[rgba(255,129,50,0.04)] w-full hover:rounded-lg p-4">
              <div className="flex gap-2 ml-4">
                <SettingsSVG/>
                <p>Settings</p>
              </div>
            </div>
            <div className="flex items-center gap-3 font-bold bg-[rgba(255,129,50,0.04)] hover:rounded-lg p-4">
              <div className="flex gap-2 ml-4">
                <LogoutSVG/>
                <p onClick={() => handleLogout(navigate)}>Logout</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardSidebar