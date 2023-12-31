import { useEffect } from "react"
import { fetchAllFolders } from "../firebase/firebaseActions"
import { handleActionSuccess, handleAllFolders, handleFoldersLoading, handleNewFolderAdded } from "../store/slices/managementSlice"
import { useAppDispatch, useAppSelector } from "../store/store/storeHooks"
import { useSelector } from "react-redux"
import { RootState } from "../store/store/store"

const useFetchFolders = () => {
    const actionSuccess = useAppSelector(state => state.management.actionSuccess)
    const isFoldersLoading = useAppSelector(state => state.management.isFoldersLoading)
    const isFolderAdded = useAppSelector(state => state.management.newFolderAdded)
    const dispatch = useAppDispatch()

    useEffect (() => {
        dispatch(handleNewFolderAdded(false))
        dispatch(handleActionSuccess(false))
        const getExistedFolders = async (): Promise<void> => {
            const foldersData = await fetchAllFolders()
            dispatch(handleAllFolders(foldersData))
            if (foldersData) {
                dispatch(handleFoldersLoading(false))
            }
        }
        getExistedFolders()   
    }, [isFolderAdded, actionSuccess])

    return { isFoldersLoading }
}

export default useFetchFolders