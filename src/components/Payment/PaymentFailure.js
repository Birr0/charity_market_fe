import {Link} from "react-router-dom";
import {Alert, AlertTitle} from "@material-ui/lab";
import {Template} from "../Template/Template";

export const PaymentFailure = () => {
    return(
        <Template component={
            <div>
                <h1>Failure</h1>
                <Alert severity="error">
                    <AlertTitle>Failure of payment</AlertTitle>
                    <p>Retry // Add logic for retry</p>
                    <Link to="/">Go back home</Link>
                </Alert>
                
            </div>
        } />
    );
}