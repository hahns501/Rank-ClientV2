import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        background: {
            default: '#ffffff'
        },
    },
    typography: {
        fontFamily: {
            fontFamily:'Montserrat, sans-serif'
        }
    }
});

export default theme;