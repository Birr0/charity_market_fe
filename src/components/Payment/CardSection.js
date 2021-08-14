import {CardElement} from "@stripe/react-stripe-js";
import Paper from "@material-ui/core/Paper";

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#000000",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aaaaaa",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

export const CardSection = () => {
    return(
        <CardElement 
            options={{
            iconStyle: 'default',
            style: {
              base: {
                
                fontSize: '16px',
                lineHeight: '1.5',
                '::placeholder': {
                  fontSize: '14px',
                  color: 'black',
                },
                ':focus': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              },
              empty : {
                color: 'white',
                backgroundColor: 'white',
                '::placeholder': {
                  color: 'black',
                },
                ':focus': {
                  backgroundColor: 'white',
                  color: 'black',
              },
              },
              invalid: {
                color: 'blue',
                backgroundColor: 'white',
              },
              complete:{
                backgroundColor: 'white',
                color: 'black',
              }
            },
          }} />
    );

}