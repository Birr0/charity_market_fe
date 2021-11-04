import { Backdrop, LinearProgress } from "@material-ui/core";

// how to add text to backdrop

export const Loading = () =>{
    return(
        <Backdrop open={true} style={{backgroundColor: "white"}}>        
            <LinearProgress style={{width: "45%"}} />
        </Backdrop>
        
    )
}