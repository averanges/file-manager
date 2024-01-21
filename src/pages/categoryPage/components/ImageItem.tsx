import { useState, useEffect } from 'react'
import { IUploadedDataItem } from '../../../firebase/firebaseActions'
import { handleOpenFullImage } from '../../../store/slices/uiSlices'
import { useAppDispatch } from '../../../store/store/storeHooks'
import { ICurrentItem } from '../../../modules/dataListTemplate/components/DataListTemplate'

interface IImageItemProps extends IUploadedDataItem{
  url: string,
  setCurrentFileDetails: React.Dispatch<React.SetStateAction<ICurrentItem[]>>,
  setOpenListItemMenu: React.Dispatch<React.SetStateAction<boolean>>,
  currentFileDetails: ICurrentItem[]
}

const ImageItem = ({
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
  }: IImageItemProps) => {
    const dispatch = useAppDispatch()
    const [clicked, setClicked] = useState(false)   
    const [loaded, setLoaded] = useState(false)

    const fileTypeName = fileType?.split('/')[1] || ''
    const fileTypeCategory = fileType && fileType?.split('/')[0].charAt(0).toUpperCase() + fileType?.split('/')[0].slice(1)
    const currentItem = {name, timestamp, fileSize, fileTypeName, path: path || '', url, favorites: favorites || false, fileTypeCategory: fileTypeCategory || ''}

    useEffect(() => {
        if (setCurrentFileDetails) {
            if (clicked) {
                setCurrentFileDetails([currentItem])
                setOpenListItemMenu(true)
            } else {
                setCurrentFileDetails(prev => prev.filter(el => el.name !== name))
            }
        }
    }, [clicked]) 

    useEffect(() => {
        if (currentFileDetails?.length === 0 || !currentFileDetails.some(el => el.name === name)) {
          setClicked(false)
        }
      }, [currentFileDetails])

      const openFullImage = () => {
        dispatch(handleOpenFullImage({isOpenFullImage: true, openFullImageSource: url}))
      }
  return (
      <div 
         draggable
         // onDragStart={() => handleDragStart(idx)}
         // onDragOver={() => handleDragOver(idx)}
        // onDragEnd={handleDragEnd}
         onClick={() => setClicked(prev => !prev)}
         onDoubleClick={openFullImage}
         className={`relative w-full h-40 cursor-pointer drop-shadow-md duration-500 group/image
         ${loaded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
         <div className={`w-full flex gap-3 items-center ${clicked ? "bg-[rgba(255,125,160,1)] text-white" : 'bg-white'} 
         rounded-t-2xl p-1 group-hover/image:bg-[rgba(255,125,160,1)] duration-300`}>
             <span 
            className="text-xs border-[1px] rounded-xl flex justify-center items-center
              px-1 shadow-sm shadow-slate-200 group-hover/image:shadow-white group-hover/image:text-white">
             {fileType?.split('/')[1].toUpperCase()}
             </span>
             <p className="text-xs group-hover/image:text-white">{name}</p>
            </div>
            <div className={`w-full h-full border-[1px] border-dashed absolute`}></div>
             <img
            src={url}
            alt={`Image ${name}`}
            className="object-cover w-full h-full"
            onLoad={() => setLoaded(true)}
            />
        </div>
  )
}

export default ImageItem

// handleOpenFullImage(url)