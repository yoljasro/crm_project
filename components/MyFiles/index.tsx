//next
import { useRouter } from "next/router";
import Image from "next/image";
//react
import { ChangeEvent, FC, useEffect, useState } from "react";
//redux
import { removeGroups } from "../../redux/slices/group";
import { useActions, useTypedDispatch, useTypedSelector } from "../../redux/store";
//components
import { Loading } from "../Loading";
import { NoData } from "../NoData";
//next-intl
import { useTranslations } from "next-intl";
//types
import { StatusRankEnum } from "../../types";
//moment
import moment from "moment";
//formik
import { useFormik } from "formik";
//lib
import { downloadFile } from "../../lib/downloadFile";
//material ui
import { Box, FormControl, InputLabel, Select, Button, MenuItem, Pagination } from "@mui/material";
//sass
import styles from "./index.module.sass";
import { FilesArr } from "../FilesArr";

export const MyFiles: FC = () => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [page, setPage] = useState(1);
    const { getMyFilesThunk, getGroupsByUserThunk } = useActions();
    const { myFiles, group, userStatus, count, isResData } = useTypedSelector(state => ({
        group: state.group,
        userStatus: state.user.status,
        myFiles: state.files.myFiles,
        count: state.files.count,
        isResData: state.system.isResData
    }));
    const formik = useFormik({
        initialValues: {
            group: ""
        },
        onSubmit: (values) => {
            getMyFilesThunk(values.group, router, userStatus, page)
        }
    });

    const handleDownload = (id: number, name: string, type: StatusRankEnum) => {
        downloadFile({ id, name, type }, router)
    };
    const handleChangePage = (event: ChangeEvent<unknown>, p: number) => {
        setPage(p)
        getMyFilesThunk(formik.values.group, router, userStatus, page)
    };

    useEffect(() => {
        getGroupsByUserThunk(router)

        return () => {
            dispatch(removeGroups())
        }
    }, [t])

    return (
        <div className={styles.myFiles}>
            <Box
                component={"form"}
                className={styles.myFiles__group}
                onSubmit={formik.handleSubmit}
            >
                <FormControl
                    className={styles.myFiles__group__formControl}
                >
                    <InputLabel id={"groupLabel"}>{t("common.group")}</InputLabel>
                    <Select
                        id={"group"}
                        name={"group"}
                        labelId={"groupLabel"}
                        label={t("common.group")}
                        value={formik.values.group}
                        onChange={formik.handleChange}
                        className={styles.myFiles__group__select}
                    >
                        {
                            group.selectOptions && group.selectOptions.map(option => <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Button type={"submit"} className={styles.myFiles__group__btn}>
                    {t("common.view")}
                </Button>
            </Box>
            <FilesArr
                page={page}
                count={count}
                fileArr={myFiles}
                isResData={isResData}
                status={StatusRankEnum.student}
                handleChangePageFiles={handleChangePage}
            />
        </div>
    )
};