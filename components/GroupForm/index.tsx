//next
import { useRouter } from "next/router";
//react
import { FC, useState, useEffect } from "react";
//redux
import { removeGroups } from "../../redux/slices/group";
import { removeStudents } from "../../redux/slices/students";
import { removeSubjects } from "../../redux/slices/subject";
import { removeMentors } from "../../redux/slices/mentors";
import { useActions, useTypedDispatch, useTypedSelector } from "../../redux/store";
//components
import { Loading } from "../Loading";
//types
import { AddGroupSelectOptionsType, OptionType } from "../../types";
import { SendChangeGroupThunkType } from "../../redux/thunks/filter";
//constants
import { addGroupFormValues, addGroupSelects, apiUrl, textFieldsArrGroup, } from "../../constants";
//components
import { Form } from "../Form";
//next-intl
import { useTranslations } from "next-intl";

type GroupFormPropsType = {
    changeGroup?: {
        id: number
        thunkFunction: SendChangeGroupThunkType
    }
}

export const GroupForm: FC<GroupFormPropsType> = ({ changeGroup }) => {
    const router = useRouter();
    const t = useTranslations();
    const dispatch = useTypedDispatch();
    const [subjectCodesName, setSubjectCodesName] = useState<OptionType>([]);
    const [studentsName, setStudentsName] = useState<OptionType>([]);
    const [mentorsName, setMentorsName] = useState<OptionType>([]);
    const multipleSelectNames = ["students", "mentors", "subjectCodes"];
    const [selectOptions, setSelectOptions] = useState<AddGroupSelectOptionsType>();
    const {
        getGroupByIdThunk, getMentorsByManagerBranchThunk, getStudentsByManagerBranchThunk,
        getRoomsByManagerBranchThunk, getSubjectsThunk, getSubjectCodesThunk
    } = useActions();
    const { mentors, students, rooms, subjects, groupById } = useTypedSelector(state => ({
        mentors: state.mentors,
        students: state.students,
        rooms: state.rooms,
        subjects: state.subject,
        groupById: state.group.groupById
    }));

    useEffect(() => {
        if (changeGroup && changeGroup.id) getGroupByIdThunk(changeGroup.id.toString(), router)

        getMentorsByManagerBranchThunk(router)
        getStudentsByManagerBranchThunk(router)
        getRoomsByManagerBranchThunk(router)
        getSubjectsThunk(router)
        getSubjectCodesThunk(router)

        return () => {
            dispatch(removeGroups())
            dispatch(removeMentors())
            dispatch(removeStudents())
            dispatch(removeSubjects())
        }
    }, [t("common.status")])

    useEffect(() => {
        if (mentors.selectOptions
            && students.selectOptions
            && rooms.selectOptions
            && subjects.selectOptions
            && subjects.selectOptionsCodes
        ) {
            if (changeGroup && groupById) {
                setSelectOptions({
                    mentors: mentors.selectOptions,
                    room: rooms.selectOptions,
                    subjects: subjects.selectOptions,
                    subjectCodes: subjects.selectOptionsCodes,
                    students: [...students.selectOptions, ...groupById.students.map(student => ({
                        id: student.student_id,
                        value: student.student_name
                    }))]
                })
            } else {                
                setSelectOptions({
                    mentors: mentors.selectOptions,
                    room: rooms.selectOptions,
                    subjects: subjects.selectOptions,
                    subjectCodes: subjects.selectOptionsCodes,
                    students: students.selectOptions
                })
            }
        }
    }, [mentors, students, rooms, subjects, groupById, changeGroup])

    useEffect(() => {
        if (groupById) {
            addGroupFormValues.name_en = groupById.name_en;
            addGroupFormValues.name_ru = groupById.name_ru;
            addGroupFormValues.name_uz = groupById.name_uz;
            addGroupFormValues.room = groupById.room.room_id;
            setMentorsName(groupById.mentors.map(mentor => ({
                id: mentor.mentor_id,
                value: mentor.mentor_name
            })))
            setSubjectCodesName(groupById.subject_codes.map(subjectCode => ({
                id: subjectCode.subject_code_id,
                value: subjectCode.subject_code_name
            })))
            setStudentsName(groupById.students.map(student => ({
                id: student.student_id,
                value: student.student_name
            })))
        }
    }, [groupById])

    return (
        <>
            {
                mentors && students && rooms && subjects
                    ? <Form
                        url={apiUrl.lab.groups}
                        isGroup={true}
                        changeGroup={changeGroup}
                        selectNames={addGroupSelects}
                        textFieldsArr={textFieldsArrGroup}
                        initialValues={addGroupFormValues}
                        selectOptions={selectOptions as object}
                        multipleSelectNames={multipleSelectNames}
                        multipleStates={{ studentsName, mentorsName, subjectCodesName }}
                        multipleSetStates={[setStudentsName, setMentorsName, setSubjectCodesName]}
                    />
                    : <Loading />
            }
        </>
    )
};