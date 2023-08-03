//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { BranchDataType, OptionType } from "../../types";

type BranchInitialStateType = {
    branches: BranchDataType[],
    selectOptions: OptionType<string>
}

const initialState: BranchInitialStateType = {
    branches: [],
    selectOptions: []
};

const branchSlice = createSlice({
    name: "branch",
    initialState: initialState,
    reducers: {
        addBranches: (state, action: PayloadAction<BranchInitialStateType>) => {
            return state = {
                ...state,
                branches: action.payload.branches,
                selectOptions: action.payload.selectOptions
            }
        },
        removeBranches: (state) => {
            return state = {
                branches: [],
                selectOptions: []
            }
        }
    }
});

export const { addBranches, removeBranches } = branchSlice.actions;
export default branchSlice.reducer;