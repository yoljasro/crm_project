//next
import { useRouter } from "next/router";
//react
import { FC, ReactNode, useEffect, useState } from "react";
//redux
import { useActions, useTypedSelector } from "../../redux/store";
//constants
import { localStorageKeys, paths } from "../../constants";
//components
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
//sass
import styles from "./index.module.sass";

type ContainerPropsType = {
    children: ReactNode
}

export const Container: FC<ContainerPropsType> = ({ children }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const { getStatusThunk } = useActions();
    const { status } = useTypedSelector(state => ({ status: state.user.status }))

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.innerWidth <= 991 && setIsOpen(false)
            const token = localStorage.getItem(localStorageKeys.token);
            const localStorageLang = localStorage.getItem(localStorageKeys.selectedLang);
            localStorageLang && router.push(router.asPath, undefined, { locale: localStorageLang })
            if (!token) router.replace(paths.signIn)
            else if (status === undefined) getStatusThunk(router)
        } else {
            router.replace(paths.signIn)
        }
    }, [])

    return (
        <>
            {
                status === undefined
                    ? null
                    : <div className={styles.container}>
                        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                        <main
                            className={styles.container__main}
                        >
                            <Header setIsOpen={setIsOpen} />
                            {children}
                        </main>
                    </div>
            }
        </>
    )
};