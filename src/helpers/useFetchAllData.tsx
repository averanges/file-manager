import { useEffect } from "react"
import { fetchUploadedData } from "../firebase/firebaseActions"
import { handleActionSuccess, handleAllData, handleDataLoading, handleNewFileUploaded, setUser } from "../store/slices/managementSlice"
import { useAppDispatch, useAppSelector } from "../store/store/storeHooks"
import { useSelector } from "react-redux"
import { RootState } from "../store/store/store"

const useFetchAllData = () => {
    const actionSuccess = useAppSelector(state => state.management.actionSuccess)
    const isDataLoading = useAppSelector(state => state.management.isDataLoading)
    const newFileUploaded = useAppSelector(state => state.management.newFileUploaded)
    const isFolderAdded = useAppSelector(state => state.management.newFolderAdded)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(handleNewFileUploaded(false))
        dispatch(handleActionSuccess(false))
        const fetchData = async () => {
            try {
                const {itemsData, user} = await fetchUploadedData()
                const updatedData = itemsData?.filter(el => !el?.path?.includes('folders'))
                const foldersList = itemsData?.filter(el => el?.path?.includes('folders'))
                dispatch(handleAllData({updatedData, foldersList}))
                dispatch(setUser(user))
                if (updatedData) {
                    dispatch(handleDataLoading(false))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[newFileUploaded, isFolderAdded, actionSuccess])

    return { isDataLoading }
}

export default useFetchAllData