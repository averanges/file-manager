import { useState, useEffect } from "react"
import ListItem, { fileSizeToBytes, formatDate } from "../../../components/cards/ListItem"
import { useAppDispatch, useAppSelector } from "../../../store/store/storeHooks"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { IUploadedDataItem, addToFavorite } from "../../../firebase/firebaseActions"
import { DeleteSVG, DownloadSVG, DuplicateSvg, FolderSVG, GlassSvg, PauseSVG, PlaySVG, PreviewSVG, RenameSvg, StarSvg } from "../../../ui/svg/svg"
import { saveAs } from 'file-saver'
import { handleAuidoPlayer, handleDeleteConfirm, handleMoveAndCopy, handleMusicActive, handleOpenFullImage, handleRenameAction } from "../../../store/slices/uiSlices"
import { generateFolderLinks } from "../../../pages/folderPage/components/FolderPage"
import { handleSubFolderData } from "../../../components/cards/FolderCard"
import ImageLoader from "../../../pages/categoryPage/components/ImageLoader"


export interface ICurrentItem {
  name: string,
  timestamp: string,
  fileSize: number,
  fileTypeName: string,
  path: string, 
  url: string, 
  favorites: boolean, 
  fileTypeCategory: string
}

interface IDatalListTeplate  {
  folderAddress?: string,
  folderLinks?: object[],
  currentFolderData: IUploadedDataItem[]
}
const DataListTemplate = ({folderAddress, currentFolderData}: IDatalListTeplate) => {
    const { id } = useParams()
    const location = useLocation().pathname
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [currentFileDetails, setCurrentFileDetails] = useState<ICurrentItem[]>([])
    const [openListItemMenu, setOpenListItemMenu] = useState(false)

    const musicActive = useAppSelector(state => state.ui.musicActive)
    const actionSuccess = useAppSelector(state => state.management.actionSuccess)
    const allFolders = useAppSelector(state => state.management.allFolders)
    const allData = useAppSelector(state => state.management.allData)
    const subFolderData = currentFileDetails[0]?.path.split('/').includes('folders') ? handleSubFolderData({data: allData, name: currentFileDetails[0]?.name}) : null

    const previewFile = (currentDownloadLink: string) => {
        window.open(currentDownloadLink, '_blank')
    }
      const folderLinks = allFolders && Object.keys(allFolders).length > 0 ? 
      generateFolderLinks({folders: allFolders, path: id, type: "main", setCurrentFileDetails, setOpenListItemMenu}) : null

      useEffect(() => {
        if (actionSuccess) {
          setCurrentFileDetails([])
        }
        if(!currentFileDetails.length) {
          setOpenListItemMenu(false)
        }
      }, [actionSuccess, currentFileDetails])
      useEffect(() => {
        setCurrentFileDetails([])
        setOpenListItemMenu(false)
      }, [location])
      
      const mappedAllData = currentFolderData?.map((el, idx) => 
        <ListItem key={idx} 
          setCurrentFileDetails={setCurrentFileDetails} path={el.path}
          setOpenListItemMenu={setOpenListItemMenu} currentFileDetails={currentFileDetails}
          name={el.name} url={el.downloadURL} fileSize={el.fileSize} c
          fileType={el.fileType} timestamp={el.timestamp} favorites={el.favorites}
        />)
        
        const downloadItem = () => {
            if (currentFileDetails.length === 1 && currentFileDetails[0].url) {
              fetch(currentFileDetails[0].url)
                .then(response => response.blob())
                .then(blob => {
                  saveAs(blob, currentFileDetails[0]?.name || 'downloaded-file')
                })
                .catch(error => console.error('Error fetching or saving file:', error));
            }
          }

      const manipulateItems = currentFileDetails.length ? currentFileDetails : null
      const toggleDeleteItem = () => {
        dispatch(handleDeleteConfirm({open: true, path: manipulateItems}))
      }
      
      const activeTrack = musicActive.trackData.name === currentFileDetails[0]?.name

      const playAudio = () => {
        dispatch(handleAuidoPlayer(true))
        dispatch(handleMusicActive({ trackData: currentFileDetails[0], isActive: true }));
      }
    
      const pauseAudio = () => {
        dispatch(handleMusicActive({ ...musicActive, isActive: false }));
      }
      const toggleAddToFavorite = () => {
        setCurrentFileDetails(prev => {
          return prev.map(el => ({
            ...el,
            favorites: !el.favorites
          }));
        });
        
        addToFavorite(currentFileDetails[0].path, currentFileDetails[0]?.favorites)
      }

      const openFullImage = (url: string) => {
        dispatch(handleOpenFullImage({isOpenFullImage: true, openFullImageSource: url}))
      }
      const toggleCloseTab = () => {
        setOpenListItemMenu(false)
        setCurrentFileDetails([])
      }
      return (
        <div className="flex w-full h-full gap-10 md:px-5">
          <div className="flex flex-col md:gap-5 w-full xl:w-[75%]">
            <div className="flex w-full justify-between">
               <h3 className="text-3xl ml-10 tracking-widest">{folderAddress}</h3>
              { 
              openListItemMenu ?
              (<div className={`${currentFileDetails.length && currentFileDetails.length <= 1 && currentFileDetails[0]?.fileTypeCategory !== "Application" ? "gap-20" : 'gap-5'}
              w-fit bg-white h-full shadow-lg shadow-slate-300/50 border-[1px] border-slate-100 rounded-full flex items-center px-2 justify-between relative`}>
                  <div onClick={toggleCloseTab}
                  className="flex justify-center items-center w-fit h-full text-xl ml-2 cursor-pointer hover:text-orange-prime duration-300">
                    <p>X</p>
                  </div>
                  {currentFileDetails.length && currentFileDetails.length <= 1 && currentFileDetails[0]?.fileTypeCategory !== "Application" &&
                  <div className="absolute left-10 w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-md
                   shadow-slate-200 duration-300">
                    <div>
                      {
                        currentFileDetails.length === 1 && 
                        (currentFileDetails[0]?.fileTypeCategory === "Audio" || currentFileDetails[0]?.fileTypeCategory === "Video") 
                        ? 
                        <div>
                           {
                            !musicActive.isActive ?  
                            <PlaySVG size={8} playMusicButton={playAudio}/>
                            : musicActive.isActive && activeTrack 
                            ?
                            <PauseSVG pauseMusicButton={pauseAudio} size={8} />
                            :
                            <PlaySVG size={8} playMusicButton={playAudio}/>
                           }
                        </div>
                        : currentFileDetails[0].fileTypeCategory === "Image" 
                        ? 
                        <div onClick={() => openFullImage(currentFileDetails[0].url)}>
                          <GlassSvg size={6}/>
                        </div>
                        : subFolderData ? 
                        <div onClick={() => {
                          const basePath = currentFileDetails[0].path.split('/')
                          const folderPath = basePath.slice(3, basePath.length - 1).filter(el => el !== 'folders').join('/')
                          const encodedPath = encodeURIComponent(folderPath + "/" + currentFileDetails[0].name)
                          navigate("/dashboard/folder/" + encodedPath)
                        }}
                        className="cursor-pointer hover:text-orange-prime">
                          <FolderSVG size={'6'}/> 
                        </div>
                        : 
                        <div onClick={() => previewFile(currentFileDetails[0].url)}>
                          <PreviewSVG size={6}/>
                        </div>
                      }
                    </div>
                  </div>}
                  <div className="flex gap-5 items-center">
                    {currentFileDetails.length && currentFileDetails.length <= 1 && 
                   (<div className="flex gap-5">
                    <div onClick={() => {dispatch(handleRenameAction({name: currentFileDetails[0].name, path: currentFileDetails[0].path, open: true}))}}>
                      <RenameSvg size={6}/>
                    </div>
                    { location.split('/').includes('folder') ?
                      (<div onClick={() => dispatch(handleMoveAndCopy({open: true, path: currentFileDetails[0].path, name: currentFileDetails[0].name, id}))}>
                        <DuplicateSvg size={6} />
                      </div>)
                      :
                      null
                    }
                    </div>)
                    }
                    <div onClick={toggleAddToFavorite}>
                      <StarSvg size={6} filled={currentFileDetails.length  && currentFileDetails.some(el => el.favorites === false) ? false : true}/>
                    </div>
                    <div onClick={downloadItem}>
                        <DownloadSVG size={5} />
                    </div>
                    <div onClick={toggleDeleteItem}>
                      <DeleteSVG size={5}/>
                    </div>
                  </div>
               </div>)
               : 
               null
               }
            </div>
            {
            folderAddress !== "Images" ?
            (<table className="w-full overflow-y-scroll h-full md:mb-28">
                <thead className="hidden md:block">
                    <tr className="flex gap-40 px-10">
                         <th className="flex-grow">
                          <p className="w-fit cursor-pointer hover:text-orange-prime duration-300 ml-8">Name</p>
                         </th>
                         <th className="flex gap-16">
                            <p className="cursor-pointer hover:text-orange-prime duration-300">Size</p>
                            <p className="cursor-pointer hover:text-orange-prime duration-300">
                              {location.split('/').some(el => el === 'folder') ? "Category" : "Folder"}
                              </p>
                         </th>
                        <th className="cursor-pointer hover:text-orange-prime duration-300">Last Modified</th>
                    </tr>
                 </thead>
                 <tbody className="w-full overflow-y-scroll h-full flex flex-col ">
                    {folderLinks}
                    {mappedAllData}
                 </tbody>
            </table>)
            :
            <ImageLoader currentFileDetails={currentFileDetails} currentFolderData={currentFolderData} 
            setCurrentFileDetails={setCurrentFileDetails} setOpenListItemMenu={setOpenListItemMenu}/>
            }
          </div>
          <div className="w-[25%] h-full flex-col gap-5 xl:flex hidden">
            <h3 className="text-xl text-slate-400">{currentFileDetails.length && currentFileDetails[0].name ? currentFileDetails[0].name : folderAddress}</h3>
            <div className="w-full h-1/2 bg-white shadow-md shadow-slate-300 rounded-2xl flex flex-col items-center gap-2">
              {currentFileDetails.length <= 1 && currentFileDetails[0]?.fileTypeCategory === "Image" ?
                (<div className="w-[80%] shadow-inner h-60 p-2 border-2">
                  <img className="w-full h-full object-contain"
                  src={currentFileDetails[0]?.url} alt="" />
                </div>)
                :
                <div className="mt-10"></div>
              }
              {
                currentFileDetails.length === 1 && subFolderData || currentFileDetails.length > 1 ?
                (<div className="flex gap-3">
                  <p className="text-slate-400">{subFolderData ? 'Items: ' : 'Selected:' }</p>
                  <p>{subFolderData ? subFolderData.length + " items" : currentFileDetails.length + " items"}</p>
                </div>)
                : !currentFileDetails.length ?
                  (<div className="flex gap-3">
                    <p className="text-slate-400">Listing: </p>
                    <p>{currentFolderData.length + " items"}</p>
                  </div>)
                  : null
              }
              {currentFileDetails.length && currentFileDetails[0]?.fileTypeName ?
              (<div className="flex gap-3">
                <p className="text-slate-400">Type: </p>
                <p>{currentFileDetails.length === 1 ? currentFileDetails[0]?.fileTypeName?.toUpperCase() 
                : currentFileDetails.length > 1 ? currentFileDetails.map(el => el?.fileTypeName?.toUpperCase()).reduce((prevValue, acc) => acc + ", " + prevValue) : null}</p>
              </div>)
              :null
              }
              <div className="flex gap-3">
                <p className="text-slate-400">Size: </p>
                <p>
                  {
                    !currentFileDetails.length
                      ? fileSizeToBytes(currentFolderData.map((el) => el?.fileSize).reduce((acc, fileSize) => acc + fileSize, 0))
                      : subFolderData ?
                      fileSizeToBytes(subFolderData.map((el) => el?.fileSize).reduce((acc, fileSize) => acc + fileSize, 0))
                      : currentFileDetails.length === 1 && !subFolderData 
                        ? fileSizeToBytes(currentFileDetails[0]?.fileSize)
                        : fileSizeToBytes(currentFileDetails.map((el) => el?.fileSize).reduce((acc, fileSize) => acc + fileSize, 0))
                  }
                </p>
              </div>
              {currentFileDetails.length === 1 && !subFolderData ?
                (<div className="flex gap-3">
                  <p className="text-slate-400">Created: </p>
                  <p>{currentFileDetails[0]?.timestamp && formatDate(currentFileDetails[0]?.timestamp)}</p>
                </div>)
                : null
              }
            </div>
          </div>
        </div>
      )
}

export default DataListTemplate

{/* ${dragActive ? "flex" : "hidden"} */}
