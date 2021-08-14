import {Link} from "react-router-dom";

export const EmptyBasket = () => {
    return(
        <>
        <h1>Empty Basket</h1>
        <p>You have nothing in your basket</p>
        
        <Link to="/">
            <p>Go back to shopping</p>
        </Link>
        </>
    );

}