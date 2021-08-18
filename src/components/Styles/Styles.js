import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor:"#e7e7e7",
    },
  
    title: {
      flexGrow: 1,
      color: 'black',
      fontFamily:'serif',
      marginRight: theme.spacing(1),
      fontWeight: '550',
      textDecoration: 'none',
    },
    buttons: {
      position: 'absolute',
      right: 0,
      marginLeft: theme.spacing(2)
    },
    
    paragraph: {
        fontFamily: 'serif',
        fontWeight: 300,
    },

    
    
  }));







