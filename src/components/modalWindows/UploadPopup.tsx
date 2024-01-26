import { useEffect,useState } from 'react'
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getCurrentUser } from '../../firebase/firebaseActions'
import { handleUploadStart } from '../../store/slices/uiSlices'
import { useAppSelector } from '../../store/store/storeHooks'
const UploadPopup = () => {
    const uploadPercentComplete = useAppSelector(state => state.ui.uploadPercentComplete)
    const uploadStart = useAppSelector(state => state.ui.uploadStart)
  
    const dispatch = useDispatch()
  
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const [jumpDot, setJumpDot] = useState(false)
  
    useEffect(() => {
      setUploadPercentage(Math.floor(uploadPercentComplete))
      if (uploadPercentComplete === 100) {
        setTimeout(() => dispatch(handleUploadStart(false)), 2000)
      }
    },[uploadPercentComplete])
  
    const authorized = getCurrentUser()
      if(!authorized || typeof(authorized) === 'undefined'){
        return <Navigate to="/auth/login" replace={true} />
      }
    useEffect(() => {
      if (uploadStart) {
        setTimeout(() => setJumpDot(prevJump => !prevJump), 500)
      }
    }, [uploadStart, jumpDot])
  return (
    <div>
        <div className={`absolute bottom-10 right-10 w-80 h-fit bg-white shadow-xl z-10 border-[1px]
          ${uploadStart ? "scale-100" : "scale-0"} duration-1000
         border-slate-100 rounded-xl  justify-center items-center flex-col gap-5 py-5 flex `}>
          {uploadPercentage === 100 ? <p className="text-2xl">Uploading Finished!</p> :
          <div className="text-2xl flex gap-2 items-center">
             <p >File uploading</p> 
            <span className={`${jumpDot ? "-translate-y-1" : ""} text-3xl duration-500`}>.</span>
            <span className={`${jumpDot ? "-translate-y-1" : ""} text-3xl duration-700`}>.</span>
            <span className={`${jumpDot ? "-translate-y-1" : ""} text-3xl duration-1000`}>.</span>
          </div>
            }
          <div className=" h-5 w-10/12 shadow-inner bg-slate-50 overflow-hidden border-[1px] border-slate-200">
            <div className={` h-5 bg-gradient-to-r from-white to-orange-prime -skew-x-12`} style={{width: uploadPercentage * 3}}></div>
          </div>
        </div>
    </div>
  )
}

export default UploadPopup