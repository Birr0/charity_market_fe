import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Paper from "@material-ui/core/Paper";
import {ImageViewer} from "../ImageViewer/ImageViewer";
import {BuyNow} from "../Payment/BuyNow";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, buyNow } from "../../storage/basketSlice";
//Add title, description to product function ...

export const ProductView = ({productData}) => {

    
    
    const [{viewerOpen, img}, openViewer] = useState({viwerOpen:false, img:null});
   
    const handleImageViewerClose = () => {
        openViewer(false);
    }
 
    const dispatch = useDispatch();

    return( 
        <div style={{marginTop:"80px"}}>
            
            <Grid container style={{maxWidth:"800px"}}>
            {viewerOpen ? <div><ImageViewer src={img} viewerOpen={viewerOpen} closeViewer={handleImageViewerClose} /></div> : null }
           
                <Grid container justifyContent="space-around" spacing={2} style={{marginTop:'30px'}}>
                    <Grid item>
                        <img alt={productData.shortDescription} onClick={(e) => {
                            e.preventDefault();
                            openViewer({viewerOpen:true, img: e.target.src});
                        }} src="data:image/jpeg;base64,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" />
                        
                        <Grid container justifyContent="center">
                            <img 
                                alt={productData.shortDescription} 
                                onClick={(e) => {
                                    e.preventDefault();
                                    openViewer({viewerOpen:true, img: e.target.src});
                                }}
                                style ={{maxWidth:'50px'}} src="https://www.belleek.com/Images/Models/Full/2776.Jpg" />
                            <img 
                            alt={productData.shortDescription}
                            onClick={(e) => {
                                e.preventDefault();
                                openViewer({viewerOpen:true, img: e.target.src});
                            }}
                            style ={{maxWidth:'50px'}} src="data:image/jpeg;base64,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" />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Paper style={{padding:"10px", backgroundColor:"#f2f2f2"}}>
                            <Typography variant='h5'>{productData.title}</Typography>
                            
                            <Typography >{productData.price}</Typography>
                            <Typography>{productData.shortDescription}</Typography>
                            <br></br>
                            <Grid>
                                <Button variant="outlined" style={{backgroundColor:"white"}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log(e);
                                        dispatch(buyNow(productData));
                                                                                
                                        //window.location.href='/buy-now';
                                    }}
                                >Buy Now</Button>                            
                                <Tooltip title="Add to Basket">
                                    <IconButton aria-label="Add To Basket" 
                                    onClick={(e) => {
                                            e.preventDefault();
                                            console.log(productData);
                                            dispatch(addToCart(productData));
                                        }
                                    }>
                                        <ShoppingBasketIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>      
                        </Paper>
                        <Typography style={{marginTop:"5px"}}>Shipping Information</Typography>          
                    </Grid>            
                </Grid>
            </Grid>
            <Accordion style={{marginTop:"10px"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Additional Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{productData.detailedDescription}</Typography>
                </AccordionDetails>
                
                {productData.details ? productData.details.map((detail, key) => {
                    return(
                        <AccordionDetails key={key}>
                            <Typography>{Object.keys(detail)} : {Object.values(detail)}</Typography>
                        </AccordionDetails>
                    );
                }) : null}
                
            </Accordion>

        </div>
    );
}