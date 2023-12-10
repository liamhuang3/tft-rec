import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material"

const darkTheme = createTheme({
    palette:{
        mode: 'dark',
        primary:{
            main: green[400]
        },
        background:{
            default: '#333333'
        },
    },
    components: {
        MuiToolbar:{
            styleOverrides:{
                regular:{
                    color: green[500]
                }
            }
        },
        MuiCard:{
            styleOverrides: {
                root:{
                    borderRadius: 20
                }
            }
        }
    },
    typography: {
        fontFamily: 'Noto Sans, sans-serif'  // your preferred font-family
      },
});


export default darkTheme;