//redux 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { FilterGroupsFormikValuesType, GroupDataType, FoundGroupType } from "../../types";

type FoundGroupsInitialStateType = {
    count?: number
    foundGroups?: FoundGroupType[]
    selectGroupData?: GroupDataType | null
    prevFilterData?: FilterGroupsFormikValuesType | {}
}

const initialState: FoundGroupsInitialStateType = {
    selectGroupData: null,
    foundGroups: [],
    prevFilterData: {},
    count: undefined
};

const foundGroupsSlice = createSlice({
    name: "foundGroups",
    initialState: initialState,
    reducers: {
        addFoundGroups: (state, action: PayloadAction<FoundGroupsInitialStateType>) => {
            return state = {
                ...state,
                count: action.payload.count,
                foundGroups: action.payload.foundGroups,
                prevFilterData: action.payload.prevFilterData
            }
        },
        addGroupData: (state, action: PayloadAction<FoundGroupsInitialStateType>) => {
            return state = {
                ...state,
                selectGroupData: action.payload.selectGroupData
            }
        },
        removeFoundGroups: (state) => {
            return state = {
                count: undefined,
                foundGroups: [],
                selectGroupData: null,
                prevFilterData: {}
            }
        }
    }
});

export const { addFoundGroups, addGroupData, removeFoundGroups } = foundGroupsSlice.actions;
export default foundGroupsSlice.reducer;