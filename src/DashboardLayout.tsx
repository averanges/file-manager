import {FC, ReactNode} from "react"

import DashboardHeader from "./modules/dashboardHeader/components/DashboardHeader" 
import DashboardSidebar from "./modules/dashboardSidebar/components/DashboardSidebar" 
import NewFolderModalWindow from "./components/modalWindows/NewFolderModalWindow"
import AudioPlayerComponent from "./components/audioPlayer/AudioPlayerComponent"
import UploadPopup from "./components/modalWindows/UploadPopup"
import ImageModalWindow from "./components/modalWindows/ImageModalWindow"
import useFetchAllData from "./helpers/useFetchAllData"
import LoadingSpinner from "./components/animations/LoadingSpinner"
import useFetchFolders from "./helpers/useFetchFolders"
import ModalWindowLayout from "./components/modalWindows/ModalWindowLayout"
import DeleteConfirmWindow from "./components/modalWindows/DeleteConfirmWindow"
import RenameWindow from "./components/modalWindows/RenameWindow"
import MoveAndCopyWindow from "./components/modalWindows/MoveAndCopyWindow"
import UserSettings from "./components/modalWindows/UserSettings"

interface IChildren {
  children: ReactNode
}

const DashboardLayout: FC<IChildren> = ({children}) => {
  const { isDataLoading } = useFetchAllData()
  const { isFoldersLoading } = useFetchFolders()
  return (
      <div className="w-screen h-screen flex bg-slate-900 overflow-hidden">
        <UploadPopup/>
        <ModalWindowLayout>
          <DeleteConfirmWindow/>
          <RenameWindow/>
          <MoveAndCopyWindow/>
          <NewFolderModalWindow/>
          <UserSettings/>
        </ModalWindowLayout>
        <ImageModalWindow/>
          <DashboardSidebar/>
          <div className="border-slate-900 sm:border-8 w-full lg:w-[83%] rounded-xl relative">
              <DashboardHeader/>
              <div className="h-full flex justify-center bg-slate-50">
                {isDataLoading || isFoldersLoading ? <LoadingSpinner/> : children}
                <AudioPlayerComponent/>
              </div>
          </div>
      </div>
  )
}

export default DashboardLayout