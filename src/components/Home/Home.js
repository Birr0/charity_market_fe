import {Template} from "../Template/Template";
import {ProductView} from "../Product/ProductView";
//import {ProductArray} from "../Product/ProductArray";
//import {CategoryView} from "../Category/CategoryView";
//import {CategoryArray} from "../Category/CategoryArray";
import {CarouselViewer} from "../ImageViewer/Carousel";
import {ProductArray} from "../Product/ProductArray";
export const Home = () => {
    return(
        <>
            <Template component={
                <div>
                    <CarouselViewer items={['https://www.antiquesandfinefurniture.com/images_stock/13448__L1.jpg', 'https://www.antiquesandfinefurniture.com/images_stock/13448__L1.jpg']} />
                    <h3>Recently added</h3>
                    <ProductArray products={[
                        {sku:'124', title:'Other Beleek Vase', price: 10, quantity: 1, availableQuantity: 1,
                        shortDescription:'New Item. Lorem iPsmu ad infintum', 
                        detailedDescription: 'This is an even longer description of the product. Lots of things to say? Say them here', 
                        attributes: {'dimensions': 
                         {'width': 30, 'height': 30, 'length': 30, 'unit': 'cm'}, 
                            'weight': {'magnitude': 30, 'unit': 'g'}}, 
                            'details': [{'userDetail1': 'Detail1'}, {'userDetail2': 'Detail2'}]},
                            {sku:'124', title:'Other Beleek Vase', price: 10, quantity: 1, availableQuantity: 1,
                        shortDescription:'New Item. Lorem iPsmu ad infintum', 
                        detailedDescription: 'This is an even longer description of the product. Lots of things to say? Say them here', 
                        attributes: {'dimensions': 
                         {'width': 30, 'height': 30, 'length': 30, 'unit': 'cm'}, 
                            'weight': {'magnitude': 30, 'unit': 'g'}}, 
                            'details': [{'userDetail1': 'Detail1'}, {'userDetail2': 'Detail2'}]},
                            {sku:'124', title:'Other Beleek Vase', price: 10, quantity: 1, availableQuantity: 1,
                        shortDescription:'New Item. Lorem iPsmu ad infintum', 
                        detailedDescription: 'This is an even longer description of the product. Lots of things to say? Say them here', 
                        attributes: {'dimensions': 
                         {'width': 30, 'height': 30, 'length': 30, 'unit': 'cm'}, 
                            'weight': {'magnitude': 30, 'unit': 'g'}}, 
                            'details': [{'userDetail1': 'Detail1'}, {'userDetail2': 'Detail2'}]}
                    ]} />
                    <h3>Collections</h3>
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