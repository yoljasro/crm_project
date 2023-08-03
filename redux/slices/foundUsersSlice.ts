//redux 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { FilterUsersFormikValuesType, FoundUserType, StatusRankEnum, SelectUserDataType } from "../../types";

type FoundUsersInitialStateType = {
    foundUsers?: FoundUserType[]
    selectUserData?: SelectUserDataType | null
    prevFilterData?: FilterUsersFormikValuesType | {}
    selectStatus?: StatusRankEnum
    count?: number
}

const initialState: FoundUsersInitialStateType = {
    selectStatus: StatusRankEnum.mentor,
    selectUserData: null,
    prevFilterData: {},
    count: undefined,
    foundUsers: []
};

const FoundUsersSlice = createSlice({
    name: "listFoundUsers",
    initialState: initialState,
    reducers: {
        addFoundUsers: (state, action: PayloadAction<FoundUsersInitialStateType>) => {
            return state = {
                ...state,
                count: action.payload.count,
                foundUsers: action.payload.foundUsers,
                prevFilterData: action.payload.prevFilterData,
                selectStatus: action.payload.selectStatus
            }
        },
        addUserData: (state, action: PayloadAction<FoundUsersInitialStateType>) => {
            return state = {
                ...state,
                selectUserData: action.payload.selectUserData
            }
        },
        removeFoundUsers: (state) => {
            return state = {
                count: undefined,
                foundUsers: [],
                selectUserData: null,
                selectStatus: StatusRankEnum.mentor,
                prevFilterData: {}
            }
        },
        removeSelectUserData: (state) => {
            return state = {
                ...state,
                selectUserData: null
            }
        }
    }
});

export const { addFoundUsers, addUserData, removeFoundUsers, removeSelectUserData } = FoundUsersSlice.actions;
export default FoundUsersSlice.reducer;