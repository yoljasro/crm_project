//next
import { NextRouter } from "next/router";
//types
import { ApiMethodEnum, ResponseType } from "../../types";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from '../../api';
import { addMessage } from "../slices/snackbarSlice";
import { Dispatch, SetStateAction } from "react";

type AddFormsThunkType = (
    data: any,
    router: NextRouter,
    url: string,
    objErr: object,
    t: any,
    setIsSuccessfully: Dispatch<SetStateAction<boolean>>
) => (dispatch: ThunkDispatch) => void

export const addFormsThunk: AddFormsThunkType = (data, router, url, objErr, t, setIsSuccessfully) => async dispatch => {    
    const res: ResponseType = await api(url, router, ApiMethodEnum.post, data);

    if (res.status === 201) {
        dispatch(addMessage({
            message: t("successfully.completed"),
            type: "success"
        }))
        setIsSuccessfully(true)
    } else if (res.status === 400) {
        for (const key in objErr) {            
            if (res.data[key]) dispatch(addMessage({
                message: typeof res.data[key] === "object" ? res.data[key][0] : res.data[key],
                type: "error"
            }))
        }
    } else if (res.message) {
        dispatch(addMessage({
            message: res.message,
            type: "error"
        }))
    }
};