import { Backdrop, CircularProgress, LinearProgress, Typography } from "@material-ui/core";
import { typography } from "@material-ui/system";
import {Template} from "../Template/Template";

// how to add text to backdrop

export const Loading = ({message}) =>{

    return(
        <Template component={
            <Backdrop open={true} style={{backgroundColor: "white"}}>        
                <LinearProgress style={{width: "45%"}} />
            </Backdrop>
        } />
    )
}