//react
import { FC } from "react";
//constants
import { addSubjectCodeFormValues, apiUrl, textFieldsArrSubjectCode } from "../../constants";
//components
import { Form } from "../Form";

export const AddSubjectCodeForm: FC = () => {
    return <Form
        textFieldsArr={textFieldsArrSubjectCode}
        initialValues={addSubjectCodeFormValues}
        url={apiUrl.lab.subject_codes}
    />
};