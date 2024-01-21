import { useState} from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../store/store/storeHooks'
import { handleAuidoPlayer, handleMusicActive } from '../../store/slices/uiSlices'
import MusicControl from './MusicControl'
import { secondsIntoMinutes } from '../../helpers/secondsInotMinutes'
import { RootState } from '../../store/store/store'
import { PauseSVG, PlaySVG } from '../../ui/svg/svg'

const AudioPlayerComponent = () => {
    const dispatch = useAppDispatch();
    const trackData = useSelector((state: RootState) => state.ui.musicActive);
    const [duration, setDuration] = useState(0);
    const [timePassed, setTimePassed] = useState(0);

    const [volume, setVolume] = useState(50);
    const [scrollToTime, setScrollToTime] = useState<number | null>(null);
  
    const getDuration = ({ totalDuration }: {totalDuration: number}) => {
      setDuration(totalDuration)
    }
    const getTimePassed = ({ progressValue } : {progressValue: number}) => setTimePassed(progressValue);
  
    const volumeControl = (e: React.ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value));
  
    const toggleAudioPlay = () => {
      dispatch(handleMusicActive({ ...trackData, isActive: true }));
    };
  
    const toggleAudioPause = () => {
      dispatch(handleMusicActive({ ...trackData, isActive: false }));
    };
  
    const audioPlayerOpen = useAppSelector(state => state.ui.audioPlayerOpen);
    const [mute, setMute] = useState(false);
  
    const closePlayer = () => {
      dispatch(handleMusicActive({ ...trackData, isActive: false }));
      dispatch(handleAuidoPlayer(false));
    };
  
    const handleScrollAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setTimePassed((Number(value)));
      setScrollToTime(Number(value));
    };
  
  return (
    <>
      <div className={`duration-ha500 shadow-2xl h-20 w-full border-t-[1px] border-slate-200 flex justify-around items-center
       bg-white absolute -bottom-2 left-0 ${audioPlayerOpen ? "" : 'translate-y-[150%] hidden'} `}>
        <MusicControl getDuration={getDuration} mute={mute} volume={volume} getTimePassed={getTimePassed} scrollToTime={scrollToTime || 0}/>
        <div>
          <p className='text-xl'>{trackData?.trackData?.name}</p>
        </div>
        <div className='flex gap-5 items-center'>
            <div className='cursor-pointer hover:text-orange-opacity duration-300'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
              </svg>
            </div>
            { trackData.isActive ?
                <div onClick={toggleAudioPause}
                    className="cursor-pointer hover:text-orange-opacity duration-300" >
                    <PauseSVG size={8}/>
                </div>
                :
                <div onClick={toggleAudioPlay}
                    className="cursor-pointer hover:text-orange-opacity duration-300" >
                    <PlaySVG size={8}/>
                </div>
            }
            <div className='cursor-pointer hover:text-orange-opacity duration-300'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
              </svg>
            </div>
        </div>
        <div className='w-[30%] flex gap-4'>
            <p>{secondsIntoMinutes(timePassed)}</p>
            <input type="range" name="" id="" max={Math.floor(duration)} min={0} step={0.1} value={Math.floor(timePassed)} onChange={(e) => handleScrollAudio(e)}
            className="appearance-none bg-transparent cursor-pointer w-full
            [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:shadow-inner
             [&::-webkit-slider-runnable-track]:bg-black/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 
             [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm 
             [&::-webkit-slider-thumb]:shadow-black [&::-webkit-slider-thumb]:active:shadow-orange-opacity"/>
             <p>{secondsIntoMinutes(duration)}</p>
        </div>
        <div>
          <div className='flex gap-5 items-center relative' >
            <div onClick={closePlayer}
            className='absolute -top-14 -right-16 bg-white w-16 h-8 flex justify-center border-t-[1px] border-slate-200 hover:text-orange-opacity duration-300 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
              {mute ?
             <div className='cursor-pointer hover:text-orange-opacity duration-300' onClick={() => setMute(false)} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
             </div>
              : 
              <div className='cursor-pointer hover:text-orange-opacity duration-300' onClick={() => setMute(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              }
            <input type="range" name="" id="" value={volume} onChange={(e) => volumeControl(e)}
                className="appearance-none bg-transparent cursor-pointer
                [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:shadow-inner
                [&::-webkit-slider-runnable-track]:bg-black/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm 
                [&::-webkit-slider-thumb]:shadow-black [&::-webkit-slider-thumb]:active:shadow-orange-opacity"/>
            </div>
          </div>
        </div>
    </>
  )
}

export default AudioPlayerComponent
