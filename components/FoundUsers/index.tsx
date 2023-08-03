//next
import { useRouter } from "next/router";
import Image from "next/image";
//react
import { FC, Dispatch, SetStateAction, useState, ChangeEvent } from "react";
//redux
import { removeFoundUsers } from "../../redux/slices/foundUsersSlice";
import { useActions, useTypedDispatch, useTypedSelector } from "../../redux/store";
//components
import { NoData } from "../NoData";
import { Loading } from "../Loading";
//types
import { FilterUsersFormikValuesType, ModalChangeType, StatusRankEnum, ValidateType } from "../../types";
//next-intl
import { useTranslations } from "next-intl";
//lib
import { uniqueKey } from "../../lib/uniqueKey";
//material ui
import { Pagination } from "@mui/material";
//sass
import styles from "./index.module.sass";

type FoundUsersType = {
    handleGetUserData: (id: number) => void,
    handleReset: (e?: any) => void,
    setIsOpenModalChange: Dispatch<SetStateAction<ModalChangeType>>
}

export const FoundUsers: FC<FoundUsersType> = ({ handleGetUserData, setIsOpenModalChange, handleReset }) => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [page, setPage] = useState(1);
    const { deleteFoundUserThunk, sendFilterUsersThunk } = useActions();
    const { foundUsers, userStatus, prevFilterData, selectStatus, isResData, count } = useTypedSelector(state => ({
        foundUsers: state.foundUsers.foundUsers,
        userStatus: state.user.status,
        prevFilterData: state.foundUsers.prevFilterData,
        selectStatus: state.foundUsers.selectStatus,
        isResData: state.system.isResData,
        count: state.foundUsers.count
    }));

    const handleDelete = (id: number) => {
        deleteFoundUserThunk(id, sendFilterUsersThunk, router, prevFilterData as FilterUsersFormikValuesType, selectStatus)
    };

    const handleChangePage = (e: ChangeEvent<unknown>, p: number) => {
        setPage(p)
        dispatch(removeFoundUsers())
        sendFilterUsersThunk(prevFilterData as ValidateType, router, p)
    };

    return (
        <>
            {
                foundUsers
                    && foundUsers.length > 0
                    ? <div className={styles.list}>
                        <ul className={styles.list__itemTitle}>
                            <li className={styles.list__itemTitle__img}></li>
                            <li className={styles.list__itemTitle__li}>{t("common.first_name")}</li>
                            <li className={styles.list__itemTitle__li}>{t("common.last_name")}</li>
                            <li className={styles.list__itemTitle__li}>{t("common.phone_num")}</li>
                            <li className={styles.list__itemTitle__li}>{t("common.additional")}</li>
                        </ul>
                        {
                            foundUsers.map(user => (
                                <ul
                                    key={uniqueKey(user.id)}
                                    className={styles.list__item}
                                >
                                    <li className={styles.list__item__img}>
                                        <Image
                                            width={30}
                                            height={30}
                                            alt={user.first_name}
                                            src={user.image}
                                        />
                                    </li>
                                    <li className={styles.list__item__li}>{user.first_name}</li>
                                    <li className={styles.list__item__li}>{user.last_name}</li>
                                    <li className={styles.list__item__li}>{user.phone_num}</li>
                                    <li className={styles.list__item__li}>
                                        <div className={styles.list__btnGroup}>
                                            <button
                                                className={`${styles.list__btnGroup__btn} ${styles.list__btnGroup__btn_view}`}
                                                onClick={() => {
                                                    handleReset()
                                                    handleGetUserData(user.id)
                                                }}
                                            >
                                                <div className={styles.list__btnGroup__btn__icon}>
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        alt={"view"}
                                                        src={"/icons/viewIcon.svg"}
                                                    />
                                                </div>
                                                {t("common.view")}
                                            </button>
                                            {
                                                userStatus
                                                && userStatus === StatusRankEnum.manager
                                                && selectStatus !== StatusRankEnum.manager
                                                && <>
                                                    <button
                                                        className={`${styles.list__btnGroup__btn} ${styles.list__btnGroup__btn_delete}`}
                                                        onClick={() => {
                                                            handleDelete(user.id)
                                                        }}
                                                    >
                                                        <div className={styles.list__btnGroup__btn__icon}>
                                                            <Image
                                                                width={20}
                                                                height={20}
                                                                alt={"delete"}
                                                                src={"/icons/deleteIcon.svg"}
                                                            />
                                                        </div>
                                                        {t("common.delete")}
                                                    </button>
                                                    <button
                                                        className={`${styles.list__btnGroup__btn} ${styles.list__btnGroup__btn_edit}`}
                                                        onClick={() => {
                                                            setIsOpenModalChange({ isOpen: true, id: user.id })
                                                        }}
                                                    >
                                                        <div className={styles.list__btnGroup__btn__icon}>
                                                            <Image
                                                                width={20}
                                                                height={20}
                                                                alt={"edit"}
                                                                src={"/icons/editIcon.svg"}
                                                            />
                                                        </div>
                                                        {t("common.change")}
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </li>
                                </ul>
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