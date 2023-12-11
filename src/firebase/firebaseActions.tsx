import {Dispatch, SetStateAction} from "react"
import { auth, storage } from '../config/firebaseConfig'; 
import { ref, getDownloadURL, uploadBytesResumable, listAll, StorageReference, ListResult, uploadBytes, deleteObject, getMetadata } from 'firebase/storage';
import { User, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { handleUploadCompletion, handleUploadStart } from "../store/slices/uiSlices";
import { handleNewFileUploaded } from "../store/slices/managementSlice";



export interface IUploadedDataItem {
  name: string,
  downloadURL: string,
  path: string,
  fileType: string | undefined,
  fileSize: number,
  timestamp: string
}
interface IFolder {
itemName: string,
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
    });
  });
}

export const useFileChange = (): IUseFileChange => {
  const dispatch = useDispatch();

  const uploadNewFile = (e: InputEventWithFiles | DragEventWithFiles , chooseDragOption: string, folder?: string)  => {
    const handleUpload = async () => {
      const currentUser = await getCurrentUser();
      const file = 
      chooseDragOption === 'click' ? (e as InputEventWithFiles).target?.files?.[0] : (e as DragEventWithFiles)?.dataTransfer?.files?.[0]

      if (file) {
        let storageRef;

        if (folder) {
          storageRef = ref(storage, `uploads/users/${currentUser?.uid}/${folder}/${file.name}`);
        } else {
          storageRef = ref(storage, `uploads/users/${currentUser?.uid}/${file.name}`);
        }

        const uploadTask = uploadBytesResumable(storageRef, file);

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
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File is available at:', downloadURL);
        });
      }
    };

    handleUpload();
  };

  return { uploadNewFile };
};


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
            name: item.name,
            downloadURL,
            path: item.fullPath,
            fileType: metadata.contentType, 
            fileSize: Number((metadata.size/ (1024 * 1024)).toFixed(3)),
            timestamp: metadata.timeCreated
          };
        })
      );
  
      const folderItemsPromises: Promise<IUploadedDataItem[]>[] = listResult.prefixes.map(async (folder) => {
        const folderRef: StorageReference = ref(storage, folder.fullPath)
        const folderResults: ListResult = await listAll(folderRef)
        return Promise.all(
          folderResults.items.map(async (item) => {
            const downloadURL: string = await getDownloadURL(item);
            const metadata: {size: number, timeCreated: string, contentType?: string | undefined} = await getMetadata(item);
  
            return {
              name: item.name,
              downloadURL,
              path: item.fullPath,
              fileType: metadata.contentType,
              fileSize: Number((metadata.size/ (1024 * 1024)).toFixed(3)),
              timestamp: metadata.timeCreated
            }
          })
        )
      })
  
      const folderItems: IUploadedDataItem[] = (await Promise.all(folderItemsPromises)).flat();
      return [...mainFolderItems, ...folderItems];
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
    });
  } catch (error) {
    console.log(error)
  }
};

export const fetchAllFolders = async (): Promise<string[]> => {
  const currentUser = await getCurrentUser()
  const baseRef = "uploads/users/" + currentUser?.uid + "/"
  
  const renderFolders = async (folderName: string, previousPath: string) => {
    const folderPath = previousPath + "/" + folderName.toLowerCase()
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
  
  const result = await renderFolders("", "");
  console.log(result);
  return result;
}  

export const deleteFolder = async ({itemName, setSuccess, deleteSuccess}: IDeleteFolder) => {
  const currentUser = await getCurrentUser()
  const storageRef: StorageReference = ref(storage, `uploads/users/${currentUser?.uid}/folders/` + itemName)
  deleteObject(storageRef)

  setSuccess(!deleteSuccess)
}