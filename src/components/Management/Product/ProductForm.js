import {useState, useEffect} from "react";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";

import {Post, Put, Delete, Get} from "../../../api/fetchWrapper";
import {handleBarcodeRequest} from "../Applications/BarcodeGenerator";
//import {getBatchNumber} from "./inventory/Batches/getBatchNumber"
import SuccessAlert from "../Alerts/SuccessAlert";
import ErrorAlert from "../Alerts/ErrorAlert";
import {productSchema} from "./productSchema";
import {Sluicebox} from "./Sluicebox/Sluicebox.js"


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

export const ProductForm = ({productData, update, loading}) => {
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  const [sku, setSKU] = useState();
  
  
  const formik = useFormik({ 
    initialValues: { 
      //take initialValues from backend ... productSchema from schema/product.py
      sku: productData ? productData['Product Code/SKU *'] : '',
      title: productData ? productData['Product Name *'] : '',
      price: productData ? productData['Selling Price *'] : '',
      description: productData ? productData['Product Description'] : 'test',
      category: productData ? productData['Category *']: '',
      image_url: productData ? productData['Image URL'] : '',        
      batch_number: 0,//productData ? getBatchNumber(productData['Product Code/SKU *']) : 0,
      quantity: productData ? parseInt(productData['Current Stock Level']) : 1,
      barcode: productData ? productData['Barcode'] : '',
    },

    validationSchema:  productSchema, //take initialValues from backend ... productSchema from schema/product.py

    onSubmit: values => {

      !update ? Post("/inventory/products", JSON.stringify(values)).then(response => {
        if(response.status_code === 200){
          setSKU(response.sku);
          if(file){
          
            var data = new FormData()
            data.append('file', file)
            
            Post(`/images/product-images/${response.sku}`, data).then(response => {
              values.image_url = response.image_url;
              console.log(response, values);
              
              console.log(response, values);
              Put(`/inventory/products/${response.sku}`, JSON.stringify(values)).then(response => {
                setSuccess(true);
                setMessage(update ? `${formik.values.title} : ${formik.values.sku} - Updated in inventory` : `${formik.values.title} : ${sku} - uploaded to inventory`);
              })
            })
          }
          else{
            setSuccess(true);
            setMessage(update ? `${formik.values.title} : ${formik.values.sku} - Updated in inventory` : `${formik.values.title} : ${sku} - uploaded to inventory`);
          }

        }
        else{
          setError(true);
        }
      }) : Put(`/inventory/products/${formik.values.sku}`, JSON.stringify(values)).then(response => {
            if(response.status_code === 204){
              
              if(file){
              
                var data = new FormData()
                data.append('file', file)
                
                Post(`/images/product-images/${response.sku}`, data).then(response => {
                  values.image_url = response.image_url;
           
                  Put(`/inventory/products/${response.sku}`, JSON.stringify(values)).then(response => {
                    setSuccess(true);
                    setMessage(update ? `${formik.values.title} : ${formik.values.sku} - Updated in inventory` : `${formik.values.title} : ${sku} - uploaded to inventory`);
                  })
                })
              }
            
            else{
              setSuccess(true);
              setMessage(update ? `${formik.values.title} : ${formik.values.sku} - Updated in inventory` : `${formik.values.title} : ${sku} - uploaded to inventory`);
            }
            
          }
          else{
            setError(true);
            setMessage(update ? `${formik.values.title} : ${formik.values.sku} - error in updating inventory` : `${formik.values.title} : ${sku} - error in uploading to inventory`);
          }

      })
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

      const handleProductDelete = () => {
        Delete(`/inventory/products/${formik.values.sku}`);
      }

      return(
        <>
        
        <Card style={{ maxWidth:"1000px",marginLeft:'auto',marginRight:'auto'}} >
        
        {success ? <SuccessAlert message={message} /> : ""}
        {error ? <ErrorAlert message={message} /> : ""}
        {!update ? <Sluicebox /> : null}
        <form onSubmit={formik.handleSubmit}>
        
        {update ? <Button type="button" onClick={handleProductDelete}><DeleteIcon color='primary' /></Button> : null}
        
        <input accept="image/*" type="file" id="image_url" name="image_url" onChange={handleImg} hidden/>
              <label htmlFor="image_url">
                <Tooltip title="Add Photo">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera  />
                  </IconButton>
                </Tooltip>
              </label>

        <Tooltip title="Edit">
          <Button type="button" id="disabled" name="disabled" onClick={(e) => setEdit(e)} style={{border:"none", backgroundColor:"none"}}><EditIcon color="primary" /></Button>
        </Tooltip>
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            >
            <Grid item style={{marginLeft:"10px"}}>
              {src ? 
              <div style={{marginLeft:"auto", marginRight:"auto"}}>
                <img src={src} style={{maxWidth:'250px'}}/>
              </div>
              : <Skeleton variant="rect" width={200} height={300} />
              }

            </Grid>
            <Grid item style={{paddingLeft:"5px"}}>
            <br></br>

            <p>** Iterate over productSchema to get form ...</p>
            <label>Title: </label>
          
          
          <br></br>
          {!loading ?
          <Input
            id="title"

            name="title"

            type="text"

            onChange={formik.handleChange}

            value={formik.values.title}
            
            disabled={disabled}  

          />
          : <Skeleton variant="text" />}
          {formik.errors.title ? <div style={{fontColor:"red"}}>*{formik.errors.title}</div> : null}
        <br></br>
        
      <br></br>
      <label>Price: //format price with preferred currency</label>
      <br></br>
          <Input

          id="price"

          name="price"

          type="text"

          onChange={formik.handleChange}

          value={formik.values.price}

          disabled={disabled}
          />
          {formik.errors.price ? <div style={{fontColor:"red"}}>*{formik.errors.price}</div> : null}
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
        <label>Category: //needs to be bubble select</label>
        <br></br>
        <Input

        id="category"

        name="category"

        type="text"

        onChange={formik.handleChange}

        value={formik.values.category}

        disabled={disabled}
        />
        <br></br>
        <br></br>
          {!update ? 
          <>
          <label>Batch Number: </label>
          <br></br>
          <Input 
          id="batch_number"

          name="batch_number"

          type="text"

          onChange={formik.handleChange}

          value={formik.values.batch_number}

          disabled={disabled}
          />
          {formik.errors.batch_number ? <div style={{fontColor:"red"}}>*{formik.errors.batch_number}</div> : null}
          </>
        : ''}
      <br></br>
        {formik.errors.category ? <div style={{fontColor:"red"}}>*{formik.errors.category}</div> : null}
            <br></br>
            <br></br>
          {update ? <><button type="submit" disabled={disabled}>Update</button><button onClick={(e) => {
            e.preventDefault();
            handleBarcodeRequest(formik.values.sku, formik.values.price);
            }}>Get Barcode</button></> :<button type="submit" disabled={disabled}>Upload</button>}
            
            </Grid>
          </Grid>
      </form>
      </Card>
        </>
      )
}