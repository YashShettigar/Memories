import { createTheme } from "@mui/material";

const outerContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between'
}

const innerContainerStyles = {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px'
}

export const commentThemes = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    '&.commentsOuterContainer': outerContainerStyles,
                    '& .commentsInnerContainer': innerContainerStyles
                }
            }
        }
    }
});