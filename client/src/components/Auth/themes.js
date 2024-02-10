import { deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const paperStyles = {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
}

const avatarStyles = {
    margin: '8px',
    backgroundColor: deepPurple[500],
}

const formStyles = {
    width: '100%', // Fix IE 11 issue.
    marginTop: '24px',
}

const submitStyles = {
    margin: '24px 0 16px',
}

const googleButtonStyles = {
    marginBottom: '16px'
}

const textFieldStyles = {
    margin: '8px'
}

export const authTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    '&.paper': paperStyles,
                    '& > .avatar': avatarStyles,
                    '& > .form': {
                        ...formStyles,
                        '& > .submit': submitStyles,
                        '& > .googleButton': googleButtonStyles
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: textFieldStyles
            }
        }
    }
})