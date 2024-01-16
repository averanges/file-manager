import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store/storeHooks'
import { useSelector } from 'react-redux'
import { handleOpenFullImage } from '../../store/slices/uiSlices'
import { DeleteSVG } from '../../ui/svg/svg'

const ImageModalWindow = () => {
    const dispatch = useAppDispatch()
    const openFullImage = useAppSelector(state => state.ui.openFullImage)
  return (
    <div className={`${openFullImage.isOpenFullImage ? " opacity-100 z-10" : " opacity-0 -z-10"} bg-[rgba(0,0,0,0.5)]
    w-full h-full absolute justify-center items-center flex`}>
      <div className="max-w-[30%] h-[50%] border-slate-50 border-8 relative rounded-xl bg-white">
        <div className="absolute -top-6  -right-6 bg-white shadow-lg w-5 h-5 flex justify-center 
        items-center rounded-full p-4 border-[1px] border-slate-300 text-xl font-semibold cursor-pointer hover:text-orange-opacity"
        onClick={() => dispatch(handleOpenFullImage({isOpenFullImage: false, openFullImageSource: ""}))}>
          X
        </div>
        <img src={openFullImage.openFullImageSource} alt="" className="object-cover w-full h-full"/>
      </div>
    </div>
  )
}

export default ImageModalWindow