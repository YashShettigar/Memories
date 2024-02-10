import { createTheme } from '@mui/material/styles';

const gridContainerStyles = {
    display: 'flex'
}

export const postsTheme = createTheme({
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {
                    ...gridContainerStyles
                }
            }
        }
    }
})