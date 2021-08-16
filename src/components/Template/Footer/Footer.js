import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: 'black',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex:10,
    marginTop:"100px",
  },
  icons: {
      color: 'white',
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction style={{color: 'white'}} label="test@test.com " icon={<ContactSupportIcon className={classes.icons} />} />
      <BottomNavigationAction  icon={<InstagramIcon className={classes.icons} />} />
      <BottomNavigationAction  icon={<FacebookIcon className={classes.icons} />} />
        <p style={{color: 'white'}}>© Rogers' Antiques 2021</p>
    </BottomNavigation>
  );
}