import {useState, Dispatch, FC, SetStateAction} from "react"
import { DeleteSVG, DotsSVG, FolderSVG, OpenSVG } from "../../ui/svg/svg"
import { deleteFolder } from "../../firebase/firebaseActions"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/store/storeHooks"

interface FolderProps {
  name: string,
  color: string,
  deleteSuccess: boolean,
  setDeleteSuccess: Dispatch<SetStateAction<boolean>>
}

const FolderCard: FC<FolderProps> = ({name, color, setDeleteSuccess, deleteSuccess}) => {
  const [openSubMenu, setOpenSubMenu] = useState(false)
  const uploadedData = useAppSelector(state => state.management.allData)
  const currentFolderData = uploadedData.filter(el => el.path.includes(name))
  const linkTo = `dashboard/folder/${encodeURIComponent(name)}`
  
  return (
    <div className={`h-full bg-${color} w-[20%] rounded-xl flex justify-center relative`}>
      <div className={`${openSubMenu ? "scale-y-100" : "scale-y-0"} justify-between
      flex transform origin-top bg-white absolute z-2 top-10 rounded-xl
       right-2 w-fit h-fit p-2 shadow-xl flex-col items-end duration-500`}>
        <div className="flex gap-2 items-center cursor-pointer hover:text-orange-prime duration-300 w-full justify-between">
            <OpenSVG/>
            <Link to={linkTo} 
            className="text-sm">
              Open
            </Link>
        </div>
        <div className="flex gap-2 items-center cursor-pointer hover:text-orange-prime duration-300 w-full justify-between">
            <DeleteSVG/>
            <p className="text-sm" onClick={() => deleteFolder({itemName: name, setSuccess: setDeleteSuccess, deleteSuccess})}>Delete</p>
        </div>
      </div>
      <div className="flex flex-col w-10/12 justify-around p-1 ">
        <div className="w-full flex justify-between items-center">
            <Link to={linkTo}
             className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
              <FolderSVG size="6"/>
            </Link>
            <div className="cursor-pointer">
              <DotsSVG openSubMenu={openSubMenu} setOpenSubMenu={setOpenSubMenu}/>
            </div>
          </div>
          <Link to={linkTo}>{name}</Link>
          <p className="text-lg font-semibold">{currentFolderData.length ? currentFolderData.length  + " File(s)" : "Empty"}</p>
      </div>
  </div>
  )
}

export default FolderCard