import { useEffect, useState } from 'react'
import { fetchUploadedData } from '../../../firebase/firebaseActions'

const AllFoldersPage = () => {
    const [existedFolders, setExistedFolders] = useState([])
    useEffect(() => {
        const handleFetchFolders = async () => {
            const allExistedFolders = await fetchUploadedData()
            setExistedFolders(allExistedFolders)
        }
        handleFetchFolders()
        console.log(existedFolders)
    }, [])
    
  return (
    <div>1</div>
  )
}

export default AllFoldersPage