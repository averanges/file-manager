import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store/storeHooks'
import { handleRenameAction } from '../../store/slices/uiSlices'
import { renameFile } from '../../firebase/firebaseActions'
import { handleActionSuccess } from '../../store/slices/managementSlice'

const RenameWindow = () => {
    const {open, path, name} = useAppSelector(state => state.ui.renameModal)
    const focusRef = useRef<HTMLInputElement>(null)
    const [newName, setNewName] = useState('')
    const dispatch = useAppDispatch()
    const toggleCancel = () => {
        setNewName('')
        dispatch(handleRenameAction({name: '', path: '', open: false}))
    }
    const toggleRenameFile = () => {
        setNewName('')
        dispatch(handleRenameAction({name: '', path: '', open: false}))
        renameFile(path, newName)
        dispatch(handleActionSuccess(true))
    }
    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
          }
        setNewName(name)
    }, [path, name])
  return (
    <div className={`${open ? "scale-100 flex" : "scale-0 hidden"} w-[20%] bg-white duration-1000 flex-col justify-center 
    items-center rounded-2xl gap-5 p-3 shadow-lg shadow-slate-600/50`}>
      <div className='flex justify-between w-[80%]'>
        <h2 className='text-2xl text-slate-800 tracking-widest'>Rename</h2>
        <button onClick={toggleCancel}
        className='hover:bg-slate-200 w-8 h-8 rounded-full duration-300'>X</button>
      </div>
      <input value={newName} ref={focusRef}
        onKeyDown={(e) => {
        if (e.key === "Enter") {
            toggleRenameFile()}
        }}
      onChange={(e) => setNewName(e.target.value)}
      type="text" className='border-[1px] border-black rounded-xl pl-2 py-1 w-[80%] placeholder:text-black'/>
      <div className='flex w-[80%] gap-5'>
        <button onClick={toggleRenameFile} 
        className='bg-orange-prime rounded-2xl px-2 py-1 text-white shadow-md shadow-slate-400 hover:shadow-slate-300'>Rename</button>
        <button onClick={toggleCancel}
        className='hover:bg-orange-opacity hover:rounded-2xl p-2 duration-300'>Cancel</button>
      </div>
    </div>
  )
}

export default RenameWindow