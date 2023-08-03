//next
import { NextPage, GetStaticProps } from "next";
//react
import { useState, SyntheticEvent, useEffect } from "react";
//redux
import { removeSubjects } from "../redux/slices/subject";
import { removeStudents } from "../redux/slices/students";
import { removeMentors } from "../redux/slices/mentors";
import { removeRooms } from "../redux/slices/rooms";
//components
import { Container } from "../components/Container";
import { AddStudentForm } from "../components/AddStudentForm";
import { AddMentorForm } from "../components/AddMentorForm";
import { GroupForm } from "../components/GroupForm";
import { AddSubjectForm } from "../components/AddSubjectForm";
import { AddSubjectCodeForm } from "../components/AddSubjectCodeForm";
import { AddRoomForm } from "../components/AddRoomForm";
import { AddCalendarForm } from "../components/AddCalendarForm";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { paths } from "../constants";

interface AddPropsType {
    previousRoute?: string | null
}

const Add: NextPage<AddPropsType> = ({previousRoute}) => {
    const t = useTranslations();
    const [value, setValue] = useState("1");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    };

    useEffect(() => {
        return () => {
            removeMentors()
            removeRooms()
            removeSubjects()
            removeStudents()
        }
    }, [])

    useEffect(() => {
        if (previousRoute === paths.calendars) setValue("7")
    }, [])

    return (
        <Container>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="add_tabs">
                        <Tab label={t("common.student", {s: ""})} value="1" />
                        <Tab label={t("common.mentor", {s: ""})} value="2" />
                        <Tab label={t("common.group")} value="3" />
                        <Tab label={t("common.subject", {s: ""})} value="4" />
                        <Tab label={t("common.subjectCode", {s: ""})} value="5" />
                        <Tab label={t("common.room")} value="6" />
                        <Tab label={t("calendar.lesson")} value="7" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <AddStudentForm />
                </TabPanel>
                <TabPanel value="2">
                    <AddMentorForm />
                </TabPanel>
                <TabPanel value="3">
                    <GroupForm />
                </TabPanel>
                <TabPanel value="4">
                    <AddSubjectForm />
                </TabPanel>
                <TabPanel value="5">
                    <AddSubjectCodeForm />
                </TabPanel>
                <TabPanel value="6">
                    <AddRoomForm />
                </TabPanel>
                <TabPanel value="7">
                    <AddCalendarForm />
                </TabPanel>
            </TabContext>
        </Container>
    )
}

export default Add

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: (await import(`../messages/${locale}.json`)).default
        }
    }
}