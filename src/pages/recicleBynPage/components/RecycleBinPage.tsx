import React from 'react'
import video1 from "../../../assets/video.mp4"

const RecycleBinPage = () => {
  return (
    <div className='w-full flex justify-center h-full' >
      <div className='w-[80%] h-[70%] bg-slate-800 flex justify-end rounded-xl items-center p-2'>
        <video src={video1} controls muted autoPlay className='w-10/12 h-10/12'></video>
      </div>
    </div>
  )
}

export default RecycleBinPage