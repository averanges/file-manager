import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAppSelector } from "../../../store/store/storeHooks"
import DataListTemplate from "../../../modules/dataListTemplate/components/DataListTemplate"
import { IUploadedDataItem } from "../../../firebase/firebaseActions"

const CategoryPage = () => {
  const { id } = useParams()
  // const dispatch = useDispatch()

  // const [dragIndex, setDragIndex] = useState(null)
  // const [dropIndex, setDropIndex] = useState(null)
  const [categoryData, setCategoryData] = useState<IUploadedDataItem[]>([])
  // const [dragActive, setDragActive] = useState(false)

  const fileTypedData = useAppSelector(state => state.management.fileTypedData)
  const dashExist: boolean = id?.split('').includes('-') || false

  const categoryName = dashExist
  ? id?.split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join(' ')
  : id?.split('').map((el, idx) => idx === 0 ? el.toUpperCase() : el).join('')

  // const currentFolder = id?.split('/').slice(-1)[0]

  // const openFullImage = (url) => {
  //   dispatch(handleOpenFullImage({isOpenFullImage: true, openFullImageSource: url}))
  // }
  // const handleDragStart = (idx) => {
  //   setDragActive(true)
  //   setDragIndex(idx)
  // }

  // const handleDragOver = (idx) => {
  //   setDropIndex(idx)
  //   if (idx !== dragIndex && idx !== null && idx !== dropIndex) {
  //     setImageGallery(prevGallery => {
  //       const orderObject = prevGallery.reduce((acc, value, index) => {
  //         acc[index] = value;
  //         return acc;
  //       }, {});
        
  //       const dragElement = orderObject[dragIndex.toString()]
  //       const dropElement = orderObject[idx.toString()]
  //       orderObject[idx.toString()] = dragElement
  //       orderObject[dragIndex.toString()] = dropElement
    
  //       return Object.keys(orderObject).map(index => orderObject[index]);
  //     })
  //   }
  // }
  // const handleDragEnd = () => {
  //   setDragIndex(null)
  //   setDropIndex(null)
  //   setDragActive(false)
  // }

    useEffect(() => { 
      if(id) {
        if( id?.includes("media")){
          setCategoryData(fileTypedData['video'].concat(fileTypedData['audio'] ))
        }
        else if (id?.includes("other")){
          setCategoryData(fileTypedData["othersFiles"])
        }
        else {
          setCategoryData(fileTypedData[id])
        }
      }
    }, [])

  return (
    <div className="w-full">
      <DataListTemplate currentFolderData={categoryData} folderAddress={categoryName}/>
    </div>
  )
}

export default CategoryPage