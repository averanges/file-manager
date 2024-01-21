import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useAppSelector } from '../../store/store/storeHooks';

interface MusicControlProps {
  getDuration: (data: { totalDuration: number }) => void;
  volume: number;
  mute: boolean;
  getTimePassed: (data: { progressValue: number }) => void;
  scrollToTime: number;
}

const MusicControl: React.FC<MusicControlProps> = ({
  getDuration,
  volume,
  mute,
  getTimePassed,
  scrollToTime
}) => {
  const trackData = useAppSelector(state => state.ui.musicActive);
  const url = trackData?.trackData?.url;
  const isPlaying = trackData?.isActive;
  const audioRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.seekTo(scrollToTime);
    }
  }, [scrollToTime]);

  const onProgressControl = (progressValue: number) => {
    getDuration({ totalDuration: audioRef.current?.getDuration() || 0 });
    getTimePassed({ progressValue });
  };

  return (
    <ReactPlayer
      style={{ display: "none" }}
      playing={isPlaying}
      volume={volume / 100}
      muted={mute}
      url={url}
      ref={audioRef}
      controls
      onProgress={(progress) => onProgressControl(progress.playedSeconds)}
    >
      MusicControl
    </ReactPlayer>
  );
};

export default MusicControl;
