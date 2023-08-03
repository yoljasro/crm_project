//react
import { FC } from "react";
//constants
import { addRoomFormValues, apiUrl, textFieldsArrRoom } from "../../constants";
//components
import { Form } from "../Form";

export const AddRoomForm: FC = () => {
    return <Form
        textFieldsArr={textFieldsArrRoom}
        initialValues={addRoomFormValues}
        url={apiUrl.lab.rooms} />
};