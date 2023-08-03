//next
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
//react
import { useEffect, useState } from "react";
//redux
import { removeGroups } from "../../redux/slices/group";
import { useActions, useTypedDispatch, useTypedSelector } from "../../redux/store";
//components
import { Container } from "../../components/Container";
import { FoundGroups } from "../../components/FoundGroups";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import { Modal, Box, Typography } from "@mui/material";
//lib
import { modalBoxStyles } from "../../lib/globalThemeMui";
//sass
import styles from "../../styles/GroupsPage.module.sass";

const Groups: NextPage = () => {
	const router = useRouter();
	const dispatch = useTypedDispatch();
	const { getGroupsThunk} = useActions();

	useEffect(() => {
		getGroupsThunk(router)
		
		return () => {
			dispatch(removeGroups())
		}
	}, [])

	return (
		<>
			<Container>
				<div className={styles.groups__cont}>
					<FoundGroups />
				</div>
			</Container>
		</>
	)
}

export default Groups

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			messages: (await import(`../../messages/${locale}.json`)).default
		}
	}
}