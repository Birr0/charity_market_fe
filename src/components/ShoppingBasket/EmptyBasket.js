import {Link} from "react-router-dom";
import { Typography } from "@material-ui/core";
export const EmptyBasket = () => {
    return(
        <div style={{margin:"20px"}}>
            <Typography variant="h3">Your wishlist is empty</Typography>
            <Typography>Browse, find some items and you can keep them here for later!</Typography>
            <Link to="/">
                <Typography>Go back to shopping</Typography>
            </Link>
        </div>
    );

}