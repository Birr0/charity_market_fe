import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Search from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Formik} from 'formik';
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setBackdrop } from "../../../storage/widgetSlice"; 
import { setLoading } from "../../../storage/loadingSlice";
import { addSearch } from "../../../storage/userSlice";
import { Button, Typography } from "@material-ui/core";
 

export const SearchDialog = () => {
    
    let history = useHistory();
    const dispatch = useDispatch();
    const widgetController = useSelector(state => state.widget);
    const user = useSelector(state => state.user);

    const trendingSearches = [{'name': "Women's designer", 'value':"womens designer"},{'name':"Dr Martens", 'value': 'dr martens'},{'name': 'Antiques', 'value': 'antiques'}, {'name': 'Vintage', 'value':'vintage'}]

    return(
        <Backdrop open={widgetController.backdropState} style={{zIndex:'1', backgroundColor: "#e7e7e7", alignItems:"start"}}>
            <div style={{width:"100%", marginTop:"80px"}}>
                
                    <Formik 
                        initialValues = {{query: ''}}
                        onSubmit={(values, actions) => {  
                            dispatch(setBackdrop(false));
                            dispatch(addSearch({'search': values.query}));
                            history.push({pathname: `/search/${values.query}`, state: {query: values.query, filter: {}} }) // does not work with Firefox ...
                            dispatch(setLoading(true));
                            }}>
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <Grid container direction="row" justifyContent="center">
                                <Autocomplete
                                    style={{marginLeft:"10px", width:"75%"}}
                                    freeSolo
                                    name="query"
                                    onInputChange={(e) => props.setFieldValue('query', e.target.innerHTML)}
                                    options={user.searches.map((search) => Object.keys(search)[0])}
                                    renderInput={(params) => (
                                        
                                            <TextField {...params} name="query" onChange={(e) => props.setFieldValue('query',e.target.value)} margin="normal" variant="outlined" />
                                            
                                    
                                )}
                            />
                                <IconButton type="submit">
                                    <Search style={{fontSize:"40px"}} />
                                </IconButton>
                            </Grid>
                                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                                
                        </form>

                    )}
                    </Formik>
                <div style={{margin:"10px"}}>
                    <Typography variant="h5">Trending searches</Typography>
                    {trendingSearches.map((search, key) => {
                        return(
                            <Card key={key} style={{padding:"5px", width:"200px", margin:"5px"}}>
                                <Typography variant="h6" onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(setBackdrop(false));
                                    dispatch(addSearch({'search': search.name}));
                                    history.push({pathname: `/search/${search.value}`, state: {query: search.name, filter: {}} }) // does not work with Firefox ...
                                    dispatch(setLoading(true));
                                
                                }}>
                                    <b> 🔥 {search.name}</b>
                                </Typography>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </Backdrop>
    );
}




