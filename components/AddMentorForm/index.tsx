//next
import { useRouter } from "next/router";
//react
import { FC, useEffect, useState } from "react";
//redux
import { useActions, useTypedSelector } from "../../redux/store";
//constants
import { addMentorFormValues, addMentorSelects, apiUrl, textFieldsArrMentor } from "../../constants";
//components
import { Form } from "../Form";
//next-intl 
import { useTranslations } from "next-intl";
import { AddMentorSelectOptionsType, OptionType } from "../../types";

export const AddMentorForm: FC = () => {
    const router = useRouter();
    const t = useTranslations();
    const multipleSelectNames = ["subjects"];
    const [subjectsName, setSubjectsName] = useState<OptionType>([]);
    const [selectOptions, setSelectOptions] = useState<AddMentorSelectOptionsType>();
    const { getSubjectsThunk } = useActions();
    const subject = useTypedSelector(state => state.subject);

    useEffect(() => {
        getSubjectsThunk(router)
    }, [t])

    useEffect(() => {
        if (subject.selectOptions) {
            setSelectOptions({
                subjects: subject.selectOptions
            })
        }
    }, [subject])

    return <Form
        textFieldsArr={textFieldsArrMentor}
        initialValues={addMentorFormValues}
        multipleStates={{subjectsName}}
        multipleSetStates={[setSubjectsName]}
        multipleSelectNames={multipleSelectNames}
        selectOptions={selectOptions}
        url={apiUrl.lab.mentors}
    />
};