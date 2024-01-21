import { useState, useEffect, useRef } from 'react'
import { LogoSVG } from './ui/svg/svg'
import { Link } from 'react-router-dom'
import cardShadows from "./assets/main_card_shadows.png"
import abstract1 from "./assets/abstract1.png"
import abstract2 from "./assets/abstract2.png"
import abstract3 from "./assets/abstract3.png"
import abstract4 from "./assets/abstract4.png"
import dataCircle from "./assets/dataCircle.png"
import circles from "./assets/circles.png"
import cardgeo from "./assets/cardgeo.png"
import cardgeo2 from "./assets/cardgeo2.png"
import cardgeo3 from "./assets/cardgeo3.png"
import girlWithTablet from "./assets/girlWithTablet2.png"
import logoNick from "./assets/logoNick.png"
import audioplayer from "./assets/audioplayer.png"
import imagesGallery from "./assets/images.jpg"
import statistics from "./assets/statistics.jpg"
import geo from "./assets/block1.svg"
import geo2 from "./assets/block2.svg"
import geo3 from "./assets/block3.svg"

const MainPage = () => {
  const [moveLoginButton , setMoveLoginButton] = useState(false)
  const [moveAddButton , setMoveAddButton] = useState(false)
  const [percentCounter, setPercentCounter] = useState(0)
  const [isCounterActive, setIsCounterActive] = useState(false)
  const [languageTabOpen, setLanguageTabOpen] = useState(false)

  const handlePecerntCounter = () => {
    setIsCounterActive(true)
    const interval = setInterval(() => setPercentCounter(prev => {
      if (prev === 99 || prev === 98) {
         return prev + 1
      } else if (prev < 100) {
        return prev + Math.floor(Math.random() * 3) * 2
      } else {
        setMoveAddButton(false)
        clearInterval(interval)
        return prev
      }}) , 100)
  }
  
  useEffect(() => {
    if (percentCounter === 100) {
      setTimeout(() => {
        setPercentCounter(0)
        setIsCounterActive(false)
      }, 2000)
    }
  }, [percentCounter])

  const observedElementsRef = useRef<any[]>([]);
  const [visibleElements, setVisibleElements] = useState({
    zero: false,
    first: false,
    second: false,
    third: false,
    forth: false,
    fifth: false,
    sixth: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prevVisibleElements) => ({
              ...prevVisibleElements,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      }
    );

    observedElementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element)
      }
    });

    return () => {
      observedElementsRef.current.forEach((element) => {
        if (element) {
          observer.unobserve(element)
        }
      });
    };
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(scrollPosition)
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  console.log(scrollPosition)
  return (
  <div className='overflow-x-hidden bg-slate-100 overscroll-y-none scroll-smooth'>
    <div className='w-screen h-screen bg-slate-100 flex justify-center items-center relative flex-col'>
        <div style={{top: 150 - scrollPosition/2}} 
        className={`${visibleElements.zero ? "" : "-translate-x-48"} w-[10%] h-[40%] absolute delay-500
        left-0 rounded-r-3xl shadow-lg shadow-slate-700 z-30 duration-1000 transition-transform`}>
          <img src={abstract1} alt="" className='object-cover rounded-r-3xl w-full h-full'/>
        </div>
        <div style={{top: 200 - scrollPosition/2}} 
        className={`w-[20%] md:w-[15%] lg:w-[10%] h-fit absolute top-[20%] right-0 rounded-l-3xl shadow-lg shadow-slate-700 z-30 
        ${visibleElements.zero ? "" : "translate-x-48"} duration-1000 delay-500 transition-transform`}>
          <img src={abstract2} alt="" className='object-cover rounded-l-3xl'/>
        </div>
      <div ref={(element) => observedElementsRef.current.push(element)} id='zero'
      className={`bg-slate-700/70 w-[95%] h-[95%] rounded-3xl text-white flex flex-col items-center relative overflow-hidden duration-700
       ${visibleElements.zero ? "scale-x-100" : "scale-x-0"} origin-center`}>
        <div style={{height: 130 - scrollPosition/5}} 
        className={`w-[25%] md:w-[15%] absolute bottom-0 hidden md:flex left-5 md:left-40 rounded-t-3xl shadow-sm
         shadow-slate-700 duration-1000 delay-500 transition-transform
        ${visibleElements.zero ? "" : "translate-y-48"}`}>
          <img src={abstract4} alt="" className='object-cover rounded-t-3xl w-full h-full'/>
        </div>
        <div style={{bottom: 130 - scrollPosition/5}} 
        className={`lg:w-[15%] md:w-[20%] w-[30%] h-fit hidden md:flex absolute md:right-20 right-3 rounded-3xl 
        shadow-lg shadow-slate-700 duration-1000 delay-500 transition-opacity
        ${visibleElements.zero ? "opacity-100" : "opacity-0"} `}>
          <img src={abstract3} alt="" className='object-cover rounded-3xl'/>
        </div>
        <div className={`w-11/12 md:w-8/12 h-fit mt-12 flex justify-between duration-1000 delay-150 ${visibleElements.zero ? "opacity-100" : "opacity-0"}`}>
          <div className='text-xl sm:text-2xl flex items-center'>
            <LogoSVG/>
            <Link to='/'>K-Cloud.io</Link>
          </div>
          <div className='flex gap-6'>
            <Link to='/auth/login' onMouseEnter={() => setMoveLoginButton(true)} onMouseLeave={() => setMoveLoginButton(false)}
            className='bg-slate-400 w-[50%] h-full sm:w-16 sm:h-16 flex justify-center items-center rounded-lg relative cursor-pointer'>
              <div className={`absolute top-5 duration-300 ${moveLoginButton ? "opacity-0 translate-x-5" :'opacity-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 
                  2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </div>
              <div className={`absolute top-5 left-0 duration-300 ${moveLoginButton ? "opacity-100 translate-x-5" :'opacity-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 
                  2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </div>
            </Link>
            <Link to="/auth/signup" className='border-slate-300 border-[1px] flex justify-center
             items-center rounded-lg w-40 text-lg py-4 hover:border-white duration-150 font-semibold'>
              <p>Sign Up</p>
            </Link>
          </div>
        </div>
        <div className='w-8/12 h-full flex items-center justify-center'>
          <div className={`w-11/12 md:w-8/12 h-[80%] sm:h-[70%] flex justify-between flex-col items-center duration-1000 delay-150 ${visibleElements.zero ? "opacity-100" : "opacity-0"}`}>
            <h3 className='text-5xl md:text-6xl lg:text-7xl text-center tracking-wide '>Like Google Disc,
            <span className='text-3xl md:text-4xl lg:text-5xl tracking-widest text-slate-200 italic'> 
            <br />but belongs only to you</span></h3>
            <div onClick={handlePecerntCounter}
            onMouseEnter={() => setMoveAddButton(true)} onMouseLeave={() => setMoveAddButton(false)}
            className='w-8/12 md:w-[50%] lg:w-[35%] h-[30%] sm:h-[40%] rounded-3xl border-2 border-slate-300 border-dashed flex justify-center items-center cursor-pointer'>
                <div className='w-[90%] h-[90%] bg-slate-400/50 rounded-3xl flex flex-col justify-center items-center relative overflow-hidden'>
                  {isCounterActive ? 
                  <>
                    <p className='absolute z-20 text-4xl font-bold'>{percentCounter}%</p>
                    <div style={{height: percentCounter * 2}} className='w-full absolute bg-[#e6d3a3] bottom-0 z-10'></div>
                  </>
                  :
                  <>
                    <div className={`flex flex-col justify-center items-center gap-2 absolute duration-300 ${moveAddButton ? "translate-y-10 opacity-0" : "opacity-100"}`}>
                      <div className='bg-white rounded-full w-14 h-14 text-black flex justify-center items-center text-6xl shadow-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="w-8 h-10 stroke-slate-800">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='text-lg font-bold'>Add your files</p>
                        <p className='text-slate-300 text-sm font-semibold'>Up to 5 GB</p>
                      </div>
                    </div>
                    <div className={`w-12 flex h-12 absolute top-[30%] ${moveAddButton ? "opacity-100 duration-300" : "opacity-0 -translate-y-5"}`}>
                      <div className={'z-10 absolute translate-y-4 shadow-md shadow-slate-600'}>
                        <img src={cardShadows} alt="" className='object-cover'/>
                      </div>
                      <div className={`-z-0 absolute  ${moveAddButton ? "translate-x-8 rotate-[30deg] opacity-50 duration-500" : "opacity-0"}`}>
                        <img src={cardShadows} alt="" className='object-cover'/>
                      </div>
                      <div className={`-z-0 absolute   ${moveAddButton ? "-translate-x-8 -rotate-[30deg] opacity-50 duration-500" : "opacity-0"}`}>
                        <img src={cardShadows} alt="" className='object-cover'/>
                      </div>
                    </div>
                  </>
                  }
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='md:w-screen h-screen bg-slate-100 md:flex justify-center hidden'>
      <div className='w-[65%] h-full flex-col flex gap-20'>
        <div id='first'
        className={`flex justify-between gap-10 h-[40%] mt-20 items-center`} 
        ref={(element) => observedElementsRef.current.push(element)}>
          <div className='flex flex-col w-[80%]'>
            <div className={`flex gap-12 items-center pb-16 border-dashed relative duration-1000 ${visibleElements.first ? "border-b-2" : "border-none"}`}>
              <h3 className={`text-5xl tracking-wider duration-1000 text-slate-800 
              ${visibleElements?.first ? 'opacity-100' : 'opacity-0 absolute translate-y-16'}`}>Your best <br /> workspace</h3>
              <p className={`text-lg text-slate-500 duration-1000 
              ${visibleElements?.first ? 'opacity-100' : 'opacity-0 absolute -translate-x-16'}`}
              >It’s a smart file storage system where <br /> tools, statistic and content create <br /> workspace together.</p>
            </div>
            <div className={`flex gap-5 text-xl pt-5 w-full ${visibleElements.first ? "" : "opacity-0 translate-y-20"} duration-1000`}>
              <div className='flex items-center gap-2 text-slate-800'>
                <div className='w-10 h-10'>
                  <img src={audioplayer} alt="" className='w-full h-full object-cover'/>
                </div>
                <p>Audio Player</p>
              </div>
              <div className='flex items-center gap-2 text-slate-800'>
                <div className='w-10 h-8'>
                  <img src={imagesGallery} alt="" className='w-full h-full object-cover'/>
                </div>
                <p>Image Gallery</p>
              </div>
              <div className='flex items-center gap-2 text-slate-800'>
                <div className='w-10 h-10'>
                  <img src={statistics} alt="" className='w-full h-full object-cover'/>
                </div>
                <p>Storage Analysis</p>
              </div>
            </div>
          </div>
          <div className='relative flex gap-2 items-center'>
            <div className={`absolute -bottom-8 -right-8 h-[60%] w-[50%] rounded-3xl z-0 duration-1000 delay-500
             ${visibleElements?.first ? 'opacity-100' : 'opacity-0 absolute bottom-0 right-0'}`}>
              <img src={abstract1} alt="" className='object-cover w-full h-full rounded-3xl'/>
            </div>
            <div className={`h-40 w-20 duration-1000 delay-500 ${visibleElements?.first ? 'opacity-100' : 'opacity-0 absolute translate-x-16'}`}>
              <img src={circles} alt="" />
            </div>
            <div className={`bg-white shadow-2xl shadow-black/25 rounded-3xl p-10 flex flex-col gap-5 z-10 relative duration-1000 
            ${visibleElements?.first ? 'opacity-100' : 'opacity-0 absolute translate-y-16'}`}>
              <p className='ml-5 text-2xl font-semibold'>Storage breakdown</p>
              <div className='flex w-full h-fit gap-16'>
                <div className='w-[45%]'>
                  <img src={dataCircle} alt="" className='object-cover'/>
                </div>
                <div className='w-[55%] h-full'>
                  <ul className='flex flex-col gap-5'>
                    <li className='flex items-center gap-10 justify-between'>
                      <div className='flex gap-3 items-center justify-between'>
                        <div className='w-2 h-2 rounded-full bg-red-500'></div>
                        <p className='text-slate-600'>Music</p>
                      </div>
                      <p className='text-md font-semibold'>53%</p>
                    </li>
                    <li className='flex items-center gap-10 justify-between'>
                      <div className='flex gap-3 items-center justify-between'>
                        <div className='w-2 h-2 rounded-full bg-green-500'></div>
                        <p className='text-slate-600'>Documents</p>
                      </div>
                      <p className='text-md font-semibold'>17%</p>
                    </li>
                    <li className='flex items-center gap- 10 justify-between'>
                      <div className='flex gap-3 items-center justify-between'>
                        <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                        <p className='text-slate-600'>Other Files</p>
                      </div>
                      <p className='text-md font-semibold'>15%</p>
                    </li>
                    <li className='flex items-center gap-10 justify-between'>
                      <div className='flex gap-3 items-center'>
                        <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
                        <p className='text-slate-600'>Images</p>
                      </div>
                      <p className='text-md font-semibold'>17%</p>
                    </li>
                    <li className='flex items-center gap-10 justify-between'>
                      <div className='flex gap-3 items-center'>
                        <div className='w-2 h-2 rounded-full bg-black'></div>
                        <p className='text-slate-600'>Videos</p>
                      </div>
                      <p className='text-md font-semibold'>27%</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> 
        </div>
        
        <div className='flex flex-col gap-20 mt-20'> 
          <h4 ref={(element) => observedElementsRef.current.push(element)} id='second'
          className={`text-5xl py-5 text-slate-800 text-center tracking-wider duration-1000 ${visibleElements.second ? "opacity-100" : "opacity-0 absolute translate-y-10"}`}>
            Work even more <br /> efficiently with K-Cloud</h4>
          <div  ref={(element) => observedElementsRef.current.push(element)} id='third'
          className={`flex justify-between duration-[2000ms] ${visibleElements.third ? "opacity-100" : "opacity-0 absolute translate-y-20"}`}>
            <div className='bg-white h-96 w-[30%] rounded-3xl flex flex-col justify-center items-center
             gap-5 shadow-sm hover:shadow-lg shadow-slate-500 hover:shadow-slate-300 group/edit'>
              <div className='w-20 h-20 group-hover/edit:rotate-180 duration-1000 -rotate-180'>
                <img src={cardgeo} alt="" className='object-cover'/>
              </div>
              <p className='text-slate-800 text-center font-semibold text-2xl'>Fast switching <br /> between different tools</p>
              <p className='text-slate-500 text-center text-lg'>Supports all file types that you can think of, video files included.</p>
            </div>
            <div className='bg-white h-96 w-[30%] rounded-3xl flex flex-col justify-center items-center
             gap-5 shadow-sm hover:shadow-lg shadow-slate-500 hover:shadow-slate-300 group/item1'>
              <div className='w-20 h-20 relative'>
                <div className='w-full h-full absolute group-hover/item1:-translate-y-10 group-hover/item1:opacity-0 duration-500'>
                  <img src={cardgeo2} alt="" className='object-cover'/>
                </div>
                <div className='w-full h-full absolute top-10 opacity-0 group-hover/item1:-translate-y-10 group-hover/item1:opacity-100 duration-500'>
                  <img src={cardgeo2} alt="" className='object-cover'/>
                </div>
              </div>
              <p className='text-slate-800 text-center font-semibold text-2xl'>Sending <br /> files safely</p>
              <p className='text-slate-500 text-center text-lg'>The automatic file versioning system <br /> prevents you from accidentally overwriting existing files.</p>
            </div>
            <div className='bg-white h-96 w-[30%] rounded-3xl flex flex-col justify-center items-center 
            gap-5 shadow-sm hover:shadow-lg shadow-slate-500 hover:shadow-slate-300 group/item2'>
              <div className='w-20 h-20 relative'>
                <div className='w-full h-full absolute group-hover/item2:-translate-x-10 group-hover/item2:opacity-0 duration-500'>
                  <img src={cardgeo3} alt="" className='object-cover'/>
                </div>
                <div className='w-full h-full absolute left-0 top-0  duration-500'>
                  <img src={cardgeo3} alt="" className='object-cover'/>
                </div>
              </div>
              <p className='text-slate-800 text-center font-semibold text-2xl'>Make materials <br /> available to loved ones</p>
              <p className='text-slate-500 text-center text-lg'>Timeline browsing, sorting photos <br /> and videos cronologically.</p>
            </div>
          </div>
        </div>
      </div>           
    </div>
    <div className='md:w-screen md:flex hidden justify-center relative mt-20'>
        <div style={{width: 90 - (2144 - scrollPosition * 1.01)}} 
        className={`h-40 absolute bottom-[13%] right-0 rounded-l-3xl shadow-lg shadow-slate-700 z-30 
        ${visibleElements.sixth ? "" : "translate-x-40"} duration-1000 delay-500 transition-transform`}>
          <img src={abstract2} alt="" className='object-cover rounded-l-3xl h-full w-full'/>
        </div>
      <div className='w-[65%] mt-40 flex flex-col gap-40 items-center'>
      <div ref={(element) => observedElementsRef.current.push(element)} id='forth'
      className={`h-[40%] flex w-full mt-40 gap-20 justify-between`}>
          <div className='relative flex gap-2 items-center w-[60%]'>
            <div className={`absolute duration-[3000ms] ${visibleElements.forth ? "-bottom-4 -left-8" : "bottom-0 left-0 opacity-0"} h-[60%] w-[50%] rounded-3xl z-0`}>
              <img src={abstract3} alt="" className='object-cover w-full h-full rounded-3xl'/>
            </div>
          <div className={`bg-white shadow-2xl shadow-black/25 rounded-3xl p-10 flex flex-col gap-5 z-10 w-full h-[90%] 
                           duration-1000 ${visibleElements.forth ? "opacity-100 relative" : "opacity-0 translate-y-10 absolute"}`}>
              <div className='flex w-full h-full gap-16'>
                <div className='w-[50%] h-full relative'>
                  <div className='w-96 h-96 absolute -top-[47%] -left-[40%] '>
                    <img src={girlWithTablet} alt="" className='object-cover'/>
                  </div>
                </div>
                <div className='w-[50%] h-full relative'>
                  <p className='text-2xl text-slate-800'>Period statistics</p>
                  <p className='text-md text-slate-400'>January</p>
                  <div className='flex items-end gap-5 justify-center'>
                    <img src={geo2} alt="" />
                    <img src={geo} alt="" />
                    <img src={geo3} alt="" />
                  </div>
                  <p className='absolute top-[50%] -right-20 rotate-90'>Total Uploaded: 2.7 GB</p>
                </div>
              </div>
            </div>
            <div className={`h-32 w-12 duration-1000 delay-1000 ${visibleElements.forth ? "opacity-100" : "absolute opacity-0 -translate-x-10"}`}>
              <img src={circles} alt="" />
            </div>
          </div> 
          <div className={`w-[50%] flex flex-col gap-10 duration-1000 ${visibleElements.forth ? "opacity-100" : "absolute opacity-0 translate-y-10"}`}>
            <h5 className='text-5xl tracking-wider text-slate-800'>Fantastic <br /> mobile support</h5>
            <p className='text-slate-500 text-lg'>K-Clould adapts to screens of any size to provide a smooth and intuitive experience. It works on tablets and smartphones just like you would expect from a native app. 
            Fast loading, easy browsing, while preserving all the powerful features.
            </p>
              <button className='h-16 w-40 flex justify-center items-center bg-blue-900 text-white rounded-xl relative group/button text-lg'>
                <p className='absolute group-hover/button:translate-y-5 group-hover/button:opacity-0 duration-300'>Get Started</p>
                <p className='absolute top-0 opacity-0 group-hover/button:translate-y-5 group-hover/button:opacity-100 duration-300'>Get Started</p>
              </button>
          </div>
         </div>
         <div className='w-screen flex justify-center relative mt-20'>
            <div ref={(element) => observedElementsRef.current.push(element)} id='fifth'
            className={`bg-[#e6d3a3] w-[40%] h-40 rounded-3xl flex absolute -top-20 shadow-xl shadow-slate-500 z-30 mt-10 
            duration-1000 ${visibleElements.fifth ? "opacity-100" : "opacity-0 absolute translate-y-10"}`}>
              <div className='w-[75%] h-full rounded-l-3xl relative' >
                <div className='absolute text-white font-semibold text-3xl h-full w-full flex justify-start items-center tracking-wider pl-20 leading-10'>
                  <p>Get Started <br /> with our app?</p>
                </div>
                <img src={abstract3} alt="" className='object-cover w-full h-full rounded-l-3xl'/>
              </div>
              <div className='h-full flex justify-center items-center w-[25%]'>
                  <div className='w-24 h-24 border-2 border-dashed rounded-lg  border-slate-400 flex justify-center items-center group/button2'>
                    <div className='bg-white w-[70%] h-[70%] rounded-lg group-hover/button2:rounded-full duration-500
                     shadow-xl shadow-slate-500/25 flex justify-center items-center cursor-pointer relative'>
                      <div className='absolute group-hover/button2:translate-x-5 opacity-100 group-hover/button2:opacity-0 duration-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                      </div>
                      <div className='absolute left-0 group-hover/button2:translate-x-5 opacity-0 group-hover/button2:opacity-100 duration-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
          <div ref={(element) => observedElementsRef.current.push(element)} id='sixth'
          className={`bg-slate-700/70 w-[95%] rounded-3xl mb-5 flex items-end relative overflow-hidden
          mt-10 origin-center duration-1000 delay-1000 ${visibleElements.sixth ? "scale-x-100" : "scale-x-0"}`}>
            <div style={{height: 10 - (2144 - scrollPosition - 50)}} 
            className={`w-[10%] h-20 absolute top-0 left-16 rounded-b-3xl shadow-lg shadow-slate-700 z-30 
            ${visibleElements.sixth ? "" : "-translate-y-20"} duration-1000 delay-[1500ms] transition-transform`}>
              <img src={abstract2} alt="" className='object-cover rounded-b-3xl w-full h-full'/>
            </div>
              <div className='flex gap-2 items-center justify-around w-full min-h-[200px] pt-10'>
                <div className='flex gap-5 items-center'>
                  <Link to='https://nickbel.vercel.app' className='w-28'>
                    <img src={logoNick} alt="" className='object-cover'/>
                  </Link>
                  <p className='text-lg text-slate-300 font-semibold'>2023 Nick Belichenko. All Rights reserved</p>
                </div>
                <div className='flex items-center gap-3 relative'>
                  {languageTabOpen ? 
                    <div className='absolute bg-white w-fit h-fit bottom-10 left-0 p-8 text-slate-400 text-xl rounded-3xl flex flex-col gap-3'>
                      <div className='flex items-center justify-around gap-5 cursor-pointer'>
                        <div className='w-2 h-2 bg-[#e6d3a3] rounded-full'/>
                        <p className='text-slate-700 font-semibold'>English</p>
                      </div>
                      <div className='flex items-center justify-around gap-5 cursor-pointer hover:text-slate-700 duration-300'>
                        <div className='w-2 h-2 bg-[#e6d3a3] rounded-full opacity-0'/>
                        <p>Russian</p>
                      </div>
                      <div className='flex items-center justify-around gap-5 cursor-pointer hover:text-slate-700 duration-300'>
                        <div className='w-2 h-2 bg-[#e6d3a3] rounded-full opacity-0'/>
                        <p>Korean</p>
                      </div>
                   </div>
                   : null
                  }

                  <div onClick={() => setLanguageTabOpen(prev => !prev)}
                  className='flex justify-center items-center gap-3 cursor-pointer'>
                    <p className='text-lg text-slate-300 font-semibold'>English</p>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stroke-slate-300 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
          </div>
         </div>

      </div>
    </div>
  </div>
  )
}

export default MainPage