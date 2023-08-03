//next
import { useRouter } from "next/router";
//react
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
//redux
import { useActions, useTypedDispatch, useTypedSelector } from "../../redux/store";
//constants
import { langs, localStorageKeys, paths } from "../../constants";
//next-intl
import { useTranslations } from "next-intl";
//types
import { StatusRankEnum } from "../../types";
//material ui
import { MenuOutlined } from "@mui/icons-material";
import { MenuItem, FormControl, Select, SelectChangeEvent, IconButton, Button, InputLabel } from "@mui/material";
//sass
import styles from "./index.module.sass";
/// next image
import Image from 'next/image'
import { changeNavActiveBtn } from "../../redux/slices/system";
import Link from "next/link";

type HeaderPropsType = {
    setIsOpen?: Dispatch<SetStateAction<boolean>>,
    isAuth?: boolean
}

export const Header: FC<HeaderPropsType> = ({ setIsOpen, isAuth }) => {
    const router = useRouter();
    const path = router.asPath;
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedLang, setSelectedLang] = useState(router.locale);
    const { getCalendarsThunk, getRoomsThunk } = useActions();
    const { userStatus, rooms } = useTypedSelector(state => ({
        userStatus: state.user.status,
        rooms: state.rooms.roomArr
    }));

    const handleChangeLang = (event: SelectChangeEvent) => {
        const eventLang = event.target.value;
        setSelectedLang(eventLang);
        localStorage.setItem(localStorageKeys.selectedLang, eventLang);
        router.push(path, undefined, { locale: eventLang })
    };

    const handleChangeRoom = (event: SelectChangeEvent) => {
        const room = event.target.value;
        setSelectedRoom(room)
        getCalendarsThunk(router, +room)
    };

    useEffect(() => {
        if (userStatus === StatusRankEnum.manager && path === paths.calendars) {
            getRoomsThunk(router)
        }
    }, [t])

    return (
        <header className={`${styles.header} ${isAuth && styles.header_auth}`}>
            <div className={`${styles.header__logo} ${isAuth && styles.header__logo_auth}`}>
                <Image alt={"logo"} src='/icons/logo.svg' width={110} height={90} />
            </div>
            <IconButton
                className={`${styles.header__menu} ${isAuth && styles.header__menu_auth}`}
                onClick={() => setIsOpen && setIsOpen(true)}
            >
                <MenuOutlined className={styles.header__menu__icon} />
            </IconButton>
            <div className={styles.header__cont}>
                {
                    userStatus === StatusRankEnum.manager
                    && path === paths.calendars
                    && rooms
                    && rooms.length > 0
                    && <FormControl
                        sx={{
                            maxWidth: 300
                        }}
                    >
                        <InputLabel id={"roomLabel"}>{t("common.room")}</InputLabel>
                        <Select
                            labelId={"roomLabel"}
                            value={selectedRoom}
                            onChange={handleChangeRoom}
                            label={t("common.room")}
                            className={styles.header__selectRoom}
                        >
                            {
                                rooms.map(room => (
                                    <MenuItem
                                        sx={{ textTransform: "capitalize" }}
                                        key={room.id}
                                        value={room.id}
                                    >
                                        {room.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                }
                {
                    userStatus
                    && userStatus === StatusRankEnum.manager
                    && <Link
                        href={paths.add}
                        onClick={() => {
                            localStorage.setItem(localStorageKeys.activePage, "")
                            dispatch(changeNavActiveBtn({ navActiveBtn: "" }))
                        }}
                    >
                        <a className={styles.header__btn}>
                            {t("common.add")}
                        </a>
                    </Link>
                }
                <FormControl>
                    <Select
                        className={styles.header__select}
                        value={selectedLang}
                        onChange={handleChangeLang}
                    >
                        {
                            langs.map(lang => (
                                <MenuItem
                                    sx={{ textTransform: "capitalize" }}
                                    key={lang}
                                    value={lang.slice(0, 2)}
                                >
                                    {lang}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
        </header>
    )
};