//react
import { FC } from "react";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import { Typography, Box } from "@mui/material";
import { colors } from "../../lib/globalThemeMui";

export const NoData: FC = () => {
    const t = useTranslations();

    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
                height: "calc(100vh - 304px)",
                "@media (max-width: 767px)": {
                    height: "calc(100vh - 456px)"
                }
            }}
        >
            <Typography
                sx={{
                    top: "50%",
                    left: "50%",
                    textAlign: "center",
                    position: "absolute",
                    color: colors.blueLight,
                    transform: "translate(-50%, -50%)",
                }}
                variant={"h5"}
            >{t("error.noData")}</Typography>
        </Box>
    )
};