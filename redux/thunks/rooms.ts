//next
import { NextRouter } from "next/router";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { ResponseType, RoomsDataType } from "../../types";
//actions
import { addRooms } from "../slices/rooms";

type GetRoomsThunkType = (
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

export const getRoomsThunk: GetRoomsThunkType = router => async dispatch => {
    const res: ResponseType<RoomsDataType[]> = await api(apiUrl.lab.rooms, router);
    
    if (res.status === 200) {
        dispatch(addRooms({
            roomArr: res.data,
            selectOptions: res.data.map(room => ({
                id: room.id,
                value: room.name
            }))
        }))
    }
};

export const getRoomsByManagerBranchThunk: GetRoomsThunkType = router => async dispatch => {
    const res: ResponseType<RoomsDataType[]> = await api(apiUrl.lab.room_by_manager_branch, router);
    
    if (res.status === 200) {
        dispatch(addRooms({
            roomArr: res.data,
            selectOptions: res.data.map(room => ({
                id: room.id,
                value: room.name
            }))
        }))
    }
};