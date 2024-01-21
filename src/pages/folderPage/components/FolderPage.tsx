import { useParams } from "react-router-dom"
import {  useAppSelector } from "../../../store/store/storeHooks"
import DataListTemplate, { ICurrentItem } from "../../../modules/dataListTemplate/components/DataListTemplate"
import FolderItem from "../../../components/cards/FolderItem"

export interface IGenerateFolderLinks {
  folders?: object,
  path?: string,
  type: string,
  setCurrentFileDetails: React.Dispatch<React.SetStateAction<ICurrentItem[]>>,
  setOpenListItemMenu: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentId?: React.Dispatch<React.SetStateAction<string>>
}
  export const generateFolderLinks = ({folders, path, type, setCurrentFileDetails, setOpenListItemMenu, setCurrentId}: IGenerateFolderLinks) => {
    if (!folders || !path || typeof path !== 'string') {
      return null;
    }
  
    const partedPath = path.split('/').filter(el => el !== 'My Files')
    const folderPathTrack = (foldersPath: any, slicedPath: string[]) => {
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
      {currentFolderData !== null ?
      <DataListTemplate folderAddress={currentFolder}
      currentFolderData={currentFolderData}/>
    : null}
    </div>
  )
}

export default FolderPage