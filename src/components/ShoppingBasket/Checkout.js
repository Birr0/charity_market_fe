import {Template} from "../Template/Template";
import { LineItem } from "./LineItem";
import {EmptyBasket} from "./EmptyBasket";
import { useSelector } from "react-redux";

// persistent storage of items

export const Checkout = () => {
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