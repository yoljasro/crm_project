//next
import { useRouter } from "next/router";
//react
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
//redux
import { useActions, useTypedSelector } from "../../redux/store";
//formik
import { useFormik } from "formik";
//types
import { OptionType, ValidateType } from "../../types";
import { SendChangeGroupThunkType } from "../../redux/thunks/filter";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
    Box, TextField, Typography,
    Button, FormControl, InputLabel,
    Select, MenuItem, Autocomplete, Checkbox
} from "@mui/material";
//sass
import styles from "./index.module.sass";
import { paths } from "../../constants";

type FormPropsType = {
    initialValues: object
    textFieldsArr: {
        name: string
        t: string
        type: string
        additionallyName?: string
    }[]
    url: string
    changeGroup?: {
        id: number
        thunkFunction: SendChangeGroupThunkType
    }
    isGroup?: boolean
    selectOptions?: object
    multipleSelectNames?: readonly string[]
    multipleStates?: { [key: string]: OptionType }
    multipleSetStates?: Dispatch<SetStateAction<OptionType>>[]
    selectNames?: readonly string[]
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Form: FC<FormPropsType> = ({
    initialValues,
    textFieldsArr,
    url,
    selectOptions,
    selectNames,
    changeGroup,
    multipleSelectNames,
    multipleSetStates,
    multipleStates,
    isGroup
}) => {
    const router = useRouter();
    const t = useTranslations();
    const [error, setError] = useState("");
    const [subjectsName, setSubjectsName] = useState<OptionType>([]);
    const [isSuccessfully, setIsSuccessfully] = useState(false);
    const { addFormsThunk } = useActions();
    const { mentors } = useTypedSelector(state => ({ mentors: state.mentors }));
    const initialValuesTyped = initialValues as {
        [key: string]: string
    };
    const selectOptionsTyped = selectOptions as {
        [key: string]: {
            id: any
            value: any
        }[]
    };
    const formik = useFormik({
        initialValues: initialValuesTyped,
        validateOnChange: false,
        validate: (values) => {
            setError("")

            const valTyped = values as ValidateType;
            for (const key in valTyped) {
                if (valTyped[key].length === 0) {
                    return {
                        message: "error.allFieldsRequired"
                    }
                }
            }
            if (multipleStates && multipleSelectNames) {
                for (let i = 0; i < multipleSelectNames.length; i++) {
                    if (multipleStates[`${multipleSelectNames[i]}Name`].length === 0) return {
                        message: "error.allFieldsRequired"
                    }
                }
            }
        },
        onSubmit: (values, {resetForm}) => {
            if (changeGroup && multipleStates) {
                changeGroup.thunkFunction(changeGroup.id, {
                    ...values,
                    subjects: subjectsName.map(value => value.id),
                    mentors: multipleStates["mentorsName"].map(value => value.id),
                    students: multipleStates["studentsName"].map(value => value.id),
                    subject_codes: multipleStates["subjectCodesName"].map(value => value.id)
                }, router, setIsSuccessfully, setError, url, initialValuesTyped)
            } else {
                addFormsThunk(
                    multipleStates
                        ? Object.keys(multipleStates).length === 1
                            ? {
                                ...values,
                                subjects: multipleStates["subjectsName"].map(value => value.id)
                            }
                            : {
                                ...values,
                                subjects: subjectsName.map(value => value.id),
                                mentors: multipleStates["mentorsName"].map(value => value.id),
                                students: multipleStates["studentsName"].map(value => value.id),
                                subject_codes: multipleStates["subjectCodesName"].map(value => value.id),
                            }
                        : values, router, url, initialValuesTyped, t, setIsSuccessfully)
            }
        }
    });

    useEffect(() => {
        if (isSuccessfully && multipleSetStates) {
            formik.setValues(initialValuesTyped)
            setSubjectsName([])
            multipleSetStates.forEach(setState => setState([]))
            router.push(paths.groups)
        }
    }, [isSuccessfully])

    useEffect(() => {
        if (multipleStates && multipleStates["mentorsName"]) {
            let filterSubjects: OptionType = [];
            if (mentors && mentors.users && mentors.users.length > 0) {
                multipleStates["mentorsName"].map(mentor => {
                    const findMentor = mentors.users!.filter(mentorInner => {
                        return mentorInner.id === mentor.id
                    })[0];
                    filterSubjects.push(
                        ...findMentor.subjects.map(subject => ({
                            id: subject.id,
                            value: subject.name
                        }))
                    )
                })
                setSubjectsName(prevState => [...filterSubjects])
            }
        }
    }, [multipleStates, mentors])

    return (
        <Box
            component={"form"}
            className={styles.form}
            onSubmit={formik.handleSubmit}
        >
            <div className={styles.form__cont}>
                {textFieldsArr && textFieldsArr.map((textField, index) => (
                    <TextField
                        id={textField.name}
                        name={textField.name}
                        type={textField.type}
                        className={styles.form__input}
                        key={textField.name + index}
                        onChange={formik.handleChange}
                        value={formik.values[textField.name]}
                        label={textField.additionallyName ? `${t(textField.t)} ${textField.additionallyName}` : t(textField.t, { s: "" })}
                    />
                ))}
                {
                    selectOptionsTyped && selectNames && selectNames.map((select, index) => (
                        <FormControl
                            key={select + index}
                            className={styles.form__select}
                            sx={{ width: "100%", maxWidth: 300 }}
                        >
                            <InputLabel id={`${select}Label`}>{t(`common.${select}`, { s: "" })}</InputLabel>
                            <Select
                                id={select}
                                key={select}
                                name={select}
                                labelId={`${select}Label`}
                                label={t(`common.${select}`, { s: "" })}
                                onChange={formik.handleChange}
                                value={formik.values[select] ? formik.values[select] : ""}
                            >
                                {
                                    selectOptionsTyped[select].length > 0 && selectOptionsTyped[select].map((option, index) => <MenuItem key={option.id + index} value={option.id}>{option.value}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    ))
                }
                {
                    selectOptionsTyped
                    && multipleSelectNames
                    && multipleSetStates
                    && multipleStates
                    && multipleSelectNames.map((select, index) => (
                        <Autocomplete
                            key={select + index}
                            multiple
                            id={`${select}-tags`}
                            value={multipleStates[`${select}Name`]}
                            options={selectOptionsTyped[select]}
                            disableCloseOnSelect
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.value}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.value}
                                </li>
                            )}
                            onChange={(e, newVal: OptionType) => multipleSetStates[index](newVal)}
                            className={styles.form__select}
                            renderInput={(params) => (
                                <TextField {...params} label={t(`common.${select.slice(0, select.length - 1)}`, { s: "" })} />
                            )}
                        />
                    ))
                }
                {
                    isGroup
                    && multipleStates
                    && selectOptionsTyped
                    && <Autocomplete
                        multiple
                        id={"subjects-tags"}
                        value={subjectsName}
                        options={selectOptionsTyped["subjects"]}
                        disableCloseOnSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.value}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.value}
                            </li>
                        )}
                        onChange={(e, newVal: OptionType) => setSubjectsName(newVal)}
                        className={styles.form__select}
                        renderInput={(params) => (
                            <TextField {...params} label={t("common.subject", { s: "" })} />
                        )}
                    />
                }
            </div>
            <Typography
                sx={{ marginTop: "10px" }}
                variant={"body1"}
                color={"red"}
            >
                {error}
            </Typography>
            <Typography
                sx={{ marginTop: "10px" }}
                variant={"body1"}
                color={"red"}
            >
                {formik.errors.message && t(formik.errors.message)}
            </Typography>
            <Button
                type={"submit"}
                variant={"contained"}
                className={styles.form__btn}
            >
                {t("common.add")}
            </Button>
        </Box>
    )
};