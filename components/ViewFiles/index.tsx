//next
import { useRouter } from "next/router";
//react
import { ChangeEvent, FC, useEffect, useState } from "react";
//next-intl
import { useTranslations } from "next-intl";
//redux
import { removeGroups } from "../../redux/slices/group";
import { removeFiles } from "../../redux/slices/files";
import { useTypedSelector, useActions, useTypedDispatch } from "../../redux/store";
//types
import { StatusRankEnum } from "../../types";
//formik
import { useFormik } from "formik";
//material ui
import {
    Box, FormControl, Select, InputLabel, MenuItem, Button, Pagination
} from "@mui/material";
//sass
import styles from "./index.module.sass";
import { FilesArr } from "../FilesArr";

export const ViewFiles: FC = () => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [page, setPage] = useState(1);
    const { getMentorFilesThunk, getGroupsByUserThunk } = useActions();
    const { group, fileArr, count, userStatus, isResData } = useTypedSelector(state => ({
        group: state.group,
        userStatus: state.user.status,
        fileArr: state.files.fileArr,
        count: state.files.count,
        isResData: state.system.isResData
    }));
    const formik = useFormik({
        initialValues: {
            group: ""
        },
        onSubmit: (values) => {
            dispatch(removeFiles())
            getMentorFilesThunk(values.group, router, page)
        }
    });
    const handleChangePageFiles = (event: ChangeEvent<unknown>, p: number) => {
        setPage(p)
        if (userStatus === StatusRankEnum.student) {
            getMentorFilesThunk(formik.values.group, router, p)
        }
    };

    useEffect(() => {
        getGroupsByUserThunk(router)

        return () => {
            dispatch(removeGroups())
        }
    }, [t])

    return (
        <div className={styles.view}>
            {
                userStatus === StatusRankEnum.student
                && <Box
                    component={"form"}
                    className={styles.view__group}
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl
                        className={styles.view__group__formControl}
                    >
                        <InputLabel id={"groupLabel"}>{t("common.group")}</InputLabel>
                        <Select
                            id={"group"}
                            name={"group"}
                            labelId={"groupLabel"}
                            label={t("common.group")}
                            value={formik.values.group}
                            onChange={formik.handleChange}
                            className={styles.view__group__select}
                        >
                            {
                                group.selectOptions && group.selectOptions.map(option => <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <Button
                        type={"submit"}
                        className={styles.view__group__btn}
                    >
                        {t("common.view")}
                    </Button>
                </Box>
            }
            <FilesArr
                page={page}
                fileArr={fileArr}
                count={count}
                isResData={isResData}
                status={StatusRankEnum.student}
                handleChangePageFiles={handleChangePageFiles}
            />
        </div>
    )
};