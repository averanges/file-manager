import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IFileItem } from "../../components/cards/FileItem"

interface IActiveObj {
    isActive: boolean,
    trackData : IFileItem 
}
interface IUiState {
    openModal: {
        open: boolean, 
        id?: string
    },
    audioPlayerOpen: boolean,
    musicActive: IActiveObj,
    musicStart: boolean,
    uploadPercentComplete: number,
    uploadStart: boolean,
    openFullImage: {
        isOpenFullImage: boolean,
        openFullImageSource: string
    }
}

const initialState: IUiState = {
    openModal: {
        open: false,
        id: ''
    },
    audioPlayerOpen: false,
    musicActive: {isActive: false, trackData: {
        name: '',
    }},
    musicStart: false,
    uploadPercentComplete: 0,
    uploadStart: false,
    openFullImage: {
        isOpenFullImage: false,
        openFullImageSource: ''
    }
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        handleOpenModal : (state, action: PayloadAction<{ open: boolean; id: string }>) => {
            state.openModal = action.payload
            console.log(action.payload)
        },
        handleAuidoPlayer : (state, action: PayloadAction<boolean>) => {
            state.audioPlayerOpen = action.payload
        },
        handleMusicActive : (state, action: PayloadAction<object>) => {
            state.musicActive = action.payload
        },
        handleMusicStart : (state, action: PayloadAction<boolean>) => {
            state.musicStart = action.payload
        },
        handleUploadCompletion : (state, action: PayloadAction<number>) => {
            state.uploadPercentComplete = action.payload
        },
        handleUploadStart : (state, action: PayloadAction<boolean>) => {
            state.uploadStart = action.payload
        },
        handleOpenFullImage : (state, action: PayloadAction<boolean>) => {
            state.openFullImage = {...action.payload}
        },



    }
})

export const { handleOpenModal, handleAuidoPlayer, handleMusicActive, handleMusicStart, handleUploadCompletion, handleUploadStart, handleOpenFullImage } = uiSlice.actions

export default uiSlice.reducer