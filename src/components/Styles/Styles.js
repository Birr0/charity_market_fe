import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor:"white",
    },

    managementBar: {
      backgroundColor:"#000000",
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "10px",
    },

    managementOption: {
      fontColor: "#ffffff",
      color: "#ffffff",
    },

    body: {
      marginBottom: theme.spacing(1),
    },

    link: {
      'textDecoration': 'none'
    },
  
    title: {
      flexGrow: 1,
      color: 'black',
      fontFamily:'stencil',
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







