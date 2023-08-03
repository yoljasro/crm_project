import * as BranchThunks from "./branch";
import * as SubjectThunks from "./subject";
import * as GroupThunks from "./group";
import * as SignIn from "./authorization";
import * as UserThunks from "./user";
import * as AddFormsThunks from "./addForms";
import * as StudentsThunks from "./students";
import * as RoomsThunks from "./rooms";
import * as MentorsThunks from "./mentors";
import * as FilterThunks from "./filter";
import * as CalendarThunks from "./calendar";
import * as CalendarTableThunks from "./calendarTable";
import * as FilesThunks from "./files";

export const Thunks = {
    ...BranchThunks,
    ...SubjectThunks,
    ...GroupThunks,
    ...SignIn,
    ...UserThunks,
    ...AddFormsThunks,
    ...StudentsThunks,
    ...RoomsThunks,
    ...MentorsThunks,
    ...FilterThunks,
    ...CalendarThunks,
    ...CalendarTableThunks,
    ...FilesThunks
};