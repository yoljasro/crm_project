//next
import { NextRouter } from "next/router";
//react
import { Dispatch, SetStateAction } from "react";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "./../../constants";
//types
import { AddCalendarFormValuesType, ApiMethodEnum, CalendarDataType, CheckCaledarDataType, ResponseType } from "../../types";
//actions
import { addCheckCalendar } from "../slices/calendar";
import { addMessage } from "../slices/snackbarSlice";

type AddCalendarThunkType = (
    data: AddCalendarFormValuesType,
    dataCheck: CheckCaledarDataType,
    router: NextRouter,
    initialValues: AddCalendarFormValuesType,
    checkCalendarThunk: CheckCalendarThunkType,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    t: any
) => (dispatch: ThunkDispatch) => void

type CheckCalendarThunkType = (
    data: CheckCaledarDataType,
    router: NextRouter
) => (dispatch: ThunkDispatch) => void

export const addCalendarThunk: AddCalendarThunkType = (data, dataCheck, router, initialValues, checkCalendarThunk, setIsLoading, t) => async dispatch => {
    const res: ResponseType = await api(apiUrl.lab.calendars, router, ApiMethodEnum.post, data);

    if (res.status === 201) {
        dispatch(addMessage({
            successfully: true,
            message: t("successfully.completed"),
            type: "success"
        }))
    } else if (res.status === 400) {
        if (res.data.message) {
            dispatch(addMessage({
                message: res.data.message,
                type: "error"
            }))
            checkCalendarThunk(dataCheck, router)
        } else {
            for (const key in initialValues) {
                if (res.data[key]) dispatch(addMessage({
                    message: res.data[key],
                    type: "error"
                }))
            }
        }
    } else if (res.message) {
        dispatch(addMessage({
            message: res.message,
            type: "error"
        }))
    }
    setIsLoading(false)
};

export const checkCalendarThunk: CheckCalendarThunkType = (data, router) => async dispatch => {
    
    const res: ResponseType<CalendarDataType[]> = await api(
        `${apiUrl.lab.calendar_filter}?year=${data.year}&month=${data.month}&day=${data.day}&room=${data.room}`,
        router
    );

    if (res.status === 200) {
        if (res.data.length > 0) {
            dispatch(addCheckCalendar({
                checkCalendars: res.data
            }))
        }
    }
};