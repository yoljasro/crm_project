//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { ProfileData, StatusRankEnum } from "../../types";

type UserInitialStateType = {
    status?: StatusRankEnum
    profile?: ProfileData
}

const initialState: UserInitialStateType = {};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addStatus: (state, action: PayloadAction<UserInitialStateType>) => {
            return state = {
                ...state,
                status: action.payload.status
            }
        },
        addProfileData: (state, action: PayloadAction<UserInitialStateType>) => {
            return state = {
                ...state,
                profile: action.payload.profile,
                status: action.payload.status
            }
        },
        removeProfile: (state) => {
            return state = {
                ...state,
                profile: undefined
            }
        },
        removeStatus: (state) => {
            return state = {
                ...state,
                status: undefined
            }
        }
    }
});

export const { addStatus, addProfileData, removeProfile, removeStatus } = userSlice.actions;
export default userSlice.reducer;