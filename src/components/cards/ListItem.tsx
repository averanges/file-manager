import { CalendarSVG, FolderSVG } from '../../ui/svg/svg'

interface IListItem {
itemName: string,
downloadURL: string
}


const ListItem = ({itemName, downloadURL}: IListItem) => {
  const downloadItem = (): void => {
    window.open(downloadURL, '_blank')
  }
  return (
    <tr className="hover:bg-[rgba(255,125,160,0.5)] cursor-pointer duration-500"
    onClick={downloadItem}>
        <td className="flex items-center gap-2 w-fit justify-center ml-2 my-2 ">
            <div className="bg-purple-prime text-white rounded-full w-12 h-12 flex justify-center items-center">
                 <FolderSVG size="8"/>
             </div>
            <p className="text-xl">{itemName.length > 20 ? itemName.slice(0,20) : itemName}</p>
            </td>
         <td className="font-semibold translate-x-[30%]">
             <p>34MB</p>
         </td>
            <td>
              <div className="flex items-center gap-2 justify-center bg-slate-200 rounded-full py-1">
                 <div className="w-2 h-2 bg-purple-prime rounded-full"/>
                 <p className="text-slate-500">Documents</p>
              </div>
        </td>
         <td>
             <div className="flex justify-center">
                <div>
                     <CalendarSVG/>
                </div>
                 <p>January,10,2022</p>
            </div>
         </td>
     </tr>
  )
}

export default ListItem