import {useEffect, useState} from "react"
import {Get, Post} from "../../../../api/fetchWrapper";
import {Loading} from "../../../Loading/Loading"
import {Batch} from "./Batch"
import SuccessAlert from "../../Alerts/SuccessAlert";
import {handleBarcodeRequest} from "../../Applications/BarcodeGenerator";
import { TextField } from "@material-ui/core";
import {Formik, Form} from "formik";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";

const BatchSearch = ({batches}) => {
    console.log(batches);
    return(
        <Formik
        initialValues={{batchNumber: '',products: ''}}
        onSubmit={(values, actions) => {
            return
            
        }}
        >
        
        {({ handleSubmit, handleChange, values, setFieldValue }) => (
        <>
        <Form onSubmit={handleSubmit}>

            <Autocomplete
                //freeSolo
                id="batch"
                name="batch"
                //value={}
                onChange={(event, value) => {
                    
                    setFieldValue('batch', value)
                }}
                //onChange={(event, value) => console.log(value)}
                
                options={Object.keys(batches).map((batchNumber) => {
                    return(
                        //typeof(parseInt(batchNumber)) === Number ? batches[batchNumber] : null
                        {'batchNumber': batchNumber, 'products': batches[batchNumber]}
                    )
                })}
                getOptionLabel={(option) => option.batchNumber } //option['Product Name *'] + ` - ${option['Product Code/SKU *']}` } 
                    
                renderInput={(params) => (
                <>
                <TextField
                    
                    {...params}
                    label="Search Batches"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    id="batchNumber"
                    name="batchNumber"
                    onChange={handleChange}
                />
                </>
                )}
            />
        
        {values.batch ? <Batch batchData={values.batch.products} providedBatchNumber={values.batch.batchNumber}/> : null}
        </Form>
            
            
        </>
        )}
    </Formik>
    )
}


export const Batches = () => {

    const [batches, setBatches] = useState();
    const [batchNumber, setBatchNumber] = useState();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Get('/inventory/batches').then(response => {
            setBatches(response.batches);
            setLoading(false);
            
        });
    }, [])

    const addBatch = () => {
        Post("/inventory/batches").then(response => {
            if(response.status_code === 200){
                setBatchNumber(response.batch_number);
                setSuccess(true);
            }
        })
        
    }

    return(
        <>
        {loading ? <Loading /> :
        <div>
            <BatchSearch batches={batches ?  batches : ''} />
            
            {success ? <><SuccessAlert message={`Batch ${batchNumber} added to inventory`} /><button onClick={() => handleBarcodeRequest(batchNumber)}>Get Barcode</button></> : null}
            <button onClick={() => addBatch()}>Add New Batch</button>
            <br></br>
             
      
      
     
        
        </div>
        }
        </>
    )
}