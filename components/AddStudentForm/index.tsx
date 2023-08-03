//react 
import { FC } from "react";
//constants
import { addStudentFormValues, apiUrl, textFieldsArrStudent } from "../../constants";
//components
import { Form } from "../Form";

export const AddStudentForm: FC = () => {
    return <Form textFieldsArr={textFieldsArrStudent} initialValues={addStudentFormValues} url={apiUrl.lab.students}/>
};