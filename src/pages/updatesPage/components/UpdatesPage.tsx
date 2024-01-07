import DataListTemplate from "../../../modules/dataListTemplate/components/DataListTemplate"
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