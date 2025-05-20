import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiModal: {
            defaultProps: {
                disableScrollLock: true,
            },
        },
    },
    palette: {
        primary: {
            main: '#5fac22',
            dark1: '#478119',
            dark: '#305611',
            light1: '#bdeb99',
            light: '#def5cc',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#afd590',
            dark1: '#80bd4f',
            dark: '#558131',
            light1: '#dfeed3',
            light: '#cfe6bc'
        },
        accent: {
            greyNeutral : '#a9a9a9',
            success: '#5fac22',
            warning: '#fb7d19',
            error: '#f44336',
            info: '#fdb175',
            blue: '#62a8e5',
            blueLight1: '#c0dcf5',
            blueLight: '#a1cbef',
            blueDark1: '#2381d2',
            blueDark: '#17568c'
        }
    },
});

export default theme;
