import {Template} from "../Template/Template";
import {ProductView} from "../Product/ProductView";
import {ProductArray} from "../Product/ProductArray";
import {CategoryView} from "../Category/CategoryView";
import {CategoryArray} from "../Category/CategoryArray";

export const Home = () => {
    return(
        <>
            <Template component={
                <div style={{marginTop:'20px'}}>
                    <ProductView productData={{title:'Beleek Vase', price:'£10', shortDescription:'New Item', detailedDescription: ''}} />
                </div>
            } />
        </>
    );
}