import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/store/storeHooks'
import { UploadSvg } from '../../ui/svg/svg'
import { useDispatch } from 'react-redux'
import { handleUserSettingsModal } from '../../store/slices/uiSlices'
import { changePassword, updateUser } from '../../firebase/firebaseActions'
import { INewUser, validateForm } from '../../pages/signupPage/components/SignupPage'

const UserSettings = () => {
    const dispatch = useDispatch()
    const {open, subTabType} = useAppSelector(state => state.ui.userSettingsModal)
    const { avatarImg, email, userName } = useAppSelector(state => state.management.user)
    const [openSubTab, setOpenSubTab] = useState('')
    const [passwords, setPasswords] = useState({
        previousPsw: '',
        psw: '',
        confirmPsw: ''
    })
    const [validationErrors, setValidationErrors] = useState<INewUser>({
        psw: '',
        confirmPsw: ''
    })
    const [userBasicData, setUserBasicData] = useState(
    {
        avatarImg: avatarImg, 
        email: email,  
        userName: userName
    })


    const updateUserProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name} = e.target
        setUserBasicData(prev => {
            return {...prev, [name]: value}
        })
    }
    const saveChanges = () => {
        dispatch(handleUserSettingsModal({open: false, subTabType: ''}))
        if (openSubTab === "basic") {
            updateUser(userBasicData)
        }
        else {
            if (Object.values(validationErrors).every(el => el === '')){
                changePassword({currentPassword: passwords.previousPsw, newPassword: passwords.psw})
            }
        }
    }
    const toggleChangePsw = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        validateForm({value, name, setValidationErrors, inputedPsw: passwords.psw})
        setPasswords(prev => {
            return {...prev, [name]: value}})
    }
    useEffect(() => {
        setOpenSubTab(subTabType)
    }, [subTabType])

  return (
    <div className={`${open ? "scale-100 flex" : "scale-0 hidden"} w-[25%] h-[50%] bg-white duration-1000 justify-center 
    items-center rounded-2xl p-3 shadow-lg shadow-slate-600/50`}>
       <div className='w-[90%] flex flex-col gap-10 h-full'>
          <div className='flex items-center text-2xl w-full justify-between tracking-widest'>
            <h3>Account Settings</h3>
            <button onClick={() => dispatch(handleUserSettingsModal({open: false, subTabType: ''}))}
            className='hover:bg-slate-200 w-8 h-8 rounded-full duration-300 active:shadow-inner text-lg'>X</button>
          </div>
          <div className='flex justify-around border-b-[1px] text-lg text-slate-600'>
              <button onClick={() => setOpenSubTab('basic')}
                className={`relative after:w-full after:h-1 after:rounded-3xl after:bg-purple-prime after:rounded-b-sm
                ${openSubTab === "basic" ? "after:absolute" : "after:hidden"} hover:bg-slate-200/50 rounded-t-lg px-3 py-1 after:bottom-0 after:left-0`}>
                    Basic Details
              </button>
              <button onClick={() => setOpenSubTab('changePsw')}
                className={`relative after:w-full after:h-1 after:rounded-3xl after:bg-purple-prime after:rounded-b-sm
                ${openSubTab === "changePsw" ? "after:absolute" : "after:hidden"} hover:bg-slate-200/50 rounded-t-lg px-3 py-1 after:bottom-0 after:left-0`}>
                    Change Password
              </button>
          </div>
          {openSubTab === 'basic'
          ?
          (<div className='flex flex-col gap-5 text-end h-[40%]'>
            <div className='flex gap-5 w-full items-center'>
              <label htmlFor="" className='w-[30%]'>Name: </label>
              <input value={userBasicData.userName} onChange={(e) => updateUserProfile(e)}
              type="text" name="userName" className='border-[1px] border-slate-400 rounded-lg outline-none pl-2 w-[60%] py-1'/>
            </div>
            <div className='flex gap-5 items-center'>
              <label htmlFor="" className='w-[30%]'>E-mail address: </label>
              <input value={userBasicData.email} onChange={(e) => updateUserProfile(e)} disabled
              type="text" name="email" className='border-[1px] border-slate-400 rounded-lg outline-none pl-2 w-[60%] bg-slate-300 py-1'/>
            </div>
            <div className='w-full flex items-center gap-5'>
              <label htmlFor="" className='w-[30%]'>Profile Image: </label>
              <label htmlFor="file" className='w-16 h-16 flex bg-purple-prime rounded-full overflow-hidden cursor-pointer group/file relative'>
                {avatarImg ? <img src={avatarImg} alt="" className='object-cover w-full h-full'/> 
                : <div className='w-full h-full flex justify-center items-center text-3xl text-white'>{userName.charAt(0).toUpperCase()}</div>}
                <div className='w-full h-full bg-black/25 absolute z-0 opacity-0 group-hover/file:opacity-100 duration-300 flex justify-center items-center text-black'>
                  <UploadSvg size={8}/>
                </div>
              </label>
              <input type="file" name="file" id="file" className='hidden'/>
              <button className='border-[1px] border-slate-400 rounded-full p-1 text-slate-400 hover:border-slate-500 hover:text-slate-500'>Reset to default</button>
            </div>
          </div>)
            :
          (<div className='text-end flex flex-col gap-5 h-[40%]'>
            <div className='flex gap-5 w-full'>
              <label htmlFor="" className='w-[40%]'>Current Password: </label>
              <input onChange={(e) => toggleChangePsw(e)} value={passwords.previousPsw}
              type="password" name="previousPsw" id="previousPsw" className='border-[1px] border-slate-400 rounded-lg outline-none pl-2 w-[50%]'/>
            </div>
            <div className='flex w-full flex-col gap-2'>
                <div className='flex gap-5 w-full'>
                    <label htmlFor="" className='w-[40%]'>New Password: </label>
                    <input onChange={(e) => toggleChangePsw(e)} value={passwords.psw}
                        type="password" name="psw" id="psw" className='border-[1px] border-slate-400 rounded-lg outline-none pl-2 w-[50%]'/>
                </div>
               {validationErrors.psw ? <p className="text-red-500">* {validationErrors.psw}</p> : null}
            </div>
            <div className='flex w-full flex-col gap-2'>
                <div className='flex gap-5 w-full'>
                    <label htmlFor="" className='w-[40%]'>New Password: </label>
                    <input onChange={(e) => toggleChangePsw(e)} value={passwords.confirmPsw}
                        type="password" name="confirmPsw" id="confirmPsw" className='border-[1px] border-slate-400 rounded-lg outline-none pl-2 w-[50%]'/>
                </div>
               {validationErrors.confirmPsw ? <p className="text-red-500">* {validationErrors.confirmPsw}</p> : null}
            </div>
          </div>)}
          <button onClick={saveChanges}
          className='bg-orange-prime rounded-2xl px-2 py-2 text-white shadow-md shadow-slate-400 hover:shadow-slate-300 w-fit mt-10'>Save changes</button>
      </div>
    </div>
    // <div className={`${userSettingsModal ? "scale-100 flex" : "scale-0 hidden"} w-[30%] h-[50%] bg-white duration-1000 justify-center 
    // items-center rounded-2xl p-3 shadow-lg shadow-slate-600/50`}>
    //     <div className='w-[90%] flex flex-col h-full gap-10 p-2'>
    //         <div className='flex w-full justify-between'>
    //             <h3 className='text-2xl tracking-widest'>Friend List</h3>
    //             <button onClick={() => dispatch(handleUserSettingsModal(false))}
    //             className='hover:bg-slate-200 w-8 h-8 rounded-full duration-300 active:shadow-inner text-lg'>X</button>
    //         </div>
    //         <div className='flex w-full h-[60%]'>
    //             <div className='border-r-[1px] w-[50%] flex flex-col gap-2'>
    //                 <p className='text-lg w-fit text-slate-800'>Select users</p>
    //                 <div className='flex'>
    //                     <input type="text" name="" id="" className='border-2 outline-none shadow-inner shadow-slate-400 pl-2'/>
    //                     <div className='bg-purple-opacity rounded-r-xl p-1 cursor-pointer'>
    //                         <SearchSVG/>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className='w-[50%]'>
                    
    //             </div>
    //         </div>
    //         <div className='flex gap-4'>
    //             <button className='bg-orange-prime rounded-2xl px-4 py-2 text-white shadow-md shadow-slate-400 hover:shadow-slate-300 w-fit'>Apply</button>
    //             <button className='hover:bg-orange-opacity hover:rounded-2xl p-2 duration-300'>Cancel</button>
    //         </div>
    //     </div>
    // </div>
  )
}

export default UserSettings

// export const useFileChange = (): IUseFileChange => {
//     const dispatch = useDispatch();
  
//     const uploadNewFile = async (
//       e: InputEventWithFiles | DragEventWithFiles,
//       chooseDragOption: string,
//       folder?: string
//     ) => {
//       const handleUpload = async () => {
//         const currentUser = await getCurrentUser();
    
//         const file =
//           chooseDragOption === 'click'
//             ? (e as InputEventWithFiles).target?.files?.[0]
//             : (e as DragEventWithFiles)?.dataTransfer?.files?.[0];
    
//         if (file) {
//           let storageRef;
    
//           if (folder) {
//             storageRef = ref(
//               storage,
//               `uploads/users/${currentUser?.uid}/${folder}/${file.name}`
//             );
//           } else {
//             storageRef = ref(
//               storage,
//               `uploads/users/${currentUser?.uid}/${file.name}`
//             );
//           }
    
//           const uploadTask = uploadBytesResumable(storageRef, file);
    
//           uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//               const progress =
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//               dispatch(handleUploadCompletion(progress));
//               dispatch(handleUploadStart(true));
//               if (progress === 100) {
//                 dispatch(handleNewFileUploaded(true));
//               }
//             },
//             (error) => {
//               console.error('Error uploading file:', error);
//             },
//             async () => {
//               const metadata = await getMetadata(uploadTask.snapshot.ref)
//               const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
    
//               const dbRef = databaseInstance.ref(
//                 database,
//                 `files/${currentUser?.uid}/${folder ? folder : ''}/${file.name}`
//               )
//               const fileMetadata = {
//                 name: metadata.name,
//                 owner: currentUser?.uid,
//                 size: metadata.size,
//                 contentType: metadata.contentType,
//                 downloadURL: downloadURL,
//                 createdAt: new Date().toISOString(),
//               };
   
//               databaseInstance.set(dbRef, fileMetadata);
    
//               await updateMetadata(uploadTask.snapshot.ref, {
//                 ...metadata,
//                 customMetadata: { fileName: metadata.name },
//               }).then((res) => console.log(res));
//             }
//           );
//         }
//       };
    
//       handleUpload();
//     };
    
//     return { uploadNewFile };
//   }