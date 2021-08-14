import Backdrop from "@material-ui/core/Backdrop";


//Add arrows to circle thrugh images
//Zoom
export const ImageViewer = ({src, viewerOpen, closeViewer}) => {
    console.log(src);
    return(
        <>
            <Backdrop open={viewerOpen} style={{height: "100%",  opacity: 1, zIndex: 100}} onClick={closeViewer}>
               <img 
                alt=""
                src={src} style={{maxWidth: "66.6%"}} 
                /> 
            </Backdrop>
        </>
    );
}