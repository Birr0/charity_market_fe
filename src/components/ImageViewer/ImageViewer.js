import Backdrop from "@material-ui/core/Backdrop";

// Add callback function and X out
//Add arrows to circle thrugh images
export const ImageViewer = ({src, viewerOpen}) => {
    console.log(src);
    return(
        <>
            <Backdrop open={viewerOpen} style={{height: "100%",  opacity: 1, zIndex: 100}}>
               <img src={src} style={{maxWidth: "300px"}} /> 
            </Backdrop>
        </>
    );
}