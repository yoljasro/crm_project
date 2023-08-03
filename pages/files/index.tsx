//next
import { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
//react
import { useEffect } from "react";
//redux
import { changeNavActiveBtn } from "../../redux/slices/system";
import { removeFiles } from "../../redux/slices/files";
import { useTypedDispatch, useTypedSelector } from "../../redux/store";
//next-intl
import { useTranslations } from "next-intl";
//types
import { StatusRankEnum } from "../../types";
//constants
import { paths, sidebarNav } from "../../constants";
//component
import { FilesTabPanel } from "../../components/FilesTabPanel";

const Files: NextPage = () => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const { userStatus } = useTypedSelector(state => ({ userStatus: state.user.status }));

    useEffect(() => {
        if (userStatus === StatusRankEnum.manager) {
            dispatch(changeNavActiveBtn({
                navActiveBtn: sidebarNav[0].name
            }))
            router.push(paths.main)
        }

        return () => {
            dispatch(removeFiles())
        }
    }, [t])

    return userStatus === StatusRankEnum.manager ? null : <FilesTabPanel />
}

export default Files

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: (await import(`../../messages/${locale}.json`)).default
        }
    }
}