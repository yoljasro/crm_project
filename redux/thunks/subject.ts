//next
import { NextRouter } from "next/router";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { ResponseType, SubjectCodesDataType, SubjectDataType, SubjectFilterDataType } from "../../types";
//actions
import { addSubjectCodes, addSubjects, addSubjectFilter } from "../slices/subject";
import { Dispatch, SetStateAction } from "react";

type GetSubjectThunkType = (
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

type GetSubjectFilterThunkType = (
    group: string,
    setIsShow: Dispatch<SetStateAction<boolean>>,
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

export const getSubjectsThunk: GetSubjectThunkType = router => async dispatch => {
    const res: ResponseType<SubjectDataType[]> = await api(apiUrl.lab.subjects, router);
    
    if (res.status === 200) {
        dispatch(addSubjects({
            subjects: res.data,
            selectOptions: res.data.map(subject => {
                return {
                    id: subject.id,
                    value: subject.name
                }
            })
        }))
    }
};

export const getSubjectByGroupThunk: GetSubjectFilterThunkType = (group, setIsShow, router) => async dispatch => {
    const res: ResponseType<SubjectFilterDataType[]> = await api(`${apiUrl.lab.subject_by_group}?group=${group}`, router);

    if (res.status === 200) {
        setIsShow(true)
        dispatch(addSubjectFilter({
            filterSubject: res.data,
            selectOptions: res.data.map(subject => {
                return {
                    id: subject.id,
                    value: subject.name
                }
            })
        }))
    }
};

export const getSubjectCodesThunk: GetSubjectThunkType = router => async dispatch => {
    const res: ResponseType<SubjectCodesDataType[]> = await api(apiUrl.lab.subject_codes, router);

    if (res.status === 200) {
        dispatch(
            addSubjectCodes({
                subjectCodes: res.data,
                selectOptionsCodes: res.data.map(subject => ({
                    id: subject.id,
                    value: subject.code
                }))
            })
        )
    }
};