//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//constants
import { sidebarNav } from "../../constants";

type SystemSliceInitialStateType = {
    isResData?: boolean
    navActiveBtn?: string
}

const initialState: SystemSliceInitialStateType = {
    isResData: true,
    navActiveBtn: sidebarNav[0].name
}

const systemSlice = createSlice({
    name: "noData",
    initialState: initialState,
    reducers: {
        changeNoData: (state, action: PayloadAction<SystemSliceInitialStateType>) => {
            return state = {
                ...state,
                isResData: action.payload.isResData
            }
        },
        changeNavActiveBtn: (state, action: PayloadAction<SystemSliceInitialStateType>) => {
            return state = {
                ...state,
                navActiveBtn: action.payload.navActiveBtn
            }
        }
    }
});

export const { changeNoData, changeNavActiveBtn } = systemSlice.actions;
export default systemSlice.reducer