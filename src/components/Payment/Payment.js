import {Redirect} from "react-router-dom";
import {Template} from "../Template/Template";
import { useSelector } from "react-redux";
import CheckoutForm from"./CheckoutForm";

import {LineItem} from "../ShoppingBasket/LineItem";

export const Payment = () => {
    const checkout = useSelector(state => state.basket);
    
    if(!checkout.cart.lineItems.length > 0 && !checkout.buyNowItem){
        return(
            <Redirect to="/checkout" />
        );
    };
    
    return(
        <Template component={
            <div style={{marginTop: "80px"}}>
                <h1>Complete Payment</h1>
                
                {checkout.cart.lineItems.map((item, key) => {
                    return(
                        <LineItem productData={item} remove={false} key={key} />
                        
                    );
                })}
                <CheckoutForm />
                
            </div>
        }
        />
    );
}
