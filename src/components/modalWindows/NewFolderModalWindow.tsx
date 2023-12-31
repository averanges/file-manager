import { useState } from 'react'
import { createNewFolder } from '../../firebase/firebaseActions'
import { useAppDispatch, useAppSelector } from '../../store/store/storeHooks'
import { handleOpenModal } from '../../store/slices/uiSlices'
import { handleNewFolderAdded } from '../../store/slices/managementSlice'

const NewFolderModalWindow = () => {
    const {open, id} = useAppSelector(state => state.ui.openModal)
    const [newFolderName, setNewFolderName] = useState('')

    const dispatch = useAppDispatch()

    const closeModalWindow = (): void => {
        dispatch(handleOpenModal({open: false, id: ''}))
    }

    const handleCreateFolder = () => {
        const newFolderAddress = id + "/folders/" + newFolderName
        createNewFolder(newFolderAddress)
        dispatch(handleNewFolderAdded(true))
        dispatch(handleOpenModal({open: false, id: ''}))
    
        setNewFolderName('')
      }
  return (
    <div className={`${open ? "scale-100 flex" : "scale-0 hidden"} w-[25%]  bg-white duration-1000 flex flex-col justify-between rounded-2xl shadow-lg shadow-slate-500/50`}>
        <div className="flex flex-col p-4 gap-4">
            <label htmlFor="newfolder" className='text-2xl tracking-widest'>Folder Name</label>
            <input onChange={(e) => setNewFolderName(e.target.value)} value={newFolderName}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && newFolderName.trim() !== ''){
                    handleCreateFolder()
                }
            }}
            type="text" name="newfolder" className="border-slate-500 border-[1px] rounded-md"/>
        </div>
        <div className="w-full flex justify-end p-4 gap-5 font-semibold">
            <button onClick={closeModalWindow}
            className="hover:bg-slate-200 rounded-md p-2">Cancel</button>
            <button onClick={handleCreateFolder}
            className={`${newFolderName ? "text-black" : "text-slate-300"} hover:bg-slate-200 rounded-md p-2`}>Add Folder</button>
        </div>
     </div>
  )
}

export default NewFolderModalWindow