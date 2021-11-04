import Carousel from "react-material-ui-carousel";

export const CarouselViewer = ({items, interval}) => {

    return(
        <Carousel interval={10000} style={{width:"100%", height:"300px"}}>
            {items.map((item, i) => <img src={item} key={i} style={{marginLeft:'auto', marginRight:'auto', maxWidth:"100%"}} alt='' />)}
        </Carousel>
        );
}