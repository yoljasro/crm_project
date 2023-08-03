//react
import { FC } from "react";
//material ui
import { Box, CircularProgress } from "@mui/material";
import { colors } from "../../lib/globalThemeMui";

export const Loading: FC = () => {
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
            <CircularProgress
                sx={{
                    top: "50%",
                    left: "50%",
                    textAlign: "center",
                    position: "absolute",
                    color: colors.blueLight,
                    transform: "translate(-50%, -50%)",
                }}
            />
        </Box>
    )
};