import { Typography } from "@material-ui/core"
import { Template } from "./Template/Template"

export const About = () => {

    return(
        <Template component={
            <div style={{margin:"10px"}}>
                <Typography variant="h5">About Us</Typography>
                <p>Add small paragraph here ...</p>
                <Typography>contact@thriftmarket.com</Typography>
            </div>
        } />
    )

}