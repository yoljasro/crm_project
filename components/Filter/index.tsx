//next
import { useRouter } from "next/router";
//react
import { FC, useEffect } from "react";
//redux
import { useTypedDispatch, useTypedSelector } from "../../redux/store";
import { removeFoundUsers } from "../../redux/slices/foundUsersSlice";
import { removeFoundGroups } from "../../redux/slices/foundGroupsSlice";
//formik
import { useFormik } from "formik";
//types 
import { OptionType, ValidateType } from "../../types";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import { Select, FormControl, InputLabel, MenuItem, Box } from "@mui/material";
//sass
import styles from "./index.module.sass";

type FilterPropsType = {
    initialValues: {
        [key: string]: any
    }
    thunkSubmit: (...arg: any) => (dispatch: any) => void
    selectOptions: object
    selectNames: readonly string[]
}

export const Filter: FC<FilterPropsType> = ({ initialValues, thunkSubmit, selectOptions, selectNames }) => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const {foundUsers} = useTypedSelector(state => ({foundUsers: state.foundUsers.foundUsers}))
    const selectOptionsTyped = selectOptions as {
        [key: string]: OptionType<any>
    };
    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: false,
        onSubmit: (values) => {
            dispatch(removeFoundUsers())
            dispatch(removeFoundGroups())
            const data: ValidateType = {};
            for (const key in values) {
                if (values[key]) data[key] = values[key]
            }
            thunkSubmit(data, router);
        }
    });

    useEffect(() => {
        formik.handleSubmit()
    }, [])

    useEffect(() => {
        if (!foundUsers) formik.handleSubmit()
    }, [foundUsers])

    return (
        <Box
            className={styles.filter}
        >
            <div className={styles.filter__selectCont}>
                {
                    selectOptionsTyped && selectNames.map(select => (
                        <FormControl
                            key={select}
                            className={styles.filter__formControl}
                        >
                            <InputLabel id={`${select}Label`}>{t(`common.${select}`, {s: ""})}</InputLabel>
                            <Select
                                id={select}
                                name={select}
                                labelId={`${select}Label`}
                                label={t(`common.${select}`, {s: ""})}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formik.handleSubmit()
                                }}
                                className={styles.filter__select}
                                value={formik.values[select] ? formik.values[select] : ""}
                            >
                                <MenuItem value={""}>None</MenuItem>
                                {
                                    selectOptionsTyped[select].map(option => <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>)
                                }   
                            </Select>
                        </FormControl>
                    ))
                }
            </div>
        </Box>
    )
};