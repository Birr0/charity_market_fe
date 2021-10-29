import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from "@material-ui/core/Badge";

import {useStyles} from "../../Styles/Styles.js";
import {CatalogueDialog} from "./CatalogueDialog.js";
import {SearchDialog} from "./SearchDialog.js";

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { setBackdrop, setCatalogueBackdrop } from '../../../storage/widgetSlice.js';
import { useHistory } from 'react-router';

export default function Navbar() {
  const cart = useSelector(state => state.basket.cart);

  const desktop = useMediaQuery('(min-width:600px)')
  const classes = useStyles();

  const [catalogueDialogOpen, openCatalogueDialog] = useState(false);
  const [searchDialogOpen, openSearchDialog] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const widgetController = useSelector(state => state.widget);
  console.log(widgetController.backdropState);
  return(
    
    <div className={classes.root}>
      <CatalogueDialog />
      
      <SearchDialog />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>    
            <Tooltip title="Home">
                <Link to="/" style={{'textDecoration': 'none'}} onClick={(e) => {
                    e.preventDefault();
                    dispatch(setBackdrop(false));
                    dispatch(setCatalogueBackdrop(false));
                    history.push('/');
                  }}>
                  <Typography variant={desktop ? 'h4' : 'h5'} className={classes.title}>Charity Market</Typography>
                </Link>
              
            </Tooltip>
          
            <div className={classes.buttons}>
               <IconButton aria-label="Catalgoue Menu" 
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(setBackdrop(false));
                    widgetController.catalogueBackdropState ? dispatch(setCatalogueBackdrop(false)) : dispatch(setCatalogueBackdrop(true));
                  }}>
               <Tooltip title="Catalogue Menu"> 
                  <MenuIcon />
                  </Tooltip>
                </IconButton>

                  <IconButton aria-label="Search" onClick={(e) => {
                    e.preventDefault();
                    setCatalogueBackdrop(false);
                    widgetController.backdropState ? dispatch(setBackdrop(false)) : dispatch(setBackdrop(true));
                  }}> 
                    <Tooltip title="Search">
                      <SearchIcon />
                    </Tooltip>
                  </IconButton>
                  <Link to="/wishlist">
                    <Tooltip title="Wishlist">
                      <IconButton>
                        <Badge badgeContent={cart.lineItems.length} color="secondary"><ShoppingBasketIcon /></Badge>
                      </IconButton>
                    </Tooltip>
                  </Link>
            </div>
        </Toolbar>
      </AppBar>
    </div>
    
  );
}