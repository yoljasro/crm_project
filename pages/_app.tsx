//next
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
//react
import { useEffect, useRef } from "react";
//redux
import { Provider } from "react-redux";
import store from "../redux/store";
//next-intl
import { NextIntlProvider } from "next-intl";
//component
import { SnackbarWrapper } from "../components/Snackbar";
//material ui
import { ThemeProvider } from "@mui/material";
//lib
import { theme } from "../lib/globalThemeMui";
//sass
import "../styles/globals.sass";

type PagePropsType = {
	messages: typeof import("../messages/en.json")
}

const usePreviousRoute = () => {
	const { asPath } = useRouter();

	const ref = useRef<string | null>(null);

	useEffect(() => {
		ref.current = asPath;
	}, [asPath]);

	return ref.current;
};


function MyApp({ Component, pageProps }: AppProps<PagePropsType>) {
	const previousRoute = usePreviousRoute();

	return (
		<>
			<NextIntlProvider messages={pageProps.messages}>
				<ThemeProvider theme={theme}>
					<Provider store={store}>
						<Component {...pageProps} {...{previousRoute: previousRoute}} />
						<SnackbarWrapper />
					</Provider>
				</ThemeProvider>
			</NextIntlProvider>
		</>
	)
}

export default MyApp