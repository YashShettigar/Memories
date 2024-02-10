import { createTheme } from "@mui/material";
import themes from '../../themes';

const imageSectionStyles = {
    marginLeft: '20px',
    [themes.breakpoints.down['sm']]: {
        marginLeft: 0
    }
}

const recommendedPostsStyles = {
    display: 'flex',
    [themes.breakpoints.down('sm')]: {
        flexDirection: 'column'
    }
}

const sectionStyles = {
    borderRadius: '20px',
    margin: '10px'
}

const mediaStyles = {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px'
}

const cardStyles = {
    display: 'flex',
    width: '100%',
    [themes.breakpoints.down['sm']]: {
        flexWrap: 'wrap',
        flexDirection: 'column'
    }
}

const loadingPaperStyles = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px', 
    borderRadius: '15px', 
    height: '39vh'
}

export const postDetailsTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    '&.loadingPaper': loadingPaperStyles,
                    marginBottom: '24px',
                    '& .card': cardStyles,
                    '& .section': sectionStyles,
                    '& .imageSection': {
                        ...imageSectionStyles,
                        '& .media': mediaStyles
                    },
                    // '& .recommendedPosts': recommendedPostsStyles
                }
            }
        }
    }
});