import { useState } from 'react'
import { FolderSVG, RightArrowSVG } from '../../../ui/svg/svg'

const FolderMenuItem = ({currentFolderLength, renderFolders, currentSubFolders, folderName}) => {
    const [openSubFolders, setOpenSubFolders] = useState(false)
  return (
    <>
        <div className="flex relative items-center" onClick={() => setOpenSubFolders(prev => !prev)}>
            {currentFolderLength > 0 ? 
            <div className='absolute -left-3'>
                <RightArrowSVG/> 
            </div>
            : null}
            <FolderSVG size="5"/>
            <p>{folderName}</p>
        </div>
        {(currentFolderLength > 0 && openSubFolders) ? (
            <div className="ml-5 flex flex-col gap-2">
                {renderFolders(currentSubFolders)}
            </div>
            ) 
            : null
        }
    </>

  )
}

export default FolderMenuItem