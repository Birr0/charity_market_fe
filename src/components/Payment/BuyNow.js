import { Template } from "../Template/Template";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import CheckoutForm from"./CheckoutForm";

import {LineItem} from "../ShoppingBasket/LineItem";
import { buyNow } from "../../storage/basketSlice";

export const BuyNow = ({productData}) => {
    const dispatch = useDispatch();
    const buyNowItem = useSelector(state => state.basket.buyNowItem);
    
    if(!buyNowItem){
        return(
            <Redirect to="/" />
        );
    }

    return(
        <Template component={

            <div>
                <LineItem productData={buyNowItem} remove={false} />
                <CheckoutForm buyNow={true}/>
            </div>
        } />
        );
}
