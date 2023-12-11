import {useState, FC, Dispatch, SetStateAction} from "react"
import CategoryCard from "../../../components/cards/CategoryCard"
import FolderCard from "../../../components/cards/FolderCard"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { opacityColors } from "../../../consts/colors";
import { useFileChange } from "../../../firebase/firebaseActions";
import ListItem from "../../../components/cards/ListItem";
import { useDataSetDoughnut } from "../../../const";
import { useAppDispatch, useAppSelector } from "../../../store/store/storeHooks";
import { handleOpenModal } from "../../../store/slices/uiSlices";
import { useSelector } from "react-redux";
import { auth } from "../../../config/firebaseConfig";
import { Link } from "react-router-dom";
import categoryTypes from "./consts/categoryConsts";
import { RootState } from "../../../store/store/store";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ICloudPageProps {
    setOpenModalWindow: Dispatch<SetStateAction<boolean>>,
    newFolderSuccess: boolean
}

const DashboardPage: FC<ICloudPageProps> = () => {
const { uploadNewFile } = useFileChange()

const dispatch = useAppDispatch()
const uploadedData = useSelector((state:RootState) => state.management.allData)
const foldersData = useAppSelector(state => state.management.allFolders)

const {images, audio, video, documents, othersFiles, allData} = useSelector((state:RootState) => state.management.fileTypedSizes)
const { dataSetDoughnut } = useDataSetDoughnut({ documentsFilesSize : documents,  imageFilesSize: images, mediaFilesSize: audio + video, otherFilesSize: othersFiles})

const [deleteSuccess, setDeleteSuccess] = useState(false)

const colorsArray = Object.values(opacityColors)


const mappedFoldersList = Object.keys(foldersData)
    .slice(0,4)
    .map((el,idx) => 
        <FolderCard 
            key={idx}
            deleteSuccess={deleteSuccess} 
            setDeleteSuccess={setDeleteSuccess} 
            name={el} 
            color={colorsArray[idx]}
            />
        )  


const openModalWindow = (): void => {
    dispatch(handleOpenModal({open: true, id: ''}))
}

  return (
    <>
        <div className="w-11/12 h-full flex">
            <div className="w-8/12 h-full flex flex-col gap-5">
                <div className="flex justify-between px-6 h-2/12">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">My Cloud</h2>
                        <p className="text-slate-400">Hi <span className="text-xl">{auth.currentUser?.displayName}</span>, Welcome Back!</p>
                    </div>
                    <div 
                    className="flex justify-center items-center gap-2 w-32 rounded-lg font-bold text-white text-xl bg-orange-prime 
                    shadow-md h-14 hover:shadow-lg border-2 hover:border-white duration-500">
                        <input onChange={(e) => uploadNewFile(e, 'click')}
                        type="file" name="file" id="file" className="hidden h-full w-full bg-red-500"/>
                        <label htmlFor="file" className="w-full h-full cursor-pointer flex justify-center items-center">+ Add</label>
                    </div>
                </div>
                <div className="px-6 h-[25%] flex gap-5 ">
                    {categoryTypes.map((el, idx) => <CategoryCard key={idx} name={el.name} color={el.color}/>)}
                </div>
                <div className="px-6 h-1/5 flex flex-col gap-5">
                    <div className="flex justify-between">
                        <p className="text-2xl font-bold">Recent Folders</p>
                        <Link to='/all-folders' className="text-orange-prime underline text-lg cursor-pointer">See More</Link>
                    </div>
                    <div className="flex gap-20 h-full">
                        {mappedFoldersList}
                        {mappedFoldersList.length < 4 ? 
                       ( <div 
                        className="h-full w-[20%] border-dashed border-2 border-orange-opacity flex 
                        justify-center items-center text-orange-opacity text-4xl cursor-pointer 
                        hover:border-orange-prime hover:text-orange-prime duration-500"
                        onClick={openModalWindow}>
                            <p>Folder +</p>
                        </div>) 
                        : null
                        }
                    </div>
                </div>
                <div className="px-6 w-full flex flex-col gap-2">
                    <div className="flex justify-between">
                         <p className="text-2xl font-bold">Recent Files</p>
                         <Link to="/updates" className="text-orange-prime underline text-lg cursor-pointer">See More</Link>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="w-4/12">Name</th>
                                <th>Size</th>
                                <th>Folder</th>
                                <th>Last Modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uploadedData.slice(0,3).map((el,idx) => <ListItem key={idx} itemName={el.name} downloadURL={el.downloadURL}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-4/12 flex gap-10 flex-col items-center">
                <h2 className="text-2xl font-bold">Storage Details</h2>
                <Doughnut data={dataSetDoughnut}/>
                <div className="flex justify-center flex-col gap-2">
                    <p className="text-5xl font-bold">{allData.toFixed(0)}MB</p>
                    <div className="flex justify-center">
                        <p className="text-xl text-slate-400">of 5GB</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DashboardPage

// const CloudPage = () => {
//   return (
//   <div className="bg-blue-opacity">CloudPage</div>
// <div className="bg-purple-opacity">CloudPage</div>
// <div className="bg-pink-opacity">CloudPage</div>
// <div className="bg-orange-opacity">CloudPage</div>
// <div className="bg-blue-prime">CloudPage</div>
// <div className="bg-pink-prime">CloudPage</div>
// <div className="bg-purple-prime">CloudPage</div> 
//   )
// }

// export default CloudPage