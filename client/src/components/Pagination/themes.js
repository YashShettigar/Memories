import { createTheme } from "@mui/material";

export const pageTheme = createTheme({
    components: {
        MuiPagination: {
            styleOverrides: {
                root: {
                    '& .MuiPagination-ul': {
                        justifyContent: 'space-around'
                    }
                }
            }
        }
    }
});