//next
import { NextRouter } from "next/router";
//redux
import { Dispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { ResponseType, StudentsDataType } from "../../types";
//actions
import { addStudents } from "../slices/students";

type GetStudentsThunkType = (
    router: NextRouter
) => (dispatch: Dispatch) => Promise<void>

export const getStudentsThunk: GetStudentsThunkType = router => async dispatch => {
    const res: ResponseType<StudentsDataType[]> = await api(apiUrl.lab.students, router);
    
    if (res.status === 200) {
        dispatch(addStudents({
            users: res.data,
            selectOptions: res.data.map(student => ({
                id: student.id,
                value: `${student.first_name} ${student.last_name}`
            }))
        }))
    }
};

export const getStudentsByManagerBranchThunk: GetStudentsThunkType = router => async dispatch => {
    const res: ResponseType<StudentsDataType[]> = await api(apiUrl.lab.student_by_manager_branch, router);
    
    if (res.status === 200) {
        dispatch(addStudents({
            users: res.data,
            selectOptions: res.data.map(student => ({
                id: student.id,
                value: `${student.first_name} ${student.last_name}`
            }))
        }))
    }
};