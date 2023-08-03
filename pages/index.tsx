//next
import Image from "next/image";
import type { GetStaticProps, NextPage } from "next";
//react
import { useState, Dispatch, SetStateAction, useEffect } from "react";
//redux
import { removeBranches } from "../redux/slices/branch";
import { removeFoundUsers, removeSelectUserData } from "../redux/slices/foundUsersSlice";
import { removeGroups } from "../redux/slices/group";
import { removeSubjects } from "../redux/slices/subject";
import { useActions, useTypedDispatch, useTypedSelector } from "../redux/store";
//components
import { Container } from "../components/Container";
import { FilterUsers } from "../components/FilterUsers";
import { FoundUsers } from "../components/FoundUsers";
//types
import { FilterUsersFormikValuesType, ModalChangeType, StatusRankEnum, ValidateType } from "../types";
//constants
import { apiUrl, changeUserFormikValues } from "../constants";
//next-intl
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
//lib
import { modalBoxStyles } from "../lib/globalThemeMui";
//formik
import { useFormik } from "formik";
//material ui
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
//sass
import styles from "../styles/HomePage.module.sass";

const Home: NextPage = () => {
	const router = useRouter();
	const t = useTranslations();
	const dispatch = useTypedDispatch();
	const [errorChange, setErrorChange] = useState<string | undefined>("");
	const [isOpenModalView, setIsOpenModalView] = useState(false);
	const [modalChange, setModalChange] = useState<ModalChangeType>({ isOpen: false, id: 0 });
	const { getUserDataThunk, sendChangeUserDataThunk, sendFilterUsersThunk } = useActions();
	const { selectStatus, selectUserData, prevFilterData } = useTypedSelector(state => ({
		selectStatus: state.foundUsers.selectStatus,
		selectUserData: state.foundUsers.selectUserData,
		prevFilterData: state.foundUsers.prevFilterData
	}));
	const formik = useFormik({
		initialValues: changeUserFormikValues,
		validateOnChange: false,
		validate: (values: ValidateType) => {
			setErrorChange("")
			for (const key in values) {
				if (values[key].length === 0) {
					setErrorChange(t("error.allFieldsRequired"))
					break
				}
			}
		},
		onSubmit: (values) => {
			sendChangeUserDataThunk(
				modalChange.id,
				values,
				prevFilterData as FilterUsersFormikValuesType,
				setModalChange,
				setErrorChange,
				sendFilterUsersThunk,
				router,
				selectStatus
			)
		}
	});

	const handleCloseModalView = (switchModal: Dispatch<SetStateAction<boolean>>) => switchModal(false);
	const handleCloseModalChange = (switchModal: Dispatch<SetStateAction<ModalChangeType>>) => {
		dispatch(removeSelectUserData())
		formik.resetForm()
		switchModal({
			isOpen: false,
			id: 0
		})
	};
	const handleGetUserData = (id: number) => {
		getUserDataThunk(id, router, selectStatus, setIsOpenModalView);
	};

	useEffect(() => {
		return () => {
			dispatch(removeBranches())
			dispatch(removeGroups())
			dispatch(removeFoundUsers())
			dispatch(removeSubjects())
		}
	}, [])

	useEffect(() => {
		if (modalChange.isOpen) getUserDataThunk(modalChange.id, router, selectStatus);
	}, [modalChange])

	useEffect(() => {
		if (selectUserData && modalChange.isOpen) {
			formik.setValues({
				first_name: selectUserData.first_name,
				last_name: selectUserData.last_name,
				username: selectUserData.username,
				phone_num: selectUserData.phone_num,
				password: ""
			})
		}
	}, [selectUserData, modalChange])

	return (
		<>
			<Container>
				<div className={styles.users__cont}>
					<FilterUsers />
					<FoundUsers handleGetUserData={handleGetUserData} setIsOpenModalChange={setModalChange} handleReset={formik.handleReset} />
				</div>
			</Container>
			<Modal
				open={isOpenModalView}
				onClose={() => handleCloseModalView(setIsOpenModalView)}
			>
				<Box
					sx={modalBoxStyles(530, 590)}
				>
					<div className={styles.users__modal__cont}>
						<div className={styles.users__modal__img}>
							<Image
								width={80}
								height={80}
								alt={selectUserData?.first_name}
								src={selectUserData?.image ? `${selectUserData?.image}` : "/"}
							/>
						</div>
						<div>
							<Typography className={styles.users__modal__userName}>
								{selectUserData?.first_name} {selectUserData?.last_name}
							</Typography>
							<Typography className={styles.users__modal__status}>
								{selectUserData?.status}
							</Typography>
						</div>
					</div>
					<Typography className={styles.users__modal__title}>
						{t("common.personalData")}
					</Typography>
					<Typography className={styles.users__modal__text}>
						{t("common.phone_num")}: <span className={styles.users__modal__text__span}>
							{selectUserData?.phone_num}
						</span>
					</Typography>
					{
						selectStatus !== StatusRankEnum.manager
						&& <Typography className={styles.users__modal__text}>
							{t("common.subject", { s: "" })}: <span className={styles.users__modal__text__span}>
								{selectUserData?.subject_names.join(", ")}
							</span>
						</Typography>
					}
					<Typography className={styles.users__modal__text}>
						{t("common.branch")}: <span className={styles.users__modal__text__span}>
							{selectUserData?.branch_name}
						</span>
					</Typography>
					<Typography className={styles.users__modal__text}>
						{t("common.group")}: <span className={styles.users__modal__text__span}>
							{selectUserData?.group_names.join(", ")}
						</span>
					</Typography>
				</Box>
			</Modal>
			<Modal
				open={modalChange.isOpen}
				onClose={() => handleCloseModalChange(setModalChange)}
			>
				<Box
					component={"form"}
					sx={modalBoxStyles(720, 540)}
					onSubmit={formik.handleSubmit}
				>
					<Typography className={styles.users__modalChange__title}>{t("common.change")}</Typography>
					<div className={styles.users__modalChange__cont}>
						<TextField
							id={"username"}
							name={"username"}
							label={t("common.username")}
							value={formik.values.username}
							onChange={formik.handleChange}
							className={styles.users__modalChange__input}
						/>
						<TextField
							id={"password"}
							type={"password"}
							name={"password"}
							label={t("common.password")}
							value={formik.values.password}
							onChange={formik.handleChange}
							className={styles.users__modalChange__input}
						/>
						<TextField
							id={"first_name"}
							name={"first_name"}
							onChange={formik.handleChange}
							label={t("common.first_name")}
							value={formik.values.first_name}
							className={styles.users__modalChange__input}
						/>
						<TextField
							id={"last_name"}
							name={"last_name"}
							label={t("common.last_name")}
							onChange={formik.handleChange}
							value={formik.values.last_name}
							className={styles.users__modalChange__input}
						/>
						<TextField
							type={"tel"}
							id={"phone_num"}
							name={"phone_num"}
							label={t("common.phone_num")}
							onChange={formik.handleChange}
							value={formik.values.phone_num}
							className={styles.users__modalChange__input}
						/>
					</div>
					<Typography variant={"body1"} color={"red"}>{errorChange && errorChange}</Typography>
					<Button
						type={"submit"}
						variant={"contained"}
						className={styles.users__modalChange__btn}
					>
						{t("common.change")}
					</Button>
				</Box>
			</Modal>
		</>
	)
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			messages: (await import(`../messages/${locale}.json`)).default
		}
	}
}