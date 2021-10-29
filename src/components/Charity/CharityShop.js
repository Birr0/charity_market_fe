import { Template } from "../Template/Template"
import { useEffect, useState } from "react"
import { Get } from "../../api/fetchWrapper";
import { ProductArray } from "../Product/ProductArray";
import { Card, Grid, Typography, IconButton, LinearProgress } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Pagination, PaginationItem } from "@material-ui/lab";
import {Link} from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../storage/loadingSlice";
import { Loading } from "../Loading/Loading";

export const CharityShop = ({charity}) => {

    const [products, setProducts] = useState();
    const pagination = new URLSearchParams(window.location.search);
    const page = pagination.get('page') ? pagination.get('page') : 1;
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading.loadingState);

    useEffect(() => {
        
        dispatch(setLoading(true));
        setProducts();
        Get(`/charity/${charity.registrationId}/products?page=${page}`).then(
            result => {  
                setProducts(result);
                console.log(products);
                dispatch(setLoading(false));
            }
        )
    }, [page])

    return(
        <Template component={
            loading ? <Loading /> :
            <div>
                <IconButton onClick={() => window.history.back()} style={{margin:"5px"}}>
                    <ArrowBack />
                </IconButton>
                
                <Grid container direction="row" style={{marginTop:"20px", maxWidth:"1500px", marginLeft:"auto", marginRight:"auto"}}>
                    <Card style={{padding:"10px", border:"1px solid #e6e6e6", marginLeft:"5px", marginRight:"5px"}}>
                        <Grid item>
                            <img src={charity.logoImage.imageUrl} style={{width:"200px"}} />
                            <hr></hr>
                        </Grid>
                        <Grid item>
                            <div display="block">
                                <Typography variant="h5"><b>{charity.name}</b></Typography>
                    
                                <Typography>{charity.missionStatement}</Typography>
                            </div>
                        </Grid>
                    </Card>
                </Grid>
                
                {products ? 
                    <div style={{margin:"5px"}}>
                        <Typography variant="h6"><b>Products that support {charity.name}</b></Typography>
                        <ProductArray products={products} />
                        <Pagination
                        style={{display:"flex", justifyContent:"center", marginTop:"20px"}}
                            count={Math.round(products.total/39)}
                            defaultPage={pagination.get('page') || 1}
                            variant="outlined" color="primary"
                            renderItem={(item) => (
                                <PaginationItem {...item}
                                    component={Link}
                                    //to={`/search/${params.query}?page=${item.page}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history.push({pathname: `/charities/${charity.registrationId}`, search: `?page=${item.page}`, state : location.state})
                                    }}
                                />
                            )}
                            />    
                    
                    </div>
                    : <LinearProgress />
                }
            </div>
        } />
    )
}