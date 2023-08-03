//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SnackbarInitialStateType = {
    message: string
    successfully?: boolean
    type: "error" | "success"
}

const initialState: SnackbarInitialStateType = {
    message: "",
    type: "success",
    successfully: false
}

const snackbarSlice = createSlice({
    name: "noData",
    initialState: initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<SnackbarInitialStateType>) => {
            return state = {
                message: action.payload.message,
                type: action.payload.type,
                successfully: action.payload.successfully
            }
        }
    }
});

export const { addMessage } = snackbarSlice.actions;
export default snackbarSlice.reducer