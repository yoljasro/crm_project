//react
import { FC, useEffect, useState } from "react";
//material ui
import { Snackbar, Alert } from "@mui/material";
import { useTypedSelector } from "../../redux/store";

export const SnackbarWrapper: FC = () => {
    const [open, setOpen] = useState(false);
    const { snackbar } = useTypedSelector(state => ({ snackbar: state.snackbar }));

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        if (snackbar.message) {
            setOpen(true)
        }
    }, [snackbar])

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <Alert onClose={handleClose} severity={snackbar.type === "error" ? "error" : "success"} sx={{ width: '100%' }}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    )
}