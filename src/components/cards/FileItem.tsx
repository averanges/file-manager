import { FC } from 'react'
import { AudioSVG, DocumentSVG, DotsSVG, PauseSVG, PlaySVG, VideoSVG } from '../../ui/svg/svg'
import { useAppDispatch } from '../../store/store/storeHooks'
import { handleAuidoPlayer, handleMusicActive } from '../../store/slices/uiSlices'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store/store'
export interface IFileItem {
    name: string,
    path?: string,
    categoryType?: string,
    url?: string,
    fileType?: string | undefined
}

const FileItem: FC<IFileItem> = (trackData: IFileItem) => {
    const musicActive = useSelector((state: RootState) => state.ui.musicActive)
    const dispatch = useAppDispatch()
    let fileType 
    if(typeof(trackData.fileType) !== "undefined"){
       fileType = trackData.fileType.includes('video') ? "video" : trackData.fileType.includes('audio') ? "audio" : "document"
    }

    const activeTrack = musicActive.trackData.name === trackData.name

    const playAudio = () => {
      dispatch(handleAuidoPlayer(true))
      dispatch(handleMusicActive({ trackData, isActive: true }));
    };
  
    const pauseAudio = () => {
      dispatch(handleMusicActive({ ...musicActive, isActive: false }));
    };
        return (
            <div className="w-full">
                <div 
                className="h-24 w-full rounded-xl bg-white shadow-md flex justify-between items-center px-5 py-2">
                <div className="flex gap-5">
                    {fileType === "video" ? <VideoSVG/> : null}
                    {fileType === "document" ? <DocumentSVG/> : null}
                    {fileType === "audio" ? <AudioSVG/> : null}
                    <div className="flex flex-col justify-around">
                        <p className="font-semibold">Uploaded</p>
                        <p>{trackData?.name}</p>
                    </div>
                </div>
                <div className="cursor-pointer flex gap-2 items-center">
                        {(fileType === 'audio' || fileType === 'video') &&
                            <div className="hover:text-orange-opacity duration-500">
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
                        }
                    {/* <div className="hover:text-orange-opacity duration-500">
                        <DeleteSVG/>
                    </div> */}
                    <div className="hover:text-orange-opacity duration-500">
                        <DotsSVG/>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default FileItem