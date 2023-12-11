import { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'

const MusicControl = ({getDuration, volume, mute, getTimePassed, scrollToTime}) => {
    const trackData = useSelector(state => state.ui.musicActive)
    const url = trackData?.trackData?.url;
    const isPlaying = trackData?.isActive
    const audioRef = useRef(null)
    const totalDuration = audioRef?.current?.getDuration()

    const onProgressControl = (progressValue) => {
      getDuration({totalDuration})
      getTimePassed({progressValue})}

    useEffect (() => {
        audioRef.current.seekTo(scrollToTime)
    }, [scrollToTime])
  return (
    <ReactPlayer style={{display: "none"}} playing={isPlaying} volume={volume/100} muted={mute} 
     url={url} ref={audioRef} controls onProgress={(progress) => onProgressControl(progress.playedSeconds)}>MusicControl</ReactPlayer>
  )
}

export default MusicControl 