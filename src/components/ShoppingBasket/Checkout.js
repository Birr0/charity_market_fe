import {Template} from "../Template/Template";
import {useStyles} from "../Styles/Styles";
import { BasketItem } from "./BasketItem";
import {EmptyBasket} from "./EmptyBasket";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../storage/basketSlice";

// persistent storage of items

export const Checkout = () => {
    const classes = useStyles();
    const count = useSelector((state) => state.basket.value)
    const dispatch = useDispatch();

    return(
        <Template component={
            <div className={classes.pageContent}>
                <h1>Checkout</h1>
                <p>{count}</p>
                <BasketItem productData={{title:'Beleek Vase', price:'£10', shortDescription:'New Item. Lorem iPsmu ad infintum', detailedDescription: ''}}/>
                <hr></hr>
                <BasketItem productData={{title:'Beleek Vase', price:'£10', shortDescription:'New Item. Lorem iPsmu ad infintum', detailedDescription: ''}}/>
                <hr></hr>
                <Paper style={{maxWidth: "66.6%", marginLeft:"5px", backgroundColor:"#d9e6f2"}}>
                    <p>Shipping: £3.99</p>
                    <p>Tax: N/A</p>
                    <p>Sub-Total: £23.99 (use GBP etc...)</p>
                    <hr></hr>
                    <p>Total: </p>
                    <Button variant="outlined" onClick={() => dispatch(increment())}>Proceed to Pay</Button>
                </Paper>
                <EmptyBasket />
            </div>
        }
        />
    );
}