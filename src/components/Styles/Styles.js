import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor:"#e7e7e7",
      position: 'absolute',
      top: 0,
    },
  
    title: {
      flexGrow: 1,
      color: 'black',
      fontFamily:'serif',
      marginRight: theme.spacing(1),
      fontWeight: '550',
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

    pageContent: {
      marginTop: "60px",
    },
    
  }));







