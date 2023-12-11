import { useSelector } from "react-redux"
import FileItem from "../../../components/cards/FileItem"
import { useFileChange } from "../../../firebase/firebaseActions"
import { RootState } from "../../../store/store/store"

const UpdatesPage = () => {
  const { uploadNewFile } = useFileChange()
  const uploadedData = useSelector((state: RootState) => state.management.allData)
  const sortedData =[...uploadedData].sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();
    return timestampB - timestampA;
  });
  const mappedAllData = sortedData.map((el, idx) => <FileItem key={idx} name={el.name} fileType={el.fileType}/>)

  return (
    <div className=' w-full h-full flex justify-center mt-10'>
      <div className='w-8/12 h-full flex flex-col gap-10'>
        <div className='flex w-ful justify-between'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-4xl font-semibold'>Update Center</h2>
            <p className='text-slate-300'>Drag and Drop your file here to start uploading</p>
          </div>
          <div className="bg-white rounded-lg border-2 border-dashed border-orange-prime flex justify-center 
          items-center w-4/12 shadow-md flex-col hover:bg-orange-200 hover:text-white duration-500 cursor-pointer">
            <input onChange={(e) => uploadNewFile(e, 'click')}
            type="file" name="file" id="file" className="w-full h-full hidden"/>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-10 h-10 stroke-orange-prime">
                <path strokeLinecap="round" strokeLinejoin="round" 
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <label htmlFor="file" className='text-2xl cursor-pointer '>Upload Your File</label>
          </div>
        </div>
        <div className='w-full flex gap-5 h-12 font-semibold'>
          <div className="flex gap-5">
            <select name="" id="" className="rounded-lg border-2 flex p-2">
              <option value="" className="rounded-lg border-[1px] border-black">File Type</option>
            </select>
            <select name="" id="" className="rounded-lg border-2 p-2">
              <option value="" className="rounded-lg border-[1px] border-black">File Size</option>
            </select>
            <select name="" id="" className="rounded-lg border-2 p-2">
              <option value="" className="rounded-lg border-[1px] border-black">Time</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-5 overflow-y-auto mb-40">
          {mappedAllData}
        </div>
      </div>
    </div>
  )
}

export default UpdatesPage