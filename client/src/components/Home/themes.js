import { createTheme } from "@mui/material"
import theme from '../../themes';

const mainContainerStyles = {
    display: 'flex',
    alignItems: 'center'
}

const appBarSearchStyles = {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px'
}

const paginationStyles = {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px'
}

const chipInputStyles = {
    margin: '10px 0'
}

const chipStyles = {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    fontWeight: '550',
    boxShadow: '1px 1px 1px 1px #ddde'
}

export const homeStyles = createTheme({
    components: {
        MuiGrid: {
            styleOverrides:{
                root:{
                    '&.mainConatiner': mainContainerStyles,
                    [theme.breakpoints.down('xs')]: {
                        flexDirection: 'column-reverse'
                    },

                    '& .appBarSearch': appBarSearchStyles,
                    '& .pagination': paginationStyles,
                    '& .chipInput': chipInputStyles,
                    '& .MuiChip-root': chipStyles
                }
            }
        }
    }
});