//next
import { NextRouter } from "next/router";
//types
import { ApiMethodEnum, ResponseType, StatusRankEnum } from "../types";
//constants
import { apiUrl, localStorageKeys } from "../constants";
//api
import { api } from "../api";

type DownloadFileType = (
    file: {
        id: number
        name: string
        type: StatusRankEnum
    }, 
    router: NextRouter
) => void

export const downloadFile: DownloadFileType = async (file, router) => {
    const res: ResponseType<Blob> = await api(`${file.type === StatusRankEnum.mentor
        ? apiUrl.lab.student_file_download
        : apiUrl.lab.mentor_file_download
    }?id=${file.id}`, router, ApiMethodEnum.get, {}, {responseType: "blob"});

    const url = window.URL.createObjectURL(res.data);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = `${file.name}`;
    document.body.appendChild(link)
    link.click()
    link.remove()
};