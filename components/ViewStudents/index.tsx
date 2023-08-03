//next
import { useRouter } from "next/router";
//react
import { FC, useState, ChangeEvent, useEffect } from "react";
//redux
import { removeFiles } from "../../redux/slices/files";
import { removeGroups } from "../../redux/slices/group";
import { removeFoundUsers } from "../../redux/slices/foundUsersSlice";
import { useTypedSelector, useActions, useTypedDispatch } from "../../redux/store";
//components
import { Loading } from "../Loading";
import { NoData } from "../NoData";
import { FilesArr } from "../FilesArr";
//constants
import { paths } from "../../constants";
//next-intl
import { useTranslations } from "next-intl";
//formik
import { useFormik } from "formik";
//types
import { StatusRankEnum, ValidateType } from "../../types";
//material ui
import {
    Box, FormControl, Select, InputLabel, MenuItem, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination
} from "@mui/material";
//sass
import styles from "./index.module.sass";

export const ViewStudents: FC = () => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [pageUsers, setPageUsers] = useState(1);
    const [pageFiles, setPageFiles] = useState(1);
    const [idSelectStudent, setIdSelectStudent] = useState("");
    const { sendFilterUsersThunk, getGroupsByUserThunk, getStudentFilesThunk } = useActions();
    const { group, foundStudents, countStudents, userStatus, prevFilterData, isResData, fileArr, count } = useTypedSelector(state => ({
        group: state.group,
        userStatus: state.user.status,
        foundStudents: state.foundUsers.foundUsers,
        countStudents: state.foundUsers.count,
        prevFilterData: state.foundUsers.prevFilterData,
        isResData: state.system.isResData,
        count: state.files.count,
        fileArr: state.files.fileArr
    }));
    const formik = useFormik({
        initialValues: {
            group: ""
        },
        onSubmit: (values) => {
            dispatch(removeFiles())
            sendFilterUsersThunk({ status: StatusRankEnum.student, group: values.group }, router, pageUsers)
        }
    });

    const handleChangePageUsers = (event: ChangeEvent<unknown>, p: number) => {
        setPageUsers(p)
        sendFilterUsersThunk(prevFilterData as ValidateType, router, p)
    };

    const handleChangePageFiles = (event: ChangeEvent<unknown>, p: number) => {
        setPageFiles(p)
        getStudentFilesThunk({
            group: formik.values.group, 
            id: idSelectStudent
        }, router, p)
    };

    const handleGetFiles = (id: number, group: string) => {
        dispatch(removeFoundUsers())
        setIdSelectStudent(id.toString())
        getStudentFilesThunk({ 
            id: id.toString(),
            group 
        }, router, pageFiles)
    };

    useEffect(() => {
        if (userStatus !== StatusRankEnum.mentor) {
            router.replace(paths.files)
        }
    }, [])

    useEffect(() => {
        getGroupsByUserThunk(router)

        return () => {
            dispatch(removeGroups())
            dispatch(removeFoundUsers())
        }
    }, [t])

    return (
        <div className={styles.list}>
            <Box
                component={"form"}
                className={styles.list__group}
                onSubmit={formik.handleSubmit}
            >
                <FormControl
                    className={styles.list__group__formControl}
                >
                    <InputLabel id={"groupLabel"}>{t("common.group")}</InputLabel>
                    <Select
                        id={"group"}
                        name={"group"}
                        labelId={"groupLabel"}
                        label={t("common.group")}
                        value={formik.values.group}
                        onChange={formik.handleChange}
                        className={styles.list__group__select}
                    >
                        {
                            group.selectOptions && group.selectOptions.map(option => <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Button
                    type={"submit"}
                    className={styles.list__group__btn}
                >
                    {t("common.view")}
                </Button>
            </Box>
            {
                fileArr && fileArr.length > 0
                    ? null
                    : foundStudents && foundStudents.length > 0
                        ? <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={styles.list__title} align={"left"}>{t("common.first_name")}</TableCell>
                                            <TableCell className={styles.list__title} align={"left"}>{t("common.last_name")}</TableCell>
                                            <TableCell className={styles.list__title} align={"left"}>{t("common.phone_num")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {foundStudents.map((student, index) => (
                                            <TableRow
                                                key={student.id + index}
                                                className={styles.list__row}
                                                onClick={() => handleGetFiles(student.id, formik.values.group)}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell className={styles.list__item} align={"left"}>
                                                    {student.first_name}
                                                </TableCell>
                                                <TableCell className={styles.list__item} align={"left"}>
                                                    {student.last_name}
                                                </TableCell>
                                                <TableCell className={styles.list__item} align={"left"}>
                                                    {student.phone_num}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className={styles.list__pagination}>
                                {
                                    countStudents && <Pagination
                                        page={pageUsers}
                                        shape={"rounded"}
                                        onChange={handleChangePageUsers}
                                        variant={"outlined"}
                                        count={Math.ceil(countStudents / 10)}
                                    />
                                }
                            </div>
                        </>
                        : isResData
                            ? <Loading />
                            : <NoData />
            }
            <FilesArr
                page={pageFiles}
                count={count}
                fileArr={fileArr}
                isResData={null}
                status={StatusRankEnum.mentor}
                handleChangePageFiles={handleChangePageFiles}
            />
        </div>
    )
}