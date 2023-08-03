//next
import { NextRouter } from "next/router";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { MentorsDataType, ResponseType } from "../../types";
//actions
import { addMentors } from "../slices/mentors";

type GetMentorsThunkType = (
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

export const getMentorsThunk: GetMentorsThunkType = router => async dispatch => {
    const res: ResponseType<MentorsDataType[]> = await api(apiUrl.lab.mentors, router);
    
    if (res.status === 200) {
        dispatch(addMentors({
            users: res.data,
            selectOptions: res.data.map(mentor => ({
                id: mentor.id,
                value: `${mentor.first_name} ${mentor.last_name}`
            }))
        }))
    }
};

export const getMentorsByManagerBranchThunk: GetMentorsThunkType = router => async dispatch => {
    const res: ResponseType<MentorsDataType[]> = await api(apiUrl.lab.mentor_by_manager_branch, router);
    
    if (res.status === 200) {
        dispatch(addMentors({
            users: res.data,
            selectOptions: res.data.map(mentor => ({
                id: mentor.id,
                value: `${mentor.first_name} ${mentor.last_name}`
            }))
        }))
    }
};