import {Dispatch, SetStateAction} from "react"
import { auth, database, storage } from '../config/firebaseConfig'; 
import { ref, getDownloadURL, uploadBytesResumable, listAll, StorageReference, 
         ListResult, uploadBytes, deleteObject, getMetadata, updateMetadata } from 'firebase/storage';
import { EmailAuthProvider, User, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { handleUploadCompletion, handleUploadStart } from "../store/slices/uiSlices";
import { handleNewFileUploaded, setUser } from "../store/slices/managementSlice";



export interface IUploadedDataItem {
  name: string,
  downloadURL: string,
  path?: string,
  fileType: string | undefined,
  fileSize: number,
  timestamp: string,
  favorites?: boolean
}
interface IFolder {
itemName: string[],
setSuccess: Dispatch<SetStateAction<boolean>>
}
interface IDeleteFolder extends IFolder {
  deleteSuccess: boolean
}
export interface InputEventWithFiles extends InputEvent {
  target: HTMLInputElement & EventTarget;
}
export interface DragEventWithFiles extends DragEvent {
  dataTransfer: DataTransfer;
}
interface IUseFileChange {
  uploadNewFile: (e: InputEventWithFiles | DragEventWithFiles , chooseDragOption: string, folder?: string) => void
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user)
      unsubscribe()
    })
  })
}

export const useFileChange = (): IUseFileChange => {
  const dispatch = useDispatch();

  const uploadNewFile = (e: InputEventWithFiles | DragEventWithFiles , chooseDragOption: string, folder?: string)  => {
    const handleUpload = async () => {
      const currentUser = await getCurrentUser()

      const file = 
      chooseDragOption === 'click' ? (e as InputEventWithFiles).target?.files?.[0] : (e as DragEventWithFiles)?.dataTransfer?.files?.[0]

      if (file) {
        let storageRef;

        if (folder) {
          storageRef = ref(storage, `uploads/users/${currentUser?.uid}/${folder}/${file.name}`)
        } else {
          storageRef = ref(storage, `uploads/users/${currentUser?.uid}/${file.name}`)
        }

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          dispatch(handleUploadCompletion(progress))
          dispatch(handleUploadStart(true))
          if (progress === 100) {
            dispatch(handleNewFileUploaded(true))
          }
        }, (error) => {
          console.error('Error uploading file:', error);
        }, async () => {
          const metadata = await getMetadata(uploadTask.snapshot.ref)

          await updateMetadata(uploadTask.snapshot.ref, {...metadata, customMetadata: {fileName: metadata.name}})
        });
      }
    };

    handleUpload();
  };

  return { uploadNewFile }
}


  export const fetchUploadedData = async (): Promise<IUploadedDataItem[]> => {
    const currentUser = await getCurrentUser()
    const storageRef: StorageReference = ref(storage, `uploads/users/${currentUser?.uid}`);
  
    try {
      const listResult: ListResult = await listAll(storageRef);

      const mainFolderItems = await Promise.all(
        listResult.items.map(async (item) => {
          const downloadURL = await getDownloadURL(item);
          const metadata = await getMetadata(item);
  
          return {
            name: metadata?.customMetadata?.fileName,
            downloadURL,
            path: item.fullPath,
            fileType: metadata.contentType, 
            fileSize: Number((metadata.size/ (1024 * 1024)).toFixed(3)),
            timestamp: metadata.timeCreated,
            favorites: metadata?.customMetadata?.favorites ? true : false
          };
        })
      )
        
      const folderData = async (folder: ListResult): Promise<IUploadedDataItem[]> => {
        const folderItemsPromises: Promise<IUploadedDataItem[]>[] = folder.prefixes.map(async (el) => {
          const folderRef: StorageReference = ref(storage, el.fullPath)
          const folderResults: ListResult = await listAll(folderRef)

          let subResult: IUploadedDataItem[] = [];
          if (folderResults.prefixes) {
            subResult = await folderData(folderResults);
          }
      
          const currentItemPromises = folderResults.items.map(async (item) => {
            const downloadURL: string = await getDownloadURL(item)

            const metadata: { size: number; timeCreated: string; contentType?: string | undefined } = await getMetadata(item);
      
            return {
              name: metadata?.customMetadata?.fileName,
              downloadURL,
              path: item.fullPath,
              fileType: metadata.contentType,
              fileSize: Number((metadata.size / (1024 * 1024)).toFixed(3)),
              timestamp: metadata.timeCreated,
              favorites: metadata?.customMetadata?.favorites ? true : false
            };
          });
      
          return Promise.all([...currentItemPromises, ...subResult])
        });
      
        return Promise.all(folderItemsPromises).then((resultArray) => {
          return resultArray.reduce((acc, arr) => acc.concat(arr), [])
        });
      };
      const folderItems = await folderData(listResult)
      return {itemsData: [...mainFolderItems, ...folderItems],
         user: 
         {userId: currentUser?.uid, 
          userName: currentUser?.displayName, 
          email: currentUser?.email, 
          avatartImg: currentUser?.photoURL}}
    } catch (error) {
      console.error('Error fetching uploaded data:', error);
      throw error;
      }
    }
  
  

export const createNewFolder = async (itemName: string): Promise<void> => {
  const currentUser = await getCurrentUser()
  const content = ''
  const newFolderPath: string = `uploads/users/${currentUser?.uid}/` + itemName
  const storageRef: StorageReference = ref(storage, newFolderPath);

  try {
    await uploadBytes(storageRef, new TextEncoder().encode(content), {
      contentType: 'text/plain'
    }).then( res => updateMetadata(storageRef, {...res.metadata, customMetadata: {fileName: res.metadata.name}}))
  } catch (error) {
    console.log(error)
  }
};

export const fetchAllFolders = async (): Promise<string[]> => {
  const currentUser = await getCurrentUser()
  const baseRef = "uploads/users/" + currentUser?.uid + "/"
  
  const renderFolders = async (folderName: string, previousPath: string) => {
    const folderPath = previousPath + "/" + folderName
    const folderPathWithoutSlash = folderPath.startsWith('/') ? folderPath.slice(1) : folderPath

    const folderRef: StorageReference = ref(storage, baseRef + folderPathWithoutSlash + "/folders");
    const items = await listAll(folderRef);
  
    const foldersList = await Promise.all(
      items.items.map(async (current) => {
        const subFolders = await renderFolders(current.name, folderPathWithoutSlash);
        return { [current.name]: subFolders };
      })
    );
  
    return Object.assign({}, ...foldersList);
  };
  
  const result = await renderFolders("My Files", "")
  return result;
}  

export const deleteItems = async ({itemName, setSuccess}: IDeleteFolder) => {
  try {
    const currentUser = await getCurrentUser()
    const fullFolderPath = itemName.filter(el => el !== "folders").join('/')
    const singleItemRef: StorageReference = ref(storage, `uploads/users/${currentUser?.uid}/` + itemName.join('/'))
    const existedFolderRef: StorageReference = ref(storage, `uploads/users/${currentUser?.uid}/`+ fullFolderPath)
    await deleteObject(singleItemRef)

    const isFolder = (await listAll(existedFolderRef)).items.length > 0 ? true : false
    if(!isFolder) {
      setSuccess(true)
      return
    }
    const deleteItemsAndSubFolders = async (subFolderPath: string) => {
      const subFolderRef: StorageReference = ref(storage, `uploads/users/${currentUser?.uid}/`+ subFolderPath)
      const existFolderRefList = await listAll(subFolderRef)
      existFolderRefList.items.forEach(async (el) => {
        const itemRef: StorageReference = ref(storage, el.fullPath)
        await deleteObject(itemRef)
      })
      if (existFolderRefList.prefixes.length) {
        existFolderRefList.prefixes.forEach(el => {
          const fixedSubFolderPath = el.fullPath.split('/')
          deleteItemsAndSubFolders(fixedSubFolderPath.slice(fixedSubFolderPath.indexOf('My Files')).join('/'))
        })
      }
    }
    deleteItemsAndSubFolders(fullFolderPath)
    setSuccess(true)
  } catch (error) {
    console.log(error)
  }
}
export const addToFavorite = async (itemName, isFavorite) => {
  try {
    const itemRef: StorageReference = ref(storage, itemName)
    const itemRefData = await getMetadata(itemRef)
    if (isFavorite){
      await updateMetadata(itemRef, {...itemRefData, customMetadata: {favorites: ''}})
      return
    }
    await updateMetadata(itemRef, {...itemRefData, customMetadata: {favorites: 'favorites'}})
  } catch (error) {
    console.log(error)
  }
}
export const renameFile = async (filePath, newName) => {
  try {
    const fileRef: StorageReference = ref(storage, filePath)
    const metadata = await getMetadata(fileRef)
    await updateMetadata(fileRef, {...metadata, customMetadata: {fileName: newName}})
  } catch (error) {
    console.log(error)
  }
}
export const moveOrCopyFile = async ({oldFilePath, id, name, type, setFinish}) => {
  const currentUser = await getCurrentUser()
  const baseRef = "uploads/users/" + currentUser?.uid + "/"
  const newFilePath = baseRef + '/' + id + '/' + name
  const oldFileRef = ref(storage, oldFilePath)

  const fileData = await getDownloadURL(oldFileRef)
  const response = await fetch(fileData)
  const fileBlob = await response.blob()

  const newFileRef = ref(storage, newFilePath)
  await uploadBytes(newFileRef, fileBlob).then(res => updateMetadata(newFileRef, {...res.metadata, customMetadata: {fileName: res.metadata.name}}))
  
  if(type === "move") {
  await deleteObject(oldFileRef).then(() => setFinish(true))
  }
  else {
    setFinish(true)
  }
}
export const updateUser = async ({avatarImg, userName, email}) => {

  try {
    if(currentUser){
      await updateProfile(currentUser, {displayName: userName, photoURL: avatarImg})
    }
  } catch (error) {
    console.log(error)
  }
}
export const changePassword = async ({currentPassword, newPassword}) => {
  const currentUser = await getCurrentUser()
  try {
    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    await reauthenticateWithCredential(currentUser, credential)

    await updatePassword(currentUser, newPassword)
  } catch (error) {
    console.error('Error updating password:', error.message);
  }
};