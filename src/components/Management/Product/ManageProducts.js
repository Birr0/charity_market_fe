import {ManagementTemplate} from "../ManagementTemplate/ManagementTemplate";
import {ProductForm} from "./ProductForm";
import {Batches} from "../Batches/Batches.js";
import {SearchProducts} from "./SearchProducts";
//import { useSelector, useDispatch } from "react-redux";
import {useState} from "react";
import { IconButton, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {useStyles} from "../../Styles/Styles.js";

export const ManageProducts = () => {
    const [addProduct, openAddProduct] = useState(false);
    const [batchOpen, setBatchOpen] = useState(false);

    const classes = useStyles();
   
    return(
        <ManagementTemplate component={
            <div>
                <Typography variant="h3">Products</Typography>
                <div style={{maxWidth:"600px"}}>                   
                    <Typography variant="h5">Search products</Typography>
                    
                    <SearchProducts />
                </div>
                <Typography variant="h5">Add product 

                    <IconButton onClick={
                        (e) => {
                            e.preventDefault();
                            console.log(!addProduct);
                            openAddProduct(!addProduct);
                        }
                    }>
                        <AddCircleOutlineIcon />
                    </IconButton>
                
                </Typography>

                
                {addProduct ? <ProductForm update={false} /> : null}   
                
                <Typography variant="h5">Add product by spreadsheet <input type="file" accept=".csv, .xlsx" multiple /></Typography>

                
               
            </div> 
            
        }
        />
    );
}