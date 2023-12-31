import { useEffect, useState } from 'react'
import { useAppDispatch } from "../store/store/storeHooks"
import { deleteItems } from '../firebase/firebaseActions'
import { handleActionSuccess } from '../store/slices/managementSlice'

const useDeleteItems = () => {
    const [success, setSuccess] = useState(false)
    const dispatch = useAppDispatch()
    const deleteFolderWithDispatch = async (itemName: string[]) => {
        try {
          await deleteItems({ itemName, setSuccess })
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
      }
    useEffect(() => {
        dispatch(handleActionSuccess(true))
        setSuccess(false)
    }, [success, dispatch])
      return {deleteFolder: deleteFolderWithDispatch}

}

export default useDeleteItems