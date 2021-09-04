import {ManagementTemplate} from "../ManagementTemplate/ManagementTemplate";
import {AddProduct} from "./AddProduct";
import {Batches} from "./Batches/Batches.js";
//import { useSelector, useDispatch } from "react-redux";
import {useState} from "react";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import {useStyles} from "../../Styles/Styles.js";

export const ManageProducts = () => {
    const [addProduct, openAddProduct] = useState(false);
    const [batchOpen, setBatchOpen] = useState(false);

    const classes = useStyles();
    //const dispatch = useDispatch();
    //const cart = useSelector(state => state.basket.cart);

    return(
        <ManagementTemplate component={
            <div>
                <h2>Location: ...(dropdown if permissions)</h2>
                <p>
                    Manage products
                </p>
                <li>Single add</li>
                <IconButton onClick={
                    (e) => {
                        e.preventDefault();
                        console.log(!addProduct);
                        openAddProduct(!addProduct);
                    }
                }>
                    <AddCircleOutlineIcon />
                </IconButton>
                {addProduct ? <AddProduct /> : null}   
                <li>Bulk upload by spreadsheet</li>
                <h2>Location: ... (dropdown if permissions)</h2>
                <p>
                    Manage batches
                </p>
                <li>Search batches</li>
                <IconButton>
                    <ViewComfyIcon onClick={(e) => {
                        e.preventDefault();
                        setBatchOpen(!batchOpen);
                    }} />
                </IconButton>
                {batchOpen ?
                   <Batches />
                : null}
                <p>
                    Manage categories
                </p>
                <li>Search categories</li>
                <li>Create category</li>
                <li>Update category</li>
                <li>Delete category</li>
            </div> 
            
        }
        />
    );
}