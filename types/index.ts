//enum 
export enum ApiMethodEnum {
    get = "get",
    post = "post",
    patch = "patch",
    delete = "delete"
}

export enum StatusRankEnum {
    mentor = "Mentor",
    student = "Student",
    manager = "Manager",
}

//http and redux data types
export type ErrorMessageType = {
    message?: string
}

export type AuthorizationValuesType = {
    password: string
    username: string
    message?: string
}

export type ResponseType<T = any> = {
    status: number
    data: T
    statusText: string
    message?: string
}

export type ResponsePaginationType<T = any> = {
    count: number
    next: string
    previous: string
    results: T
}

export type TokenType = {
    access: string,
    refresh: string
}

export interface SignInReqDataType extends TokenType {
    status: string
    detail?: string
}

export type SignInResDataType = {
    username: string
    password: string
}

export type OptionType<T = any> = {
    id: number | string
    value: T
}[]

export type FilterUsersFormikValuesType = {
    status: StatusRankEnum
    subject: string
    group: string
    branch: string
}

export type FilterUsersSelectOptionsType = {
    status: OptionType<string>
    subject: OptionType<string>
    group: OptionType<string>
    branch: OptionType<string>
}

export type FilterGroupsFormikValuesType = {
    branch: string
}

export type FilterGroupsSelectOptionsType = {
    branch: OptionType<string>
}

export type AddGroupSelectOptionsType = {
    mentors: OptionType<string>
    room: OptionType<string>
    subjectCodes: OptionType<string>
    subjects: OptionType<string>
    students: OptionType<string>
}

export type AddSubjectSelectOptionsType = {
    subject: OptionType<string>
}

export type AddMentorSelectOptionsType = {
    subjects: OptionType<string>
}

export type AddBranchSelectOptionsType = {
    branch: OptionType<string>
}

export type GroupDataType = {
    id: number
    mentors: {
        mentor_id: number
        mentor_name: string
        subject_id: number
        subject_name: string
    }[]
    students: {
        student_id: number
        student_name: string
    }[]
    room: {
        room_id: number
        room_name: string
    }
    name: string
    name_uz: string
    name_en: string
    name_ru: string
    manager: number
    branch: number
    subjects: number[]
    subject_codes: {
        subject_code_id: number
        subject_code_name: string
    }[]
    code_subject_mentor_order: number[]
}

export type GroupsByUserType = {
    id: number
    name: string
    subject: number
    branch: number
    mentor_name: string
    subject_name: string
}

export type CalendarDataType = {
    id: number
    start: string
    end: string
    description: string
    group: {
        id: number
        name: string
        subject: number
        branch: number
    }
    room: number
}

export type SubjectDataType = {
    id: number
    name: string
}

export type SubjectFilterDataType = {
    id: number
    name: string
    border: string
    background_color: string
    branch: number
}

export type SubjectCodesDataType = {
    id: number
    code: string
    subject: number
}

export type RoomsDataType = {
    id: number
    name: string
    branch: number
}

export type BranchDataType = {
    id: number
    name: string
    rooms: number[]
}

export type FoundUserType = {
    id: number
    image: string
    first_name: string
    last_name: string
    phone_num: number
}

export type FoundGroupType = {
    id: number
    name: string
    subject_name: number
    mentor_name: string
}

export type SelectUserDataType = {
    id: number
    first_name: string
    last_name: string
    phone_num: string
    status: string
    image: string
    branch: number
    rooms: number[]
    mentors: number[]
    managers: number[]
    subjects: number[]
    subject_names: string[]
    group_names: string[]
    branch_name: string
    username: string
}

export type ChangeUserFormikValuesType = {
    username: string
    password: string
    first_name: string
    last_name: string
    phone_num: string
}

export type ProfileData = {
    id: number
    phone_num: string
    image: string
    groups: {
        id: number
        name: string
    }[]
    username: string
    status: StatusRankEnum
    branches: string[]
    first_name: string
    last_name: string
}

export type SelectOptionsType = {
    [key: string]: {
        id: number | string
        value: string
    }[]
}

export type CheckCaledarDataType = {
    year?: string
    month?: string
    day?: string
    room: string
    subject: string
}

export type CalendarTableType = {
    [day: string]: CalendarTableDayType[]
}

export type CalendarTableDayType = {
    id: number
    name: string
    type: string
    startTime: string
    endTime: string
    background_color: string
    border_color: string
    room_name: string
    subject_name: string
    mentor: string
}

export type FileDataType = {
    id: number
    file: string
    name: string
    date: string
    user: {
        id: number
        first_name: string
        last_name: string
        status: string
    }
    group: number
}

//interfaces
export interface ValidateType {
    [key: string]: string
}

export interface StudentAndMentorValuesType extends ErrorMessageType {
    username: string
    password: string
    first_name: string
    last_name: string
    phone_num: string
}

export interface AddStudentFormValuesType extends StudentAndMentorValuesType { }

export interface AddMentorFormValuesType extends StudentAndMentorValuesType { }

export interface AddGroupFormValuesType extends ErrorMessageType {
    name_ru: string
    name_en: string
    name_uz: string
    subjects?: number[]
    students?: number[]
    mentors?: number[]
    subjectCodes?: number[]
    calendar?: number[]
    room?: number
}

export interface AddCalendarFormValuesType extends ErrorMessageType {
    start: string
    end: string
    group: string
    description: string
    room: string
    subject: string
}

export interface AddSubjectFormValuesType extends ErrorMessageType {
    name: string
}

export interface AddSubjectCodeFormValuesType extends ErrorMessageType {
    code: string
}

export interface AddRoomFormValuesType extends ErrorMessageType {
    name_uz: string
    name_ru: string
    name_en: string
}

export interface StudentAndMentorDataType {
    id: number
    first_name: string
    last_name: string
    status: string
}

export interface StudentsDataType extends StudentAndMentorDataType { }

export interface MentorsDataType extends StudentAndMentorDataType {
    subjects: {
        id: number
        name: string
    }[]
}

export interface AddFileFormValuesType<T = string> extends ErrorMessageType {
    file: T
    group: string
}

//constants and states types
export type ModalChangeType = {
    isOpen: boolean
    id: number
}