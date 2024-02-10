import { createTheme } from "@mui/material";

const themes = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 720,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default themes;