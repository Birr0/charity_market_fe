import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router";
import { ProductArray } from "../Product/ProductArray";
import { Template } from "../Template/Template";
import {Post} from "../../api/fetchWrapper";
import { Link, useLocation } from "react-router-dom";
import { Pagination, PaginationItem, Autocomplete} from '@material-ui/lab';
import { Loading } from "../Loading/Loading";
import { useMediaQuery, Grid, IconButton, Tooltip, Button,
     Checkbox, TextField, Card, Typography, Slider,
        Backdrop, Breadcrumbs, CircularProgress } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../storage/loadingSlice";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Close from '@material-ui/icons/Close';
import {Formik} from "formik";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const CategoryFilterForm = ({ mobile, category, subcategory_name}) => {
    const history = useHistory();
    const location = useLocation();
    
    const [products, setProducts] = useState();
    const [_loading, _setLoading] = useState();

    useEffect(() => {
        _setLoading(true);
        let _category = category;
        if (subcategory_name){
            Post(`/categories/${category['name']}?subcategory_name=${subcategory_name}&limit=1&page=1`, _category).then(
                result => {
                    setProducts(result);
                    _setLoading(false);
                }
            )
        }
        else{
        Post(`/categories/${category['name']}?limit=1&page=1`, _category).then(
            result => {
                setProducts(result);
                _setLoading(false);
            }
        )
        }
    },[category || subcategory_name])

    return(
        <Card style={{marginBottom:"10px", marginTop:(mobile && !_loading ? "900px" : "0px"), width:(mobile ? "75%" : "100%"), padding:"10px"}}>
            <Typography variant='h5'><b>Filter</b></Typography>
            <hr></hr>
            <Formik
              initialValues={{
                filter: {'price': [0,1000]},
                aspect_filter: {},
              }}

              onSubmit={(values) => {
                let aspect_filter_string = `categoryId:${category['subcategories'] ? category['subcategories'][subcategory_name]['ebid'] : category['ebid']}`;
                //history.push({pathname: `/search/${query}`, state: {query: query, filter: values } }) // does not work with Firefox ...
                //dispatch(setLoading(true));

                Object.keys(values.aspect_filter).map((key, value) => {
                    let temp_str = `,${key}:{`
                    

                    for(let i=0; i < values.aspect_filter[key].length; i++){
                        if(i < values.aspect_filter[key].length - 1){
                            console.log(values.aspect_filter[key][i]);
                            temp_str += values.aspect_filter[key][i]['localizedAspectValue'] + '|';
                        }
                        else{
                            console.log(values.aspect_filter[key][i]);
                            temp_str += values.aspect_filter[key][i]['localizedAspectValue'];
                        }
                    }
                    temp_str += '}';
                    aspect_filter_string += temp_str;
                    return
                })
                let filter_string = 'charityOnly:true,';
                Object.keys(values.filter).map((key, value) => {
                   if(key === 'price'){
                       filter_string += `price:[${values.filter.price[0]}..${values.filter.price[1]}],priceCurrency:GBP`
                   }
                })
                let state = Object.assign(location.state, {filter: filter_string, aspect_filter: aspect_filter_string} );
                //state.push({filter: filter_string, aspect_filter: aspect_filter_string});
                
                history.push({pathname: location.pathname, state: state})
              }
                
              }
            >
              {(props) => (
                 
                <form onSubmit={props.handleSubmit}>
                
                {products && products.refinement ? 
                    <>
                    <Typography><b>Price</b></Typography>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        min={0}
                        step={1}
                        max={1000}
                        marks={[{value: 0, label: '£ 0'}, {value: 1000, label: '£ 1,000'}]}
                        value={props.values.filter.price}
                        onChange={(e, price) => {
                        props.setFieldValue('filter.price', price);
                        }}
                        valueLabelDisplay="auto"
                        style={{width:"90%", display:"flex", justifyContent:"center"}}
                    />
                    
                    <Typography><b>Condition</b></Typography>
                    </>
                    : _loading ? null : <Typography>No filters available</Typography>}
                    
                    
                {_loading ? <CircularProgress /> :
                products && products.refinement ?
                <>
                    <Autocomplete
                    multiple
                    limitTags={2}
                    options={products.refinement.conditionDistributions}
                    disableCloseOnSelect
                    onChange={(e, newValue) => {
                        props.setFieldValue('aspect_filter.conditionDistributions', newValue);
                    }}
                    getOptionLabel={(option) => option.condition}
                    renderOption={(option, { selected }) => (
                        <>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 2 }}
                            checked={selected}
                        />
                        {option.condition} ({option.matchCount})
                        </>
                    )}
                    style={{ width: "90%" }}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" placeholder="Include conditions" />
                    )}
                    />
                    
                    { products.refinement.aspectDistributions ? products.refinement.aspectDistributions.map((item, key) => {
                            
                        return(
                            <div key={key}>
                                <b>{item.localizedAspectName}</b>
                                <Autocomplete 
                                options={item.aspectValueDistributions}  
                                multiple
                                limitTags={2} 
                                onChange={ (e, newValue) => {
                                    props.setFieldValue(`aspect_filter.${item.localizedAspectName}`, newValue);
                                    }}
                                getOptionLabel={(option) => option.localizedAspectValue} renderOption={(option, { selected }) => (
                                
                                <>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 2 }}
                                        checked={selected}
                                    />
                                    {option.localizedAspectValue} ({option.matchCount})
                                </>
                                    )}
                                    style={{ width: "90%" }}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" placeholder={item.localizedAspectName} />
                                    )} />
                            </div>
                        )}) : null}
                        
                        <Button type="submit">Search</Button>
                        </> : null
                        }
                    </form>
                    )}
                    </Formik>
                </Card> 
                        
            )
         }

const CategoryFilter = ({mobile, viewerOpen, closeViewer, query, products, category, subcategory_name}) => {
    return(
        mobile ?
        <Backdrop open={viewerOpen} style={{height: "100%",overflow:'auto',opacity: 1, zIndex: 100, backgroundColor:"rgba(0, 0, 0, 0.6)"}}>
            <IconButton style={{position:"absolute", top:50, right:-5, color:"white"}} onClick={closeViewer}>
                    <Close style={{fontSize:"30px"}}/>
            </IconButton>

            <CategoryFilterForm mobile={true} query={query} products={products} category={category} subcategory_name={subcategory_name}/>   
        </Backdrop> 
        :
        <CategoryFilterForm products={products} category={category} subcategory_name={subcategory_name}/>   
    )
}

export const CategoryView = ({category_name, subcategory_name, category}) => {

    const desktop = useMediaQuery('(min-width:800px)');  
    const params = useParams();
    const history = useHistory();
    const pagination = new URLSearchParams(window.location.search);
    const location = useLocation();
    
    const [products, setProducts] = useState();
    
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading.loadingState)

    if(!location.state){
        location.state = {query: params.query}
    }
    
    const [viewerOpen, openViewer] = useState(false);

    const handleViewerClose = () => {
        openViewer(false);
    }

    useEffect(() => {
        dispatch(setLoading(true));
        
        let _category = category;
        if(subcategory_name){
            Post(`/categories/${category_name}?subcategory_name=${subcategory_name}&limit=39&page=${pagination.get('page') ? pagination.get('page') : 1}&${location.state.aspect_filter ? location.state.aspect_filter : ''}&${location.state.filter ? location.state.filter : ''}`, _category).then(
                result => {
                    setProducts(result);
                }
            ).then(() => {
                dispatch(setLoading(false));
            })
        }
        else{
            Post(`/categories/${category_name}?limit=39&page=${pagination.get('page') ? pagination.get('page') : 1}&aspect_filter=${location.state.aspect_filter ? location.state.aspect_filter : ''}&filter=${location.state.filter ? location.state.filter : ''}`, _category).then(
                result => {
                    setProducts(result);
                }
            ).then(() => {
                dispatch(setLoading(false));
            })
        }
        
    }, [pagination.get('page') || location])
    
    return(

        <Template component={        
            loading ?
            <Loading />
        :

        products ?
        desktop ? 
        <div style={{marginTop:"20px"}}>
            {subcategory_name ? 
            <>
                <Breadcrumbs separator=">" style={{marginLeft:"20px"}}>
                    <Link to='/'>Home</Link>
                    <Link to={`/categories/${category_name}`}>{category.title}</Link>
                    <Typography>{ category['subcategories'][subcategory_name].name}</Typography>
                </Breadcrumbs>
            </>
            : null
            }
            <Typography variant='h3' style={{marginLeft:"20px"}}>{subcategory_name ? category['subcategories'][subcategory_name].name : category.title}</Typography>
            
            <Grid container direction="row" justifyContent="space-around" >
                <Grid item position="relative" xs={2}>
                    <CategoryFilter products={products} mobile={false} xs={2} category={category} subcategory_name={subcategory_name}/>
                </Grid>
                <Grid item xs={7} display="block">
                    <ProductArray products={products} />
                    <div style={{display:"flex", marginTop:"100px", justifyContent:"center"}}>
                        {products.total > 39 ?
                        <Pagination
                        count={Math.round(products.total/39)}
                        defaultPage={pagination.get('page') ? pagination.get('page') : 1}
                        variant="outlined" color="primary"
                        siblingCount={2}
                        showFirstButton={true}
                        showLastButton={true}
                        renderItem={(item) => (
                            <PaginationItem {...item}
                                component={Link}
                                //to={`/search/${params.query}?page=${item.page}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push({pathname: location.pathname, search: `?page=${item.page}`, state : location.state})
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
                {viewerOpen ? <CategoryFilter products={products} mobile={true} viewerOpen={viewerOpen} closeViewer={handleViewerClose} category={category} subcategory_name={subcategory_name} /> : null}
                <h1 style={{marginLeft:"5px", maxWidth:"75%"}}>{subcategory_name ? category['subcategories'][subcategory_name].name : category.title}</h1>
                <Grid container direction="row" justifyContent="center">
                    <Grid item style={{position:'absolute', top:60, right:0}}>
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
                        <ProductArray products={products} />
                            {products.total > 39 ?
                            <div style={{display:"flex", justifyContent:"center"}}>
                            
                                <Pagination
                                    count={20} // needs fixed
                                    //defaultPage={pagination.get('page') ? pagination.get('page') : 1}
                                    variant="outlined"
                                    color="primary"
                                    
                                    renderItem={(item) => (
                                        <PaginationItem {...item}
                                            component={Link}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                history.push({pathname: location.pathname, search: `?page=${item.page}`, state : location.state})
                                            }}
    
                                        /> 
                                     
                                )} 
                                siblingCount={2} 
                                />
                            
                            </div>
                            
                             : null}

                    </Grid>
                </Grid>
            </div>
        
        : <Loading />
        } />
    )
}