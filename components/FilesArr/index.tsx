//next
import Image from "next/image";
import { useRouter } from "next/router";
//react
import { FC, ChangeEvent } from "react";
//types
import { FileDataType, StatusRankEnum } from "../../types";
//components
import { Loading } from "../Loading";
import { NoData } from "../NoData";
//lib
import { downloadFile } from "../../lib/downloadFile";
//next-intl
import { useTranslations } from "next-intl";
//moment
import moment from "moment";
//material ui
import { Pagination } from "@mui/material";
//sass
import styles from "./index.module.sass";

type FilesArrPropsType = {
    fileArr: FileDataType[] | undefined
    status: StatusRankEnum
    page: number
    handleChangePageFiles: (event: ChangeEvent<unknown>, p: number) => void
    isResData: boolean | undefined | null
    count: number | undefined
}

export const FilesArr: FC<FilesArrPropsType> = ({ fileArr, status, handleChangePageFiles, page, count, isResData }) => {
    const router = useRouter();
    const t = useTranslations();
    const handleDownload = (id: number, name: string, type: StatusRankEnum) => {
        downloadFile({ id, name, type }, router)
    };

    return (
        <>
            {
                fileArr && fileArr.length > 0
                    ? fileArr.map((file, index) => (
                        <div key={file.id + index} className={styles.files}>
                            <div className={styles.files__content}>
                                <p className={styles.files__content__user}>{file.name}</p>
                                <p className={styles.files__content__group}>{t("common.group")}: {file.group}</p>
                                <p className={styles.files__content__date}>{t("common.date")}: <span>{moment(file.date).format("YYYY-MM-DD HH:MM")}</span></p>
                            </div>
                            <div className={styles.files__additional}>
                                <button
                                    onClick={() => handleDownload(file.id, file.name, status)}
                                    className={styles.files__additional__btn}
                                >
                                    <Image
                                        width={19}
                                        height={19}
                                        alt={"Download"}
                                        src={"/icons/downloadIcon.svg"}
                                    />
                                    {t("common.download")}
                                </button>
                                <Image
                                    width={50}
                                    height={50}
                                    alt={"File"}
                                    src={"/img/file.png"}
                                />
                            </div>
                            <div className={styles.files__pagination}>
                                {
                                    count && <Pagination
                                        page={page}
                                        shape={"rounded"}
                                        onChange={handleChangePageFiles}
                                        variant={"outlined"}
                                        count={Math.ceil(count / 10)}
                                    />
                                }
                            </div>
                        </div>
                    ))
                    : isResData
                        ? <Loading />
                        : isResData === null
                            ? null
                            : <NoData />
            }
        </>
    )
}