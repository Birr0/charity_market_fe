import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ClearIcon from '@material-ui/icons/Clear';

import { useDispatch } from "react-redux";
import { deleteFromCart } from "../../storage/basketSlice";
import {Link} from "react-router-dom";

export const LineItem = ({productData, remove}) => {
    const dispatch = useDispatch();
    console.log(productData);
    return(
        <Link to={{ pathname: productData.itemWebUrl}} target="_blank">
            <Grid container justifyContent="space-around" alignItems="center" spacing={2}>
                <Grid item>
                    <img 
                        alt={productData.shortDescription}
                        style={{maxWidth:"150px"}} src={productData.images[0]} />
                </Grid>
                <Grid item>
                    
                        <Typography variant='h5'>{productData.title}</Typography>        
                        <Typography><b>{productData.price} GBP</b></Typography>
                        <Typography >Quantity: {productData.quantity}</Typography>

                        <br></br>      
                </Grid>
                {remove ? 
                <Grid item>     
                    <Tooltip title="Remove from basket">
                        <IconButton aria-label="Add To Basket" onClick={
                            (e) => {
                                e.preventDefault();
                                //console.log(productData);
                                dispatch(deleteFromCart(productData));
                            }
                        }>
                            <ClearIcon />
                        </IconButton>
                    </Tooltip>
                </Grid> 
                
                : null}
            </Grid>
        </Link>
    );
}