import { ReactNode, useState } from 'react'
import { DownArrowSVG, FolderSVG, RightArrowSVG } from '../../../ui/svg/svg'
import { Link } from 'react-router-dom'

interface IFolderMenuItem {
    currentFolderLength: number, 
    renderFolders: (currentSubFolders: object, fullPath: string) => ReactNode,
    currentSubFolders: object,
    folderName: string,
    fullPath: string
}
const FolderMenuItem = ({currentFolderLength, renderFolders, currentSubFolders, folderName, fullPath}: IFolderMenuItem) => {
    const [openSubFolders, setOpenSubFolders] = useState(false)
    const addLeftOffset = decodeURIComponent(fullPath).split('/').filter(el => el !== '').length
    
    const toggleOpenSubFolders = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        setOpenSubFolders(prev => !prev);
    }
  return (
    <>
        <Link to={`/dashboard/folder/My Files${fullPath}`} className="flex items-center hover:rounded-lg p-4 w-full bg-[rgba(255,129,50,0.08)]">
            <div className={`flex items-center relative ml-3 w-full`}>
                {
                currentFolderLength > 0 && !openSubFolders ?  
                    (<div className='absolute -left-3 ' onClick={(e) => toggleOpenSubFolders(e)}>
                        <RightArrowSVG/>
                    </div>)
                : currentFolderLength > 0 && openSubFolders ?
                    (<div className='absolute -left-3 text-white' onClick={(e) => toggleOpenSubFolders(e)}>
                        <DownArrowSVG size={4}/>
                    </div>)
                : null
                }
                <FolderSVG size="5"/>
                <p>{folderName}</p>
            </div>
        </Link>
        {(currentFolderLength > 0 && openSubFolders) ? (
            <div
            className={`flex w-full pl-3 bg-[rgba(255,129,50,0.1)] flex-col`}>
                {renderFolders(currentSubFolders, fullPath)}
            </div>
            ) 
            : null
        }
    </>

  )
}

export default FolderMenuItem