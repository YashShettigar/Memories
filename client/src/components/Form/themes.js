import { createTheme } from '@mui/material/styles';

const paperStyles = {
    padding: '16px'
}

const formStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
}

const textFieldStyles = {
    margin: '8px'
}

const fileInputStyles = {
    width: '97%',
    margin: '10px 0',
}

const buttonSubmitStyles = {
    marginBottom: 10,
}

export const formStyles = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    '&.paper': paperStyles,
                    '& > form.form': formStyle,
                    '& > form.root': {
                        '& > .fileInput': fileInputStyles
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: textFieldStyles
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.buttonSubmit': buttonSubmitStyles
                }
            }
        }
    }
})