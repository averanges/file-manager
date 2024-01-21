import { useState, useEffect } from 'react'
import { FolderArrowDownSvg, FolderOpenSvg, FolderSVG } from '../../ui/svg/svg'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/store/storeHooks'
import { IGenerateFolderLinks } from '../../pages/folderPage/components/FolderPage'

interface IFolderItem extends IGenerateFolderLinks {
  encodedPath: string, 
  name: string
}
const FolderItem = ({encodedPath, name, type, setCurrentFileDetails, setOpenListItemMenu, setCurrentId}: IFolderItem) => {
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const foldersData = useAppSelector(state => state.management.foldersList)
    const [folderItemPath] = foldersData?.filter(el => el.name === name)
    const currentItem = {name, path: folderItemPath?.path}
    
    useEffect(() => {
        if (setCurrentFileDetails) {
          if (clicked) {
            setOpenListItemMenu(true)
            setCurrentFileDetails(prev => [...prev, currentItem])
          }
          else {
            setCurrentFileDetails(prev => prev?.filter(el => el.name !== name))
          }
        }
      }, [clicked])
  return (
    <>
    {
    type === 'main' ?
    (<div 
        onClick={() => setClicked(prev => !prev)}
        onDoubleClick={() => navigate(`/dashboard/folder/${encodedPath}`)}
        style={{userSelect: "none"}}
        className={`hover:bg-[rgba(255,125,160,0.5)] ${clicked ? 'bg-[rgba(255,125,160,0.5)]' : ''} 
        cursor-pointer duration-500 w-full flex justify-between items-center px-5 group/folder`}>
       <input onChange={(e) => setClicked(e.target.checked)} checked={clicked}
        type="checkbox" name="" id="" className={`w-4 h-4 ml-4 group-hover/folder:opacity-100 opacity-0 ${clicked ? 'opacity-100' : ''}`}/>
       <div className="flex items-center w-fit ml-2 my-2 border-r-[1px] px-2 border-slate-100 flex-grow">
        <div className="text-black rounded-2xl w-16 h-10 flex justify-center items-center font-semibold">
          <FolderOpenSvg size={10}/>
        </div>
          <p className="text-xl tracking-widest">{name}</p>
       </div>
      </div>)
      :
      (<div onClick={() => setCurrentId(prev => prev + "/" + name)}
        style={{userSelect: "none"}}
        className='hover:bg-[rgba(255,125,160,0.5)] cursor-pointer rounded-xl active:shadow-inner'>
        <div className="flex items-center w-fit ml-2">
          <div className="text-black rounded-2xl w-16 h-10 flex justify-center items-center font-semibold">
            <FolderArrowDownSvg size={6}/>
          </div>
            <p className="text-xl tracking-widest">{name}</p>
        </div>
      </div>)}
    </>
  )
}

export default FolderItem