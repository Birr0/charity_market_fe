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
            <>
                <div>
                
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
                        
                    </>
                : <EmptyBasket />}
                
            </div> 
            </>
            
        }
        />

    );
}