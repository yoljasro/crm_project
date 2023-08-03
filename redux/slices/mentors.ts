//redux 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { OptionType, MentorsDataType } from "../../types";

type MentorsInitialStateType = {
    users?: MentorsDataType[],
    selectOptions?: OptionType<string>
}

const initialState: MentorsInitialStateType = {
    selectOptions: [],
    users: []
};

const mentorsSlice = createSlice({
    name: "mentors",
    initialState: initialState,
    reducers: {
        addMentors: (state, action: PayloadAction<MentorsInitialStateType>) => {
            return state = {
                ...state,
                users: action.payload.users,
                selectOptions: action.payload.selectOptions
            }
        },
        removeMentors: (state) => {
            return state = {
                users: [],
                selectOptions: []
            }
        }
    }
});

export const { addMentors, removeMentors } = mentorsSlice.actions;
export default mentorsSlice.reducer;