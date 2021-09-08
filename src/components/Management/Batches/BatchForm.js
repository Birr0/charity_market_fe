import {useState, useEffect} from "react";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";

import {Post, Put, Delete, Get} from "../../../api/fetchWrapper";
import {handleBarcodeRequest} from "../Applications/BarcodeGenerator";
//import {getBatchNumber} from "./inventory/Batches/getBatchNumber"
import SuccessAlert from "../Alerts/SuccessAlert";
import ErrorAlert from "../Alerts/ErrorAlert";

import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import Skeleton from '@material-ui/lab/Skeleton';

import {batchSchema} from "./batchSchema";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const BatchForm = ({productData, update, loading}) => {
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  const [sku, setSKU] = useState();
  
  
  const formik = useFormik({ 
    initialValues: { 
      batch_identifier: '',
      nickname: '',
      description: '',
      location: 'Store #1',
    },

    validationSchema:  batchSchema, //take initialValues from backend ... productSchema from schema/product.py

    onSubmit: values => {
      return
    }
      
  });
    
      const [{ alt, src, file }, setImg] = useState({
        src: formik.values.image_url,
        alt: "Upload an Image",
        file: "",
      });

      const handleImg = (e) => {
        if (e.target.files[0]) {
          let tempURL = URL.createObjectURL(e.target.files[0]);
          
          setImg({
            src: tempURL,
            alt: e.target.files[0].name,
            file: e.target.files[0]
            
          });
          
        }
      };
      
      const setEdit = (e) => {
          e.preventDefault();
          setDisabled(!disabled);
      }

      

      return(
        <>
        
        <Card style={{ maxWidth:"1000px",marginLeft:'auto',marginRight:'auto'}} >
        
        {success ? <SuccessAlert message={message} /> : ""}
        {error ? <ErrorAlert message={message} /> : ""}
        
        <form onSubmit={formik.handleSubmit}>
        
        {update ? <Button type="button"><DeleteIcon color='primary' /></Button> : null}
        
        <Tooltip title="Edit">
          <Button type="button" id="disabled" name="disabled" onClick={(e) => setEdit(e)} style={{border:"none", backgroundColor:"none"}}><EditIcon color="primary" /></Button>
        </Tooltip>
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            >
            
            <Grid item>
            <label>Batch identifier: </label>
          
          
          <br></br>
          {!loading ?
          <Input
            id="batch_identifier"

            name="batch_identifier"

            type="text"

            onChange={formik.handleChange}

            value={formik.values.batch_identifier}
            
            disabled={disabled}  

          />
          : <Skeleton variant="text" />}
          {formik.errors.title ? <div style={{fontColor:"red"}}>*{formik.errors.batch_identifer}</div> : null}
            
            <br></br>
            
            <InputLabel>Nickname: </InputLabel>
          
          <br></br>
          {!loading ?
          <Input
            id="nickname"

            name="nickname"

            type="text"

            onChange={formik.handleChange}

            value={formik.values.nickname}
            
            disabled={disabled}  

          />
          : <Skeleton variant="text" />}
          {formik.errors.title ? <div style={{fontColor:"red"}}>*{formik.errors.title}</div> : null}
        <br></br>
        
      <br></br>
      
    <br></br>
    <br></br>
    <label>Description: </label>
    <br></br>
          <textarea

          id="description"

          name="description"

          type="text"

          onChange={formik.handleChange}

          value={formik.values.description}
          
          disabled={disabled}

          style={{fontFamily:'', width:"40ch"}}
          
          />
          {formik.errors.description ? <div style={{fontColor:"red"}}>*{formik.errors.description}</div> : null}
        <br></br>
        <br></br>
          Add dropdown for locations ...
          <Select
          id="location"
          name="location"
          value={formik.values.location}
          style={{width:"200px"}}
          onChange={formik.handleChange}
          //input={<BootstrapInput />}
          >
          <MenuItem value={'Store #1'}>Store 1</MenuItem>
          <MenuItem value={'Store #2'}>Store 2</MenuItem>
          <MenuItem value={'Store #3'}>Store 3</MenuItem>
        </Select>
        <br></br>
       
          {update ? <><button type="submit" disabled={disabled}>Update</button><button onClick={(e) => {
            e.preventDefault();
            handleBarcodeRequest(formik.values.sku, formik.values.price);
            }}>Get Barcode</button></> :<button type="submit" disabled={disabled}>Upload</button>}
              
              
            </Grid>
            <Grid item>
            <InputLabel>Add product file</InputLabel>
              <input
              type="file"
              accept=".csv, .xlsx"
              multiple
              />
            </Grid>
          </Grid>
      </form>
      </Card>
        </>
      )
}