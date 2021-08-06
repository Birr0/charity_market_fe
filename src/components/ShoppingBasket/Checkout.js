import {Template} from "../Template/Template";
import {useStyles} from "../Styles/Styles";

export const Checkout = () => {
    const classes = useStyles();

    return(
        <Template component={
            <div className={classes.pageContent}>
                <h1>Checkout</h1>
            </div>
        }
        />
    );
}