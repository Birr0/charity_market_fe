import { Backdrop, Card, Button, Slider, Typography, IconButton} from "@material-ui/core";
import React from "react";
import {Close } from '@material-ui/icons';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { setLoading } from "../../storage/loadingSlice";
import { useHistory } from "react-router";

const FilterForm = ({mobile, query}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <Card style={{marginBottom:"10px", width:(mobile ? "250px" : "100%"), padding:"10px" }}>
            <Typography variant='h5'><b>Filter</b></Typography>
            <hr></hr>
            <Formik
              initialValues={{
                min_price: 0,
                max_price: 1000,
                currency: 'GBP',
                conditions: [],
                specified_sellers: [],
                returns_accepted: null,
                search_in_description: null,
              }}

              onSubmit={(values) => {
                console.log(values);
                history.push({pathname: `/search/${query}`, state: {query: query, filter: values } }) // does not work with Firefox ...
                dispatch(setLoading(true));
              }
                
              }
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                <Typography><b>Price</b></Typography>
                
                <Slider
                    getAriaLabel={() => 'Price range'}
                    min={0}
                    step={1}
                    max={1000}
                    marks={[{value: 0, label: '£ 0'}, {value: 1000, label: '£ 1,000'}]}
                    value={[props.values.min_price, props.values.max_price]}
                    onChange={(e, newValue) => {
                      props.setFieldValue('min_price', newValue[0]);
                      props.setFieldValue('max_price', newValue[1]);
                    }}
                    valueLabelDisplay="auto"
                    style={{width:"90%", display:"flex", justifyContent:"center"}}
                />
           
                <Button type="submit">Search</Button>
              </form>
              )}
            </Formik>
        </Card>
    )
}

export const SearchFilter = ({mobile, viewerOpen, closeViewer, query}) => {
    return(
        mobile ?
        <Backdrop open={viewerOpen} style={{height: "100%",opacity: 1, zIndex: 100, backgroundColor:"rgba(0, 0, 0, 0.6)"}}>
            <IconButton style={{position:"absolute", top:50, right:"10%", color:"white"}} onClick={closeViewer}>
                    <Close style={{fontSize:"30px"}}/>
            </IconButton>

            <FilterForm mobile={true} query={query}/>   
        </Backdrop> 
        :
        <FilterForm />   
    )
}
