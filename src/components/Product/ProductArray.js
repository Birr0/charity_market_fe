import { Box, Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import { Loading } from "../Loading/Loading";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch, useSelector } from "react-redux"; 

//if productArray > threshold, include pagination

export const ProductArray = ({products, query}) => {
    const desktop = useMediaQuery('(min-width:600px)');  
    console.log(products);
    return(
            <div>
                
                {products ? 
                <>
                    
                    <Box sx={{ flexGrow: 1, maxWidth:"1500px", marginLeft:"auto", marginRight:"auto", marginTop:"10px" }}>
                        <Grid container 
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-end"
                            container 
                            spacing={30}>
                            {products.itemSummaries ? products['itemSummaries'].map((product, key) => {
                            return( //replace with ID
                                <Link to={{pathname: `/product/${encodeURIComponent(product.itemId)}`, state:product ? product : {itemId: product.itemId} }} style={{'textDecoration': 'none'}} >
                                    <Grid item key={key}  style={{width:(desktop ? "250px" : "300px") , height: (desktop ? "250px" : ''), margin:"20px"}}>
                                        <Card style={{padding:"5px"}} >     
                                            <div style={{display:"flex", justifyContent:"center"}}>    
                                                <img 
                                                    alt={Object.keys(product).shortDescription}
                                                    src={product['image'] ? product['thumbnailImages'][0]['imageUrl'] : ''} 
                                                
                                                    style={{ alignItems:"center", width: (desktop ? "250px" : "100%"), height: (desktop ? "200px" : '')}}
                                                />
                                                 
                                            </div>
                                            <div style={{maxWidth:""}}>
                                            <Typography>{product.title.length > 35 ? product.title.slice(0,34) + '...' : product.title}</Typography>
                                                <Typography><b>{product.price.value} {product.price.currency}</b></Typography>
                                            </div>
                                        </Card>
                                        
                                    </Grid>
                                </Link>
                            );
                        }): <p>No results</p>}
                        </Grid>
                    </Box>
                </>
                : <Loading />}
            </div>

    );
}