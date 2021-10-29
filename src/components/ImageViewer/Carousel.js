import Carousel from "react-material-ui-carousel";

export const CarouselViewer = ({items, interval}) => {

    return(
        <Carousel interval={5000} style={{width:"100%"}}>
            {items.map((item, i) => <img src={item} key={i} style={{marginLeft:'auto', marginRight:'auto', maxWidth:"100%"}} />)}
        </Carousel>
        );
}