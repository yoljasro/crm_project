//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { FileDataType } from "../../types";

type FilesInitialState = {
    fileArr?: FileDataType[]
    myFiles?: FileDataType[] 
    count?: number
}

const initialState: FilesInitialState = {
    fileArr: [],
    myFiles: [],
    count: undefined
};

const fileSlice = createSlice({
    name: "files",
    initialState: initialState,
    reducers: {
        addFileArr: (state, action: PayloadAction<FilesInitialState>) => {
            return state = {
                ...state,
                fileArr: action.payload.fileArr
            }
        },
        addMyFiles: (state, action: PayloadAction<FilesInitialState>) => {
            return state = {
                ...state,
                myFiles: action.payload.myFiles
            }
        },
        removeFiles: (state) => {
            return state = {
                fileArr: [],
                myFiles: [],
                count: undefined
            }
        }
    }
});

export const { addFileArr, addMyFiles, removeFiles } = fileSlice.actions;
export default fileSlice.reducer;