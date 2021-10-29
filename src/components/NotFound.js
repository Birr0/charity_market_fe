import { Card, Typography } from "@material-ui/core"
import { Template } from "./Template/Template"
import { Link } from "react-router-dom";

export const NotFound = () => {
    return(
        <Template component={
            <div style={{marginTop:"100px"}}>
                <Card style={{padding:"10px", maxWidth:"66.6%", marginLeft:"auto", marginRight:"auto", border:"1px solid #e6e6e6"}}>
                    <Typography variant="h5">Not found</Typography>
                    <hr></hr>
                    <Typography variant="h6">Sorry, I can't find what you are looking for</Typography>
                    <br></br>
                    <Link to={'/'}>Go home</Link>
                </Card>
            </div>
        } />
    )
}