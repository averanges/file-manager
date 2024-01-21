import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUploadedDataItem } from "../../firebase/firebaseActions";

interface IFileTypedData {
  [key: string]: IUploadedDataItem[];
  images: IUploadedDataItem[];
  audio: IUploadedDataItem[];
  video: IUploadedDataItem[];
  documents: IUploadedDataItem[];
  othersFiles: IUploadedDataItem[];
}

interface IFileTypedSizes {
  images: number;
  audio: number;
  video: number;
  documents: number;
  othersFiles: number;
  allData: number;
}


interface IManagementState {
  allData: IUploadedDataItem[];
  isDataLoading: boolean;
  allFolders: {};
  isFoldersLoading: boolean;
  fileTypedData: IFileTypedData;
  fileTypedSizes: IFileTypedSizes;
  newFileUploaded: boolean,
  newFolderAdded: boolean,
  user: {
    userName: string,
    avatarImg: string,
    userId: string,
    email: string
  },
  foldersList: IUploadedDataItem[],
  actionSuccess: boolean
}

const initialState: IManagementState = {
  allData: [],
  allFolders: {},
  isDataLoading: true,
  isFoldersLoading: true,
  fileTypedData: {
    images: [],
    audio: [],
    video: [],
    documents: [],
    othersFiles: [],
  },
  fileTypedSizes: {
    images: 0,
    audio: 0,
    video: 0,
    documents: 0,
    othersFiles: 0,
    allData: 0,
  },
  newFileUploaded: false,
  newFolderAdded: false,
  user: {
    avatarImg: '',
    userName: '',
    userId: '',
    email: ''

  },
  foldersList: [],
  actionSuccess: false
};

const calculateFileSizes = (fileArray: IUploadedDataItem[]): number =>
  fileArray.map((el) => el.fileSize).reduce((acc, el) => acc + el, 0);

const managementSlice = createSlice({
  name: "management",
  initialState,
  reducers: {
    handleAllData: (state, action: PayloadAction<{updatedData: IUploadedDataItem[], foldersList: IUploadedDataItem[]}>) => {
      state.allData = action.payload?.updatedData
      state.foldersList = action.payload?.foldersList

      const { allData } = state;

      state.fileTypedData.documents = allData.filter(
        (el) =>
        typeof(el.fileType) !== "undefined" && el.fileType.includes("text") ||
          el.name.includes("docx") ||
          el.name.includes("pdf") ||
          el.name.includes("ppt") ||
          el.name.includes("pptx")
      );
      state.fileTypedData.images = allData.filter((el) =>
        typeof(el.fileType) !== "undefined" && el.fileType.includes("image")
      );
      state.fileTypedData.audio = allData.filter((el) =>
      typeof(el.fileType) !== "undefined" && el.fileType.includes("audio")
      );
      state.fileTypedData.video = allData.filter((el) =>
      typeof(el.fileType) !== "undefined" && el.fileType.includes("video")
      );
      state.fileTypedData.othersFiles = allData.filter(
        (el) =>{
        if (el.fileType) {
          !el.fileType.includes("text") &&
          !el.fileType.includes("audio") &&
          !el.fileType.includes("image") &&
          !el.fileType.includes("video") &&
          !el.name.includes("docx") &&
          !el.name.includes("pdf") &&
          !el.name.includes("ppt") &&
          !el.name.includes("pptx")
        }
      })

      state.fileTypedSizes.audio = calculateFileSizes(
        state.fileTypedData.audio
      );
      state.fileTypedSizes.video = calculateFileSizes(
        state.fileTypedData.video
      );
      state.fileTypedSizes.documents = calculateFileSizes(
        state.fileTypedData.documents
      );
      state.fileTypedSizes.othersFiles = calculateFileSizes(
        state.fileTypedData.othersFiles
      );
      state.fileTypedSizes.images = calculateFileSizes(
        state.fileTypedData.images
      );
      state.fileTypedSizes.allData = calculateFileSizes(allData);
    },
    handleDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    handleAllFolders: (state, action: PayloadAction<{}>) => {
      state.allFolders = action.payload;
    },
    handleFoldersLoading: (state, action: PayloadAction<boolean>) => {
      state.isFoldersLoading = action.payload;
    },
    handleNewFileUploaded: (state, action: PayloadAction<boolean>) => {
        state.newFileUploaded = action.payload;
      },    
    handleActionSuccess: (state, action: PayloadAction<boolean>) => {
        state.actionSuccess = action.payload;
    },
    handleNewFolderAdded: (state, action: PayloadAction<boolean>) => {
        state.newFolderAdded = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
  },
  },
});

export const {
  handleAllData,
  handleDataLoading,
  handleAllFolders,
  handleFoldersLoading,
  handleNewFileUploaded,
  handleNewFolderAdded,
  setUser,
  handleActionSuccess
} = managementSlice.actions;

export default managementSlice.reducer;
