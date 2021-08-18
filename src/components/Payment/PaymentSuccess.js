import {Link} from "react-router-dom";
import {Template} from "../Template/Template";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useDispatch} from "react-redux";
import {setLoading} from "../../storage/loadingSlice";

export const PaymentSuccess = () => {
    const dispatch = useDispatch();
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