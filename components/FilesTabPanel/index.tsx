//next
import { useRouter } from "next/router";
//react
import { FC, SyntheticEvent, useEffect, useState } from "react";
//redux
import { useTypedSelector } from "../../redux/store";
//components
import { Container } from "../../components/Container";
import { ViewFiles } from "../../components/ViewFiles";
import { MyFiles } from "../../components/MyFiles";
import { AddFiles } from "../../components/AddFiles";
import { ViewStudents } from "../../components/ViewStudents";
//types
import { StatusRankEnum } from "../../types";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//sass
import styles from "./index.module.sass";

export const FilesTabPanel: FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const t = useTranslations();
    const [value, setValue] = useState("2");
    const { userStatus } = useTypedSelector(state => ({ userStatus: state.user.status }));

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    };

    useEffect(() => {
        console.log(id);

        if (id && +id > 0) {
            setValue("1")
        }
    }, [id])

    return (
        <Container>
            {
                userStatus === StatusRankEnum.manager
                    || userStatus === undefined
                    ? null
                    : <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="files_tabs">
                                {
                                    userStatus === StatusRankEnum.student
                                    && <Tab label={t("common.view")} value="1" />
                                }
                                <Tab label={t("common.my_files")} value="2" />
                                <Tab label={t("common.add")} value="3" />
                                {
                                    userStatus === StatusRankEnum.mentor
                                    && <Tab label={t("common.student", { s: "" })} value="4" />
                                }
                            </TabList>
                        </Box>
                        {
                            userStatus === StatusRankEnum.student
                            && <TabPanel className={styles.tabPanel} value="1">
                                <ViewFiles />
                            </TabPanel>
                        }
                        <TabPanel className={styles.tabPanel} value="2">
                            <MyFiles />
                        </TabPanel>
                        <TabPanel className={styles.tabPanel} value="3">
                            <AddFiles />
                        </TabPanel>
                        {
                            userStatus === StatusRankEnum.mentor
                            && <TabPanel className={styles.tabPanel} value="4">
                                <ViewStudents />
                            </TabPanel>
                        }
                    </TabContext>
            }
        </Container>
    )
};