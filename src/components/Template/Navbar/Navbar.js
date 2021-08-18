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
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export default function Navbar() {
  const cart = useSelector(state => state.basket.cart);

  const desktop = useMediaQuery('(min-width:600px)')
  const classes = useStyles();

  const [catalogueDialogOpen, openCatalogueDialog] = useState(false);
  const [searchDialogOpen, openSearchDialog] = useState(false);


  return(
    
    <div className={classes.root}>
      {catalogueDialogOpen ? <><CatalogueDialog open={catalogueDialogOpen}/></> : null}
    {searchDialogOpen ? <><SearchDialog /></> : null}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>    
            <Tooltip title="Home">
              
                <Link to="/" style={{'textDecoration': 'none'}}>
                  <Typography variant={desktop ? 'h4' : 'h6'} className={classes.title}>Rogers'</Typography>
                </Link>
              
            </Tooltip>
          
            <div className={classes.buttons}>
               <IconButton aria-label="Catalgoue Menu" 
                onClick={(e) => {
                    e.preventDefault();
                    openSearchDialog(false);
                    catalogueDialogOpen ? openCatalogueDialog(false) : openCatalogueDialog(true);
                  }}>
               <Tooltip title="Catalogue Menu"> 
                  <MenuIcon />
                  </Tooltip>
                </IconButton>

                  <IconButton aria-label="Search" onClick={(e) => {
                    e.preventDefault();
                    openCatalogueDialog(false);
                    searchDialogOpen ? openSearchDialog(false) : openSearchDialog(true);
                  }}> 
                    <Tooltip title="Search">
                      <SearchIcon />
                    </Tooltip>
                  </IconButton>
                  <Link to="/checkout">
                    <Tooltip title="Basket">
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