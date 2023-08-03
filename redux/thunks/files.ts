//next
import { NextRouter } from "next/router";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { AddFileFormValuesType, ApiMethodEnum, FileDataType, ResponseType, StatusRankEnum, ResponsePaginationType } from "../../types";
//actions
import { addFileArr, addMyFiles } from "../slices/files";
import { addMessage } from "../slices/snackbarSlice";
import { changeNoData } from "../slices/system";

type GetStudentFilesThunkType = (
    data: {
        id: string
        group: string
    },
    router: NextRouter,
    page: number
) => (dispatch: ThunkDispatch) => void

type GetMyFilesThunkType = (
    id: string,
    router: NextRouter,
    status: StatusRankEnum | undefined,
    page: number
) => (dispatch: ThunkDispatch) => void

type GetMentorFilesThunkType = (
    id: string,
    router: NextRouter,
    page: number
) => (dispatch: ThunkDispatch) => void

type SendFileThunkType = (
    data: AddFileFormValuesType<File>,
    router: NextRouter,
    status: StatusRankEnum | undefined,
    t: any
) => (dispatch: ThunkDispatch) => void

export const getStudentFilesThunk: GetStudentFilesThunkType = (data, router, page) => async dispatch => {
    const res: ResponseType<ResponsePaginationType<FileDataType[]>> = await api(
        `${apiUrl.lab.student_files_filter}?group=${data.group}&student=${data.id}&page=${page}`,
        router);

    if (res.status === 200) {
        if (res.data.results.length === 0) {
            dispatch(changeNoData({
                isResData: false
            }))
        } else {
            dispatch(changeNoData({
                isResData: true
            }))
            dispatch(addFileArr({
                count: res.data.count,
                fileArr: res.data.results
            }))
        }
    }
};

export const getMyFilesThunk: GetMyFilesThunkType = (id, router, status, page) => async dispatch => {
    const res: ResponseType<ResponsePaginationType<FileDataType[]>> = await api(`${status === StatusRankEnum.mentor
        ? apiUrl.lab.mentor_own_files
        : apiUrl.lab.student_own_files
        }?page=${page}&group=${id}`, router);

    if (res.status === 200) {
        if (res.data.results.length === 0) {
            dispatch(changeNoData({
                isResData: false
            }))
        } else {
            dispatch(changeNoData({
                isResData: true
            }))
            dispatch(addMyFiles({
                count: res.data.count,
                myFiles: res.data.results
            }))
        }
    }
};

export const getMentorFilesThunk: GetMentorFilesThunkType = (id, router, page) => async dispatch => {
    const res: ResponseType<ResponsePaginationType<FileDataType[]>> = await api(`${apiUrl.lab.mentor_files_filter}?group=${id}&page=${page}`, router);

    if (res.status === 200) {
        if (res.data.results.length === 0) {
            dispatch(changeNoData({
                isResData: false
            }))
        } else {
            dispatch(changeNoData({
                isResData: true
            }))
            dispatch(addFileArr({
                count: res.data.count,
                fileArr: res.data.results
            }))
        }
    }
};

export const sendFileThunk: SendFileThunkType = (data, router, status, t) => async dispatch => {
    console.log(status);

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.file.name);
    formData.append("group", data.group);
    const res: ResponseType = await api(`${status === StatusRankEnum.mentor
        ? apiUrl.lab.mentor_file
        : apiUrl.lab.student_file
        }`, router, ApiMethodEnum.post, formData, { responseType: "blob" });

    if (res.status === 201) {
        dispatch(addMessage({
            type: "success",
            message: t("successfully.file")
        }))
    } else if (res.message) {
        dispatch(addMessage({
            type: "error",
            message: res.message
        }))
    }
};