import {FunctionComponent} from "react"
import { DotsSVG, FolderSVG, RightArrowSVG } from "../../ui/svg/svg"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/store/storeHooks"

interface CategoryProps {
  name: string,
  color: string
}
const CategoryCard: FunctionComponent<CategoryProps> = ({name, color}) => {
  const fileTypedData = useAppSelector(state => state.management.fileTypedData)
  const fileTypedSizes = useAppSelector(state => state.management.fileTypedSizes)
  const workNameVersion = [...name].map(el => el === ' ' ? '-' : el.toLowerCase()).join('')

  const categorySizes = workNameVersion.includes('media') ? (fileTypedSizes['audio'] + fileTypedSizes['video']) 
  : workNameVersion.includes('other') ? fileTypedSizes['othersFiles'] : fileTypedSizes[workNameVersion]

  const categoryData = workNameVersion.includes('media') ? ([...fileTypedData['audio'], ...fileTypedData['video']]) 
  : workNameVersion.includes('other') ? fileTypedData['othersFiles'] : fileTypedData[workNameVersion]
 
  return (
    <div className={`h-full bg-${color} w-[30%] rounded-xl flex flex-col items-center`}>
      <div className="flex flex-col w-10/12 justify-around grow">
        <div className="w-full flex justify-between items-center">
          <div className="bg-white rounded-full w-12 h-12 flex justify-center items-center">
            <FolderSVG size="8"/>
          </div>
          <div className="cursor-pointer">
            <DotsSVG />
          </div>
        </div>
        <div>
          <p>{name}</p>
          <p className="text-xl font-bold">{categoryData?.length !== 0 ? categoryData?.length + " File(s)": "No Files"}</p>
        </div>
        <div className="flex flex-col gap-2 h-10">
          <div className="w-full bg-white h-4 rounded-full shadow-inner border-[1px] border-slate-200">
            <div style={{width: categorySizes/10}} className="bg-red-300 h-full"/>
          </div>
          <div className="flex justify-between">
              <p>{categorySizes === 0 ? 0 + "MB" : categorySizes < 1 ? (categorySizes * 1024).toFixed(0) + "KB" : Number(categorySizes).toFixed(0) + "MB"}</p>
              <p>1GB</p>
            </div>
        </div>
      </div>
      <Link to={`/dashboard/category/${workNameVersion}`}
      className={`border-t-[1px] border-black w-full font-bold flex justify-around h-10 items-center cursor-pointer hover:bg-white duration-500 hover:shadow-sm`}>
        <p>View</p>
        <RightArrowSVG/>
      </Link>
      </div>
  )
}

export default CategoryCard