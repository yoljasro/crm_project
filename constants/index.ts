//types
import { 
    StatusRankEnum, FilterUsersFormikValuesType, FilterGroupsFormikValuesType, 
    ChangeUserFormikValuesType, AddStudentFormValuesType, AuthorizationValuesType, 
    AddMentorFormValuesType, AddGroupFormValuesType, AddSubjectFormValuesType, 
    AddSubjectCodeFormValuesType, AddRoomFormValuesType, AddCalendarFormValuesType, AddFileFormValuesType
} from "../types";

//lang const
export const langs = ["eng", "rus", "uzb"];

//api url const
export const apiUrl = {
    accounts: {
        login: "/accounts/login/",
        logout: "/accounts/logout/",
        refresh: "/accounts/refresh/",
        status: "/accounts/status/",
        profile: "/accounts/profile/",
    },
    lab: {
        managers: "/lab/managers/",
        mentors: "/lab/mentors/",
        students: "/lab/students/",
        subjects: "/lab/subjects/",
        subject_by_group: "/lab/subject_by_group",
        subject_codes: "/lab/subject_codes/",
        rooms: "/lab/rooms/",
        groups: "/lab/groups/",
        branch: "/lab/branches/",
        filter: "/lab/filter",
        groups_filter: "/lab/groups_filter",
        calendars: "/lab/calendars/",
        calendar_filter: "/lab/calendar_filter",
        week_calendar: "/lab/week_calendar",
        student_files_filter: "/lab/student_files_filter",
        student_file_download: "/lab/student_file_download",
        mentor_file_download: "/lab/mentor_file_download",
        mentor_files_filter: "/lab/mentor_files_filter",
        mentor_own_files: "/lab/mentor_own_files",
        student_own_files: "/lab/student_own_files",
        student_file: "/lab/student_file",
        mentor_file: "/lab/mentor_file",
        groups_by_user:  "/lab/groups_by_user",
        mentor_by_manager_branch: "/lab/mentor_by_manager_branch",
        student_by_manager_branch: "/lab/student_by_manager_branch",
        room_by_manager_branch: "/lab/room_by_manager_branch",
    },
    baseUrl: "https://api.raqamlilab.uz"
};

//paths client const
export const paths = {
    add: "/add",
    signIn: "/sign-in",
    main: "/",
    profile: "/profile",
    files: "/files",
    filesStudents: "/files/students/",
    groups: "/groups",
    groupsChange: "/groups/change",
    calendars: "/calendars"
};

//weekDays
export const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];

//localstorage const
export const localStorageKeys = {
    token: "token",
    selectedLang: "selected-lang",
    activePage: "active-page"
};

//components object const
export const authorizationValues: AuthorizationValuesType = {
    password: "",
    username: ""
};

export const filterUsersFormikValues: FilterUsersFormikValuesType = {
    status: StatusRankEnum.manager,
    subject: "",
    group: "",
    branch: ""
};

export const filterGroupsFormikValues: FilterGroupsFormikValuesType = {
    branch: "2"
};

export const changeUserFormikValues: ChangeUserFormikValuesType = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_num: ""
};

export const addStudentFormValues: AddStudentFormValuesType = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_num: "",
};

export const addMentorFormValues: AddMentorFormValuesType = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_num: ""
};

export const addSubjectFormValues: AddSubjectFormValuesType = {
    name: ""
};

export const addSubjectCodeFormValues: AddSubjectCodeFormValuesType = {
    code: ""
};

export const addRoomFormValues: AddRoomFormValuesType = {
    name_uz: "",
    name_ru: "",
    name_en: ""
};

export const addGroupFormValues: AddGroupFormValuesType = {
    name_ru: "",
    name_uz: "",
    name_en: "",
    room: 0
};

export const addCalendarFormValues: AddCalendarFormValuesType = {
    start: "",
    end: "",
    group: "",
    description: "",
    room: "",
    subject: ""
};

export const addFileFormValues: AddFileFormValuesType = {
    group: "",
    file: ""
}

//components array const
export const sidebarNav = [
    {
        name: "main",
        image: "/icons/homeIcon.svg",
        path: paths.main
    },
    {
        name: "groups",
        image: "/icons/groupIcon.svg",
        path: paths.groups
    },
    {
        name: "timetable",
        image: "/icons/timeTableIcon.svg",
        path: paths.calendars
    },
    {
        name: "files",
        image: "/icons/filesIcon.svg",
        path: paths.files
    },
    {
        name: "profile",
        image: "/icons/profileIcon.svg",
        path: paths.profile
    }
];

export const filterUsersSelects = [
    "status",
    "subject",
    "group"
] as const;

export const filterGroupsSelects = [
    "branch"
] as const;

export const filterCalendarsSelects = [
    "group"
] as const;

export const addGroupSelects = [
    "room"
] as const;

export const addMentorSelects = [
    "subject"
] as const;

export const addCalendarsSelects = [
    "room",
    "group"
]

export const rankSelectOptions = (t: any) => [
    // {
    //     id: StatusRankEnum.mentor,
    //     value: t("common.mentor")
    // },
    {
        id: StatusRankEnum.student,
        value: t("common.student", {s: ""})
    },
    {
        id: StatusRankEnum.manager,
        value: t("common.manager")
    }
];

export const textFieldsArrGroup = [
    {
        name: "name_ru",
        t: "common.first_name",
        type: "text",
        additionallyName: "RU"
    },
    {
        name: "name_en",
        t: "common.first_name",
        type: "text",
        additionallyName: "EN"
    },
    {
        name: "name_uz",
        t: "common.first_name",
        type: "text",
        additionallyName: "UZ"
    }
];

export const textFieldsArrMentor = [
    {
        name: "first_name",
        t: "common.first_name",
        type: "text"
    },
    {
        name: "last_name",
        t: "common.last_name",
        type: "text",
    },
    {
        name: "username",
        t: "common.username",
        type: "text"
    },
    {
        name: "password",
        t: "common.password",
        type: "password"
    },
    {
        name: "phone_num",
        t: "common.phone_num",
        type: "tel"
    }
];

export const textFieldsArrRoom = [
    {
        name: "name_ru",
        t: "common.first_name",
        type: "text",
        additionallyName: "RU"
    },
    {
        name: "name_en",
        t: "common.first_name",
        type: "text",
        additionallyName: "EN"
    },
    {
        name: "name_uz",
        t: "common.first_name",
        type: "text",
        additionallyName: "UZ"
    }
];

export const textFieldsArrStudent = [
    {
        name: "first_name",
        t: "common.first_name",
        type: "text"
    },
    {
        name: "last_name",
        t: "common.last_name",
        type: "text",
    },
    {
        name: "username",
        t: "common.username",
        type: "text"
    },
    {
        name: "password",
        t: "common.password",
        type: "password"
    },
    {
        name: "phone_num",
        t: "common.phone_num",
        type: "tel"
    }
];

export const textFieldsArrSubjectCode = [
    {
        name: "code",
        t: "common.subjectCode",
        type: "text"
    }
];

export const textFieldsArrSubject = [
    {
        name: "name",
        t: "common.first_name",
        type: "text"
    }
];