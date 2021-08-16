import Carousel from "react-material-ui-carousel";

export const CarouselViewer = ({items}) => {

    return(
        <Carousel interval={5000}>
            {items.map((item, i) => <img src={item} key={i} />)}
        </Carousel>
    
        );
}