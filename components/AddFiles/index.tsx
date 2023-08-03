//next
import { useRouter } from "next/router";
import Image from "next/image";
//react
import { FC, createRef, ChangeEventHandler, useState, useEffect } from "react";
//redux
import { removeGroups } from "../../redux/slices/group";
import { useTypedSelector, useActions, useTypedDispatch } from "../../redux/store";
//next-intl
import { useTranslations } from "next-intl";
//formik
import { useFormik } from "formik";
//types
import { addFileFormValues } from "../../constants";
//material ui
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Typography } from "@mui/material";
//sass
import styles from "./index.module.sass";
import { addMessage } from "../../redux/slices/snackbarSlice";

export const AddFiles: FC = () => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [fileName, setFileName] = useState(t("common.select_file"));
    const fileRef = createRef<HTMLInputElement>();
    const [file, setFile] = useState<File | null>(null);
    const { sendFileThunk, getGroupsByUserThunk } = useActions();
    const { group, userStatus } = useTypedSelector(state => ({
        group: state.group,
        userStatus: state.user.status
    }));
    const formik = useFormik({
        initialValues: addFileFormValues,
        validate: (values) => {
            if (!file) {
                return {
                    message: t("error.selectFileRequired")
                }
            } else if (file.size > 1024 * 1024 * 10) {
                return {
                    message: t("error.maxSizeFile")
                }
            } else if (values.group.length === 0) {
                return {
                    message: t("error.selectGroupRequired")
                }
            }
        },
        onSubmit: (values) => {
            if (file) {
                const data = {
                    file: file,
                    group: values.group
                }
                sendFileThunk(data, router, userStatus, t)
            }
        }
    });

    const handleSelectFile = () => {
        fileRef.current?.click()
    };

    const handleChangeFile: ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        const files = e.currentTarget.files;
        if (files) {
            setFile(files[0])
            setFileName(files[0].name)
        }
    };

    useEffect(() => {
        getGroupsByUserThunk(router)

        return () => {
            dispatch(removeGroups())
        }
    }, [t])

    return (
        <Box
            component={"form"}
            className={styles.form}
            onSubmit={formik.handleSubmit}
        >
            <FormControl
                className={styles.form__formControl}
            >
                <InputLabel id={"groupLabel"}>{t("common.group")}</InputLabel>
                <Select
                    id={"group"}
                    name={"group"}
                    labelId={"groupLabel"}
                    label={t("common.group")}
                    value={formik.values.group}
                    onChange={formik.handleChange}
                    className={styles.form__select}
                >
                    {
                        group.selectOptions && group.selectOptions.map(option => <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>)
                    }
                </Select>
            </FormControl>
            <div className={styles.form__selectFile}>
                <button className={styles.form__selectFile__btn} onClick={handleSelectFile}>
                    <div className={styles.form__selectFile__icon}>
                        <Image
                            width={24}
                            height={24}
                            alt={"select file"}
                            src={"/icons/selectFile.svg"}
                        />
                    </div>
                    {fileName}
                    <input
                        type={"file"}
                        ref={fileRef}
                        className={styles.form__selectFile__input}
                        onChange={handleChangeFile}
                    />
                </button>
            </div>
            <Typography
                sx={{ margin: "10px 0" }}
                variant={"body1"}
                color={"red"}
            >
                {formik.errors.message}
            </Typography>
            <Button
                type={"submit"}
                className={styles.form__btn}
            >
                {t("common.send")}
            </Button>
        </Box>
    )
};