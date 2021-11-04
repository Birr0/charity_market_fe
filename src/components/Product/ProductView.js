import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Paper from "@material-ui/core/Paper";
import { Card } from "@material-ui/core";
import {ImageViewer} from "../ImageViewer/ImageViewer";
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {useState} from "react";
import { IconButton, useMediaQuery } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { LocalShippingSharp } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import { addToCart } from "../../storage/basketSlice";
//Add title, description to product function ...

export const ProductView = ({productData}) => {
    
    const [{viewerOpen, img}, openViewer] = useState({viewerOpen:false, img:null});
    const [wishlist, addedToWishlist] = useState(false);

    const desktop = useMediaQuery('(min-width:600px)');  

    const dispatch = useDispatch();

    const handleImageViewerClose = () => {
        openViewer(false);
    }
    
   
    const getRating = (condition) => {
        if(condition === 'Good'){
            return 3.5
        }
        if(condition === 'Very Good'){
            return 4
        }
        if(condition === 'Like New' || condition === 'New' || condition === 'New without tags'){
            return 5
        }
        else{
            return 3
        }
    }

    const getEbayDescription = (htmlDescription) => {
        if(htmlDescription){
            var el = document.createElement('html');
            el.innerHTML =htmlDescription;
            return [...el.getElementsByTagName('span')]; 
        }
    }

   
    return( 
        <div>
            <Grid container>
            {viewerOpen ? <div>
                <ImageViewer src={img} viewerOpen={viewerOpen} closeViewer={handleImageViewerClose} nextImages={productData.images} />
                
                </div> : null }
        
                <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={4} style={{marginTop:"5px", maxWidth:"1500px", marginLeft:"auto", marginRight:"auto"}}>
                    <Grid item>
                        {productData.images ?
                            <div>
                                <img alt={productData.shortDescription} onClick={(e) => {
                                    e.preventDefault();
                                    openViewer({viewerOpen:true, img: e.target.src});
                                }} style={{  maxWidth:(desktop ? "300px" : "100%")}} src={productData.images[0]} />
                            {productData.images.length > 1 ? 
                                <Grid container justifyContent="center">
                                    {productData.images.map(image => {
                                        return(
                                         <img 
                                         alt={productData.shortDescription} 
                                         onClick={(e) => {
                                             e.preventDefault();
                                             openViewer({viewerOpen:true, img: e.target.src});
                                         }}
                                         style ={{maxWidth: 
                                            (desktop ? (300/productData.images.length).toString() + 'px' : (100/productData.images.length).toString() + '%'),
                                            maxHeight : (desktop ? (300/productData.images.length).toString() + 'px' : (300/productData.images.length).toString() + 'px'),
                                        }} src={image} />
                                        )
                                    })}
                                </Grid>
                                : null}
                            </div> : <img alt={productData.shortDescription} onClick={(e) => {
                                    e.preventDefault();
                                    openViewer({viewerOpen:true, img: e.target.src});
                                }} style={{width:"100%"}} src='' />}
                    </Grid>
                    <Grid item>
                        <Paper style={{padding:"10px", backgroundColor:"#f2f2f2", maxWidth:(desktop ? "900px" : "90vw")}}>
                            <Typography variant='h5'>{productData.title}</Typography>

                            <Grid style={{marginTop:"10px", marginBottom:"10px"}}>
                                <Typography variant='h6'><b>{productData.price} {productData.currency}</b></Typography>
                                {wishlist ? <Card style={{backgroundColor:"#77dd77", padding:"5px", maxWidth:"200px"}}><Typography><b>Item added to wishlist!</b></Typography></Card> : null}
                                <a target="_blank" rel="noreferrer" href={`${productData.itemWebUrl}`}>
                                    <Button variant="outlined" style={{marginTop:"10px", backgroundColor:"white"}}
                                    >Buy Now</Button>       
                                </a> 
                                <Tooltip title="Add to wishlist">
                                    <IconButton onClick={() => {
                                        dispatch(addToCart(productData));
                                        addedToWishlist(true);
                                    }
                                    }>
                                        <ShoppingBasket  />
                                    </IconButton>
                                </Tooltip> 
                                                    
                            </Grid>      
                        </Paper>
                        <Paper style={{backgroundColor:"#77dd77"}}>
                            <Typography style={{textAlign:"center"}}>{productData.charityTitle}</Typography>
                        </Paper>
                        <Paper style={{marginTop:"20px", maxWidth:"450px", padding:"10px"}}>
                            <Grid container direction="row" alignItems="center" >
                                <LocalShippingSharp style={{marginLeft:"5px", marginRight:"5px", fontSize:"30px"}} />
                                <Typography>Shipping</Typography>
                            </Grid>
                            <hr></hr>
                                {productData.shipping ? 
                                    <>
                                    {productData.shipping.shippingCost ? 
                                    <Typography>Estimated shipping cost: <b>{productData.shipping.shippingCost.value} {productData.shipping.shippingCost.currency}</b></Typography>
                                    : null}
                                    {productData.shipping.carrier ? 
                                    <Typography>{productData.shipping.carrier} - {productData.shipping.type}</Typography>
                                    : null}
                                    {
                                    productData.shipping.deliveryDate ? 
                                        new Date(productData.shipping.deliveryDate.minDate).toDateString() === new Date(productData.shipping.deliveryDate.maxDate).toDateString()
                                        ? 
                                        <Typography>Estimated shipping date: {new Date(productData.shipping.deliveryDate.minDate).toDateString()}</Typography>
                                        : 
                                        <Typography>
                                            {new Date(productData.shipping.deliveryDate.minDate).toDateString() - new Date(productData.shipping.deliveryDate.maxDate).toDateString()}
                                        </Typography>
                                    
                                    : 
                                    <Typography>No date available</Typography>
                                    }

                                {productData.shipping.moreOptions === "true" ? 
                                    <Typography>Multiple shipping options available</Typography>
                                    :
                                    null
                                }
                                {productData.shipping.additionalCosts === "true" ? 
                                    <Typography>Subject to additional costs</Typography>
                                    :
                                    null

                                }
                                </>
                                : <Typography>No information available</Typography>}
                        </Paper> 
                    </Grid>
                               
                </Grid>
            </Grid>
            
            
            <div style={{ maxWidth:(desktop ? "1500px" : "95vw"), marginTop:"10px", marginLeft:"auto", marginRight:"auto"}}>
            
            {productData.shortDescription ? 
                <>
                <h2>Seller description</h2>
               
                <p>{productData.shortDescription}</p>
                
                </>
            : null}
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant='h5'><b>Details</b></Typography>
                        
                    </AccordionSummary>
                    <AccordionDetails style={{display:"block"}}>
                        <Typography><b>Condition</b></Typography>
                        
                        <Grid container alignItems="center" spacing={2} direction="row">
                        
                            <Grid item>
                                <Typography>{productData.condition}</Typography>
                            </Grid>
                            <Grid item>
                                <Rating name="size-medium" defaultValue={getRating(productData.condition)} readOnly />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <AccordionDetails style={{display:"block"}}>
                            <Typography><b>Charity</b></Typography>
                            <br></br>
                            <Typography> <b>{productData.charityTitle}</b> : {productData.charityMission}</Typography>
                    </AccordionDetails>
                    
                    <AccordionDetails>
                        <Typography><b>Seller description</b></Typography>
                    </AccordionDetails>
                    
                    {productData.description ? getEbayDescription(productData.description).map((d) => {
                        if(d.innerText){
                            return(
                                <AccordionDetails display="block">
                                    
                                    <Typography>- {d.innerText}</Typography>    
                                </AccordionDetails>
                            )}
                        else{
                            return 0;
                        }
                    }) : null}  
                        
                </Accordion>
            </div>
        </div>
    );
}