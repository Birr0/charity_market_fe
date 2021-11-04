import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router";
import { ProductArray } from "../Product/ProductArray";
import { Template } from "../Template/Template";
import {Post} from "../../api/fetchWrapper";
import { Link, useLocation } from "react-router-dom";
import { Pagination, PaginationItem} from '@material-ui/lab';
import { Loading } from "../Loading/Loading";
import { SearchFilter } from "./SearchFilter";
import { useMediaQuery, Grid, IconButton, Tooltip } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../storage/loadingSlice";


export const SearchResults = () => {
    const desktop = useMediaQuery('(min-width:800px)');  
    const params = useParams();
    const history = useHistory();
    const pagination = new URLSearchParams(window.location.search);
    const location = useLocation();
    
    const [products, setProducts] = useState();
    
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading.loadingState)

    if(!location.state){
        location.state = {query: params.query, filter: {}}
    }

    useEffect(() => {
         
        
        if(pagination.get('page')){
           
            setProducts();
            Post(`/search/${location.state.query}?limit=39&page=${pagination.get('page')}`, location.state.filter).then(
                result => {
                    window.scrollTo(0, 0);
                    setProducts(result);
                    dispatch(setLoading(false));
                }
            );
        }
        else{
            Post(`/search/${params.query}?limit=39&page=1`, location.state.filter).then(
            result => {
                setProducts(result);
                dispatch(setLoading(false));

            }
            );
        }
    
    }, [params || pagination ]);
    

    const [viewerOpen, openViewer] = useState(false);

    const handleImageViewerClose = () => {
        openViewer(false);
    }


    return(
        <Template component={

            loading ?
                <Loading />
            :

            products ?
            desktop ? 
            <div style={{marginTop:"20px"}}>
                <h1 style={{marginLeft:"20px"}}>{products.total} results for '{params.query}'</h1>
                <Grid container direction="row" justifyContent="space-around" >
                    <Grid item position="relative" xs={2}>
                        <SearchFilter mobile={false} width="600px" query={params.query}/>
                    </Grid>
                    <Grid item xs={7} display="block">
                        <ProductArray products={products} query={params.query} />
                        <div style={{display:"flex", marginTop:"100px", justifyContent:"center"}}>
                            {products.total > 39 ?
                            <Pagination
                            count={Math.round(products.total/39)}
                            defaultPage={pagination.get('page') || 1}
                            variant="outlined" color="primary"
                            renderItem={(item) => (
                                <PaginationItem {...item}
                                    component={Link}
                                    //to={`/search/${params.query}?page=${item.page}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        
                                        history.push({pathname: `/search/${params.query}`, search: `?page=${item.page}`, state : location.state})
                                    }}
                                />        
                                )}
                            /> : null}
                        </div>
                    </Grid>
                </Grid> 
            </div>
                : 
                <div>
                    {viewerOpen ? <SearchFilter mobile={true} viewerOpen={viewerOpen} closeViewer={handleImageViewerClose} query={params.query} /> : null}
                    <h1 style={{marginLeft:"5px", maxWidth:"75%"}}>{products.total} results for '{params.query}'</h1>
                    <Grid container direction="row">
                        <Grid item style={{position:'absolute', top:80, right:0}}>
                            <Tooltip title="Filter search">
                                <IconButton onClick={(e) => {
                                    e.preventDefault();
                                    openViewer(true);
                                }}>
                                    <FilterList style={{fontSize:"40px"}} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item display="block">
                            <ProductArray products={products} query={params.query} />
                                {products.total > 39 ?
                                <div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
                                
                                    <Pagination
                                        count={Math.round(products.total/39)}
                                        defaultPage={pagination.get('page') || 1}
                                        variant="outlined" color="primary"
                                        renderItem={(item) => (
                                            <PaginationItem {...item}
                                                component={Link}
                                                //to={`/search/${params.query}?page=${item.page}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    
                                                    history.push({pathname: `/search/${params.query}`, search: `?page=${item.page}`, state : location.state})
                                                }}
                                            />        
                                                
                                            
                                    )} />
                                
                                </div>
                                
                                 : null}

                        </Grid>
                    </Grid>
                </div>
            
            : <Loading />
            }
         />
    )
}