import {useEffect, useState} from "react";
import {Get} from "../../../api/fetchWrapper";
import {Loading} from "../../Loading/Loading.js"
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Formik, Form } from 'formik';
import {ProductView} from "../../Product/ProductView.js";
import {Sluicebox} from "./Sluicebox/Sluicebox.js";
import { ProductForm } from "./ProductForm";

const ProductSearch = ({products}) => {
    console.log(products);
    return (
        
        <Formik
            initialValues={{product: ''}}
            onSubmit={(values, actions) => {
                alert(JSON.stringify(values));
                
                if(values.product){
                    //setProduct(values.product);
                    console.log(values.product);
                    return values.product; 
                }
            }}
            >
            
            {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <>
            <Form onSubmit={handleSubmit}>
    
                <Autocomplete //have autocomplete only show when somethin is typed
                    //freeSolo

                    id="product"
                    name="product"
                    //value={}
                    onChange={(event, value) => setFieldValue('product', value)}
                    //onChange={(event, value) => console.log(value)}
                    
                    options={products}
                    getOptionLabel={(option) => JSON.stringify(option) } 
                        
                    renderInput={(params) => (
                    <>
                    <TextField
                        
                        {...params}
                        label="Search Products"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        
                    />
                    </>
                    )}
                />
            
            {values.product ? <ProductForm update={true} productData={values.product} /> : null}
            </Form>
                
                
            </>
            )}
        </Formik>
        
    
      );
   
    };


export const SearchProducts = () => {
    
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    
    useEffect(() => {
        Get('/products/stored-products').then(response => {
            
            setProducts(response);
            setLoading(false);
        })
    }, [])


    return(
        <>
        {loading ? <Loading /> :
        <>
            {products ? <ProductSearch products={products} /> : null}
           
        </>
        }
        </>
    )
}