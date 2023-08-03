//next
import { NextRouter } from "next/router";
//redux
import { Dispatch as ThunkDispatch } from "@reduxjs/toolkit";
//api
import { api } from "../../api";
//constants
import { apiUrl } from "../../constants";
//types
import { BranchDataType, ResponseType } from "../../types";
//actions
import { addBranches } from "../slices/branch";

type GetBranchesThunkType = (
    router: NextRouter
) => (dispatch: ThunkDispatch) => Promise<void>

export const getBranchesThunk: GetBranchesThunkType = router => async dispatch => {
    const res: ResponseType<BranchDataType[]> = await api(apiUrl.lab.branch, router);

    if (res.status === 200) {
        dispatch(addBranches({
            branches: res.data,
            selectOptions: res.data.map((branch) => {
                return {
                    id: branch.id,
                    value: branch.name
                }
            })
        }))
    }
};