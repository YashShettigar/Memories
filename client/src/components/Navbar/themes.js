import { createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

import themes from '../../themes';

const appBarStyles = {
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    margin: '30px 0',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 50px',
    [themes.breakpoints.down('sm')]: {
        flexDirection: 'column'
    }
}

const brandContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '24px',
    paddindRight: '24px'
}

const imageStyles = {
    marginLeft: '15px'
}

const toolbarStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 30px',
    width: '400px'
}

const profileStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    [themes.breakpoints.down('sm')]: {
        marginTop: '20px'
    }
}

const avatarStyles = {
    color: 'rgba(249, 245, 252, 1)',
    backgroundColor: deepPurple[500],
}

const userNameStyles = {
    display: 'flex',
    alignItems: 'center',
}

export const navTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    '&.appBar': appBarStyles,
                    '& > .brandContainer': {
                        ...brandContainerStyles,
                        '& .image': imageStyles
                    },
                    '& > .toolbar': {
                        ...toolbarStyles,
                        '& > .profile': {
                            ...profileStyles,
                            '& > .avatar': avatarStyles,
                            '& > userName': userNameStyles
                        }
                    }
                }
            }
        }
    }
    
});