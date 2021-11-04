import {Template} from "../Template/Template";
import {CarouselViewer} from "../ImageViewer/Carousel";
import { RecommendedProducts } from "../Product/RecommendedProducts";
import { Typography } from "@material-ui/core";
import { FeaturedCharities } from "../Charity/FeaturedCharities";
import GoodCoverPhoto from "../GoodCoverPhoto.png";
import GreenCoverPhoto from "../GreenCoverPhoto.png";
import { Link } from "react-router-dom";

export const Home = () => {
    return(
        <>
            <Template component={
                <div>
                    <div style={{display:'flex', justifyContent:"center"}}>
                        <CarouselViewer items={[GoodCoverPhoto, GreenCoverPhoto]} />
                    </div>
                    
                    <Typography variant="h5" style={{margin:"10px"}}>Featured charity shops</Typography>
                    <Link to="/charities" style={{margin:"10px"}}>View more charities</Link>
                    <FeaturedCharities />
                    
                    <Typography variant="h5" style={{margin:"10px"}}>Products you may like</Typography>
                    <RecommendedProducts />
                </div>
            } />
        </>
    );
}