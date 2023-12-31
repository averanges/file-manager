import { useSelector } from "react-redux"
import FileItem from "../../../components/cards/FileItem"
import { useFileChange } from "../../../firebase/firebaseActions"
import { RootState } from "../../../store/store/store"
import DataListTemplate from "../../../modules/dataListTemplate/components/DataListTemplate"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "../../../store/store/storeHooks"

const UpdatesPage = () => {
  const uploadedData = useAppSelector(state => state.management.allData)
  const sortedData =[...uploadedData].sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime()
    const timestampB = new Date(b.timestamp).getTime()
    return timestampB - timestampA;
  });

  return (
    <div className=' w-full h-full flex justify-center'>
      <DataListTemplate currentFolderData={sortedData} folderAddress="Updates"/>
    </div>
  )
}

export default UpdatesPage