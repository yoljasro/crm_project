//next
import { NextRouter } from "next/router";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { GroupDataType, GroupsByUserType, ResponseType } from "../../types";
//actions
import { addGroupById, addGroups, addGroupsByUser } from "../slices/group";

type GetGroupsThunkType = (
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

type GetGroupByIdThunkType = (
    id: string,
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

export const getGroupsThunk: GetGroupsThunkType = router => async dispatch => {
    const res: ResponseType<GroupDataType[]> = await api(apiUrl.lab.groups, router);
    
    if (res.status === 200) {
        dispatch(addGroups({
            groups: res.data,
            selectOptions: res.data.map(group => {
                return {
                    id: group.id,
                    value: group.name
                }
            })
        }))
    }
};

export const getGroupByIdThunk: GetGroupByIdThunkType = (id, router) => async dispatch => {
    const res: ResponseType<GroupDataType> = await api(`${apiUrl.lab.groups}${id}/`, router);
    
    if (res.status === 200) {
        dispatch(addGroupById({
            groupById: res.data
        }))
    }
};

export const getGroupsByUserThunk: GetGroupsThunkType = router => async dispatch => {
    const res: ResponseType<GroupsByUserType[]> = await api(apiUrl.lab.groups_by_user, router);

    if (res.status === 200) {
        dispatch(addGroupsByUser({
            groupsByUser: res.data,
            selectOptions: res.data.map(group => {
                return {
                    id: group.id,
                    value: group.name
                }
            })
        }))
    }
};