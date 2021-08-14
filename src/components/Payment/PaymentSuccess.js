import {Link} from "react-router-dom";
import {Template} from "../Template/Template";
import {Alert, AlertTitle} from "@material-ui/lab";

export const PaymentSuccess = () => {
    return(
        <Template component={
            <>
                <h1>Success</h1>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                </Alert>
                <Link to="/">Go back to home</Link>
            </>
        } />
    );
}