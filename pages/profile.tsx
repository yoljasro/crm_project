//next
import { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
//react
import { useEffect } from "react";
//redux
import { useActions, useTypedDispatch, useTypedSelector } from "../redux/store";
import { removeProfile, removeStatus } from "../redux/slices/user";
//components
import { Container } from "../components/Container";
// import { NoData } from "../components/NoData";
import { Loading } from "../components/Loading";
//constants
import { apiUrl, localStorageKeys, paths } from "../constants";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";
//sass
import styles from "../styles/ProfilePage.module.sass";

const Profile: NextPage = () => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const { getProfileDataThunk } = useActions();
    const { profileData } = useTypedSelector(state => ({ profileData: state.user.profile }));

    const handleLogout = () => {
        localStorage.removeItem(localStorageKeys.token)
        dispatch(removeStatus())
        router.replace(paths.signIn)
    }

    useEffect(() => {
        getProfileDataThunk(router)

        return () => {
            dispatch(removeProfile())
        }
    }, [t])

    return (
        <Container>
            {
                profileData
                    ? <div className={styles.profile}>
                        <div className={styles.profile__header}>
                            <div className={styles.profile__header__cont}>
                                <div className={styles.profile__header__img}>
                                    <Image
                                        width={150}
                                        height={150}
                                        // loader={() => "/img/user.jpg"}
                                        alt={profileData.first_name}
                                        src={`${apiUrl.baseUrl}${profileData.image}`}
                                    />
                                </div>
                                <div className={styles.profile__header__data}>
                                    <p className={styles.profile__header__name}>{profileData.first_name} {profileData.last_name}</p>
                                    <p className={styles.profile__header__status}>{profileData.status}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.profile__data}>
                            <p className={styles.profile__data__item}>
                                {t("common.phone_num")}: <span className={styles.profile__data__item__span}>{profileData.phone_num}</span>
                            </p>
                            <p className={styles.profile__data__item}>
                                {t("common.username")}: <span className={styles.profile__data__item__span}>{profileData.username}</span>
                            </p>
                            <p className={styles.profile__data__item}>
                                {t("common.branch")}: <span className={styles.profile__data__item__span}>{profileData.branches.join(", ")}</span>
                            </p>
                            <p className={styles.profile__data__item}>
                                {t("common.group")}: <span className={styles.profile__data__item__span}>{profileData.groups.map((group) => group.name).join(", ")}</span>
                            </p>
                        </div>
                        <IconButton
                            className={styles.profile__logout}
                            onClick={handleLogout}
                        >
                            <LogoutIcon className={styles.profile__logout__icon} />
                            {t("common.logout")}
                        </IconButton>
                    </div>
                    : <Loading />
            }
        </Container>
    )
}

export default Profile

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: (await import(`../messages/${locale}.json`)).default
        }
    }
}