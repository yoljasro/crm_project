//next
import { NextRouter } from "next/router";
//react
import { SetStateAction, Dispatch } from 'react';
//redux
import { Dispatch as ThunkDispatch } from '@reduxjs/toolkit';
//api
import { api } from "../../api";
//constants
import { apiUrl, localStorageKeys, paths } from "../../constants";
//types
import { ApiMethodEnum, ResponseType, SignInReqDataType, SignInResDataType } from "../../types";
import { GetStatusThunkType } from "./user";


type SignInThunkType = (
    data: SignInResDataType,
    setError: Dispatch<SetStateAction<string>>,
    router: NextRouter,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsSuccessfully: Dispatch<SetStateAction<boolean>>,
    getStatusThunk: GetStatusThunkType
) => (dispatch: ThunkDispatch) => void

export const signInThunk: SignInThunkType = (data, setError, router, setIsLoading, setIsSuccessfully, getStatusThunk) => async dispatch => {
    const res: ResponseType<SignInReqDataType> = await api(apiUrl.accounts.login, router, ApiMethodEnum.post, data);

    if (res.status === 200) {
        setIsSuccessfully(true)
        setTimeout(() => setIsSuccessfully(false), 3000)
        localStorage.setItem(localStorageKeys.token, JSON.stringify({
            access: res.data.access,
            refresh: res.data.refresh
        }))
        router.push(paths.main)
        getStatusThunk(router)
    } else if (res.status === 401) {
        res.data.detail && setError(res.data.detail)
    } else if (res.message) {
        setError(res.message)
    }
    setIsLoading(false)
};