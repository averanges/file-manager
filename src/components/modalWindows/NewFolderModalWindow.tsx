import { useState } from 'react'
import { createNewFolder } from '../../firebase/firebaseActions'
import { useAppDispatch, useAppSelector } from '../../store/store/storeHooks'
import { handleOpenModal } from '../../store/slices/uiSlices'

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
        dispatch(handleOpenModal({open: false, id: ''}))
    
        setNewFolderName('')
      }
  return (
    <div className={`${open ? "scale-100" : "scale-0"} w-[25%]  bg-white duration-1000 flex flex-col justify-between`}>
        <div className="flex flex-col p-4 text-slate-500 gap-4">
            <label htmlFor="newfolder">Folder Name</label>
            <input onChange={(e) => setNewFolderName(e.target.value)} value={newFolderName}
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