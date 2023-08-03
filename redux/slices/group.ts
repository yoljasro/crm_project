//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { OptionType, GroupDataType, GroupsByUserType } from "../../types";

type GroupInitialStateType = {
    groups?: GroupDataType[]
    groupById?: GroupDataType
    groupsByUser?: GroupsByUserType[]
    selectOptions?: OptionType<string>
}

const initialState: GroupInitialStateType = {
    groups: [],
    groupsByUser: [],
    selectOptions: []
};

const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {
        addGroups: (state, action: PayloadAction<GroupInitialStateType>) => {
            return state = {
                ...state,
                groups: action.payload.groups,
                selectOptions: action.payload.selectOptions
            }
        },
        addGroupsByUser: (state, action: PayloadAction<GroupInitialStateType>) => {
            return state = {
                ...state,
                groupsByUser: action.payload.groupsByUser,
                selectOptions: action.payload.selectOptions
            }
        },
        addGroupById: (state, action: PayloadAction<GroupInitialStateType>) => {
            return state = {
                ...state,
                groupById: action.payload.groupById
            }
        },
        removeGroups: (state) => {
            return state = {
                groups: [],
                selectOptions: [],
                groupById: undefined
            }
        }
    }
});

export const { addGroups, removeGroups, addGroupsByUser, addGroupById } = groupSlice.actions;
export default groupSlice.reducer;