import { Link, useMatch, useNavigate, useParams } from "react-router-dom"
import { useState } from 'react'
import FileItem from "../../../components/cards/FileItem"
import { useSelector } from "react-redux"
import { useFileChange } from "../../../firebase/firebaseActions"
import { RootState } from "../../../store/store/store"
import { useAppDispatch, useAppSelector } from "../../../store/store/storeHooks"
import { handleOpenModal } from "../../../store/slices/uiSlices"
import DataListTemplate from "../../../modules/dataListTemplate/components/DataListTemplate"
import { FolderOpenSvg, FolderSVG } from "../../../ui/svg/svg"
import FolderItem from "../../../components/cards/FolderItem"

  export const generateFolderLinks = ({folders, path, type, setCurrentFileDetails, setOpenListItemMenu, setCurrentId}) => {
    if (!folders || !path || typeof path !== 'string') {
      return null;
    }
  
    const partedPath = path.split('/').filter(el => el !== 'My Files')
    const folderPathTrack = (foldersPath, slicedPath) => {
      if (path === 'My Files') {
        return folders;
      }
    
      let currentFolder = foldersPath;
    
      for (const folder of slicedPath) {
        if (!currentFolder || typeof currentFolder !== 'object') {
          return null
        }
    
        currentFolder = currentFolder[folder];
      }
    
      return currentFolder;
    };
    const currentFolder = folderPathTrack(folders, partedPath)
    
    if (typeof currentFolder !== 'object' || currentFolder === null) {
      return null
    }
    const subFolders = Object.keys(currentFolder).map((el, idx) => {
      const fullPath = `${path}/${el}`
      const encodedPath = encodeURIComponent(fullPath)
      return <FolderItem key={idx} encodedPath={encodedPath} 
      name={el} setCurrentFileDetails={setCurrentFileDetails} 
      setOpenListItemMenu={setOpenListItemMenu} type={type} setCurrentId={setCurrentId}/>
    })
  
    return subFolders;
  }

const FolderPage = () => {
  const basePath = "uploads/users/"
  const { userId } = useAppSelector(state => state.management.user)
  const { id } = useParams()

  const uploadedData = useAppSelector((state => state.management.allData))

  const currentFolderData = typeof(id) !== "undefined" ? uploadedData.filter(el => {
    const baseFolderPath = basePath + userId + "/" + id + "/"
    return el.path?.split('/').slice(0, -1).join('/') + '/' === baseFolderPath
  }) : null
  const currentFolder = id?.split('/').slice(-1)[0]

  // const { uploadNewFile } = useFileChange()
  // const dispatch = useAppDispatch()
  return (
    <div className=' w-full h-full flex justify-center'>
      <DataListTemplate folderAddress={currentFolder}
      currentFolderData={currentFolderData}/>
    </div>
  )
}

export default FolderPage