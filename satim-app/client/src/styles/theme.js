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
            dark: '#478119',
            light: '#def5cc',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#a9a9a9',
        },
    },
});

export default theme;
