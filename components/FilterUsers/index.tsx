//next
import { useRouter } from "next/router";
//react
import { FC, useEffect, useState } from "react";
//redux
import { useActions, useTypedSelector } from "../../redux/store";
//types
import { FilterUsersSelectOptionsType } from "../../types";
//constants
import { filterUsersSelects, rankSelectOptions, filterUsersFormikValues } from "../../constants";
//components
import { Loading } from "../Loading";
//next-intl
import { useTranslations } from "next-intl";
//components
import { Filter } from "../Filter";

export const FilterUsers: FC = () => {
    const router = useRouter();
    const t = useTranslations();
    const [selectOptions, setSelectOptions] = useState<FilterUsersSelectOptionsType>();
    const { getGroupsThunk, getSubjectsThunk, sendFilterUsersThunk } = useActions();
    const { branch, subject, group } = useTypedSelector(state => ({
        branch: state.branch,
        subject: state.subject,
        group: state.group
    }));

    useEffect(() => {
        getSubjectsThunk(router)
        getGroupsThunk(router)
    }, [t])

    useEffect(() => {
        if (subject.selectOptions && group.selectOptions) {
            setSelectOptions({
                status: rankSelectOptions(t),
                subject: subject.selectOptions,
                group: group.selectOptions,
                branch: branch.selectOptions,
            })
        }
    }, [branch, subject, group, t])

    return (
        <>
            {
                branch.selectOptions && subject.selectOptions && group.selectOptions
                    ? <Filter
                        initialValues={filterUsersFormikValues}
                        selectOptions={selectOptions as object}
                        selectNames={filterUsersSelects}
                        thunkSubmit={sendFilterUsersThunk}
                    />
                    : <Loading />
            }
        </>
    )
};