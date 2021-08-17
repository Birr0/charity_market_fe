import {Template} from "../Template/Template";
import {useParams} from "react-router-dom";
import {ProductView} from "../Product/ProductView";

export const ProductPage = () => {
    const {sku} = useParams();
    // add API call here

    //add Loading and ProductNotFound if sku not found in database
    return(
        <Template component={
            <>
                <h1>Product</h1>
                <p>{sku}</p>
                <ProductView productData={{sku:'123', title:'Beleek Vase', price: 10, quantity: 1, availableQuantity: 1,
                        shortDescription:'New Item. Lorem iPsmu ad infintum', 
                        detailedDescription: 'This is an even longer description of the product. Lots of things to say? Say them here', 
                        attributes: {'dimensions': 
                         {'width': 30, 'height': 30, 'length': 30, 'unit': 'cm'}, 
                            'weight': {'magnitude': 30, 'unit': 'g'}}, 
                            'details': [{'userDetail1': 'Detail1'}, {'userDetail2': 'Detail2'}]}} 
                />
            </>
        } />
    )
}