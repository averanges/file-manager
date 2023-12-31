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
    deleteConfirm: {
        open: boolean,
        path: string[]
    },
    renameModal: {
        open: boolean,
        path: string,
        name: string
    },
    moveAndCopyModal: {
        open: boolean,
        path: string,
        name: string,
        id: string
    },
    userSettingsModal: {
        open: boolean,
        subTabType: string
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
    deleteConfirm: {
        path: [],
        open: false
    },
    renameModal: {
        path: '',
        name: '',
        open: false
    },
    moveAndCopyModal: {
        open: false,
        path: '',
        name: '',
        id: ''
    },
    userSettingsModal: {
        open: false,
        subTabType: ''
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
        },
        handleDeleteConfirm : (state, action: PayloadAction<{ open: boolean; path: string[] }>) => {
            state.deleteConfirm = action.payload
        },
        handleMoveAndCopy : (state, action: PayloadAction<{ open: boolean; path: string, name: string, id: string }>) => {
            console.log(action.payload)
            state.moveAndCopyModal = action.payload
        },
        handleRenameAction: (state, action: PayloadAction<{ open: boolean; path: string, name: string }>) => {
            state.renameModal = action.payload
        },
        handleAuidoPlayer : (state, action: PayloadAction<boolean>) => {
            state.audioPlayerOpen = action.payload
        },
        handleMusicActive : (state, action: PayloadAction<object>) => {
            state.musicActive = action.payload
        },
        handleUserSettingsModal : (state, action: PayloadAction<{open: boolean, subTabType: string}>) => {
            state.userSettingsModal = action.payload
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

export const { 
       handleOpenModal,
       handleAuidoPlayer,
       handleMusicActive,
       handleMusicStart, 
       handleUploadCompletion, 
       handleUploadStart, 
       handleOpenFullImage,
       handleDeleteConfirm,
       handleRenameAction,
       handleMoveAndCopy,
       handleUserSettingsModal
    } = uiSlice.actions

export default uiSlice.reducer