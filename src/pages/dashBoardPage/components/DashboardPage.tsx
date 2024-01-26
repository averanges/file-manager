import {useState, useEffect} from "react"
import CategoryCard from "../../../components/cards/CategoryCard"
import FolderCard from "../../../components/cards/FolderCard"
// import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { opacityColors } from "../../../consts/colors";
import ListItem from "../../../components/cards/ListItem";
// import { useDataSetDoughnut } from "../../../const";
import { useAppDispatch, useAppSelector } from "../../../store/store/storeHooks";
import { handleOpenModal } from "../../../store/slices/uiSlices";
import { useSelector } from "react-redux";
import { auth } from "../../../config/firebaseConfig";
import { Link } from "react-router-dom";
import categoryTypes from "./consts/categoryConsts";
import { RootState } from "../../../store/store/store";
import MobileDashboardPage from "./MobileDashboardPage";

ChartJS.register(ArcElement, Tooltip, Legend);


const DashboardPage = () => {
const dispatch = useAppDispatch()
const uploadedData = useSelector((state:RootState) => state.management.allData)
const foldersData = useAppSelector(state => state.management.foldersList)

// const {images, audio, video, documents, othersFiles, allData} = useSelector((state:RootState) => state.management.fileTypedSizes)
// const { dataSetDoughnut } = useDataSetDoughnut({ documentsFilesSize : documents,  imageFilesSize: images, mediaFilesSize: audio + video, otherFilesSize: othersFiles})

const [deleteSuccess, setDeleteSuccess] = useState(false)
const [windowWidth, setWindowWidth] = useState(window.innerWidth)

useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window])
  
const colorsArray = Object.values(opacityColors)
const mappedFoldersList = [...foldersData]
    .sort((folderA, folderB) => {
        const dataA = uploadedData.filter(el => el?.path?.includes(`${folderA.name}/`));
        const dataB = uploadedData.filter(el => el?.path?.includes(`${folderB.name}/`));
        const timestampA = dataA.length > 0 ? Math.max(...dataA.map(file => new Date(file.timestamp).getTime())) : 0;
        const timestampB = dataB.length > 0 ? Math.max(...dataB.map(file => new Date(file.timestamp).getTime())) : 0;
        return timestampB - timestampA
        })
    .slice(0,4)
    .map((el,idx) => {
    if (el.path) {
        return <FolderCard 
            key={idx}
            deleteSuccess={deleteSuccess} 
            setDeleteSuccess={setDeleteSuccess} 
            name={el.name} 
            color={colorsArray[idx]}
            folderPath={el?.path}
            />
    }
        })  


const openModalWindow = (): void => {
    dispatch(handleOpenModal({open: true, id: 'My Files'}))
}

  return (
    <>
        { windowWidth < 576 ? 
        <MobileDashboardPage/>
        :
        <div className="w-11/12 h-full flex">
            <div className="w-full xl:w-full h-full flex flex-col gap-5 bg-red-500">
                <div className="flex justify-between px-6 h-2/12">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">My Cloud</h2>
                        <p className="text-slate-400">Hi <span className="text-xl">{auth.currentUser?.displayName}</span>, Welcome Back!</p>
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
                    <div className="flex justify-between gap-10 h-full">
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
                            <tr className="flex gap-40 px-10">
                                <th className="flex-grow flex justify-start">Name</th>
                                <th className="flex gap-20">
                                    <p>Size</p>
                                    <p>Folder</p>
                                </th>
                                <th>Last Modified</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {uploadedData.slice(0, 3).map((el, idx) => (
                            <ListItem key={idx} name={el.name} downloadURL={el.downloadURL} path={el.path}
                            fileSize={el.fileSize} fileType={el.fileType} timestamp={el.timestamp} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div className="hidden xl:w-[33%] xl:flex gap-10 flex-col items-center">
                <h2 className="text-2xl font-bold">Storage Details</h2>
                <Doughnut data={dataSetDoughnut}/>
                <div className="flex justify-center flex-col gap-2">
                    <p className="text-5xl font-bold">{allData.toFixed(0)}MB</p>
                    <div className="flex justify-center">
                        <p className="text-xl text-slate-400">of 5GB</p>
                    </div>
                </div>
            </div> */}
        </div>}
    </>
  )
}

export default DashboardPage
