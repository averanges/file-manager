import { useEffect, useState } from 'react'
import { HomeSVG, SearchSVG } from "../../../ui/svg/svg";
import DataListTemplate from "../../../modules/dataListTemplate/components/DataListTemplate"
import folderSvg from '../../../assets/folderIcon.webp'
import { useAppSelector } from '../../../store/store/storeHooks';
import DashboardSidebar from '../../../modules/dashboardSidebar/components/DashboardSidebar';
import { useLocation } from 'react-router-dom';

const MobileDashboardPage = () => {
    const uploadedData = useAppSelector(state => state.management.allData)
    const location =  useLocation().pathname
    const [openMobileSidebar, setOpenMobileSidebar] = useState(false)

    useEffect(() => {
        setOpenMobileSidebar(false)
    },[location])
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex w-10/12 flex-col gap-5">
        <div className="flex w-full justify-between mt-5">
          <div onClick={() => setOpenMobileSidebar(true)} 
          className='cursor-pointer hover:text-orange-prime duration-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </div>
          <SearchSVG/>
          <div className={`fixed h-screen w-8/12 bg-white top-0 left-0 duration-500
           z-10 shadow-lg shadow-slate-400 origin-left ${openMobileSidebar ? "scale-x-100" : "scale-x-0"}`}>
            <div onClick={() => setOpenMobileSidebar(false)}
            className='absolute top-0 right-0 text-xl w-10 h-10 flex z-10 text-white hover:text-orange-prime
            justify-center items-center shadow-inner bg-slate-700 rounded-l-lg  cursor-pointer duration-300'>X</div>
            <DashboardSidebar/>
          </div>
        </div>
        <div className="flex flex-col w-full justify-start mt-10">
            <span className="text-slate-400 text-sm">Welcome, Nikolai</span>
            <p className="text-2xl">Your Storage</p>
        </div>
        <div className="text-white w-full">
          <div className="bg-pink-prime rounded-2xl h-28 w-full flex items-center justify-around">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="w-16 h-16 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
              </svg>
            </div>
            <div className="w-8/12 flex flex-col gap-3">
              <p className="text-xl font-semibold">Available Space</p>
              <div className="w-full bg-slate-50 h-1 rounded-3xl shadow-inner">
                <div className="bg-white w-8/12 h-full"></div>
              </div>
              <p className="text-xs">500 GB of 1 TB used</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-2xl">My Folders</p>
          <p className="text-slate-400">See All</p>
        </div>
        <div className="w-full flex justify-between gap-5 overflow-x-hidden min-h-fit">
          <div className="flex flex-col items-center">
            <div className="h-28 w-32">
              <img src={folderSvg} alt="" className="w-full h-full object-cover"/>
            </div>
            <p className="font-bold text-sm">Private Images</p>
            <p className="text-xs text-slate-400">300 MB</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-28 w-32">
              <img src={folderSvg} alt="" className="w-full h-full object-cover"/>
            </div>
            <p className="font-bold text-sm">Private Images</p>
            <p className="text-xs text-slate-400">300 MB</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-28 w-32">
              <img src={folderSvg} alt="" className="w-full h-full object-cover"/>
            </div>
            <p className="font-bold text-sm">Private Images</p>
            <p className="text-xs text-slate-400">300 MB</p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-2xl">Recent Files</p>
          <p className="text-slate-400">See All</p>
        </div>
        <div className="flex-1 w-full mb-20">
            <DataListTemplate currentFolderData={uploadedData.slice(0,4)}/>
        </div>
      </div>
      <div className="fixed bottom-0 w-full flex justify-center p-2 shadow-xl border-t-[1px] border-slate-200">
        <div className="w-10/12 flex justify-between">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </div>
          <HomeSVG size={6}/>
          <div className="relative">
              <div className="w-16 h-16 rounded-full border-t-2 border-slate-200 absolute 
              -translate-x-[50%] -translate-y-[70%] bg-orange-prime flex justify-center items-center text-5xl text-white">
                <span className="absolute -translate-y-1">+</span>
            </div>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MobileDashboardPage