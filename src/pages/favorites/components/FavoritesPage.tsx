import { useAppSelector } from "../../../store/store/storeHooks"
import DataListTemplate from "../../../modules/dataListTemplate/components/DataListTemplate"

const FavoritesPage = () => {
  const uploadedData = useAppSelector(state => state.management.allData)
  const filteredData = uploadedData.filter(el => el.favorites === true)

  return (
    <div className="w-full">
      <DataListTemplate currentFolderData={filteredData} folderAddress="Favorites"/>
    </div>
  )
}

export default FavoritesPage