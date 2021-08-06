import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';

import {useStyles} from "../../Styles/Styles.js";
import {CatalogueDialog} from "./CatalogueDialog.js";
import {SearchDialog} from "./SearchDialog.js";

import {useState} from "react";

export default function Navbar() {

  const desktop = useMediaQuery('(min-width:600px)')
  const classes = useStyles();

  const [catalogueDialogOpen, openCatalogueDialog] = useState(false);
  const [searchDialogOpen, openSearchDialog] = useState(false);


  return(
    <>
    {catalogueDialogOpen ? <><CatalogueDialog open={catalogueDialogOpen}/></> : null}
    {searchDialogOpen ? <><SearchDialog /></> : null}
    
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Tooltip title="Home">
          
          <a href="/" style={{color:'black', textDecoration: 'none'}}><Typography variant={desktop ? 'h4' : 'h6'} className={classes.title}>Rogers'</Typography></a>
          
          </Tooltip>
            <div className={classes.buttons}>
              <Tooltip title="Catalogue Menu"> 
               <IconButton aria-label="Catalgoue Menu" onClick={(e) => {
                 e.preventDefault();
                 openSearchDialog(false);
                 catalogueDialogOpen ? openCatalogueDialog(false) : openCatalogueDialog(true);
               }}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Search">
                <IconButton aria-label="Search" onClick={(e) => {
                  e.preventDefault();
                  openCatalogueDialog(false);
                  searchDialogOpen ? openSearchDialog(false) : openSearchDialog(true);
                }
                }>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Basket">
                <Link to="/checkout">
                <IconButton>
                  <a href="/checkout" style={{color:'black', textDecoration: 'none'}}><ShoppingBasketIcon /></a>
                </IconButton>
                </Link>
              </Tooltip>
            </div>
        </Toolbar>
      </AppBar>
    </div>
    </>
  );
}