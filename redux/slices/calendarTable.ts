//redux 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//moment
import moment from "moment";
//types
import { CalendarTableType } from "../../types";

type CalendarTableInitialStateType = {
    calendars: CalendarTableType
}

const initialState: CalendarTableInitialStateType = {
    calendars: {
        [`${moment().weekday(1).date()} - monday`]: [],
        [`${moment().weekday(2).date()} - tuesday`]: [],
        [`${moment().weekday(3).date()} - wednesday`]: [],
        [`${moment().weekday(4).date()} - thursday`]: [],
        [`${moment().weekday(5).date()} - friday`]: [],
        [`${moment().weekday(6).date()} - saturday`]: [],
        [`${moment().weekday(7).date()} - sunday`]: [],
    }
};

const calendarTableSlice = createSlice({
    name: "calendarTable",
    initialState: initialState,
    reducers: {
        addCalendars: (state, action: PayloadAction<CalendarTableInitialStateType>) => {
            return state = {
                ...state,
                calendars: action.payload.calendars
            }
        },
        removeCalendars: (state) => {
            return state = {
                calendars: {}
            }
        }
    }
});

export const { addCalendars, removeCalendars } = calendarTableSlice.actions;
export default calendarTableSlice.reducer