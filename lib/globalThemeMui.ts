import { createTheme } from "@mui/material";

export const colors = {
    blueLight: "rgba(37, 39, 77, 0.5)",
    greenLight: "#2D9CCA",
    gray: "#e5e5e5",
    blueDark: "#25274D",
    mainBlack: "#424242",
    grayLight: "#FAFAFC"
};

export const modalBoxStyles = (width: number, height: number) => ({
    p: 4,
    top: "50%",
    left: "50%",
    width: "100%",
    minWidth: 300,
    maxWidth: width,
    boxShadow: 24,
    minHeight: 350,
    maxHeight: height,
    overflow: "scroll",
    position: "absolute",
    bgcolor: "background.paper",
    transform: "translate(-50%, -50%)"
});

export const circularProgressStyles = (width: number, height: number) => ({
    width: `${width}px !important`,
    height: `${height}px !important`
})

const borderStyle = `2px solid ${colors.blueLight}`;

export const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: colors.blueLight
                    }
                }
            }
        }  ,

        // MuiSelect: {
        //     styleOverrides: {
        //         root : {
        //             border: 'none' , 
        //             background: 'red'
        //         }
        //     }
        // },


        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: borderStyle
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    textTransform: "capitalize",
                    background: colors.greenLight,
                    "&:hover": {
                        background: colors.greenLight
                    },
                    "&:disabled": {
                        background: colors.gray
                    }
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: colors.blueDark
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    "& .Mui-selected": {
                        color: `${colors.blueDark} !important`
                    }
                },
                scroller: {
                    "@media (max-width: 767px)": {
                        overflow: "scroll !important",
                    }
                },
                indicator: {
                    background: colors.blueDark,
                    "@media (max-width: 574px)": {
                        background: "transparent"
                    }
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    transition: ".3s",
                    borderBottom: "3px solid transparent",
                    "@media (max-width: 574px)": {
                        "&.Mui-selected": {
                            borderBottom: `3px solid ${colors.blueDark}`
                        }
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "none"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    background: "#fff"
                }
            }
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    width: 400,
                    height: 250,
                    top: "50%",
                    bottom: "auto",
                    borderRadius: "16px",
                    left: "50% !important",
                    transform: "translate(-50%, -50%)"
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    height: "inherit",
                    alignItems: "center",
                    borderRadius: "inherit",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: `0 0 20px 10px rgba(0, 0, 0, 0.1)`
                },
                icon: {
                    padding: 0,
                    width: "66px",
                    height: "66px",
                    fontSize: "66px",
                    marginBottom: 20
                },
                message: {
                    fontSize: 24,
                    fontWeight: 400,
                    textAlign: "center",
                    color: colors.mainBlack,
                    fontFamily: "Montserrat-Regular"
                },
                action: {
                    top: 15,
                    right: 25,
                    position: "absolute"
                }
            },
        }
    },
});