import {Template} from "../Template/Template";
import {ProductView} from "../Product/ProductView";
//import {ProductArray} from "../Product/ProductArray";
//import {CategoryView} from "../Category/CategoryView";
//import {CategoryArray} from "../Category/CategoryArray";
import {CarouselViewer} from "../ImageViewer/Carousel";
import { RecommendedProducts } from "../Product/RecommendedProducts";
import { Typography } from "@material-ui/core";
import { FeaturedCharities } from "../Charity/FeaturedCharities";
export const Home = () => {
    return(
        <>
            <Template component={
                <div>
                    <div style={{display:'flex', justifyContent:"center"}}>
                        <CarouselViewer items={['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'https://www.antiquesandfinefurniture.com/images_stock/13448__L1.jpg']} />
                    </div>
                    
                    <Typography variant="h5">Featured charity shops</Typography>
                    <FeaturedCharities />
                    
                    <Typography variant="h5">Products you may like</Typography>
                    <RecommendedProducts />
                </div>
            } />
        </>
    );
}