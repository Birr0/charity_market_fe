import { Backdrop, CircularProgress, LinearProgress, Typography } from "@material-ui/core";
import {Template} from "../Template/Template";

// how to add text to backdrop

export const Loading = () =>{
    return(
        <Backdrop open={true} style={{backgroundColor: "white"}}>        
            <LinearProgress style={{width: "45%"}} />
        </Backdrop>
        
    )
}