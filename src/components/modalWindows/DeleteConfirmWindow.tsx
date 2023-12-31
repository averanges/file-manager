import { useAppDispatch, useAppSelector } from '../../store/store/storeHooks'
import { handleDeleteConfirm } from '../../store/slices/uiSlices'
import useDeleteItems from '../../helpers/useDeleteItems'
import attention from '../../assets/attention.png'
import LoadingSpinner from '../animations/LoadingSpinner'

const DeleteConfirmWindow = () => {
  const { deleteFolder } = useDeleteItems()
  const actionSuccess = useAppSelector(state => state.management.actionSuccess)
  const {open, path} = useAppSelector(state => state.ui.deleteConfirm)

  const fileName = path.length ? path[path.length - 1].name : null
  const dispatch = useAppDispatch()

  const toggleCancel = () => {
    dispatch(handleDeleteConfirm({open: false, path: []}))
  }
  const toggleDeleteItem = () => {
    dispatch(handleDeleteConfirm({open: false, path: []}))
    path.forEach(el => {
        const slicedPath = el.path.split('/').slice(3)
        deleteFolder(slicedPath)
    })
  }
  return (
    <div className={`${open ? "scale-100 flex" : "scale-0 hidden"} w-[20%]  bg-white duration-1000 flex-col justify-center 
        items-center rounded-2xl gap-5 p-3 shadow-lg shadow-slate-600/50`}>
           {actionSuccess ? <LoadingSpinner/> : null}
        <p className='text-2xl tracking-widest'>Deleting <span className='text-slate-400 text-sm'>{path.length === 1 ? fileName : "multiple items"}</span></p>
        <div className='bg-pink-300 w-full h-full text-red-900 flex items-center gap-5 p-2 justify-center'>
            <div className='w-10 h-10 ml-2'>
                <img src={attention} alt="" className='object-cover'/>
            </div>
            <p>You may be deleting user data. Are you sure you want to continue?</p>
        </div>
        <div className='w-full flex justify-around'>
            <button onClick={toggleDeleteItem}
            className='bg-orange-prime rounded-2xl px-2 py-1 text-white shadow-md shadow-slate-400 hover:shadow-slate-300'>Delete</button>
            <button onClick={toggleCancel}
            className='hover:bg-orange-opacity hover:rounded-2xl p-2 duration-300'>Cancel</button>
        </div>
    </div>
  )
}

export default DeleteConfirmWindow