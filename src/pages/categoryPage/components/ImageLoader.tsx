import { useState } from 'react'
import { handleOpenFullImage } from '../../../store/slices/uiSlices'
import ImageItem from './ImageItem'

const ImageLoader = ({currentFolderData, setCurrentFileDetails, setOpenListItemMenu, currentFileDetails}) => {
  return (
    <div className="grid grid-cols-5 gap-5 overflow-y-auto overflow-x-hidden p-5 h-[80%] w-full">
        {currentFolderData.map((el, idx) => (
        <ImageItem key={idx} 
        setCurrentFileDetails={setCurrentFileDetails} path={el.path}
        setOpenListItemMenu={setOpenListItemMenu} currentFileDetails={currentFileDetails}
        name={el.name} url={el.downloadURL} fileSize={el.fileSize} 
        fileType={el.fileType} timestamp={el.timestamp} favorites={el.favorites}/>
        ))}
    </div>
  )
}

export default ImageLoader