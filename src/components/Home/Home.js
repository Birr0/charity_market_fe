import {Template} from "../Template/Template";
import {ProductView} from "../Product/ProductView";
//import {ProductArray} from "../Product/ProductArray";
//import {CategoryView} from "../Category/CategoryView";
//import {CategoryArray} from "../Category/CategoryArray";

export const Home = () => {
    return(
        <>
            <Template component={
                <div style={{marginTop:'20px'}}>
                    <ProductView productData={{sku:'123', title:'Beleek Vase', price: 10, quantity: 1, availableQuantity: 1,
                        shortDescription:'New Item. Lorem iPsmu ad infintum', 
                        detailedDescription: 'This is an even longer description of the product. Lots of things to say? Say them here', 
                        attributes: {'dimensions': 
                         {'width': 30, 'height': 30, 'length': 30, 'unit': 'cm'}, 
                            'weight': {'magnitude': 30, 'unit': 'g'}}, 
                            'details': [{'userDetail1': 'Detail1'}, {'userDetail2': 'Detail2'}]}} 
                    />
                    <ProductView productData={{sku:'124', title:'Other Beleek Vase', price: 10, quantity: 1, availableQuantity: 1,
                        shortDescription:'New Item. Lorem iPsmu ad infintum', 
                        detailedDescription: 'This is an even longer description of the product. Lots of things to say? Say them here', 
                        attributes: {'dimensions': 
                         {'width': 30, 'height': 30, 'length': 30, 'unit': 'cm'}, 
                            'weight': {'magnitude': 30, 'unit': 'g'}}, 
                            'details': [{'userDetail1': 'Detail1'}, {'userDetail2': 'Detail2'}]}} 
                    />
                </div>
            } />
        </>
    );
}