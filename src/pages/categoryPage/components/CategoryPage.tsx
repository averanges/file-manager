import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import FileItem from "../../../components/cards/FileItem"
import { handleOpenFullImage } from "../../../store/slices/uiSlices"
import { useState, useEffect } from "react"

const CategoryPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [dragIndex, setDragIndex] = useState(null)
  const [dropIndex, setDropIndex] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const fileTypedData = useSelector(state => state.management.fileTypedData)
  const dashExist: boolean = [...id].includes('-')
  const categoryName = dashExist
  ? id?.split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join(' ')
  : id?.split('').map((el, idx) => idx === 0 ? el.toUpperCase() : el).join('');

  const openFullImage = (url) => {
    dispatch(handleOpenFullImage({isOpenFullImage: true, openFullImageSource: url}))
  }
  const handleDragStart = (idx) => {
    setDragActive(true)
    setDragIndex(idx)
  }

  const handleDragOver = (idx) => {
    setDropIndex(idx)
    if (idx !== dragIndex && idx !== null && idx !== dropIndex) {
      setImageGallery(prevGallery => {
        const orderObject = prevGallery.reduce((acc, value, index) => {
          acc[index] = value;
          return acc;
        }, {});
        
        const dragElement = orderObject[dragIndex.toString()]
        const dropElement = orderObject[idx.toString()]
        orderObject[idx.toString()] = dragElement
        orderObject[dragIndex.toString()] = dropElement
    
        return Object.keys(orderObject).map(index => orderObject[index]);
      })
      console.log(imageGallery)
    }
  }
  const handleDragEnd = () => {
    setDragIndex(null)
    setDropIndex(null)
    setDragActive(false)
  }
  console.log(dragActive)
  // let categoryData 
  // let categoryType: string
  //   if (id === 'images'){
  //     categoryData = uploadedData.filter(el => el.fileType.includes('image') )
  //     categoryType = "image"
  //   }
  //   else if (id === "media-&-music") {
  //     categoryData = uploadedData.filter(el => el.fileType.includes('audio') || el.fileType.includes('video'))
  //     categoryType = "media"
  //   }
  //   else if (id === "documents") {
  //     categoryData = uploadedData.filter(el => el.fileType.includes('text') || el.name.includes('docx','pptx'))
  //     categoryType = "documents"
  //   }
  //   else {
  //     categoryData = uploadedData.filter(el => !el.fileType.includes('text') && !el.name.includes('docx') && !el.fileType.includes('audio') && !el.fileType.includes('image'))
  //   }
    useEffect(() => {
      if( id?.includes("media")){
        setCategoryData(fileTypedData['video'].concat(fileTypedData['audio']))
      }
      else if (id?.includes("other")){
        console.log(categoryData)
        setCategoryData(fileTypedData["othersFiles"])
      }
      else {
        setCategoryData(fileTypedData[id])
      }
    }, [])
    const mappedAllData = categoryData?.map((el, idx) => <FileItem key={idx} name={el.name} path={el.fullPath}  fileType={el.fileType} url={el.downloadURL}/>)
  return (
    <div className=' w-full h-full flex justify-center mt-10'>
      <div className='w-8/12 h-full flex flex-col gap-10'>
        <div className='flex w-ful justify-between'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-4xl font-semibold'>{ categoryName }</h2>
            <p className='text-slate-300'>Drag and Drop your file here to start uploading</p>
          </div>
          <div className="bg-white rounded-lg border-2 border-dashed border-orange-prime flex justify-center 
          items-center w-4/12 shadow-md flex-col hover:bg-orange-200 hover:text-white duration-500 cursor-pointer">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-10 h-10 stroke-orange-prime">
                <path strokeLinecap="round" strokeLinejoin="round" 
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <p className='text-2xl'>Upload Your File</p>
          </div>
        </div>
        {id !== "images" ? 
         <div className="flex flex-col gap-5 overflow-y-auto mb-40">
            {mappedAllData }
          </div>
        : 
          <div className="grid grid-cols-4 gap-5 overflow-y-auto mb-40 py-5">
            {categoryData.map((el, idx) => (
              <div key={idx} 
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={() => handleDragOver(idx)}
              // onDragEnd={handleDragEnd}
              onClick={() => openFullImage(el.downloadURL)}
              className="relative w-60 h-60 cursor-pointer drop-shadow-md">
                <div className={`w-full h-full border-2 border-dashed absolute ${dragActive ? "flex" : "hidden"}`}></div>
                <img
                  src={el.downloadURL}
                  alt={`Image ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        }
        </div>
      </div>
  )
}

export default CategoryPage