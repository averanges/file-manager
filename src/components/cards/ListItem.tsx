import { useState, useEffect } from 'react'
import { IUploadedDataItem } from '../../firebase/firebaseActions'
import { useAppSelector } from '../../store/store/storeHooks'
import { CalendarSVG, FolderSVG } from '../../ui/svg/svg'
import { useLocation } from 'react-router-dom'

export const fileSizeToBytes = (fileSize: number) => {
  return fileSize === 0 ?  "< 1 KB" : fileSize < 1 ? (fileSize * 1024).toFixed(0) + "KB" : Number(fileSize).toFixed(0) + "MB"
}
export const formatDate = (timestamp: string) => {
  const fileUpdateDate = new Date(timestamp)
 const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  }).format(fileUpdateDate)

  return formattedDate
}
export const getFileFolder = ({path, name, userId}) => {
  const basePath = "uploads/users/"
  const baseUserPath = basePath + userId
  const fileFolderWithoutName = path?.replace(name, '')
  const fileFolderArray= fileFolderWithoutName?.replace(baseUserPath, '').split('/').filter(el => el !== '')

  return fileFolderArray[fileFolderArray.length - 1]
}
const ListItem = ({
  name,
  url,
  favorites,
  timestamp,
  fileSize,
  fileType,
  setCurrentFileDetails,
  path,
  setOpenListItemMenu,
  currentFileDetails
}: IUploadedDataItem) => {
  const location = useLocation().pathname
  const userId = useAppSelector(state => state.management.user?.userId)
  const fileTypeName = fileType?.split('/')[1]
  const fileTypeCategory = fileType && fileType?.split('/')[0].charAt(0).toUpperCase() + fileType?.split('/')[0].slice(1)
  const currentItem = {name, timestamp, fileSize, fileTypeName, path, url, favorites, fileTypeCategory}
  const formattedDate = formatDate(timestamp)
  const [clicked, setClicked] = useState(false)
  const fileFolder = getFileFolder({path, name, userId})

  useEffect(() => {
    if (setCurrentFileDetails) {
      if (clicked) {
        setOpenListItemMenu(true)
        setCurrentFileDetails(prev => [...prev, currentItem])
      }
      else {
        setCurrentFileDetails(prev => prev.filter(el => el.name !== name))
      }
    }
  }, [clicked])

  useEffect(() => {
    if(currentFileDetails?.length === 0) {
      setClicked(false)
    }
  }, [currentFileDetails])
  return (
    <tr className={`hover:bg-[rgba(255,125,160,0.5)] cursor-pointer duration-500
     w-full flex justify-between items-center px-5 gap-10 group/item
      ${clicked ? 'bg-[rgba(255,125,160,0.5)]' : ''}`}
      onClick={() => setClicked(prev => !prev)}>
          <td className="flex items-center gap-4 w-fit ml-2 my-2 border-r-[1px] px-2 border-slate-100 flex-grow">

            {
            location !== "/" ? <input onChange={(e) => setClicked(e.target.checked)} checked={clicked}
            type="checkbox" name="" id="" className={`w-4 h-4 ${clicked ? "opacity-100" : "opacity-0"} group-hover/item:opacity-100`}/>
            :
            null
            }
            
            <div className="bg-purple-prime text-white rounded-2xl w-16 h-10 flex justify-center items-center font-semibold">
              {fileTypeName !== undefined && fileTypeName?.length > 5 ? fileTypeName?.slice(0,5).toUpperCase() : fileTypeName?.toUpperCase()}
             </div>
            <p className="text-xl">{name.length > 30 ? name.slice(0,30) + "..." : name}</p>
          </td>
         <td className="font-semibold translate-x-[30%]">
             <p>{fileSizeToBytes(fileSize)}</p>
         </td>
            <td>
              <div className="flex items-center gap-2 justify-center bg-slate-200 rounded-full py-2 px-4 min-w-[150px]">
                 <div className="w-2 h-2 bg-purple-prime rounded-full"/>
                 {location.split('/').some(el => el === 'folder') ?
                  <p>{fileTypeCategory}</p>
                  :
                  (<p className="text-slate-500">
                    {
                    fileFolder && fileFolder.length > 10 
                    ? fileFolder.slice(0,10) + "..." 
                    : fileFolder && fileFolder.length < 10 ? fileFolder : "Main Folder"
                    }
                  </p>)
                 }
              </div>
        </td>
         <td>
             <div className="flex justify-center gap-2">
                <div>
                     <CalendarSVG/>
                </div>
                 <p>{formattedDate}</p>
            </div>
         </td>
     </tr>
  )
}

export default ListItem