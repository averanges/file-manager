import { FC, ReactNode } from 'react'
import { useAppSelector } from '../../store/store/storeHooks'

interface IChildren {
    children: ReactNode
}

const ModalWindowLayout: FC<IChildren> = ({children}) => {
  const { open } = useAppSelector(state => state.ui.openModal)
  return (
    <div className={`${open ? "flex scale-100 z-10" : "flex opacity-0 -z-10"} bg-[rgba(0,0,0,0.5)] w-full h-full absolute justify-center items-center duration-500`}>
        {children}
    </div>
  )
}

export default ModalWindowLayout