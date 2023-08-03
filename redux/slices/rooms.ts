//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { OptionType, RoomsDataType } from "../../types";

type RoomsInitialStateType = {
    roomArr?: RoomsDataType[],
    selectOptions?: OptionType<string>
}

const initialState: RoomsInitialStateType = {
    selectOptions: [],
    roomArr: []
};

const roomsSlice = createSlice({
    name: "rooms",
    initialState: initialState,
    reducers: {
        addRooms: (state, action: PayloadAction<RoomsInitialStateType>) => {
            return state = {
                ...state,
                roomArr: action.payload.roomArr,
                selectOptions: action.payload.selectOptions
            }
        },
        removeRooms: (state) => {
            return state = {
                roomArr: [],
                selectOptions: []
            }
        }
    }
});

export const { addRooms, removeRooms } = roomsSlice.actions;
export default roomsSlice.reducer;