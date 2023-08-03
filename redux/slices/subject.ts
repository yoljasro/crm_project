//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { OptionType, SubjectCodesDataType, SubjectDataType, SubjectFilterDataType } from "../../types";

type SubjectInitialStateType = {
    subjects?: SubjectDataType[]
    selectOptions?: OptionType<string>
    selectOptionsCodes?: OptionType<string> 
    subjectCodes?: SubjectCodesDataType[]
    filterSubject?: SubjectFilterDataType[]
}

const initialState: SubjectInitialStateType = {
    subjectCodes: [],
    selectOptions: [],
    selectOptionsCodes: [],
    subjects: [],
    filterSubject: []
};

const subjectSlice = createSlice({
    name: "subject",
    initialState: initialState,
    reducers: {
        addSubjects: (state, action: PayloadAction<SubjectInitialStateType>) => {
            return state = {
                ...state,
                subjects: action.payload.subjects,
                selectOptions: action.payload.selectOptions
            }
        },
        addSubjectFilter: (state, action: PayloadAction<SubjectInitialStateType>) => {
            return state = {
                ...state,
                filterSubject: action.payload.filterSubject,
                selectOptions: action.payload.selectOptions
            }
        },
        addSubjectCodes: (state, action: PayloadAction<SubjectInitialStateType>) => {
            return state = {
                ...state,
                subjectCodes: action.payload.subjectCodes,
                selectOptionsCodes: action.payload.selectOptionsCodes
            }
        },
        removeSubjects: (state) => {
            return state = {
                subjects: [],
                selectOptions: [],
                subjectCodes: [],
                selectOptionsCodes: [],
                filterSubject: []
            }
        }, 
    }
});

export const { addSubjects, addSubjectFilter, removeSubjects, addSubjectCodes } = subjectSlice.actions;
export default subjectSlice.reducer;