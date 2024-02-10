import { createTheme } from "@mui/material";

const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    position: 'relative',
    minWidth: '100%'
}

const cardSelectionStyles = {
    display: 'inline-block'
}

const mediaStyles = {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken'
}

const overlayStyles = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
}

const overlay2Styles = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
}

const detailsStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
}

const titleStyles = {
    padding: '0 16px',
}

const cardActionsStyles = {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
}

export const postTheme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    '&.card': cardStyles,
                    '& .cardSelection': cardSelectionStyles,
                    '& .media': mediaStyles,
                    '& .overlay': overlayStyles,
                    '& .overlay2': overlay2Styles,
                    '& .details': detailsStyles,
                    '& .title': titleStyles,
                    '& .cardActions': cardActionsStyles
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    height: '100%'
                }
            }
        }
    }
})