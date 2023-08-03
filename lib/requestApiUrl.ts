//constants
import { apiUrl } from "../constants";
//types
import { StatusRankEnum } from "../types";

type RequestApiUrlType = (
    url?: StatusRankEnum
) => string

export const requestApiUrl: RequestApiUrlType = url => {
    return url === StatusRankEnum.manager
        ? apiUrl.lab.managers
        : url === StatusRankEnum.mentor
            ? apiUrl.lab.mentors
            : apiUrl.lab.students;
};