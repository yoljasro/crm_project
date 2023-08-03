//next
import { NextRouter } from "next/router";
//react
import { Dispatch, SetStateAction } from "react";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//constants
import { apiUrl, changeUserFormikValues } from "./../../constants";
//api
import { api } from "../../api";
//types
import {
    ApiMethodEnum, FilterGroupsFormikValuesType, FilterUsersFormikValuesType,
    FoundGroupType, GroupDataType, ResponseType,
    StatusRankEnum, FoundUserType, SelectUserDataType,
    ChangeUserFormikValuesType, ModalChangeType, ValidateType, ResponsePaginationType
} from "../../types";
//lib
import { requestApiUrl } from "../../lib/requestApiUrl";
//actions
import { addFoundGroups, addGroupData } from "../slices/foundGroupsSlice";
import { addFoundUsers, addUserData } from "../slices/foundUsersSlice";
import { changeNoData } from "../slices/system";

type SendFilterThunkType<T = any> = (
    data: T,
    router: NextRouter,
    page?: number
) => (dispatch: ThunkDispatch) => void

type GetGroupDataThunkType = (
    id: number,
    router: NextRouter,
    setIsOpenModalView: Dispatch<SetStateAction<boolean>>
) => (dispatch: ThunkDispatch) => void

type GetUserDataThunkType = (
    id: number,
    router: NextRouter,
    url?: StatusRankEnum,
    setIsOpenModalView?: Dispatch<SetStateAction<boolean>>
) => (dispatch: ThunkDispatch) => Promise<void>

export type SendChangeGroupThunkType = (
    id: number,
    data: any,
    router: NextRouter,
    setIsSuccessfully: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>,
    url: string,
    objErr: object
) => (dispatch: ThunkDispatch) => void

type SendChangeUserDataThunkType = (
    id: number,
    data: ChangeUserFormikValuesType,
    prevFilterData: FilterUsersFormikValuesType | undefined,
    setModalChange: Dispatch<SetStateAction<ModalChangeType>>,
    setError: Dispatch<SetStateAction<string | undefined>>,
    sendFilterThunk: SendFilterThunkType,
    router: NextRouter,
    url?: StatusRankEnum
) => (dispatch: ThunkDispatch) => Promise<void>

type DeleteFoundGroupsThunkType = (
    id: number,
    router: NextRouter,
    prevFilterData: FilterGroupsFormikValuesType | undefined | {},
    sendFilterGroupsThunk: SendFilterThunkType
) => (dispatch: ThunkDispatch) => void

type DeleteFoundUserThunkType = (
    id: number,
    sendFilterThunk: SendFilterThunkType,
    router: NextRouter,
    prevFilterData: FilterUsersFormikValuesType | undefined,
    url?: StatusRankEnum
) => (dispatch: ThunkDispatch) => Promise<void>

export const sendFilterGroupsThunk: SendFilterThunkType<FilterGroupsFormikValuesType> = (data, router, page) => async dispatch => {
    const urlAndQuery = data.branch === ""
        ? apiUrl.lab.groups_filter
        : `${apiUrl.lab.groups_filter}?branch=${data.branch}${page ? `&page=${page}` : ""}`;
    const res: ResponseType<ResponsePaginationType<FoundGroupType[]>> = await api(urlAndQuery, router);

    if (res.status === 200) {
        if (res.data.results.length === 0) {
            dispatch(changeNoData({
                isResData: false
            }))
        } else {
            dispatch(changeNoData({
                isResData: true
            }))
            dispatch(addFoundGroups({
                count: res.data.count,
                foundGroups: res.data.results,
                prevFilterData: data
            }))
        }
    }
};

export const sendFilterUsersThunk: SendFilterThunkType<ValidateType> = (data, router, page) => async dispatch => {
    const urlAndQuery = `${apiUrl.lab.filter}?status=${data.status}${data.group ? `&group=${data.group}` : ""
        }${data.branch ? `&branch=${data.branch}` : ""
        }${data.subject ? `&subject=${data.subject}` : ""
        }${page ? `&page=${page}` : ""
        }`;
    const res: ResponseType<ResponsePaginationType<FoundUserType[]>> = await api(urlAndQuery, router);

    if (res.status === 200) {
        if (res.data.results.length === 0) {
            dispatch(changeNoData({
                isResData: false
            }))
        } else {
            dispatch(addFoundUsers({
                count: res.data.count,
                foundUsers: res.data.results,
                prevFilterData: data as FilterUsersFormikValuesType,
                selectStatus: data.status === StatusRankEnum.manager
                    ? StatusRankEnum.manager
                    : data.status === StatusRankEnum.mentor
                        ? StatusRankEnum.mentor
                        : StatusRankEnum.student,
            }))
            dispatch(changeNoData({
                isResData: true
            }))
        }
    }
};

export const getGroupDataThunk: GetGroupDataThunkType = (id, router, setIsOpenModalView) => async dispatch => {
    const res: ResponseType<GroupDataType> = await api(`${apiUrl.lab.groups}${id}`, router);

    if (res.status === 200) {
        dispatch(addGroupData({
            selectGroupData: res.data
        }))
        setIsOpenModalView(true)
    }
};

export const getUserDataThunk: GetUserDataThunkType = (id, router, url, setIsOpenModalView,) => async dispatch => {
    const reqUrl = requestApiUrl(url);

    const res: ResponseType<SelectUserDataType> = await api(`${reqUrl}${id}/`, router);

    if (res.status === 200) {
        dispatch(addUserData({
            selectUserData: res.data
        }))
        setIsOpenModalView && setIsOpenModalView(true)
    }
};

export const sendChangeGroupThunk: SendChangeGroupThunkType = (id, data, router, setIsSuccessfully, setError, url, objErr) => async dispatch => {
    const res: ResponseType = await api(`${apiUrl.lab.groups}${id}/`, router, ApiMethodEnum.patch, data);

    if (res.status === 200) {
        setIsSuccessfully(true)
    } else if (res.status === 400) {
        for (const key in objErr) {
            if (res.data[key]) setError(res.data[key][0])
        }
    } else if (res.message) {
        setError(res.message)
    }
};

export const sendChangeUserDataThunk: SendChangeUserDataThunkType = (id, data, prevFilterData, setModalChange, setError, setFilterThunk, router, url) => async dispatch => {
    const reqUrl = requestApiUrl(url);

    const res: ResponseType = await api(`${reqUrl}${id}/`, router, ApiMethodEnum.patch, data);

    if (res.status === 200) {
        setModalChange({ isOpen: false, id: 0 })
        prevFilterData && setFilterThunk(prevFilterData, router)
    } else if (res.status === 400) {
        for (const key in changeUserFormikValues) {
            if (res.data[key]) setError(res.data[key])
        }
    } else if (res.status === 403) {
        setError(res.data.detail)
    } else if (res.message) {
        setError(res.message)
    }
};

export const deleteFoundGroupsThunk: DeleteFoundGroupsThunkType = (id, router, prevFilterData, sendFilterGroupsThunk) => async dispatch => {
    const res: ResponseType = await api(`${apiUrl.lab.groups}${id}/`, router, ApiMethodEnum.delete);

    if (res.status === 204) {
        prevFilterData && sendFilterGroupsThunk(prevFilterData, router)
    }
};

export const deleteFoundUserThunk: DeleteFoundUserThunkType = (id, sendFilterThunk, router, prevFilterData, url) => async dispatch => {
    const reqUrl = requestApiUrl(url);

    const res = await api(`${reqUrl}${id}/`, router, ApiMethodEnum.delete);

    if (res.status === 204) {
        prevFilterData && sendFilterThunk(prevFilterData, router)
    }
};