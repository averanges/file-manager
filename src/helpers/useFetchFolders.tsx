import { useEffect } from "react"
import { fetchAllFolders } from "../firebase/firebaseActions"
import { handleAllFolders, handleFoldersLoading } from "../store/slices/managementSlice"
import { useAppDispatch } from "../store/store/storeHooks"
import { useSelector } from "react-redux"
import { RootState } from "../store/store/store"

const useFetchFolders = (id) => {
    const isFoldersLoading = useSelector((state: RootState) => state.management.isFoldersLoading)
    const dispatch = useAppDispatch()

    useEffect (() => {
        const getExistedFolders = async (): Promise<void> => {
            const foldersData = await fetchAllFolders()
            dispatch(handleAllFolders(foldersData))
            if (foldersData) {
                dispatch(handleFoldersLoading(false))
            }
        }
        getExistedFolders()   
    }, [])

    return { isFoldersLoading }
}

export default useFetchFolders