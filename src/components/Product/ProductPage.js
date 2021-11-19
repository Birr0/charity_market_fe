import React , {useEffect, useState} from "react";
import {Template} from "../Template/Template";
import {ProductView} from "../Product/ProductView";
import { Get } from "../../api/fetchWrapper";
import { Loading } from "../Loading/Loading";
import { IconButton, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useParams } from "react-router";
import { RecommendedProducts } from "./RecommendedProducts";
export const ProductPage = () => {
    const params = useParams();
    const [product, setProduct] = useState();
    const [charity, setCharity] = useState({});


    useEffect(() => {
        Get(`/product/${params.itemId}`).then(
            result => {
                setProduct(result.product);
                setCharity(result.charity);
            }
        )
    }, []);

    return(
        <Template component={
            product ? 
                <div style={{marginTop:"10px"}}>
                    <IconButton onClick={() => window.history.back()}>
                        <ArrowBack />
                    </IconButton>
                    
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <ProductView productData={{sku: product.title , images: product.images, title:product.title, price: product.price, 
                            currency:product.currency,quantity: 1, availableQuantity: 1, condition: product.condition,
                                description: product.description, charityTitle: charity.charity_title, 
                                charityMission : charity.charity_mission, shipping: product.shipping, itemWebUrl: product.itemWebUrl,
                                attributes: {'dimensions': 
                                {'width': 30, 'height': 30, 'length': 30, 'unit': 'cm'}, 
                                    'weight': {'magnitude': 30, 'unit': 'g'}}, 
                                    'details': [{'userDetail1': 'Detail1'}, {'userDetail2': 'Detail2'}]}} 
                        />
                        
                    </div>
                    <Typography variant="h5">Products you may like</Typography>
                    
                    <RecommendedProducts/>
                </div>
         : <Loading />
        }
         />
    )
}