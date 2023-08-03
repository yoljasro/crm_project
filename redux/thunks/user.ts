//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//next
import { NextRouter } from "next/router";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { ApiMethodEnum, ProfileData, ResponseType } from "../../types";
//actions
import { addProfileData, addStatus } from "../slices/user";

export type GetStatusThunkType = (
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

type GetProfileDataThunkType = (
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

export const getStatusThunk: GetStatusThunkType = router => async dispatch => {
    const res: ResponseType = await api(apiUrl.accounts.status, router);
    
    if (res.status === 200) {
        dispatch(addStatus({
            status: res.data.status
        }))
    }
};

export const getProfileDataThunk: GetProfileDataThunkType = router => async dispatch => {
    const res: ResponseType<ProfileData> = await api(apiUrl.accounts.profile, router);
    
    if (res.status === 200) {
        dispatch(addProfileData({
            profile: res.data,
            status: res.data.status
        }))
    }
};