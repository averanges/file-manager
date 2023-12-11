import { Link, useMatch, useParams } from "react-router-dom"
import FileItem from "../../../components/cards/FileItem"
import { useSelector } from "react-redux"
import { useFileChange } from "../../../firebase/firebaseActions"
import { RootState } from "../../../store/store/store"
import { useAppDispatch, useAppSelector } from "../../../store/store/storeHooks"
import { handleOpenModal } from "../../../store/slices/uiSlices"

const FolderPage = () => {
  const { id } = useParams()
  const allFolders = useAppSelector(state => state.management.allFolders)
  const generateLinks = (folders, path) => {
    if (!folders || !path || typeof path !== 'string') {
      return null;
    }
  
    const partedPath = path.split('/');
    const currentKey = partedPath[0];
    const remainingPath = partedPath.slice(1);
    const subFolders = Object.keys(folders[currentKey]).map(el => {
      const fullPath = `${id}/${el}`;
      const encodedPath = encodeURIComponent(fullPath);
  
      return (
          <Link to={`/dashboard/folder/${encodedPath}`} key={fullPath} className="relative h-16 w-[10%]">
              <div className="absolute w-10 h-10 -top-3 right-0 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-300 rounded-xl"></div>
              <div className="absolute w-full h-full bg-gradient-to-r from-orange-200 via-orange-300 to-orange-300 flex justify-center items-center text-xl">
                <p>{el}</p>
              </div>
          </Link>
      );
    });
  
    if (remainingPath.length > 0) {
      const nextPath = remainingPath.join('/');
      return generateLinks(folders[currentKey], nextPath);
    }
  
    return subFolders;
  };
  
  const links = generateLinks(allFolders, id);

  const uploadedData = useSelector((state: RootState) => state.management.allData)
  const currentFolderData = typeof(id) !== "undefined" ? uploadedData.filter(el => el.path.includes(id)) : null
  const mappedAllData = currentFolderData !== null ? currentFolderData.map((el, idx) => <FileItem key={idx} name={el.name} path={el.path} fileType={el.fileType}/>) : null
  const currentFolder = id?.split('/').slice(-1)[0];
  const { uploadNewFile } = useFileChange()
  const dispatch = useAppDispatch()
  return (
    <div className=' w-full h-full flex justify-center mt-10'>
      <div className='w-8/12 h-full flex flex-col gap-10'>
        <div className='flex w-ful justify-between'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-4xl font-semibold'>{ currentFolder }</h2>
            <p>Drag and Drop your file here to start uploading</p>
          </div>
          <button onClick={() => dispatch(handleOpenModal({open: true, id}))}>Click</button>
          <div className="bg-white rounded-lg border-2 border-dashed border-orange-prime flex justify-center 
          items-center w-4/12 shadow-md flex-col hover:bg-orange-200 hover:text-white duration-500 cursor-pointer">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-10 h-10 stroke-orange-prime">
                <path strokeLinecap="round" strokeLinejoin="round" 
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <label htmlFor="file" className='text-2xl'>Upload Your File</label>
            <input className="hidden"
            type="file" name="file" 
            id="file" onChange={(e) => uploadNewFile(e, 'click', id)}/>
          </div>
        </div>
        <div className="flex flex-col gap-5  mb-40 bf-re">
          {mappedAllData}
          <div className="flex gap-5 h-fit">
            {links}
          </div>
        </div>
        </div>
      </div>
  )
}

export default FolderPage