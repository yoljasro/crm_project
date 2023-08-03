//next
import { useRouter } from "next/router";
//react
import { ChangeEvent, FC, useState } from "react";
//redux
import { removeFoundGroups } from "../../redux/slices/foundGroupsSlice";
import { useActions, useTypedSelector, useTypedDispatch } from "../../redux/store";
//components
import { NoData } from "../NoData";
import { Loading } from "../Loading";
//types
import { FilterGroupsFormikValuesType, StatusRankEnum } from "../../types";
//material ui
import { Pagination } from "@mui/material";
//next-intl
import { useTranslations } from "next-intl";
//lib
import { uniqueKey } from "../../lib/uniqueKey";
//sass
import styles from "./index.module.sass";
import Image from "next/image";
import { paths } from "../../constants";

export const FoundGroups: FC = () => {
    const router = useRouter();
    const t = useTranslations();
    const [page, setPage] = useState(1);
    const dispatch = useTypedDispatch();
    const { sendFilterGroupsThunk } = useActions();
    const { groups, prevFilterData, count, isResData, userStatus } = useTypedSelector(state => ({
        groups: state.group.groups,
        prevFilterData: state.foundGroups.prevFilterData,
        isResData: state.system.isResData,
        count: state.foundGroups.count,
        userStatus: state.user.status
    }));

    const handleChangePage = (e: ChangeEvent<unknown>, p: number) => {
        setPage(p)
        dispatch(removeFoundGroups())
        sendFilterGroupsThunk(prevFilterData as FilterGroupsFormikValuesType, router, p)
    };

    return (
        <>
            {
                groups
                    && groups.length > 0
                    ? <div className={styles.list}>
                        <h1 className={styles.list__title}>{t("group.listGroups")}</h1>
                        {
                            groups.map(group => (
                                <div
                                    key={uniqueKey(group.id)}
                                    className={styles.list__item}
                                >
                                    <div className={styles.list__item__content}>
                                        <div className={styles.list__item__name}>{group.name}</div>
                                        {
                                            group.mentors.map((mentor, index) => (
                                                <div key={mentor.mentor_id + index} className={styles.list__item__info}>{mentor.subject_name}: <span>{mentor.mentor_name}</span></div>
                                            ))
                                        }
                                    </div>
                                    {
                                        userStatus === StatusRankEnum.manager && <button
                                            onClick={() => {
                                                router.push(`${paths.groupsChange}/${group.id}`)
                                            }}
                                            className={styles.list__item__btn}
                                        >
                                            <Image
                                                width={20}
                                                height={20}
                                                alt={"change"}
                                                src={"/icons/editIcon.svg"}
                                            />
                                            {t("common.change")}
                                        </button>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    : isResData
                        ? <Loading />
                        : <NoData />
            }
            <div className={styles.list__pagination}>
                {
                    count && <Pagination
                        page={page}
                        shape={"rounded"}
                        variant={"outlined"}
                        onChange={handleChangePage}
                        count={Math.ceil(count / 10)}
                    />
                }
            </div>
        </>
    )
};