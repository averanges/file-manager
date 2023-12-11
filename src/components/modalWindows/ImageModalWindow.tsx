import React, { useState } from 'react'
import { useAppDispatch } from '../../store/store/storeHooks'
import { useSelector } from 'react-redux'
import { handleOpenFullImage } from '../../store/slices/uiSlices'
import { DeleteSVG } from '../../ui/svg/svg'

const ImageModalWindow = () => {
    const dispatch = useAppDispatch()
    const openFullImage = useSelector(state => state.ui.openFullImage)
    const [imageToolsOn, setImageToolsOn] = useState(false)
  return (
    <div className={`${openFullImage.isOpenFullImage ? " opacity-100 z-10" : " opacity-0 -z-10"} bg-[rgba(0,0,0,0.5)]
    w-full h-full absolute justify-center items-center duration-500 flex`}>
      <div className="w-fit h-[80%] flex border-4 border-white justify-center relative">
        <div className="absolute -top-5 -right-5 bg-white shadow-lg w-5 h-5 flex justify-center duration-500
        items-center rounded-full p-5 border-[1px] border-slate-300 text-2xl font-semibold cursor-pointer hover:text-orange-opacity"
        onClick={() => dispatch(handleOpenFullImage({isOpenFullImage: false, openFullImageSource: ""}))}>X</div>
        <div onClick={() => setImageToolsOn(prev => !prev)} 
        className="bg-white absolute top-0 right-0 translate-x-10 translate-y-10 duration-500
        h-12 flex justify-center items-center rounded-full cursor-pointer hover:text-orange-prime">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </div>
        <div className={`bg-white absolute top-0 right-0 translate-x-10 translate-y-24 duration-500 ${imageToolsOn ? "scale-y-100" : "scale-y-0"}
        w-8 h-20 flex justify-center items-center rounded-full cursor-pointer hover:text-orange-prime transform origin-top`}>
          <div>
            <DeleteSVG/>
          </div>
        </div>
        <img src={openFullImage.openFullImageSource} alt="" className="object-cover"/>
      </div>
    </div>
  )
}

export default ImageModalWindow