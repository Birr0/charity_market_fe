import React, {useEffect, useState} from "react";
import { IconButton, Backdrop, Icon, useMediaQuery } from "@material-ui/core";
import { ArrowBack, ArrowForward, Close} from "@material-ui/icons";


//Add arrows to circle thrugh images
//Zoom
export const ImageViewer = ({src, viewerOpen, closeViewer, nextImages}) => {
    const [imgSrc, setImgSrc] = useState(src);

    const desktop = useMediaQuery('(min-width:600px)');  
    
    const getNextImage = (keyPress) => {

        if(keyPress === 'forward'){
            if((nextImages.indexOf(imgSrc) + 1) === nextImages.length){
                console.log(nextImages.indexOf(src));
                setImgSrc(nextImages[0]);
                return
            }
            else{
                console.log(nextImages.indexOf(imgSrc));
                setImgSrc(nextImages[nextImages.indexOf(imgSrc) + 1]);
                return
            }
        }
        else if(keyPress === 'back'){
            if(nextImages.indexOf(imgSrc) === 0){
                console.log(nextImages[nextImages.length - 1]);
                setImgSrc(nextImages[nextImages.length - 1]);
                
            }
            else{
                console.log(nextImages.indexOf(imgSrc));
                setImgSrc(nextImages[nextImages.indexOf(imgSrc) - 1]);
                return
            }
        }
    }

    return(
        <>
            <Backdrop open={viewerOpen} style={{height: "100%",opacity: 1, zIndex: 100, backgroundColor:"rgba(0, 0, 0, 0.6)"}}>
                <IconButton style={{position:"absolute", top:80, right:0, color:"white"}} onClick={closeViewer}>
                    <Close style={{fontSize:"30px"}}/>
                </IconButton>
                <IconButton onClick={ (e) => {
                    e.preventDefault();
                    getNextImage('back')
                    }
                }>
                    <ArrowBack style={{color:"white", fontSize:"35px"}} />
                </IconButton>
               <img 
                alt=""
                src={imgSrc} style={{maxWidth: (desktop ? "800px" : "66.6%")}} 
                />
                <IconButton onClick={ (e) => {
                    e.preventDefault();
                    getNextImage('forward')
                }}>
                    <ArrowForward style={{color:"white", fontSize:"35px"}}/>
                </IconButton>
            </Backdrop>
        </>
    );
}   