import {Template} from "../Template/Template";
import {useStyles} from "../Styles/Styles";
import { LineItem } from "./LineItem";
import {EmptyBasket} from "./EmptyBasket";
import {processCheckout} from "../../storage/basketSlice";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";

// persistent storage of items

export const Checkout = () => {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const cart = useSelector(state => state.basket.cart);

    return(
        <Template component={
            <div className={classes.pageContent}>
                <h1>Checkout</h1>

                {cart.lineItems.length > 0 ?
                    <>
                        {cart.lineItems.map(item => {
    
                            return(
                                <>
                                    <LineItem productData={item} remove={true} />
                                    <hr></hr>
                                </>
                            );
                        })}
                        <Paper style={{maxWidth: "66.6%", marginLeft:"5px", backgroundColor:"#d9e6f2"}}>
                            <p>Shipping: {cart.shipping}</p>          
                            <p>Sub-Total: {cart.total} GBP</p>
                            <hr></hr>
                            <Button variant="outlined" onClick={() => dispatch(processCheckout(cart))}>Proceed to Pay</Button>
                        </Paper>
                    </>
                : <EmptyBasket />}
                
                
                
            </div>
        }
        />
    );
}