import { Backdrop, Card, Button, Slider, Typography,
        IconButton, Checkbox, FormControlLabel, FormGroup,
        TextField, Switch
    } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {Close } from '@material-ui/icons';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { setLoading } from "../../storage/loadingSlice";
import { useHistory } from "react-router";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const conditions = [
    {name: 'New', value: 1000}, 
    {name: 'Like New', value: 2750},
    {name: 'Used-Good', value: 5000},
    {name: 'Used- Very Good', value: 4000},
    {name: 'Used-Good', value: 5000},
    {name:'Used-Acceptable', value: 6000},
    {name: 'Refurbished by seller', value: 2500}
  ];

  
const charities = [
  { title: 'british_heart_foundation', charity_id: 17719 },
  { title: 'RNLI', charity_id: 16159 },
  { title: 'British Red Cross', charity_id: 19790 },
  {title: 'SVP - England & Wales', charity_id: 97905 },
];

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
                
                <Typography><b>Condition</b></Typography>
                
                <Autocomplete
                  multiple
                  limitTags={2}
                  options={conditions}
                  disableCloseOnSelect
                  onChange={(e, newValue) => {
                    props.setFieldValue('conditions', newValue.map((condition) => condition.value));
                  }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(option, { selected }) => (
                    <>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 2 }}
                        checked={selected}
                      />
                      {option.name}
                    </>
                  )}
                  style={{ width: "90%" }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Include conditions" />
                  )}
                />
                <Typography><b>Charity sellers</b></Typography>
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="checkboxes-tags-demo"
                  options={charities}
                  disableCloseOnSelect
                  onChange={(e, newValue) => {
                    console.log(newValue.map((seller) => seller.title));
                    var charity_titles = [];
                    newValue.map((seller) => charity_titles.push(seller.title));
                    props.setFieldValue('specified_sellers', charity_titles);
                  }}
                  getOptionLabel={(option) => option.title}
                  renderOption={(option, { selected }) => (
                    <>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 2 }}
                        checked={selected}
                      />
                      {option.title}
                    </>
                  )}
                  style={{ width: "90%" }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Add charities to search" />
                  )}
                />
                
                <Typography><b>Returns accepted only</b></Typography>
                <FormControlLabel
                    control={
                    <Switch
                        checked = {props.values.returns_accepted}
                        onChange={(e, newValue) => {
                          props.setFieldValue('returns_accepted', newValue);
                        }}
                        
                        color="primary"
                    />
                    }
                    label={!props.values.returns_accepted ? 'All items displayed' : 'Returnable items only'}
                />
                
                <Typography><b>Include keyword in search</b></Typography>
                <FormControlLabel
                    control={
                    <Switch
                        checked={props.values.search_in_description}
                        onChange={(e, newValue) => {
                          props.setFieldValue('search_in_description', newValue);
                        }}
                        
                        color="primary"
                    />
                    }
                    label={!props.values.search_in_description ? 'Include suggested' : 'Matching keyword only'}
                />
                <p>Aspect filters</p>
                <p>Sort - new lisitings, distance</p>
                <p>eBay sellers - individual business</p>
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
