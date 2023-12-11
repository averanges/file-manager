import { useEffect } from "react"
import { fetchUploadedData } from "../firebase/firebaseActions"
import { handleAllData, handleDataLoading, handleNewFileUploaded } from "../store/slices/managementSlice"
import { useAppDispatch } from "../store/store/storeHooks"
import { useSelector } from "react-redux"
import { RootState } from "../store/store/store"

const useFetchAllData = () => {
    const isDataLoading = useSelector((state: RootState) => state.management.isDataLoading)
    const newFileUploaded = useSelector((state: RootState) => state.management.newFileUploaded)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(handleNewFileUploaded(false))
        const fetchData = async () => {
            try {
                const itemsData = await fetchUploadedData()
                const updatedData = itemsData.filter(el => !el.path.includes('folders'))
                console.log(updatedData)
                dispatch(handleAllData(updatedData))
                if (updatedData) {
                    dispatch(handleDataLoading(false))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[newFileUploaded])

    return { isDataLoading }
}

export default useFetchAllData