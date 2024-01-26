import { FC, ReactNode } from 'react'
import { useAppSelector } from '../../store/store/storeHooks'

interface IChildren {
    children: ReactNode
}

const ModalWindowLayout: FC<IChildren> = ({children}) => {
  const openModal = useAppSelector(state => state.ui.openModal)
  const deleteConfirm = useAppSelector(state => state.ui.deleteConfirm)
  const renameModal = useAppSelector(state => state.ui.renameModal)
  const moveAndCopyModal = useAppSelector(state => state.ui.moveAndCopyModal)
  const userSettingsModal = useAppSelector(state => state.ui.userSettingsModal)
  const modalsWindow = [openModal.open, deleteConfirm.open, renameModal.open, moveAndCopyModal.open, userSettingsModal.open]
  return (
    <>
    {modalsWindow.some(el => el === true) 
    ? modalsWindow.map((el, idx) => {
      if (el === true) {
        return (
          <div key={idx} className={`${modalsWindow.some(el => el === true)
            ? "flex scale-100 z-10" : "flex opacity-0 -z-10"} bg-[rgba(0,0,0,0.5)] w-full h-full absolute justify-center items-center duration-500`}>
              {children}
          </div>
        )
      }
      return null
    })
    :
    null
    }
    </>
  )
}

export default ModalWindowLayout

{/* <div className ="bg-blue-opacity bg-[rgba(124,161,255,0.5)]"></div> */}