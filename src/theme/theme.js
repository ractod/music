import { createTheme } from "@mui/material";
import resloveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../tailwind.config";

const { theme : tailwindTheme } = resloveConfig(tailwindConfig)

const muiTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: tailwindTheme.colors.primary },
        secondary: { main: tailwindTheme.colors.secondary },
        muted: { main: tailwindTheme.colors.muted  },
        white: { main: tailwindTheme.colors.white },
        red: { main: tailwindTheme.colors.red }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1360,
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Arial', 'Helvetica', 'sans-serif'",
        fontWeightLight: tailwindTheme.fontWeight.light,
        fontWeightRegular: tailwindTheme.fontWeight.normal,
        fontWeightBold: tailwindTheme.fontWeight.semibold,
        fontWeightHeavy: tailwindTheme.fontWeight.extrabold,
        fontWeightFat: tailwindTheme.fontWeight.black,
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                sizeSmall: {
                    width: "25px" ,
                    height: "25px" ,
                    padding: '5px'
                },
                sizeMedium: {
                    width: "35px" ,
                    height: "35px" ,
                    padding: '10px'
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderRadius: "6px",
                    backgroundColor: tailwindTheme.colors.border,
                    height: "4px"
                }
            }
        }
    }
});

export default muiTheme 