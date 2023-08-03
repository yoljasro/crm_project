//next
import { useRouter } from "next/router";
//react
import { FC, FormEvent, useState } from "react";
//redux
import { useActions } from "../../redux/store";
//types
import { SignInResDataType, ValidateType } from "../../types";
//constants
import { authorizationValues } from "../../constants";
//formik
import { useFormik } from "formik";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { circularProgressStyles } from "../../lib/globalThemeMui";
//sass
import styles from "./index.module.sass";

export const Authorization: FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  const { signInThunk, getStatusThunk } = useActions();
  const formik = useFormik({
    initialValues: authorizationValues,
    validateOnChange: false,
    validate: (values: ValidateType) => {
      setError("");
      for (const key in values) {
        if (values[key].length === 0)
          return {
            message: "error.allFieldsRequired",
          };
      }
    },
    onSubmit: (values) => {
      setIsLoading(true);
      const data: SignInResDataType = {
        username: values.username,
        password: values.password,
      };
      signInThunk(
        data,
        setError,
        router,
        setIsLoading,
        setIsSuccessfully,
        getStatusThunk
      );
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
      }}
      className={styles.form}
    >
      <Box
        component={"form"}
        onSubmit={(e: FormEvent<HTMLFormElement>) => formik.handleSubmit(e)}
        sx={{
          width: "100%",
          maxWidth: "300px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography className={styles.form__title}>
          {t("common.signIn")}
        </Typography>
        {/* <Typography className={styles.form__discription}>
        {t("common.information_system")}
        </Typography> */}
        <TextField
          className={styles.form__input}
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder={t("common.username")}
          type={"text"}
          id={"username"}
          name={"username"}
          fullWidth
        />
        <TextField
          className={styles.form__input}
          sx={{ margin: "15px 0" }}
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder={t("common.password")}
          type={"password"}
          id={"password"}
          name={"password"}
          fullWidth
        />
        <Typography color={"red"} variant={"body1"}>
          {error}
        </Typography>
        <Typography color={"red"} variant={"body1"}>
          {formik.errors.message && t(formik.errors.message)}
        </Typography>
        <Typography variant={"body1"} color={"green"}>
          {isSuccessfully && t("successfully.completed")}
        </Typography>
        <Button
          type={"submit"}
          disabled={isLoading}
          variant={"contained"}
          className={styles.form__btn}
        >
          {isLoading ? (
            <CircularProgress sx={circularProgressStyles(30, 30)} />
          ) : (
            t("common.signIn")
          )}
        </Button>
      </Box>
    </Box>
  );
};
