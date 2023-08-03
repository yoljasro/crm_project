//next
import { NextRouter } from "next/router";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { CalendarTableType, ResponseType } from "./../../types/";
//actions
import { addCalendars } from "../slices/calendarTable";

type GetCalendarsThunkType = (
    router: NextRouter,
    room?: number
) => (dispatch: ThunkDispatch) => void

export const getCalendarsThunk: GetCalendarsThunkType = (router, room = 1) => async dispatch => {
    const res: ResponseType<{ message: CalendarTableType }> = await api(`${apiUrl.lab.week_calendar}?room=${room}`, router);

    if (res.status === 200) {
        dispatch(addCalendars({
            calendars: res.data.message
        }))
    }
}