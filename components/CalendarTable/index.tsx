//next
import { useRouter } from "next/router";
//react
import { FC, useEffect, useState } from "react";
//redux
import { removeCalendars } from "../../redux/slices/calendar";
import { useActions, useTypedDispatch, useTypedSelector } from "../../redux/store";
//time table
import TimeTable from "react-timetable-events";
import { Events } from "react-timetable-events/dist/types";
//components
import { Loading } from "../Loading";
//next-intl
import { useTranslations } from "next-intl";
//lib
import { uniqueKey } from "../../lib/uniqueKey";
//types
import { CalendarTableDayType, StatusRankEnum } from "../../types";
//moment
import moment from "moment";
//sass
import styles from "./index.module.sass";
//constants
import { weekDays } from "../../constants";

export const CalendarTable: FC = () => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [isWindow, setIsWindow] = useState(false);
    const [changedCalendars, setChangedCalendars] = useState<Events>({});
    const { getCalendarsThunk } = useActions();
    const { calendars, userStatus } = useTypedSelector(state => ({
        calendars: state.calendarTable.calendars,
        userStatus: state.user.status
    }));

    useEffect(() => {
        if (userStatus !== StatusRankEnum.manager) {
            getCalendarsThunk(router)
        }
    }, [t])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsWindow(true)
        }
    }, [])

    useEffect(() => {
        let i = 0;
        const newCalendars: Events = {};
        for (const day in calendars) {
            newCalendars[`${day.slice(0, 2)} - ${t(`calendar.${weekDays[i]}`)}`] = calendars[day].map(event => ({
                ...event,
                startTime: new Date(event.startTime),
                endTime: new Date(event.endTime)
            }));
            i += 1
        }
        setChangedCalendars(newCalendars)
    }, [calendars, t])

    useEffect(() => {
        return () => {
            dispatch(removeCalendars())
        }
    }, [])

    return (
        <>
            {
                isWindow && changedCalendars
                    ? <TimeTable
                        timeLabel={""}
                        events={changedCalendars}
                        className={styles.calendar}
                        hoursInterval={{ from: 8, to: 23 }}
                        style={{ width: "100%", height: "1360px" }}
                        renderHour={({ hour, ...otherProperties }) => (
                            <div
                                {...otherProperties}
                                className={`${otherProperties.className} ${styles.calendar__hour}`}
                                key={uniqueKey(+hour)}
                            >
                                {hour}
                                <div className={styles.calendar__hour__line}></div>
                                <div className={styles.calendar__hour__line}></div>
                                <div className={styles.calendar__hour__line}></div>
                                <div className={styles.calendar__hour__line}></div>
                                <div className={styles.calendar__hour__line}></div>
                            </div>
                        )}
                        renderDayHeader={({ day, rowHeight, ...otherProperties }) => (
                            <div
                                {...otherProperties}
                                key={uniqueKey(day)}
                                className={styles.calendar__day}
                                style={{ ...(otherProperties?.style || {}), height: `${rowHeight}px` }}
                            >
                                <div className={styles.calendar__day__week}>{day.slice(4)}</div>
                                <div className={styles.calendar__day__month}>{day.slice(0, 2)}</div>
                            </div>
                        )}
                        renderEvent={({ event, defaultAttributes, classNames }) => {
                            const eventTyped = event as unknown as CalendarTableDayType;

                            return (
                                <div
                                    key={uniqueKey(event.id)}
                                    title={event.name}
                                    {...defaultAttributes}
                                    style={{
                                        ...defaultAttributes.style,
                                        border: `2px solid ${eventTyped.border_color}`,
                                        background: eventTyped.background_color,
                                    }}
                                    className={styles.calendar__event}
                                >
                                    <div
                                        className={styles.calendar__event__cont}
                                    >
                                        <div className={styles.calendar__event__subject}>{eventTyped.subject_name}</div>
                                        <div className={styles.calendar__event__contText}>
                                            <div className={styles.calendar__event__mentor}>{eventTyped.mentor}</div>
                                            <div className={styles.calendar__event__room}>{t("common.room")}: {eventTyped.room_name}</div>
                                            <div className={styles.calendar__event__time}>
                                                {moment(event.startTime).format("HH:mm")} - {moment(event.endTime).format("HH:mm")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                        headerAttributes={{
                            className: styles.calendar__title
                        }}
                        bodyAttributes={{
                            className: styles.calendar__column
                        }}
                    />
                    : <Loading />
            }
        </>
    )
};