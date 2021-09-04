import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {Get, Delete} from "../../../../api/fetchWrapper";
import {apiURL} from "../../../../api/apiURL";
import {handleBarcodeRequest} from "../../Applications/BarcodeGenerator"
import {Loading} from "../../../Loading/Loading"

import SpreadsheetGenerator from "../../Applications/SpreadsheetGenerator"
//import {getBatchNumber} from "./getBatchNumber"
import SuccessAlert from "../../Alerts/SuccessAlert";
import ErrorAlert from "../../Alerts/ErrorAlert"

export const Batch = ({providedBatchNumber, batchData}) => {
    let {batchNumber} = useParams();
    
    if(providedBatchNumber){
        batchNumber = providedBatchNumber;
    }

    const [batch, setBatch] = useState();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setLoading(true);

        if (!batchData){
            
            Get(`/inventory/batches/${batchNumber}`).then(response => {
                setBatch(response.batch);
                setLoading(false);
            })
        }
        //else{
        //    
        //    batchNumber = getBatchNumber(batchData['Product Code/SKU *'])
        //    setBatch(batchData);
        //    setLoading(false);
        //}
        
    
    },[batchData])

    const handleCSVRequest = (e) => {
        e.preventDefault();
        if(!batch){
            return(
                alert('No Data in Batch')
            )
        }
        let skuList = batch.map((product) => {
            return(
                Object.keys(product)[0]
            )
        });
       
        let url = new URL(apiURL + "/inventory/products");
        let params = new URLSearchParams(url.search.slice(1));
        
        skuList.map((sku) => {
            return(
                params.append('sku_list', sku)
            )
        })
        
        Get("/inventory/products?" + params.toString())
            .then((response) => {
                console.log(response);
                SpreadsheetGenerator(`batch${batchNumber}`,Object.keys(response.products).map((key) => {
                    return(
                    response.products[key]
                    )
                }), 'csv')
            })
    }
    
    const deleteBatch = () => {
        setLoading(true);
        Delete(`/inventory/batches/${batchNumber}`).then(response => {
            if(response.status === 200){
                console.log(response);
              
                let deleteParams = new URLSearchParams(); 
                batch.map(product => {
                    let sku = Object.keys(product)[0];
                    
                    deleteParams.append('sku_list', sku)
                });
                Delete('/inventory/products?' + deleteParams.toString()).then(
                    response => {
                        console.log(response)
                        if (response.status === 200){
                            setBatch([]);
                            setSuccess(true);
                            setLoading(false);
                        }
                        else{
                            setError(true);
                            setLoading(false);
                        }
                        
                    }
                );
            }
            else{
                setError(true);
                setLoading(false);
            }
        

        })
    }

    return(
        <>
            {loading ? <Loading /> : 
                <>
                    <div>
                    {success ? <SuccessAlert message={`Deleted Batch ${batchNumber}`} /> : null}
                    {error ? <ErrorAlert message={`Could not delete Batch ${batchNumber}`} /> : null}

                    <h1>Batch: {batchNumber}</h1>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleBarcodeRequest(batchNumber);
                        }}>Get barcode</button>
                        <button onClick={(e) => {handleCSVRequest(e)}}>Export CSV</button>
                        <button onClick={(e) => {handleCSVRequest(e)}}>Export Spreadsheet</button>
                        
                        <button onClick={deleteBatch}>Delete Batch</button>
                        {batch ? batch.map((product) => {
                            if (!Object.entries(product)[0]){
                                return
                            }
                            
                            const sku = Object.keys(product)
                            const {title, barcode} = Object.entries(product)[0][1];
                            return(
                                <div key={sku}>
                                    <Link to={`/inventory/products/${sku}`} >{Object.keys(product)} , {title} , {barcode}</Link>
                                </div>
                                )
                        })
                      : ""}
                    </div>
                </>
            }
            
        </>
    )
}