import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store/storeHooks'
import { generateFolderLinks } from '../../pages/folderPage/components/FolderPage'
import { FolderSVG, LeftArrowSvg } from '../../ui/svg/svg'
import { handleMoveAndCopy, handleOpenModal } from '../../store/slices/uiSlices'
import { moveOrCopyFile } from '../../firebase/firebaseActions'
import { handleActionSuccess } from '../../store/slices/managementSlice'

const MoveAndCopyWindow = () => {
  const dispatch = useAppDispatch()
  const {open, path, name, id} = useAppSelector(state => state.ui.moveAndCopyModal)
  const [finish, setFinish] = useState(false)
  const [currentId, setCurrentId] = useState('')
  
  const allFolders = useAppSelector(state => state.management.allFolders)
  const mappedFolderLinks = allFolders && Object.keys(allFolders).length > 0 ? generateFolderLinks({folders: allFolders, path: currentId, type: "modal", setCurrentId}) : null
  const toggleCancel = () => {
    dispatch(handleMoveAndCopy({open: false, path: '',name: '', id: ''}))
    }

    const toggleMoveOrCopy = (type: string) => {
        moveOrCopyFile({oldFilePath: path, id: currentId, name, type: type, setFinish})
    }
  useEffect(() => {
    setCurrentId(id)
    }, [id])

  useEffect(() => {
    if (finish) {
        console.log(1)
        dispatch(handleActionSuccess(true))
        setFinish(false)
        dispatch(handleMoveAndCopy({open: false, path: '', name: '', id: ''}))
    }
    }, [finish])

  return (
    <div className={`${open ? "scale-100 flex" : "scale-0 hidden"} w-[25%] h-[50%] bg-white duration-1000 flex-col justify-center 
    items-center rounded-2xl gap-5 p-3 shadow-lg shadow-slate-600/50`}>
        <div className='flex justify-between w-[90%]'> 
            <div className='flex items-center gap-3'>
               {currentId !== "My Files" 
               ? <button onClick={() => {
                setCurrentId(prev => {
                    const splittedPrev = prev.split('/')
                    return splittedPrev.slice(0, splittedPrev.length - 1).join('/')
                    })
               }}
               className='hover:bg-slate-200 w-8 h-8 rounded-full duration-300 active:shadow-inner text-lg flex justify-center items-center'>
                    <LeftArrowSvg size={5}/>
                </button>
                : null
                }   
                <p className='text-2xl'>{currentId.split('/').pop()}</p>
            </div>
            <button onClick={toggleCancel}
            className='hover:bg-slate-200 w-8 h-8 rounded-full duration-300 active:shadow-inner text-lg'>X</button>
        </div>
        <div className='w-full h-[90%]'>
            {mappedFolderLinks}
        </div>
        <div className='flex justify-between w-[90%]'>
            <div className='flex gap-3'>
                <button onClick={() => toggleMoveOrCopy("move")}
                className='bg-orange-prime rounded-2xl px-2 py-1 text-white shadow-md 
                shadow-slate-400 hover:shadow-slate-300 active:shadow-inner'>Move Here</button>
                <button  onClick={() => toggleMoveOrCopy("copy")}
                className='bg-orange-prime rounded-2xl px-2 py-1 text-white shadow-md 
                shadow-slate-400 hover:shadow-slate-300 active:shadow-inner'>Copy Here</button>
            </div>
            <div className='hover:bg-orange-opacity hover:rounded-2xl p-2 duration-300 flex items-center cursor-pointer'>
                <FolderSVG size={'5'}/>
                <button onClick={() => dispatch(handleOpenModal({open: true, id}))}
                className='text-md'>New Folder</button>
            </div>
        </div>
    </div>
  )
}

export default MoveAndCopyWindow