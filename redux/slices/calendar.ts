//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { CalendarDataType } from "../../types";

type CalendarInitialStateType = {
    calendars?: CalendarDataType[]
    checkCalendars?: CalendarDataType[]
}

const initialState: CalendarInitialStateType = {
    calendars: [],
    checkCalendars: []
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState: initialState,
    reducers: {
        addCalendars: (state, action: PayloadAction<CalendarInitialStateType>) => {
            return state = {
                ...state,
                calendars: action.payload.calendars
            }
        },
        addCheckCalendar: (state, action: PayloadAction<CalendarInitialStateType>) => {
            return state = {
                ...state,
                checkCalendars: action.payload.checkCalendars
            }
        },
        removeCalendars: (state) => {            
            return state = {
                calendars: [],
                checkCalendars: []
            }
        }
    }
});

export const { addCalendars, addCheckCalendar, removeCalendars } = calendarSlice.actions;
export default calendarSlice.reducer;