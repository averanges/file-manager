import { useState, useEffect, ChangeEvent } from "react"
import avatar from "../../../assets/avatar.png"
import { BellSVG, DownArrowSVG, FolderPlusSvg, LogoutSVG, RightArrowSVG, SearchSVG, SettingsSVG, UploadSvg, UserSettingsSvg } from "../../../ui/svg/svg"
import { HeaderButton } from "../ui/headerButtons"
import { InputEventWithFiles, useFileChange } from "../../../firebase/firebaseActions"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../store/store/storeHooks"
import { handleOpenModal, handleUserSettingsModal } from "../../../store/slices/uiSlices"
import nothing from '../../../assets/nothing.jpg'
import { handleLogout } from "../../dashboardSidebar/components/DashboardSidebar"

const DashboardHeader = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation().pathname

  const {avatarImg, userName} = useAppSelector(state => state.management.user)
  const allData = useAppSelector(state => state.management.allData)

  const [search, setSearch] = useState('')
  const [openUserWindow, setOpenUserWindow] = useState(false)
  const [addNewOpen, setAddNewOpen] = useState(false)

  const path = id ? id : "My Files"

  const { uploadNewFile } = useFileChange()

  useEffect(() => {
    setAddNewOpen(false)
    setSearch('')
    setOpenUserWindow(false)
  }, [id])

  const toggleUploadFile = (e: InputEventWithFiles) => {
    uploadNewFile(e, 'click', path)
    setAddNewOpen(false)
  }
  const openModalWindow = (): void => {
    dispatch(handleOpenModal({open: true, id: path}))
    setAddNewOpen(false)
  }
  const openUserSettingsWindow = (type: string): void => {
    dispatch(handleUserSettingsModal({open: true, subTabType: type}))
    setOpenUserWindow(false)
}
  return ( 
    <div className="h-32 flex justify-center items-center bg-slate-50 rounded-t-full">
        <div className="w-10/12 xl:w-8/12 h-3/6 gap-12 flex relative">
          
          {
          addNewOpen ?
          (<div className="absolute top-0 -left-40 bg-white w-fit h-fit shadow-lg rounded-xl p-5 flex flex-col gap-2">
            <div onClick={openModalWindow}
            className="flex gap-2 border-b-[1px] border-slate-200 pb-2 hover:text-orange-prime cursor-pointer duration-300">
              <FolderPlusSvg size={6} />
              <p>New folder</p>
            </div>
            <div>
              <input className="h-full w-full hidden" id="fileUpload" type="file"
              onChange={(e: ChangeEvent<HTMLInputElement> ) => toggleUploadFile(e as unknown as InputEventWithFiles)}/>
              <label htmlFor="fileUpload"
              className="flex gap-2 hover:text-orange-prime cursor-pointer duration-300">
                <UploadSvg size={5} />
                <p>Upload file</p>
              </label>
            </div>
          </div>)
          :
          null
          }
          <div className="w-32 h-full min-w-[100px]">
            {
            id && !location.split('/').includes('category') ? 
            (<div onClick={() => setAddNewOpen(prev => !prev)}
            className={`flex justify-center items-center gap-2 w-full rounded-lg font-bold text-white text-xl bg-orange-prime 
            shadow-md h-14 hover:shadow-lg border-2 hover:border-white cursor-pointer duration-500`}>
              <p>+ New</p>
            </div>) 
            : null
            }
          </div>
          <div className="h-full w-8/12 rounded-full shadow-md relative">
              <input value={search} onChange={(e) => setSearch(e.target.value)}
              type="text" className="h-full w-full rounded-full outline-none pl-10 active:shadow-amber-200 duration-500" 
                placeholder="Search your document"/>
            <div className="absolute top-0 translate-y-5 left-3">
               <SearchSVG/>
            </div>
            {search ?
            <div className="absolute h-48 bg-white w-full shadow-lg rounded-xl top-20 flex flex-col overflow-y-scroll z-10">
            {allData.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
              <div className="flex justify-center items-center w-full h-full">
                <img src={nothing} alt="" className="object-contain w-full h-full"/>
              </div>
            ) : (
              allData.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map((el, idx) => {
                const fileFolder = el.path && el.path.split('/');
                if (fileFolder) {
                  return (
                    <div key={idx}>
                      <Link
                        to={`/dashboard/folder/${encodeURIComponent(fileFolder.slice(3, fileFolder.length - 1).join('/'))}`}
                        className="flex items-center justify-between text-xl px-5 py-2 hover:bg-orange-opacity group/search"
                      >
                        <p className="w-[60%] text-xl">{el.name.length > 30 ? el.name.split('').slice(0, 30).join('') + '...' : el.name}</p>
                        <p className="text-xl w-[30%] bg-pink-opacity flex justify-center font-semibold text-white -skew-y-2">
                          {fileFolder.slice(3, fileFolder.length - 1).pop()?.slice(0, 10)}
                        </p>
                        <div className="group-hover/search:text-white group-hover/search:scale-150 duration-300">
                          <RightArrowSVG />
                        </div>
                      </Link>
                    </div>
                  );
                } else {
                  return null
                }
              })
            )}
          </div>
                  : null
                }
          </div>
          <div className="relative">
            <HeaderButton children={<BellSVG/>}/>
          </div>
            <div className="relative">
              <div className="flex items-center gap-4" onClick={() => setOpenUserWindow(prevOpen => !prevOpen)}>
                <HeaderButton children={
                  avatarImg 
                  ? <img src={avatar} alt="avatar"/> 
                  : <div className='w-full h-full bg-purple-prime flex justify-center items-center text-3xl text-white'>{userName?.charAt(0).toUpperCase()}</div>}/>
                <DownArrowSVG size={8}/>
              </div>
              <div className={`${openUserWindow ? "scale-y-100" : "scale-y-0  "} absolute w-60 h-40 px-2 py-4
              bg-white border-[1px] border-slate-100 shadow-xl -bottom-44 -left-10 transform origin-top
               duration-500 rounded-3xl flex flex-col justify-around`}>
                <div onClick={() => openUserSettingsWindow('basic')}
                className="flex gap-2 items-center hover:bg-orange-opacity cursor-pointer group/first hover:text-white duration-300 p-2 rounded-xl">
                  <SettingsSVG/>
                  <p className="group-hover/first:scale-105 group-hover/first:text-white duration-300 text-lg tracking-widest">Account Settings</p>
                </div>
                <div onClick={() => openUserSettingsWindow('changePsw')}
                className="flex gap-2 items-center hover:bg-orange-opacity cursor-pointer group/first hover:text-white duration-300 p-2 rounded-xl">
                  <UserSettingsSvg size={6}/>
                  <p className="group-hover/first:scale-105 group-hover/first:text-white duration-300 text-lg tracking-widest">Change Password</p>
                </div>
                <div onClick={() => handleLogout(navigate)}
                className="flex gap-2 items-center hover:bg-orange-opacity cursor-pointer group/first hover:text-white duration-300 p-2 rounded-xl">
                  <LogoutSVG/>
                  <p className="group-hover/first:scale-105 group-hover/first:text-white duration-300 text-lg tracking-widest">Sign Out</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader