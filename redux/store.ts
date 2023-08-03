import { configureStore, bindActionCreators } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { Thunks } from "./thunks/index";
import branch from "./slices/branch";
import group from "./slices/group";
import subject from "./slices/subject";
import user from "./slices/user";
import foundUsers from "./slices/foundUsersSlice";
import students from "./slices/students";
import mentors from "./slices/mentors";
import rooms from "./slices/rooms";
import foundGroups from "./slices/foundGroupsSlice";
import calendar from "./slices/calendar";
import calendarTable from "./slices/calendarTable";
import files from "./slices/files";
import system from "./slices/system";
import snackbar from "./slices/snackbarSlice";

const store = configureStore({
    reducer: {
        branch,
        group,
        subject,
        user,
        foundUsers,
        students,
        mentors,
        rooms,
        foundGroups,
        calendar,
        calendarTable,
        files,
        system,
        snackbar
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => AppDispatch = useDispatch;
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(Thunks, dispatch)
};

export default store