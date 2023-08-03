//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { OptionType, StudentsDataType } from "../../types";

type StudentsInitialStateType = {
    users?: StudentsDataType[],
    selectOptions?: OptionType<string>
}

const initialState: StudentsInitialStateType = {
    selectOptions: [],
    users: []
};

const studentsSlice = createSlice({
    name: "students",
    initialState: initialState,
    reducers: {
        addStudents: (state, action: PayloadAction<StudentsInitialStateType>) => {
            return state = {
                ...state,
                users: action.payload.users,
                selectOptions: action.payload.selectOptions
            }
        },
        removeStudents: (state) => {
            return state = {
                users: [],
                selectOptions: []
            }
        }
    }
});

export const { addStudents, removeStudents } = studentsSlice.actions;
export default studentsSlice.reducer;