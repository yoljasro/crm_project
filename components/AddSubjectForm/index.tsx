//react 
import { FC } from "react";
//constants
import { addSubjectFormValues, apiUrl, textFieldsArrSubject } from "../../constants";
//components
import { Form } from "../Form";

export const AddSubjectForm: FC = () => {
    return <Form textFieldsArr={textFieldsArrSubject} initialValues={addSubjectFormValues} url={apiUrl.lab.subjects}/>
};