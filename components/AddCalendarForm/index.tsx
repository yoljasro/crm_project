//next
import { useRouter } from "next/router";
//react
import { useEffect, useState } from "react";
//redux
import { removeCalendars } from "../../redux/slices/calendar";
import { useActions, useTypedDispatch, useTypedSelector } from "../../redux/store";
//formik
import { useFormik } from "formik";
//components
import { Loading } from "../Loading";
//next-intl
import { useTranslations } from "next-intl";
//constants
import { addCalendarFormValues, addCalendarsSelects } from "../../constants";
//material ui
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Stack, Typography, Box, CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//dadyjs
import dayjs, { Dayjs } from "dayjs";
//moment
import moment from "moment";
//types
import { AddCalendarFormValuesType, CheckCaledarDataType, SelectOptionsType } from "../../types";
//sass
import styles from "./index.module.sass";

export const AddCalendarForm = () => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [isShow, setIsShow] = useState(false);
    const [endTime, setEndTime] = useState("");
    const [startTime, setStartTime] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [descriptionVal, setDescriptionVal] = useState("");
    const [dateVal, setDateVal] = useState<Dayjs | null>(dayjs());
    const [selectOptions, setSelectOptions] = useState<SelectOptionsType>();
    const { addCalendarThunk, checkCalendarThunk, getGroupsThunk, getRoomsThunk, getSubjectByGroupThunk } = useActions();
    const { group, rooms, calendar, subject, successfully } = useTypedSelector(state => ({
        group: state.group,
        rooms: state.rooms,
        calendar: state.calendar,
        subject: state.subject,
        successfully: state.snackbar.successfully
    }));
    const formik = useFormik({
        initialValues: addCalendarFormValues as unknown as { [key: string]: string },
        validate: (values) => {
            if (!values["room"] || !values["subject"] || !values["group"] || !descriptionVal) return {
                message: "error.allFieldsRequired"
            }
        },
        onSubmit: (values) => {
            setIsLoading(true)
            const data: AddCalendarFormValuesType = {
                start: `${dateVal?.format("YYYY-MM-DD")} ${startTime}`,
                end: `${dateVal?.format("YYYY-MM-DD")} ${endTime}`,
                description: descriptionVal,
                group: values.group,
                room: values.room,
                subject: values.subject
            };
            const dataCheck: CheckCaledarDataType = {
                year: dateVal?.format("YYYY"),
                month: dateVal?.format("MM"),
                day: dateVal?.format("DD"),
                room: values.room,
                subject: values.subject
            };
            addCalendarThunk(data, dataCheck, router, addCalendarFormValues, checkCalendarThunk, setIsLoading, t)
        }
    });

    useEffect(() => {
        getGroupsThunk(router)
        getRoomsThunk(router)
    }, [t])

    useEffect(() => {
        if (rooms.selectOptions && group.selectOptions) {
            setSelectOptions({
                room: rooms.selectOptions,
                group: group.selectOptions
            })
        }
    }, [group, rooms])

    useEffect(() => {
        if (successfully) {
            setEndTime("")
            setStartTime("")
            setDateVal(dayjs())
            setDescriptionVal("")
            setIsShow(false)
            formik.handleReset(formik.values)
            dispatch(removeCalendars())
        }
    }, [successfully])

    useEffect(() => {
        if (formik.values.group) {
            getSubjectByGroupThunk(formik.values.group, setIsShow, router)
        }
    }, [formik.values.group])

    return (
        <>
            {
                group && rooms
                    ? <>
                        <Box
                            component={"form"}
                            className={styles.form}
                            onSubmit={formik.handleSubmit}
                        >
                            <div className={styles.form__cont}>
                                <TextField
                                    type={"text"}
                                    value={descriptionVal}
                                    className={styles.form__input}
                                    label={t("common.description")}
                                    onChange={(e) => setDescriptionVal(e.target.value)}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={dateVal}
                                        label={t("common.date")}
                                        className={styles.form__date}
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={(newValue: Dayjs | null) => setDateVal(newValue)}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    type={"time"}
                                    value={startTime}
                                    className={styles.form__input}
                                    label={t("calendar.startLesson")}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    type={"time"}
                                    value={endTime}
                                    className={styles.form__input}
                                    label={t("calendar.endLesson")}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {
                                    selectOptions && addCalendarsSelects.map((select, index) => (
                                        <FormControl
                                            key={select + index}
                                            className={styles.form__select}
                                            sx={{ width: "100%", maxWidth: 300 }}
                                        >
                                            <InputLabel id={`${select}-label`}>{t(`common.${select}`)}</InputLabel>
                                            <Select
                                                name={select}
                                                id={`${select}-select`}
                                                labelId={`${select}-label`}
                                                label={t(`common.${select}`)}
                                                onChange={formik.handleChange}
                                                value={formik.values[select] ? formik.values[select] : ""}
                                            >
                                                {
                                                    selectOptions[select].map((option, index) => <MenuItem key={option.value + index} value={option.id}>{option.value}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    ))
                                }
                                {
                                    isShow &&
                                    <FormControl
                                        className={styles.form__select}
                                        sx={{ width: "100%", maxWidth: 300 }}
                                    >
                                        <InputLabel id={"select-label"}>{t("common.subject", { s: "" })}</InputLabel>
                                        <Select
                                            name={"subject"}
                                            id={"subject"}
                                            labelId={"select-label"}
                                            label={t("common.subject", { s: "" })}
                                            onChange={formik.handleChange}
                                            value={formik.values.subject}
                                        >
                                            {
                                                subject.selectOptions && subject.selectOptions.map((option, index) => <MenuItem key={option.value + index} value={option.id}>{option.value}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                }
                            </div>
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
                                disabled={isLoading}
                                className={styles.form__btn}
                            >
                                {
                                    isLoading
                                        ? <CircularProgress />
                                        : t("common.check")}
                            </Button>
                        </Box>
                        <Stack className={styles.list}>
                            {
                                calendar.checkCalendars && calendar.checkCalendars.length > 0 && calendar.checkCalendars.map((calendar, index) => (
                                    <ul
                                        className={styles.list__cont}
                                        key={calendar.start + index}
                                    >
                                        <li className={styles.list__item}>{t("calendar.startLesson")}: {moment(calendar.start).format("YYYY-MM-DD HH:MM")}</li>
                                        <li className={styles.list__item}>{t("calendar.endLesson")}: {moment(calendar.end).format("YYYY-MM-DD HH:MM")}</li>
                                        <li className={styles.list__item}>{t("common.room")}: {calendar.room}</li>
                                        <li className={styles.list__item}>{t("common.group")}: {calendar.group.name}</li>
                                    </ul>
                                ))
                            }
                        </Stack>
                    </>
                    : <Loading />
            }
        </>
    )
};